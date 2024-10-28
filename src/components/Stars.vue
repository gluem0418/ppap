<script setup lang="ts">

import { ref, onMounted, onUnmounted } from 'vue';

import { TresCanvas, TresVector3, useRenderLoop } from '@tresjs/core'

import { OrbitControls, ScrollControls, useGLTF, Text3D, MeshWobbleMaterial, Html } from '@tresjs/cientos'

import { PerspectiveCamera, Vector3, BackSide, Group, Intersection, MeshPhongMaterial, Mesh } from 'three'

import Config from '@/Config.ts'

import AppList from '@/components/AppList.vue';
import About from '@/components/About.vue';

import BtnMenu from '@/components/flame/BtnMenu.vue';

const { nodes } = await useGLTF('model/star.glb', { draco: true })

/////////////////////////////////////////////
// シーンの初期設定
/////////////////////////////////////////////
const cameraRef = ref<PerspectiveCamera | null>(null);

// const initCameraPosition: TresVector3 = new Vector3(0, 0, 50);  // カメラの初期位置
// const initCameraLookAt: Vector3 = new Vector3(0, 0, 10)
const initCameraPosition: TresVector3 = new Vector3(0, 50, 50);  // カメラの初期位置
const initCameraLookAt: Vector3 = new Vector3(0, 50, 0)

const AppPosition: Vector3 = new Vector3(-50, 50, 0);    // Application要素の配置位置
const RelayPosition: Vector3 = new Vector3(50, 50, -50);    // 中継地点
const AboutPosition: Vector3 = new Vector3(50, -50, -50);    // Application要素の配置位置

const starsRef = ref<Group | null>(null);
const titleRef = ref<InstanceType<typeof Text3D> | null>(null);
const titlePosition = ref([0, 4, -3]);

// const cameraDistance = 10

const starCount = 1000;
// const boxWidth = 150;
const boxWidth = 200;

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


const scrollLimitCam = 0.1 // カメラの向き調整
const scrollLimitApp = 0.4 // Appへのスクロール閾値
const scrollLimitRelay = 0.6 // 中継地点へのスクロール閾値
const scrollLimitAbout = 0.9;  // Aboutへのスクロール閾値
// const scrollLimitCam = 200 // カメラの向き調整
// const scrollLimitApp = 1000 // Appへのスクロール閾値
// const scrollLimitAbout = 2000;  // Aboutへのスクロール閾値

// let targetPosition: Vector3;
let targetPosition = initCameraPosition;
let targetLookAt = new Vector3();
// targetLookAt.lerp(initCameraLookAt, 0.1); // カメラの向きを変更
targetLookAt.copy(initCameraLookAt); // カメラの向きを変更
let progress = 0

const handleScroll = () => {

  if (!cameraRef.value) return

  progress = window.scrollY / document.body.scrollHeight

  //カメラの移動ターゲットを設定
  if (progress < scrollLimitApp) {
    // console.log('handleScroll_scrollApp')
    // progressが0からscrollLimitAppまではAppPositionに近づける
    const interpProgress = progress / scrollLimitApp;
    targetPosition = calculatePosition(initCameraPosition, AppPosition, interpProgress)
    // targetPosition = AppPosition.clone().lerp(initCameraPosition, 1 - interpProgress); // 初期位置とAppPosition間の補間
    // targetPosition.lerp(initCameraPosition, 1 - interpProgress); // 初期位置とAppPosition間の補間
    // targetLookAt = progress.value < scrollLimitCam ? initCameraLookAt : AppPosition
    if (progress > scrollLimitCam) {
      targetLookAt.lerp(AppPosition, 0.1); // カメラの向きを変更
    } else {
      targetLookAt.lerp(initCameraLookAt, 0.1); // カメラの向きを変更
      // targetLookAt.lerp(AboutPosition, 0.1); // カメラの向きを変更
      // targetLookAt.copy(initCameraLookAt); // カメラの向きを変更
    }
  } else if (progress >= scrollLimitApp && progress <= scrollLimitAbout) {
    // progressがscrollLimitAppからscrollLimitAboutまではAppPositionからAboutPositionに移動
    const interpProgress = (progress - scrollLimitApp) / (scrollLimitAbout - scrollLimitApp);
    // const interpProgress = progress / scrollLimitAbout
    // console.log('handleScroll_interpProgress', interpProgress)
    targetPosition = calculatePosition(AppPosition, AboutPosition, interpProgress)
    // targetPosition = AppPosition.clone().lerp(AboutPosition, interpProgress); // AppPositionからAboutPosition間の補間
    targetLookAt.lerp(AboutPosition, 0.1); // カメラの向きを変更
    // targetLookAt = AboutPosition; // カメラの向きを変更
  }

  // console.log('handleScroll_progress', progress)
  // console.log('handleScroll_targetPosition', targetPosition)
  // console.log('handleScroll_targetLookAt', targetLookAt)

};

const calculatePosition = (start: Vector3, end: Vector3, progress: number): Vector3 => {
  // console.log('calculatePositio', 'start', start, 'end', end, 'progress', progress)
  const interpolated = new Vector3();
  interpolated.lerpVectors(start, end, progress);
  return interpolated;
};

//アニメーションレンタリング
const { onLoop } = useRenderLoop()
onLoop(({ }) => {

  if (!starsRef.value) return
  if (!cameraRef.value) return
  if (!titleRef.value) return

  // カメラの位置と向きを設定
  cameraRef.value.position.copy(targetPosition);
  cameraRef.value.lookAt(targetLookAt);

  // console.log('cameraPosition', cameraRef.value.position, 'targetLookAt', targetLookAt, 'progress', progress.value)

  // カメラの位置と方向をprogressの値に基づき算出
  // if (progress.value < scrollLimitApp) {
  //   const interpProgress = progress.value / scrollLimitApp;
  //   const targetPosition = calculatePosition(cameraRef.value.position, AppPosition.value, interpProgress);
  //   cameraRef.value.position.lerp(targetPosition, 0.05);  // スムーズな遷移
  //   cameraRef.value.lookAt(AppPosition.value);  // AppPositionへ向く
  // } else if (progress.value >= scrollLimitApp && progress.value < scrollLimitAbout) {
  //   const interpProgress = (progress.value - scrollLimitApp) / (scrollLimitAbout - scrollLimitApp);
  //   const targetPosition = calculatePosition(AppPosition.value, AboutPosition.value, interpProgress);
  //   cameraRef.value.position.lerp(targetPosition, 0.05);
  //   cameraRef.value.lookAt(AboutPosition.value);  // AboutPositionへ向く
  // }

  // if (progress.value < scrollLimitApp) {
  //   targetPosition = AppPosition.value
  //   targetLookAt = AppPosition.value;
  //   // cameraLookat.value = AppPosition.value;
  // } else if (progress.value >= scrollLimitApp && progress.value < scrollLimitAbout) {
  //   targetPosition = AboutPosition.value;
  //   targetLookAt = AboutPosition.value;
  //   // cameraLookat.value = AboutPosition.value;
  // }

  // // cameraRef.value.position.lerp(targetPosition, 0.05 * progress.value);
  // cameraRef.value.position.lerp(targetPosition, 0.05);  // 0.05はスムーズに移行する速度
  // cameraRef.value.lookAt(targetLookAt);

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

  //タイトルのアニメーション(スクロール基準)
  const scroll = window.scrollY
  // // //位置の更新
  titleRef.value.instance.position.x = (scroll / 600)
  titleRef.value.instance.position.y = 4 - (scroll / 400)
  titleRef.value.instance.position.z = (scroll / 300) - 3

  // // //回転の更新
  titleRef.value.instance.rotation.x = (scroll / 200) - 0.005;

});

//////////////////////////////////////////////
// 画面を最初にクリックした際の処理
/////////////////////////////////////////////
function clickScreen() {
  console.log('clickScreen')
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

  // console.log('clickScreen_cameraRef', cameraRef.value!.position)
  console.log('clickScreen_title', titleRef.value!)

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

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});


</script>

<template>
  <div class="tresBg">

    <!-- <div class="tresBg" @click="clickScreen"> -->
    <TresCanvas>
      <!-- <TresPerspectiveCamera ref="cameraRef" :look-at="cameraLookat" :position="[0, 0, 50]" /> -->
      <!-- <TresPerspectiveCamera ref="cameraRef" :look-at="initCameraLookAt" :position="initCameraPosition" /> -->
      <TresPerspectiveCamera ref="cameraRef"/>
      
      <!-- <OrbitControls :max-distance="boxWidth / 2" :enableZoom="false" :enableDamping="true" :dampingFactor="0.2" /> -->
      <!-- <OrbitControls :max-distance="boxWidth / 2" /> -->

      <TresAmbientLight :intensity="3" />
      <TresDirectionalLight :position="[boxWidth / 2, boxWidth, 0]" :intensity="5" />

      <!-- <ScrollControls v-model="progress" :pages="5" :smooth-scroll="0.1" class="scrollControls"/> -->
      <!-- <ScrollControls v-model="progress" :pages="5" :distance="0" :smooth-scroll="0.1"> -->
      <!-- <ScrollControls v-model="progress" :distance="0" :smooth-scroll="0.1" htmlScroll /> -->

      <TresMesh @click="clickScreen">
        <!-- <TresMesh> -->
        <TresBoxGeometry :args="[boxWidth, boxWidth, boxWidth]" />
        <TresMeshBasicMaterial :transparent="true" :opacity="0" :side="BackSide" />
      </TresMesh>

      <Suspense>
        <Text3D ref="titleRef" :text="Config.title" font="font/Marvel_Bold.json" :size="1" :position="titlePosition">
          <MeshWobbleMaterial :color="0xA8B8DC" :speed="0.5" :factor="0.5" />
        </Text3D>
      </Suspense>

      <TresGroup :visible='starsVisible' ref="starsRef">
        <primitive v-for="star in stars" :key="star" :position="star.position" :rotation="star.rotation"
          :scale="star.scale" :object="createColoredModel(star.material)" @click="clickStar" />
      </TresGroup>

      <Html center transform :position="AppPosition" :rotation="[0.3, 0, 0]">
      <AppList />

      </Html>

      <Html center transform :position="AboutPosition">
      <About />

      </Html>
      <!-- </ScrollControls> -->

    </TresCanvas>


    <div v-if="starsVisible" class="message">{{ Config.msgMain1 }}</div>
    <div class="menu">

      <BtnMenu class="menu1" :inside="Config.mainMenu1" />
      <BtnMenu class="menu2" :inside="Config.mainMenu2" />

    </div>

    <div v-if="startAnimation" class="enter">{{ Config.msgEnter }}</div>

  </div>

</template>

<style scoped>
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

/* .tresBg {
  width: 100%;
  height: 800%;
} */

.message {
  position: absolute;
  top: 1%;
  right: 1%;
  font-size: 20px;
  font-family: "Marvel-Bold";
}

.menu {
  position: absolute;
  top: 45px;
  right: 1%;
  height: auto;
  z-index: 1;
}

.menu2 {
  margin-top: 20px;
}

.enter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-size: 24px;
  font-family: "Marvel-Bold";
}
</style>