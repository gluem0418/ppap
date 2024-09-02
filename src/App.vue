<template>
  <main>
    <div class="tresBg">

      <Suspense>
        <TresCanvas window-size>

          <TresPerspectiveCamera ref="cameraRef" :position="[0, 0, cameraDistance]" :args="[cameraFov, 1, 1, 1000]" />

          <TresMesh ref="planeScreen" @click="clickScreen">
            <TresPlaneGeometry :args="[planeWidth, planeHeight]" />
            <TresMeshBasicMaterial :visible="false" />
          </TresMesh>

          <TresPoints :visible="starsVisible" ref="starPoint">
            <TresBufferGeometry ref="starGeometry" :position="[starVertices, 3]" :color="[starColors, 3]"
              :size="[starSizes, 1]" />
            <!-- <TresShaderMaterial v-bind="starMaterial" ref="starMaterialRef" /> -->
            <TresPointsMaterial v-bind="starTexture" ref="starMaterialRef" />
          </TresPoints>

        </TresCanvas>
      </Suspense>

      <div class="title">{{ Config.title }}</div>
      <div v-if="startAnimation" class="enter">{{ Config.txtEnter }}</div>

    </div>

  </main>
</template>

<script setup lang="ts">

import { ref } from 'vue';

import { TresCanvas, useTexture, useRenderLoop } from '@tresjs/core'

import { PerspectiveCamera, BufferGeometry, Float32BufferAttribute, DynamicDrawUsage, ShaderMaterial, Intersection, Points, PointsMaterial, Raycaster, Mesh, Texture } from 'three'

import Config from '@/Config.ts'

import imgStar from '/img/star1.png'
// const pointTexture = useTexture([imgStar])
// const starTexture = useTexture([imgStar])

const starTexture = useTexture({
  map: imgStar
});

/////////////////////////////////////////////
//three.js シーンの初期設定
/////////////////////////////////////////////
const cameraDistance = 1000
const cameraFov = 50

const starGeometry = ref<BufferGeometry | null>(null);
const starMaterialRef = ref<PointsMaterial | null>(null);
const starPoint = ref<Points | null>(null);

const starCount = 8600;

let leftEnd: number, rightEnd: number, topEnd: number, bottomEnd: number

// カメラの視野角をラジアンに変換
const fov = cameraFov * (Math.PI / 180);
// 画面のアスペクト比を取得
const aspect = window.innerWidth / window.innerHeight;
// 平面の高さを計算
const planeHeight = 2 * Math.tan(fov / 2) * cameraDistance * 1.2;
// 平面の幅を計算
const planeWidth = planeHeight * aspect;

const startAnimation = ref<boolean>(true);
// const starsVisible = ref<boolean>(false);
let starsVisible: boolean = false;

const cameraRef = ref<PerspectiveCamera | null>(null);
const planeScreen = ref<Mesh | null>(null);

//minからmaxまでのランダムな値を返す
const randomNum = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

// onMounted(() => {

// const vertexShader = `
//       attribute float size;
//       varying vec3 vColor;
//       void main() {
//         vColor = color;
//         vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
//         gl_PointSize = size * (300.0 / -mvPosition.z);
//         gl_Position = projectionMatrix * mvPosition;
//       }
//     `;

// const fragmentShader = `
//       uniform sampler2D pointTexture;
//       varying vec3 vColor;
//       void main() {
//         gl_FragColor = vec4(vColor, 1.0);
//         gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
//       }
//     `;

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


const starVertices = new Float32Array(starCount * 3);
const starColors = new Float32Array(starCount * 3);
const starSizes = new Float32Array(starCount);

const starShapeVertices: number[] = [];
const starSpeeds: number[] = [];

const minSpeedX = -0.2;
const maxSpeedX = 0.2;
const minSpeed = 0.05;
const maxSpeed = 0.2;
const starSize = 30;

for (let i = 0; i < starCount; i++) {

  starVertices[i * 3] = Math.random() * planeWidth - planeWidth / 2;
  starVertices[i * 3 + 1] = Math.random() * planeHeight - planeHeight / 2;
  starVertices[i * 3 + 2] = 0;

  const color = colors[Math.floor(Math.random() * colors.length)];

  starColors[i * 3] = color[0];
  starColors[i * 3 + 1] = color[1];
  starColors[i * 3 + 2] = color[2];

  starSizes[i] = starSize; // 各星のサイズを設定

  starSpeeds.push(randomNum(minSpeedX, maxSpeedX), randomNum(minSpeed, maxSpeed), randomNum(minSpeed, maxSpeed));

}
// const starMaterial = {
//   vertexShader: vertexShader,
//   fragmentShader: fragmentShader,
//   uniforms: {
//     pointTexture: { value: pointTexture }
//   },
//   transparent: true,
//   vertexColors: true,
// };

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

const { onLoop } = useRenderLoop()

onLoop(({ }) => {

  for (let i = 0; i < starCount; i++) {

    starVertices[i * 3] += starSpeeds[i * 3];
    starVertices[i * 3 + 1] -= starSpeeds[i * 3 + 1];
    starVertices[i * 3 + 2] += starSpeeds[i * 3 + 2];

    // 画面外に出たら反対側に戻す

    if (starVertices[i * 3] > rightEnd) starVertices[i * 3] = leftEnd;
    if (starVertices[i * 3] < leftEnd) starVertices[i * 3] = rightEnd;

    if (starVertices[i * 3 + 1] > topEnd) starVertices[i * 3 + 1] = bottomEnd;
    if (starVertices[i * 3 + 1] < bottomEnd) starVertices[i * 3 + 1] = topEnd;

    if (starVertices[i * 3 + 2] > cameraDistance / 2) starVertices[i * 3 + 2] = 0;
  }

  const time = Date.now() * 0.003;
  for (let i = 0; i < starCount; i++) {
    starSizes[i] = 40 * (1 + Math.sin(0.1 * i + time));
  }

})

// })


//////////////////////////////////////////////
// クリックした場所に星を表示する処理
/////////////////////////////////////////////
function clickScreen(ray: Intersection) {
  // function clickScreen(event: MouseEvent) {
  if (!starGeometry.value) return

  console.log('clickScreen ray', ray)
  console.log('clickScreen ray.point', ray.point)

  console.log('clickScreen_cameraRef', cameraRef.value)
  console.log('clickScreen_planeScreen', planeScreen.value)

  console.log('clickScreen_starGeometry', starGeometry.value)
  console.log('clickScreen_starMaterialRef', starMaterialRef.value)
  console.log('clickScreen_starPoint', starPoint.value)

  console.log('starTexture', starTexture)

  // console.log('clickScreen_starVertices', starVertices)

  if (startAnimation.value) {
    // starsVisible.value = true;
    starsVisible = true;
    startAnimation.value = false
  }

  const scaleFactor = 1.0; // スケーリング値を調整
  const starRandom = 5; //表示位置のバラつき 

  const point = ray.point;

  const scalePointX = point.x * scaleFactor
  const scalePointY = (point.y - 1) * scaleFactor

  console.log('3D空間のクリック位置', point);

  // クリック位置の周辺に星を配置
  for (let i = 0; i < starCount / 2; i++) {
    const index = i % (starShapeVertices.length / 3);
    starVertices[i * 3] = randomNum(scalePointX - starRandom, scalePointX + starRandom) + starShapeVertices[index * 3];
    starVertices[i * 3 + 1] = randomNum(scalePointY - starRandom, scalePointY + starRandom) + starShapeVertices[index * 3 + 1];
    starVertices[i * 3 + 2] = 0;
  }
}

// }

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
  background-image: url('/img/sky1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.top {
  position: relative;
  margin: 0;
  width: 100%;
  height: 93vh;
}

.title {
  margin-top: 1%;
  margin-left: 3%;
  font-size: 4vw;
}

.enter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2vw;
  color: #041A25;
}
</style>