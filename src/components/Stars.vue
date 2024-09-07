<template>
  <TresCanvas>

    <TresPerspectiveCamera :position="[0, 0, cameraDistance]" :args="[cameraFov, 1, 1, 1000]" />

    <OrbitControls />

    <TresMesh @click="clickScreen">
      <TresBoxGeometry :args="[boxWidth, boxWidth, boxWidth]" />
      <TresMeshBasicMaterial :transparent="true" :opacity="0" :side="BackSide" />
    </TresMesh>

    <TresMesh :scale="1">
      <TresBoxGeometry :args="[10, 10, 10]" />
      <TresMeshStandardMaterial color="white" />
    </TresMesh>

    <TresGroup ref="starsRef">
      <primitive v-for="star in stars" :key="star" :position="star.position" :rotation="star.rotation" :scale="star.scale"
        :object="createColoredModel(star.color)" />
    </TresGroup>
  </TresCanvas>

  <div v-if="startAnimation" class="enter">{{ Config.txtEnter }}</div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

import { TresCanvas, useTexture, useGLTF, useRenderLoop } from '@tresjs/core'

import { OrbitControls } from '@tresjs/cientos'

import { BackSide, Group, BufferAttribute, Vector3, Float32BufferAttribute, DynamicDrawUsage, ShaderMaterial, Intersection, Points, PointsMaterial, Raycaster, Mesh, Texture, TextureLoader } from 'three'

// import vertexShader from '@/components/shaders/vertex.glsl';
// import fragmentShader from '@/components/shaders/fragment.glsl';

import Config from '@/Config.ts'

// import imgStar from '@/assets/img/star1.png'

const { nodeStar } = await useGLTF('/models/star.glb', { draco: true });
// const starTexture = await useTexture([imgStar])

/////////////////////////////////////////////
// シーンの初期設定
/////////////////////////////////////////////
const cameraDistance = 100
const cameraFov = 50

const starsRef = ref<Group | null>(null);

const starCount = 2000;
const boxWidth = 2000;

let leftEnd: number, rightEnd: number, topEnd: number, bottomEnd: number

const startAnimation = ref<boolean>(true);
const starsVisible = ref<boolean>(false);

//minからmaxまでのランダムな値を返す
const randomNum = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

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

// const starVertices = new Float32Array(starCount * 3);
// const starColors = new Float32Array(starCount * 3);
// const starSizes = new Float32Array(starCount);

const starShapeVertices: number[] = [];
// const starSpeeds: number[] = [];

const minSpeedX = -0.2;
const maxSpeedX = 0.2;

//stars初期化
const minPosition = -(boxWidth / 2);
const maxPosition = boxWidth / 2;

const minScale = 0.1;
const maxScale = 3;

const minSpeed = 0.05;
const maxSpeed = 0.2;

const stars = Array.from({ length: starCount }, () => ({
  position: [randomNum(minPosition, maxPosition), randomNum(minPosition, maxPosition), randomNum(minPosition, maxPosition)],
  moveSpeed: randomNum(minSpeed, maxSpeed),

  rotation: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
  rollSpeed: [randomNum(minSpeed, maxSpeed), randomNum(minSpeed, maxSpeed), randomNum(minSpeed, maxSpeed)],

  scale: [randomNum(minScale, maxScale), randomNum(minScale, maxScale), randomNum(minScale, maxScale)],

  color: colors[Math.floor(Math.random() * colors.length)]
}));

// for (let i = 0; i < starCount; i++) {

//   starVertices[i * 3] = Math.random() * planeWidth - planeWidth / 2;
//   starVertices[i * 3 + 1] = Math.random() * planeHeight - planeHeight / 2;
//   starVertices[i * 3 + 2] = 0;

//   const color = colors[Math.floor(Math.random() * colors.length)];

//   starColors[i * 3] = color[0];
//   starColors[i * 3 + 1] = color[1];
//   starColors[i * 3 + 2] = color[2];

//   starSizes[i] = starSize; // 各星のサイズを設定

//   starSpeeds.push(randomNum(minSpeedX, maxSpeedX), randomNum(minSpeed, maxSpeed), randomNum(minSpeed, maxSpeed));

// }

const starRadius = 50;
const starPoints = 5;

for (let i = 0; i < starPoints * 2; i++) {
  const angle = (i * Math.PI) / starPoints;
  const radius = i % 2 === 0 ? starRadius : starRadius / 2;
  starShapeVertices.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
}

// leftEnd = -(planeWidth / 2)
// rightEnd = (planeWidth / 2)
// topEnd = (planeHeight / 2)
// bottomEnd = -(planeHeight / 2)

// console.log('leftEnd', leftEnd)
// console.log('rightEnd', rightEnd)
// console.log('topEnd', topEnd)
// console.log('bottomEnd', bottomEnd)

// const { onLoop, resume } = useRenderLoop()
const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (starsRef.value) {
    let count = 0
    for (const star of starsRef.value.children) {
      const starA = stars[count]

      star.rotation.x += starA.rollSpeed[0];
      star.rotation.y += starA.rollSpeed[1];
      star.rotation.z += starA.rollSpeed[2];

      if (star.position.y < -80) {
        star.position.y = 40;
      }
      if (star.position.x < -80) {
        star.position.x = 40;
      }
      star.position.y -= delta * 0.2;
      star.position.x -= delta * 0.2;

      count ++

    }
  }
});

onLoop(({ }) => {

  // console.log('onLoop start')

  for (let i = 0; i < starCount; i++) {


    //球体の外面に触れたら初期値に戻す

    //xSpeeds:範囲内でランダム
    //minとmaxを決定
    //初期の方向をmin or maxから決定
    //minまで到達したらmaxを目指す    

    //ySpeeds:固定

    //zSpeeds:範囲内でランダム(xSpeedsと同様)
    //

    starVertices[i * 3] += starSpeeds[i * 3];
    starVertices[i * 3 + 1] -= starSpeeds[i * 3 + 1];
    starVertices[i * 3 + 2] += starSpeeds[i * 3 + 2];

    // 画面外に出たら反対側に戻す

    if (starVertices[i * 3] > rightEnd) starVertices[i * 3] = leftEnd;
    if (starVertices[i * 3] < leftEnd) starVertices[i * 3] = rightEnd;

    if (starVertices[i * 3 + 1] > topEnd) starVertices[i * 3 + 1] = bottomEnd;
    if (starVertices[i * 3 + 1] < bottomEnd) starVertices[i * 3 + 1] = topEnd;
    if (starVertices[i * 3 + 2] > cameraDistance / 2) starVertices[i * 3 + 2] = 0;

    starPoint.value!.geometry.setAttribute('position', new BufferAttribute(starVertices, 3));

  }

  const time = Date.now() * 0.003;
  for (let i = 0; i < starCount; i++) {
    starSizes[i] = 40 * (1 + Math.sin(0.1 * i + time));
  }

  starPoint.value!.geometry.setAttribute('size', new BufferAttribute(starSizes, 1));

  // console.log('onLoop end')

})

// })

//////////////////////////////////////////////
// クリックした場所に星を表示する処理
/////////////////////////////////////////////
function clickScreen(ray: Intersection) {

  console.log('starPoint.value')
  if (!starPoint.value) return

  console.log('clickScreen ray', ray)
  console.log('clickScreen ray.point', ray.point)

  console.log('clickScreen_starMaterialRef', starMaterialRef.value)
  console.log('clickScreen_starPoint', starPoint.value)
  console.log('starTexture', starTexture)

  if (startAnimation.value) {
    starsVisible.value = true;
    startAnimation.value = false
  }

  const scaleFactor = 1.0; // スケーリング値を調整
  const starRandom = 5; //表示位置のバラつき 

  // const point: Vector3 = ray.point;

  const scalePointX = ray.point.x * scaleFactor
  const scalePointY = (ray.point.y - 1) * scaleFactor

  console.log('3D空間のクリック位置', ray.point);

  // クリック位置の周辺に星を配置
  for (let i = 0; i < starCount / 2; i++) {
    const index = i % (starShapeVertices.length / 3);
    starVertices[i * 3] = randomNum(scalePointX - starRandom, scalePointX + starRandom) + starShapeVertices[index * 3];
    starVertices[i * 3 + 1] = randomNum(scalePointY - starRandom, scalePointY + starRandom) + starShapeVertices[index * 3 + 1];
    starVertices[i * 3 + 2] = 0;
  }

  starPoint.value.geometry.setAttribute('position', new BufferAttribute(starVertices, 3));

}

</script>

<style scoped>
.enter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2vw;
  color: #041A25;
}
</style>