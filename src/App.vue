<template>
  <div ref="sceneContainer" class="webGL"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as THREE from 'three';

import imgBack from '/img/sky1.jpg'
import imgStar from '/img/star1.png'

const sceneContainer = ref<HTMLDivElement | null>(null);

//minからmaxまでのランダムな値を返す
const randomNum = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

//カメラの距離
// const cameraDistance = 500
const cameraDistance = 1000

onMounted(() => {
  if (sceneContainer.value) {
    const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = cameraDistance;

    // カメラの視野角をラジアンに変換
    const fov = camera.fov * (Math.PI / 180);
    // 画面のアスペクト比を取得
    const aspect = window.innerWidth / window.innerHeight;
    // 平面の高さを計算
    // const planeHeight = 2 * Math.tan(fov / 2) * cameraDistance;
    const planeHeight = 2 * Math.tan(fov / 2) * cameraDistance * 1.2;
    // 平面の幅を計算
    const planeWidth = planeHeight * aspect;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneContainer.value.appendChild(renderer.domElement);

    const loadPic = new THREE.TextureLoader();
    const sceneTexture = loadPic.load(imgBack);
    scene.background = sceneTexture;

    // const rect = sceneContainer.value!.getBoundingClientRect();

    // 背景として使用する平面を追加
    const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const planeMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    console.log('plane', plane)

    const starGeometry = new THREE.BufferGeometry();
    const colors = [
      [0.9, 0.9, 0.9], // 白
      [1.0, 1.0, 0.8], //レモン
      [0.8, 1.0, 1.0], // light cyan
      [0.9, 0.9, 1.0], // alice blue
      [0.9, 1.0, 0.9], // 
      [1.0, 0.9, 0.9], //
      [1.0, 0.71, 0.1], // 黄色
      [1.0, 0.86, 0.1], // 薄い黄色
      [0.98, 1.0, 0.1], // 黄緑

      // [1.0, 0.1, 0.1], // 赤
      // [1.0, 0.26, 0.1], // オレンジ
      // [1.0, 0.41, 0.1], // 濃いオレンジ
      // [1.0, 0.56, 0.1], // 薄いオレンジ
      // [0.1, 1.0, 0.86], // 緑
      // [0.1, 0.9, 1.0], // 水色
      // [0.1, 0.83, 1.0], // 青
      // [0.1, 0.68, 1.0], // 濃い青
    ];
    const starCount = 8600;
    const starVertices: number[] = [];
    const starColors: number[] = [];
    const starSizes: number[] = [];
    const starSpeeds: number[] = [];
    const minSpeedX = -0.2;
    const maxSpeedX = 0.2;
    const minSpeed = 0.05;
    const maxSpeed = 0.2;
    const starSize = 30;

    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * planeWidth - planeWidth / 2;
      const y = Math.random() * planeHeight - planeHeight / 2;
      const z = 0;
      starVertices.push(x, y, z);

      const color = colors[Math.floor(Math.random() * colors.length)];
      starColors.push(color[0], color[1], color[2]);

      starSizes.push(starSize); // 各星のサイズを設定

      starSpeeds.push(randomNum(minSpeedX, maxSpeedX), randomNum(minSpeed, maxSpeed), randomNum(minSpeed, maxSpeed));

    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1).setUsage(THREE.DynamicDrawUsage));

    const vertexShader = `
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform sampler2D pointTexture;
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4(vColor, 1.0);
        gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
      }
    `;

    const pointTexture = loadPic.load(imgStar);

    const starMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        pointTexture: { value: pointTexture }
      },
      transparent: true,
      vertexColors: true,
    });

    console.log('starMaterial', starMaterial)
    const stars = new THREE.Points(starGeometry, starMaterial);
    console.log('stars', stars)

    scene.add(stars);

    const starShapeVertices: number[] = [];
    const starRadius = 50;
    const starPoints = 5;
    for (let i = 0; i < starPoints * 2; i++) {
      const angle = (i * Math.PI) / starPoints;
      const radius = i % 2 === 0 ? starRadius : starRadius / 2;
      starShapeVertices.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    }

    const mouse = new THREE.Vector2();
    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    const scaleFactor = 0.83; // スケーリング値を調整
    // const scaleFactor = 0.5; // スケーリング値を調整
    const starRandom = 5; //表示位置のバラつき 

    const raycaster = new THREE.Raycaster();

    window.addEventListener('click', (event) => {
      // 回転を停止
      stars.rotation.x = 0;
      stars.rotation.y = 0;

      // マウス位置を正規化
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // const clickPosition = new THREE.Vector3(mouse.x * rect.width / 2, mouse.y * rect.height / 2, 0);
      // const scalePointX = clickPosition.x * scaleFactor
      // const scalePointY = clickPosition.y * scaleFactor

      // レイキャスターを設定
      raycaster.setFromCamera(mouse, camera);

      // クリック位置の3D座標を取得
      const intersects = raycaster.intersectObject(plane);

      if (intersects.length > 0) {
        const point = intersects[0].point;

        const scalePointX = point.x * scaleFactor
        const scalePointY = (point.y - 1) * scaleFactor

        console.log('クリック位置', event.clientX, event.clientY);
        console.log('マウス位置', mouse.x, mouse.y);
        console.log('3D空間のクリック位置', point);
        // console.log('補正後クリック位置', scalePointX, scalePointY);

        // クリック位置の周辺に星を配置
        for (let i = 0; i < starCount / 2; i++) {
          const index = i % (starShapeVertices.length / 3);
          // starVertices[i * 3] = point.x + starShapeVertices[index * 3];
          // starVertices[i * 3 + 1] = point.y + starShapeVertices[index * 3 + 1];
          starVertices[i * 3] = randomNum(scalePointX - starRandom, scalePointX + starRandom) + starShapeVertices[index * 3];
          starVertices[i * 3 + 1] = randomNum(scalePointY - starRandom, scalePointY + starRandom) + starShapeVertices[index * 3 + 1];
          starVertices[i * 3 + 2] = 0;
          // starVertices[i * 3 + 2] = point.z + starShapeVertices[index * 3 + 2];
        }

        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        starGeometry.attributes.position.needsUpdate = true;
      }

    });

    const leftEnd = -(planeWidth / 2)
    const rightEnd = (planeWidth / 2)
    const topEnd = (planeHeight / 2)
    const bottomEnd = -(planeHeight / 2)

    console.log('leftEnd', leftEnd)
    console.log('rightEnd', rightEnd)
    console.log('topEnd', topEnd)
    console.log('bottomEnd', bottomEnd)

    const animate = () => {
      requestAnimationFrame(animate);
      stars.position.x = mouse.x * 100;
      stars.position.y = mouse.y * 100;

      const positions = starGeometry.attributes.position.array as Float32Array;
      // const mousePosition = new THREE.Vector3(mouse.x * rect.width / 2, mouse.y * rect.height / 2, 0);

      for (let i = 0; i < positions.length; i += 3) {

        // const starPosition = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
        // const distance = starPosition.distanceTo(mousePosition);

        // if (distance < 100) { // マウスカーソルに近い星を引き寄せる
        //   const direction = mousePosition.clone().sub(starPosition).normalize();
        //   positions[i] += direction.x * 2;
        //   positions[i + 1] += direction.y * 2;
        //   positions[i + 2] += direction.z * 2;
        // } else {
        // positions[i] += starSpeeds[i];
        // positions[i + 1] -= starSpeeds[i + 1];
        // positions[i + 2] += starSpeeds[i + 2];
        // }

        positions[i] += starSpeeds[i];
        positions[i + 1] -= starSpeeds[i + 1];
        positions[i + 2] += starSpeeds[i + 2];

        // 画面外に出たら反対側に戻す

        if (positions[i] > rightEnd) positions[i] = leftEnd;
        if (positions[i] < leftEnd) positions[i] = rightEnd;

        if (positions[i + 1] > topEnd) positions[i + 1] = bottomEnd;
        if (positions[i + 1] < bottomEnd) positions[i + 1] = topEnd;

        if (positions[i + 2] > cameraDistance / 1.5) positions[i + 2] = 0;
      }

      starGeometry.attributes.position.needsUpdate = true;

      const sizes = starGeometry.attributes.size.array;

      const time = Date.now() * 0.003;
      for (let i = 0; i < starCount; i++) {
        sizes[i] = 40 * (1 + Math.sin(0.1 * i + time));
        // sizes[i] = 5 * (1 + Math.sin(0.1 * i + time));
      }

      starGeometry.attributes.size.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();
  }
});
</script>

<style scoped>
.webGL {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
</style>
