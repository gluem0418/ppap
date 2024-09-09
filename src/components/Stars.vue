<template>
  <TresCanvas>

    <TresPerspectiveCamera ref="cameraRef" :position="[0, 0, cameraDistance]" />
    <OrbitControls :max-distance="boxWidth / 2" />

    <TresAmbientLight :intensity="3" />

    <TresDirectionalLight :position="[boxWidth / 2, boxWidth, 0]" :intensity="5" />

    <TresMesh @click="clickScreen">
      <TresBoxGeometry :args="[boxWidth, boxWidth, boxWidth]" />
      <TresMeshBasicMaterial :transparent="true" :opacity="0" :side="BackSide" />
    </TresMesh>

    <Suspense>
      <Text3D :text="Config.title" font="font/Marvel_Bold.json" :size="1" :position="[0, 3.5, 0]">
        <MeshGlassMaterial :color="0xFFB51A" />
      </Text3D>
    </Suspense>

    <TresGroup :visible='starsVisible' ref="starsRef">
      <primitive v-for="star in stars" :key="star" :position="star.position" :rotation="star.rotation" :scale="star.scale"
        :object="createColoredModel(star.material)" />
    </TresGroup>

  </TresCanvas>

  <div v-if="startAnimation" class="enter">{{ Config.txtEnter }}</div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';

import { TresCanvas, useRenderLoop, vLightHelper } from '@tresjs/core'

import { OrbitControls, useGLTF, Text3D, MeshGlassMaterial } from '@tresjs/cientos'

import { PerspectiveCamera, SpotLight, BackSide, Group, Intersection, MeshPhongMaterial, MeshToonMaterial, Mesh, Vector3 } from 'three'

import Config from '@/Config.ts'

const { nodes } = await useGLTF('model/star.glb', { draco: true })

/////////////////////////////////////////////
// シーンの初期設定
/////////////////////////////////////////////
const cameraRef = ref<PerspectiveCamera | null>(null);
const spotLightRef = ref<SpotLight | null>(null);
const starsRef = ref<Group | null>(null);

const cameraDistance = 10
// const cameraFov = 50

const starCount = 2000;
const boxWidth = 150;

const startAnimation = ref<boolean>(true);
const starsVisible = ref<boolean>(false);

//minからmaxまでのランダムな値を返す
const randomNum = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const materialColors = [
  new MeshPhongMaterial({ color: 0xFCF16E }),
  new MeshPhongMaterial({ color: 0xffff00 }),
  new MeshPhongMaterial({ color: 0xffd700 }),
  new MeshPhongMaterial({ color: 0xffa500 }),
  new MeshPhongMaterial({ color: 0x00ffff }),
  new MeshPhongMaterial({ color: 0x00ff00 }),
  new MeshPhongMaterial({ color: 0xffa07a }),
];

const starShapeVertices: number[] = [];

//stars初期化
const minPosition = -(boxWidth / 2);
const maxPosition = boxWidth / 2;

const minScale = 1;
const maxScale = 3;

// const minSpeed = 0.05;
// const maxSpeed = 0.2;
const minSpeed = 0.01;
const maxSpeed = 0.05;

const stars = Array.from({ length: starCount }, () => ({

  position: [randomNum(minPosition, maxPosition), randomNum(minPosition, maxPosition), randomNum(minPosition, maxPosition)],
  moveSpeed: randomNum(minSpeed, maxSpeed),

  // rotation: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
  rotation: [0, 0, 0],
  rollSpeed: [randomNum(minSpeed, maxSpeed) / 5, randomNum(minSpeed, maxSpeed) / 5, randomNum(minSpeed, maxSpeed) / 5],

  scale: [randomNum(minScale, maxScale), randomNum(minScale, maxScale), randomNum(minScale, maxScale) * 2],

  // color: colors[Math.floor(Math.random() * colors.length)]
  material: materialColors[Math.floor(Math.random() * materialColors.length)]

}));

// const model = nodes['star'];

const createColoredModel = (material: MeshPhongMaterial): Mesh => {
  const model = nodes['star'].clone() as Mesh;
  model.material = material;
  return model;
};

const starRadius = 50;
const starPoints = 5;

for (let i = 0; i < starPoints * 2; i++) {
  const angle = (i * Math.PI) / starPoints;
  const radius = i % 2 === 0 ? starRadius : starRadius / 2;
  starShapeVertices.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
}

onMounted(() => {

  if (!cameraRef.value) return
  if (!spotLightRef.value) return

  // spotLightRef.value.position.copy(cameraRef.value.position);
  // spotLightRef.value.intensity = 10;
  // spotLightRef.value.angle = Math.PI / 4;
  // spotLightRef.value.distance = 50;

  // const targetPosition = new Vector3();
  // cameraRef.value.getWorldDirection(targetPosition);

  // // ターゲットの位置をカメラの位置から遠ざけるために適切なスカラー値を使用
  // const distanceFactor = 10; // 適切な距離に調整
  // spotLightRef.value.target.position.copy(cameraRef.value.position).add(targetPosition.multiplyScalar(distanceFactor));

  // // ターゲットの位置が更新されたことを通知
  // spotLightRef.value.target.updateMatrixWorld();

});

const { onLoop } = useRenderLoop()
let loopCount = 0
onLoop(({ }) => {
  if (!starsRef.value) return
  let count = 0
  for (const star of starsRef.value.children) {
    //各星の設定取得
    const starA = stars[count]

    //回転
    star.rotation.x += starA.rollSpeed[0];
    star.rotation.y += starA.rollSpeed[1];
    star.rotation.z += starA.rollSpeed[2];

    //移動
    star.position.y -= starA.moveSpeed;

    //一番下までいったら上に移動
    if (star.position.y <= minPosition) star.position.y = maxPosition;

    count++

  }
  // if (cameraRef.value && spotLightRef.value) {

  //   // カメラの位置をスポットライトに同期
  //   spotLightRef.value.position.copy(cameraRef.value.position);

  //   // カメラの向きに基づいてターゲットを設定
  //   const targetPosition = new Vector3();
  //   cameraRef.value.getWorldDirection(targetPosition);

  //   // ターゲットの位置をカメラの位置から遠ざけるために適切なスカラー値を使用
  //   const distanceFactor = 10; // 適切な距離に調整
  //   spotLightRef.value.target.position.copy(cameraRef.value.position).add(targetPosition.multiplyScalar(distanceFactor));

  //   // ターゲットの位置が更新されたことを通知
  //   spotLightRef.value.target.updateMatrixWorld();

  //   loopCount++
  //   if (loopCount > 1) return
  //   // デバッグ用にコンソール出力
  //   console.log("cameraRef :", cameraRef.value);
  //   console.log("SpotLight :", spotLightRef.value);
  //   console.log("SpotLight Target:", spotLightRef.value.target.position);

  // }

});

//////////////////////////////////////////////
// クリックした場所に星を表示する処理
/////////////////////////////////////////////
function clickScreen(ray: Intersection) {

  if (!starsRef.value) return

  console.log('clickScreen ray', ray)
  console.log('clickScreen ray.point', ray.point)
  console.log('clickScreen_starsRef', starsRef.value)

  console.log('clickScreen_cameraRef', cameraRef.value)
  console.log('clickScreen_spotLightRef', spotLightRef.value)

  if (startAnimation.value) {
    starsVisible.value = true;
    startAnimation.value = false
  }

  // const scaleFactor = 1.0; // スケーリング値を調整
  // const starRandom = 5; //表示位置のバラつき 

  // const scalePointX = ray.point.x * scaleFactor
  // const scalePointY = (ray.point.y - 1) * scaleFactor

  console.log('3D空間のクリック位置', ray.point);

  // // クリック位置の周辺に星を配置
  // for (let i = 0; i < starCount / 2; i++) {
  //   const index = i % (starShapeVertices.length / 3);
  //   starVertices[i * 3] = randomNum(scalePointX - starRandom, scalePointX + starRandom) + starShapeVertices[index * 3];
  //   starVertices[i * 3 + 1] = randomNum(scalePointY - starRandom, scalePointY + starRandom) + starShapeVertices[index * 3 + 1];
  //   starVertices[i * 3 + 2] = 0;
  // }

  // starPoint.value.geometry.setAttribute('position', new BufferAttribute(starVertices, 3));

}

</script>

<style scoped>
.enter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2vw;
  /* color: #041A25; */
}
</style>