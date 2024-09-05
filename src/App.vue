<template>
  <main>
    <!-- <div class="tresBg"> -->

      <div ref="sceneContainer" class="tresBg"></div>

      <div class="top" @click="clickScene($event)">

        <div class="title">{{ Config.title }}</div>
      
        <div v-if="startAnimation" class="enter">{{ Config.txtEnter }}</div>

      </div>

    <!-- </div> -->

  </main>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import * as THREE from 'three';

import Config from '@/Config.ts'

// import imgBack from '/img/sky1.jpg'
import imgStar from '@/assets/img/star1.png'

const sceneContainer = ref<HTMLDivElement | null>(null);

/////////////////////////////////////////////
//three.js シーンの初期設定
/////////////////////////////////////////////
const cameraDistance = 1000
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = cameraDistance;

// カメラの視野角をラジアンに変換
const fov = camera.fov * (Math.PI / 180);
// 画面のアスペクト比を取得
const aspect = window.innerWidth / window.innerHeight;
// 平面の高さを計算
const planeHeight = 2 * Math.tan(fov / 2) * cameraDistance * 1.2;
// 平面の幅を計算
const planeWidth = planeHeight * aspect;

// const renderer = new THREE.WebGLRenderer();
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

let stars: THREE.Points;
let planeScreen: THREE.Mesh;
let starGeometry: THREE.BufferGeometry

const starCount = 8600;
const starVertices: number[] = [];
const starShapeVertices: number[] = [];
const starSpeeds: number[] = [];

let leftEnd: number, rightEnd: number, topEnd: number, bottomEnd: number

//minからmaxまでのランダムな値を返す
const randomNum = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

onMounted(() => {

  const loadPic = new THREE.TextureLoader();
  starGeometry = new THREE.BufferGeometry();

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


  initScene()

  animate();

  function initScene() {

    if (sceneContainer.value) {
      sceneContainer.value.appendChild(renderer.domElement);
    }

    // const sceneTexture = loadPic.load(imgBack);
    // scene.background = sceneTexture;

    // 背景として使用する平面を追加
    const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const planeMaterial = new THREE.MeshBasicMaterial({ visible: false });
    planeScreen = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeScreen);
    console.log('plane', planeScreen)

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
    ];

    const starColors: number[] = [];
    const starSizes: number[] = [];
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

    stars = new THREE.Points(starGeometry, starMaterial);
    console.log('stars', stars)

    stars.visible = false;
    scene.add(stars);

    const starRadius = 50;
    const starPoints = 5;

    for (let i = 0; i < starPoints * 2; i++) {
      const angle = (i * Math.PI) / starPoints;
      const radius = i % 2 === 0 ? starRadius : starRadius / 2;
      starShapeVertices.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    }

    leftEnd = -(planeWidth / 2)
    rightEnd = (planeWidth / 2)
    topEnd = (planeHeight / 2)
    bottomEnd = -(planeHeight / 2)

    console.log('leftEnd', leftEnd)
    console.log('rightEnd', rightEnd)
    console.log('topEnd', topEnd)
    console.log('bottomEnd', bottomEnd)

  }

});

//クリックした段階で画面に星を表示
const startAnimation = ref<boolean>(true);

//////////////////////////////////////////////
// クリックした場所に星を表示する処理
/////////////////////////////////////////////
function clickScene(event: MouseEvent) {

  if (startAnimation.value) {
    stars.visible = true;
    startAnimation.value = false

  }
  // マウス位置を正規化
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // レイキャスターを設定
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // クリック位置の3D座標を取得
  const intersects = raycaster.intersectObject(planeScreen);

  const scaleFactor = 1.0; // スケーリング値を調整
  const starRandom = 5; //表示位置のバラつき 

  console.log('intersects.length', intersects.length)

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
      starVertices[i * 3] = randomNum(scalePointX - starRandom, scalePointX + starRandom) + starShapeVertices[index * 3];
      starVertices[i * 3 + 1] = randomNum(scalePointY - starRandom, scalePointY + starRandom) + starShapeVertices[index * 3 + 1];
      starVertices[i * 3 + 2] = 0;
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starGeometry.attributes.position.needsUpdate = true;
  }

}

const animate = () => {
  requestAnimationFrame(animate);

  const positions = starGeometry.attributes.position.array as Float32Array;

  for (let i = 0; i < positions.length; i += 3) {

    positions[i] += starSpeeds[i];
    positions[i + 1] -= starSpeeds[i + 1];
    positions[i + 2] += starSpeeds[i + 2];

    // 画面外に出たら反対側に戻す

    if (positions[i] > rightEnd) positions[i] = leftEnd;
    if (positions[i] < leftEnd) positions[i] = rightEnd;

    if (positions[i + 1] > topEnd) positions[i + 1] = bottomEnd;
    if (positions[i + 1] < bottomEnd) positions[i + 1] = topEnd;

    if (positions[i + 2] > cameraDistance / 2) positions[i + 2] = 0;
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

</script>

<style scoped>
main {
  position: relative;
  width: 100%;
  height: auto;
  font-family: "Marvel-Bold";
  color: #D5E0F1;
}

.tresBg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/sky1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.webGL {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.top {
  position: relative;
  width: 100%;
  height: 93vh;
}

.title {
  margin-top: 1%;
  margin-left: 3%;
  font-size: 4vw;
}

.enter {
  /* text-align:center;
  vertical-align:middle; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2vw;
  color: #041A25;
}
</style>