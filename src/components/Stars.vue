<template>
  <TresCanvas>

    <TresPerspectiveCamera ref="cameraRef" :position="[0, 0, cameraDistance]" />
    <OrbitControls :max-distance="boxWidth / 2" :enableZoom="false" :enableDamping="true" :dampingFactor="0.2" />

    <TresAmbientLight :intensity="3" />

    <TresDirectionalLight :position="[boxWidth / 2, boxWidth, 0]" :intensity="5" />

    <TresMesh @click="clickScreen">
      <TresBoxGeometry :args="[boxWidth, boxWidth, boxWidth]" />
      <TresMeshBasicMaterial :transparent="true" :opacity="0" :side="BackSide" />
    </TresMesh>

    <Suspense>
      <Text3D ref="titleRef" :text="Config.title" font="font/Marvel_Bold.json" :size="1" :position="titlePosition">
        <MeshWobbleMaterial :color="0xA8B8DC" :speed="0.5" :factor="0.5" />
      </Text3D>
    </Suspense>

    <TresGroup :visible='starsVisible' ref="starsRef">
      <primitive v-for="star in stars" :key="star" :position="star.position" :rotation="star.rotation" :scale="star.scale"
        :object="createColoredModel(star.material)" @click="clickStar" />
    </TresGroup>

  </TresCanvas>

  <div v-if="starsVisible" class="message">{{ Config.msgMain1 }}</div>

  <div v-if="startAnimation" class="enter">{{ Config.msgEnter }}</div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

import { TresCanvas, useRenderLoop } from '@tresjs/core'

import { OrbitControls, useGLTF, Text3D, MeshWobbleMaterial } from '@tresjs/cientos'

import { PerspectiveCamera, BackSide, Group, Intersection, MeshPhongMaterial, Mesh } from 'three'

import Config from '@/Config.ts'

const { nodes } = await useGLTF('model/star.glb', { draco: true })

/////////////////////////////////////////////
// シーンの初期設定
/////////////////////////////////////////////
const cameraRef = ref<PerspectiveCamera | null>(null);
const starsRef = ref<Group | null>(null);
const titleRef = ref<InstanceType<typeof Text3D> | null>(null);
const titlePosition = ref([0, 4, -3]);

const cameraDistance = 10

const starCount = 1000;
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

const createColoredModel = (material: MeshPhongMaterial): Mesh => {
  const model = nodes['star'].clone() as Mesh;
  model.material = material;
  return model;
};

const starRadius = 10;
const starPoints = 5;

for (let i = 0; i < starPoints * 2; i++) {
  const angle = (i * Math.PI) / starPoints;
  const radius = i % 2 === 0 ? starRadius : starRadius / 2;
  starShapeVertices.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
}

//アニメーションレンタリング
const { onLoop } = useRenderLoop()
onLoop(({ }) => {

  if (!starsRef.value) return
  if (!cameraRef.value) return
  if (!titleRef.value) return

  let count = 0
  //各星のアニメーション
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

  // //タイトルのアニメーション(カメラ位置基準)
  // const position = cameraRef.value.position.z

  // //位置の更新
  // titleRef.value.instance.position.x = (position / 20) - 0.5
  // titleRef.value.instance.position.y = 6 - (position / 8.8)
  // titleRef.value.instance.position.z = (position * 1.1) - 15

  // //回転の更新
  // titleRef.value.instance.rotation.x = (position / 12) - 1;

  //タイトルのアニメーション(スクロール基準)
  const scroll = window.scrollY
  // // //位置の更新
  titleRef.value.instance.position.x = (scroll / 100)
  titleRef.value.instance.position.y = 4 - (scroll / 70)
  titleRef.value.instance.position.z = (scroll / 70) - 3

  // // //回転の更新
  titleRef.value.instance.rotation.x = (scroll / 200) - 0.005;

});

//////////////////////////////////////////////
// 画面を最初にクリックした際の処理
/////////////////////////////////////////////
function clickScreen() {
  if (startAnimation.value) {
    starsVisible.value = true;
    startAnimation.value = false
  }
}

//////////////////////////////////////////////
// クリックした場所に星を表示する処理
/////////////////////////////////////////////
const starRandom = 1.5; //表示位置のバラつき 
function clickStar(ray: Intersection) {

  if (!starsRef.value) return

  console.log('clickScreen ray', ray)
  console.log('clickScreen ray.point', ray.point)
  console.log('clickScreen_starsRef', starsRef.value)

  console.log('clickScreen_cameraRef', cameraRef.value!.position)
  console.log('clickScreen_title', titleRef.value!)

  // console.log('clickScreen_cameraRef', cameraRef.value)
  // console.log('clickScreen_spotLightRef', spotLightRef.value)

  console.log('3D空間のクリック位置', ray.point);

  // クリック位置の周辺に星を配置
  let count = 0;
  for (const star of starsRef.value.children) {
    //星の半分を集める
    if (count > (starCount / 10)) return;

    const index = count % (starShapeVertices.length / 3);

    //各星の位置を更新
    star.position.x = randomNum(ray.point.x - starRandom, ray.point.x + starRandom) + starShapeVertices[index * 3];
    star.position.y = randomNum(ray.point.y - starRandom, ray.point.y + starRandom) + starShapeVertices[index * 3 + 1];
    star.position.z = randomNum(ray.point.z - starRandom, ray.point.z + starRandom) + starShapeVertices[index * 3 + 2];

    count++

  }

}

</script>

<style scoped>
.message {
  position: absolute;
  top: 1%;
  right: 1%;
  font-size: 20px;
}

.enter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-size: 24px;
}
</style>