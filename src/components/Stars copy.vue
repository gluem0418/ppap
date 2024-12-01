<script setup lang="ts">

import { ref, onMounted, onUnmounted, watch } from 'vue';

import { TresCanvas, TresVector3, useRenderLoop } from '@tresjs/core'

// import { OrbitControls, ScrollControls, useGLTF, Text3D, MeshWobbleMaterial, Html } from '@tresjs/cientos'
import { useGLTF, Text3D, MeshWobbleMaterial } from '@tresjs/cientos'

import { PerspectiveCamera, Vector3, Group, Intersection, Mesh, MeshPhongMaterial, Raycaster, Vector2 } from 'three'

import Config from '@/Config.ts'

// import AppList from '@/components/AppList.vue';
// import About from '@/components/About.vue';
// import BtnMenu from '@/components/flame/BtnMenu.vue';

const props = defineProps({
  progress: { type: Number },
  starsVisible: { type: Boolean },
});

const { nodes } = await useGLTF('model/star.glb', { draco: true })

/////////////////////////////////////////////
// シーンの初期設定
/////////////////////////////////////////////
const cameraRef = ref<PerspectiveCamera | null>(null);

const initCameraPosition: TresVector3 = new Vector3(0, 0, 30);  // カメラの初期位置 
const initCameraLookAt: Vector3 = new Vector3(0, 0, 10)

const RelayPosition1: Vector3 = new Vector3(-30, 0, 30);    // 中継地点1
const AppTitlePosition: Vector3 = new Vector3(-30, 29.5, 1);    // Applicationの配置位置
const AppPosition: Vector3 = new Vector3(-30, 30, 0);    // Application要素の配置位置
const RelayPosition2: Vector3 = new Vector3(0, 30, -30);    // 中継地点2
const AboutTitlePosition: Vector3 = new Vector3(27.5, 3, -30);    // Aboutの配置位置
const AboutPosition: Vector3 = new Vector3(30, 0, -30);    // About要素の配置位置

const starsRef = ref<Group | null>(null);
const titleRef = ref<InstanceType<typeof Text3D> | null>(null);
const titleRotation = ref([0, 0, 0]);
const initTitlePosition: Vector3 = new Vector3(0, 4.2, 18);    // タイトルの初期位置
const endTitlePosition: Vector3 = new Vector3(-7.4, -5, 20);    // タイトルの最終位置
const endTitleRotation = [-2.1, 0.5, 2.55]

const scrollLimitRelay1 = 0.1 // 中継地点へのスクロール閾値
const scrollLimitApp = 0.32 // Appへのスクロール閾値
const scrollLimitRelay2 = 0.5 // 中継地点へのスクロール閾値
const scrollLimitAbout = 0.75;  // Aboutへのスクロール閾値

// const starCount = 1000;
const starCount = 750;
const boxWidth = 150;

//minからmaxまでのランダムな値を返す
const randomNum = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const materialColors = [
  // new MeshPhongMaterial({ color: 0xFDF5D3 }), //レモンホワイト
  // new MeshPhongMaterial({ color: 0xFFE98C }), //薄い黄色
  // new MeshPhongMaterial({ color: 0xFEDB45 }), //黄色
  new MeshPhongMaterial({ color: 0xFFF9E0 }), //レモンホワイト
  new MeshPhongMaterial({ color: 0xFFE98C }), //薄い黄色
  new MeshPhongMaterial({ color: 0x8cf9ff }), //薄い青
  // new MeshStandardMaterial({ color: 0xFFF9E0, roughness: 0 }), //レモンホワイト
  // new MeshStandardMaterial({ color: 0xFFE98C, roughness: 0 }), //薄い黄色
  // new MeshStandardMaterial({ color: 0x8cf9ff, roughness: 0 }), //薄い青
  // new MeshStandardMaterial({ color: 0xFFF9E0 }), //レモンホワイト
  // new MeshStandardMaterial({ color: 0xFFE98C }), //薄い黄色
  // new MeshStandardMaterial({ color: 0x8cf9ff }), //薄い青
];

const starShapeVertices: number[] = [];

//stars初期化
const minPosition = -(boxWidth / 2);
const maxPosition = boxWidth / 2;

const minScale = 1;
const maxScale = 3;

const minSpeed = 0.01;
const maxSpeed = 0.05;

const stars = Array.from({ length: starCount }, () => ({

  position: [randomNum(minPosition, maxPosition), randomNum(minPosition, maxPosition), randomNum(minPosition, maxPosition)],
  moveSpeed: randomNum(minSpeed, maxSpeed),

  rotation: [0, 0, 0],
  rollSpeed: [randomNum(minSpeed, maxSpeed) / 5, randomNum(minSpeed, maxSpeed) / 5, randomNum(minSpeed, maxSpeed) / 5],

  scale: [randomNum(minScale, maxScale), randomNum(minScale, maxScale), randomNum(minScale, maxScale) * 2],

  material: materialColors[Math.floor(Math.random() * materialColors.length)]

}));

const createColoredModel = (material: MeshPhongMaterial): Mesh => {
  // const createColoredModel = (material: MeshStandardMaterial): Mesh => {
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

let targetPosition = initCameraPosition;
let targetLookAt = initCameraLookAt.clone();

let targetTitle = initTitlePosition;
// let progress = 0
const progress = ref(0); // スクロール率

// let scrollableHeight = 0

watch(() => props.progress,
  (newProgress) => {
    if (newProgress) scrollAction(newProgress)
  }, { immediate: true }
);

// const handleScroll = () => {
const scrollAction = (progress: number) => {

  if (!cameraRef.value) return

  // progress = window.scrollY / scrollableHeight

  //カメラの移動ターゲットを設定
  if (progress < scrollLimitRelay1) {
    const interpProgress = progress / scrollLimitApp;
    targetPosition = calculatePosition(initCameraPosition, RelayPosition1, interpProgress)
    targetLookAt.lerp(initCameraLookAt, 0.5);
    targetTitle = initTitlePosition;
    titleRotation.value = [0, 0, 0]
  } else if (progress >= scrollLimitRelay1 && progress <= scrollLimitApp) {
    const interpProgress = (progress - scrollLimitRelay1) / (scrollLimitApp - scrollLimitRelay1);
    targetPosition = calculatePosition(RelayPosition1, AppPosition, interpProgress)
    targetLookAt.lerp(AppPosition, 0.1);
  } else if (progress >= scrollLimitApp && progress <= scrollLimitRelay2) {
    const interpProgress = (progress - scrollLimitApp) / (scrollLimitRelay2 - scrollLimitApp);
    targetPosition = calculatePosition(AppPosition, RelayPosition2, interpProgress)
    targetLookAt.lerp(RelayPosition2, 0.001);
  } else if (progress >= scrollLimitRelay2 && progress < scrollLimitAbout) {
    const interpProgress = (progress - scrollLimitRelay2) / (scrollLimitAbout - scrollLimitRelay2);
    targetPosition = calculatePosition(RelayPosition2, AboutPosition, interpProgress)
    targetLookAt.lerp(AboutPosition, 0.1);
    // targetLookAt.lerp(AboutPosition, 0.05);
  } else if (progress >= scrollLimitAbout) {
    targetPosition.lerp(initCameraLookAt, 0.1);
    targetLookAt.lerp(initCameraLookAt, 0.5);

    targetTitle = endTitlePosition;
    titleRotation.value = endTitleRotation
  }

  console.log('window.scrollY', window.scrollY, 'progress', progress)
  console.log('cameraPosition', cameraRef.value.position, 'targetPosition', targetPosition, 'targetLookAt', targetLookAt)

  cameraRef.value.position.copy(targetPosition);
  cameraRef.value.lookAt(targetLookAt);
  titleRef.value?.instance.position.copy(targetTitle)

};

const calculatePosition = (start: Vector3, end: Vector3, progress: number): Vector3 => {
  // console.log('calculatePositio', 'start', start, 'end', end, 'progress', progress)
  const interpolated = new Vector3();
  interpolated.lerpVectors(start, end, progress);
  return interpolated;
};

// アニメーションレンタリング
const { onLoop } = useRenderLoop()
onLoop(({ }) => {

  if (!starsRef.value) return
  if (!cameraRef.value) return
  if (!titleRef.value) return

  let count = 0
  //各星のアニメーション
  for (const star of starsRef.value.children) {
    if (count >= starCount) return
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

});


//////////////////////////////////////////////
// クリックした場所に星を表示する処理
/////////////////////////////////////////////
const starRandom = 1.5; //表示位置のバラつき 
// function clickStar(ray: Intersection) {
function clickStar(point: Vector3) {

  if (!starsRef.value) return

  // console.log('clickScreen ray', ray)
  console.log('clickStar point', point)
  // console.log('clickScreen_starsRef', starsRef.value)

  // クリック位置の周辺に星を配置
  let count = 0;
  for (const star of starsRef.value.children) {
    //星の半分を集める
    if (count > (starCount / 10)) return;

    const index = count % (starShapeVertices.length / 3);

    star.position.x = randomNum(point.x - starRandom, point.x + starRandom) + starShapeVertices[index * 3];
    star.position.y = randomNum(point.y - starRandom, point.y + starRandom) + starShapeVertices[index * 3 + 1];
    star.position.z = randomNum(point.z - starRandom, point.z + starRandom) + starShapeVertices[index * 3 + 2];

    count++

  }

}


// function clickDounuts(ray: Intersection) {
//   console.log('clickDounuts ray.point', ray.point)
// }

const raycaster = new Raycaster();
const pointer = new Vector2();

const onPointerDown = (event: Event) => {
  const pointerEvent = event as PointerEvent;
  console.log('onPointerDown_event', event)
  // スクリーン座標を Three.js の正規化座標に変換
  const canvas = pointerEvent.target as HTMLCanvasElement;
  pointer.x = (pointerEvent.clientX / canvas.offsetWidth) * 2 - 1;
  pointer.y = -(pointerEvent.clientY / canvas.offsetHeight) * 2 + 1;

  // レイキャストを実行
  raycaster.setFromCamera(pointer, cameraRef.value!);
  const intersects = raycaster.intersectObjects(starsRef.value!.children, true);

  if (intersects.length > 0) {
    const clickedStar = intersects[0].object;
    console.log('onPointerDown_clickedStar', clickedStar)
    clickStar(clickedStar.position);
  }
};


onMounted(() => {
  const canvas = document.querySelector(".Stars");
  if (canvas) canvas.addEventListener("pointerdown", onPointerDown);
});

onUnmounted(() => {
  window.removeEventListener("pointerdown", onPointerDown);
});


</script>

<template>
  <!-- <div @click="clickScreen"> -->

  <!-- <div class="tresBg" @click="clickScreen"> -->

  <!-- <TresCanvas window-size touch-action="auto" pointer-events="auto"> -->
  <TresCanvas>

    <TresPerspectiveCamera ref="cameraRef" :position="initCameraPosition" />

    <!-- <TresMesh @pointer-down="(event) => console.log('pointer-down')">
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh> -->

    <Suspense>
      <Text3D ref="titleRef" :text="Config.title" font="font/Marvel_Regular.json" :size="1" :position="initTitlePosition"
        :rotation="titleRotation">
        <MeshWobbleMaterial :color="0xFFFFE0" :speed="0.5" :factor="0.5" />
      </Text3D>
    </Suspense>

    <Suspense>
      <Text3D :text="Config.mainMenu1" font="font/Marvel_Regular.json" :size="1" :position="AppTitlePosition"
        :rotation="[0.7, 0, 0.3]">
        <MeshWobbleMaterial :color="0xFFFFE0" :speed="0.5" :factor="0.5" />
      </Text3D>
    </Suspense>

    <Suspense>
      <!-- <Text3D :text="Config.mainMenu2" font="font/Marvel_Regular.json" :size="1" :position="AboutTitlePosition"
        :rotation="[1.6, -2.3, 2]"> -->
      <Text3D :text="Config.mainMenu2" font="font/Marvel_Regular.json" :size="1" :position="AboutTitlePosition"
        :rotation="[1.6, -2.3, 1.9]">
        <MeshWobbleMaterial :color="0xfbf5e9" :speed="0.5" :factor="0.5" />
      </Text3D>
    </Suspense>

    <TresGroup :visible='starsVisible' ref="starsRef">
      <!-- <primitive v-for="star in stars" :key="star" :position="star.position" :rotation="star.rotation"
        :scale="star.scale" :object="createColoredModel(star.material)" @click="clickStar" @pointer-down="clickStar" /> -->
      <primitive v-for="star in stars" :key="star" :position="star.position" :rotation="star.rotation" :scale="star.scale"
        :object="createColoredModel(star.material)" />
    </TresGroup>

    <!-- </ScrollControls> -->

    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight :position="[0, boxWidth / 2, boxWidth / 2]" :intensity="4" />

  </TresCanvas>

  <!-- </div> -->
</template>

<style scoped></style>