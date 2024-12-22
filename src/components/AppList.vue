<script setup lang="ts">

import { ref, nextTick } from 'vue'
import anime from 'animejs';

import Application from '@/class/Application.ts';
import { applications } from '@/class/Application.ts';

import AppDetail from '@/components/AppDetail.vue';

import Config from '@/Config.ts';


//サムネイル画像クリック時の処理
const selectedIndex = ref<number | undefined>(undefined);
const selectedApp = ref<Application | undefined>(undefined);
const showApp = ref<boolean>(false);

function clickApp(app: Application, index: number) {
  showApp.value = true;
  selectedIndex.value = index;
  selectedApp.value = app;
  document.body.style.overflow = 'hidden'; // スクロールを無効にする
  nextTick(() => {
    // 詳細表示のアニメーション
    anime({
      targets: '.AppDetail',
      translateY: [window.innerHeight * -1, 0],
      // opacity: [0, 1],
      scale: [0, 1],
      duration: 500,
      easing: 'easeOutCubic' // 加減速の種類
    });
  });
  // console.log('clickApp', selectedIndex.value, app.id, showApp.value)
}

function closeAppDetail() {
  //詳細表示をフェードアウト
  anime({
    targets: '.AppDetail',
    translateY: [0, window.innerHeight],
    // opacity: [1, 0],
    scale: [1, 0],
    duration: 500,
    easing: 'easeInCubic' // 加減速の種類
  });
  setTimeout(() => {
    showApp.value = false;
    document.body.style.overflow = ''; // スクロールを有効に戻す
  }, 500);
}

const changeApp = (selectType: string, index: number) => {

  if (selectType == 'next') {
    //左にフェードアウト
    fadeInOut('leftOut')
    setTimeout(() => {
      selectedIndex.value = selectedIndex.value == applications.length - 1 ? 0 : selectedIndex.value! + 1
      selectedApp.value = applications[selectedIndex.value]
      // 右からフェードイン
      fadeInOut('rightIn')
    }, 300);
  } else if (selectType == 'prev') {
    //右にフェードアウト
    fadeInOut('rightOut')
    setTimeout(() => {
      selectedIndex.value = selectedIndex.value == 0 ? applications.length - 1 : selectedIndex.value! - 1
      selectedApp.value = applications[selectedIndex.value]
      // 左からフェードイン
      fadeInOut('leftIn')
    }, 300);
  } else if (selectType == 'select') {
    // if (!selectedIndex.value) return
    console.log('changeApp', 'selectedIndex.value', selectedIndex.value, 'index', index)
    if (selectedIndex.value! < index) {
      //左にフェードアウト
      fadeInOut('leftOut')
      setTimeout(() => {
        // 右からフェードイン
        fadeInOut('rightIn')
        selectedIndex.value = index
        selectedApp.value = applications[index]
      }, 300);
    } else if (selectedIndex.value! > index) {
      //右にフェードアウト
      fadeInOut('rightOut')
      setTimeout(() => {
        selectedIndex.value = index
        selectedApp.value = applications[index]
        // 左からフェードイン
        fadeInOut('leftIn')
      }, 300);
    }
  }
}

function fadeInOut(kind: string) {

  switch (kind) {
    case 'leftOut':
      anime({
        targets: '.AppDetail',
        translateX: [0, window.innerWidth * -1.5],
        opacity: [1, 0.3],
        duration: 500,
        easing: 'easeInCubic' // 加減速の種類
      });
      break;
    case 'rightIn':
      anime({
        targets: '.AppDetail',
        translateX: [window.innerWidth * 1.5, 0],
        opacity: [0.3, 1],
        duration: 500,
        easing: 'easeOutCubic' // 加減速の種類
      });
      break;
    case 'rightOut':
      anime({
        targets: '.AppDetail',
        translateX: [0, window.innerWidth * 1.5],
        opacity: [1, 0.3],
        duration: 500,
        easing: 'easeInCubic' // 加減速の種類
      });
      break;
    case 'leftIn':
      anime({
        targets: '.AppDetail',
        translateX: [window.innerWidth * -1.5, 0],
        opacity: [0.3, 1],
        duration: 500,
        easing: 'easeOutCubic' // 加減速の種類
      });
      break;
    default:
  }

}

</script>

<template>
  <div class="compAppList" id="application">

    <div class="appList">

      <div class="title"> {{ Config.mainMenu1 }} </div>

      <div class="message"> {{ Config.msgAppList }} </div>

      <div class="listFlame">

        <div v-for="(app, index) in applications" :key="index" class="appCard" @click="clickApp(app, index)">

          <img :src="app.thumbnail" alt="app.id" class="thumbnail" />

          <div class="appTitle"> {{ app.id }} </div>

        </div>

      </div>

    </div>

    <AppDetail class="AppDetail" :app="selectedApp" :index="selectedIndex" :show="showApp" v-show="showApp"
      @close="closeAppDetail" @change="changeApp" />
    <!-- <AppDetail class="AppDetail" :app="selectedApp" :index="selectedIndex" :show="showApp" v-if="showApp"
      @close="closeAppDetail" @change="changeApp" /> -->

  </div>
</template>

<style scoped>
.compAppList {
  position: relative;
}

.appList {
  height: auto;
  /* background: linear-gradient(to bottom, #243B66, #3076A3 40%, #243B66); */
  background: linear-gradient(to bottom, #243B66, #3076A3, #243B66);
  /* background:#021D34; */
  /* background: rgba(2, 29, 52, 0.9); */
  /* background:#BED4EE; */
  /* background: rgba(7, 41, 81, 0.95); */
  /* background:#074D76; */
  /* background: rgba(7, 77, 118, 0.9); */
  /* background:#A1C5D7; */
  /* background: rgba(161, 197, 215, 0.9); */
  /* 3076A3 */
  /* background: rgba(48, 118, 163, 0.9); */
  /* border: 2px ridge #FFFFE0; */
  border-radius: 48px;
  text-align: center;
  /* font-family: "Marvel-Bold"; */
  font-family: "Akshar-Light";
  padding: 64px 24px 88px;
  /* padding: 72px 16px 88px; */
  /* padding: 72px 0 88px; */
}


.title {
  font-size: 72px;
  font-family: "Akshar";
  letter-spacing: 0.05em;
  /* FFFFE0 */
  text-shadow: 2px 2px rgba(255, 255, 224, 0.5);
}

@media screen and (max-width: 800px) {
  .title {
    font-size: 64px;
  }
}

.message {
  padding-top: 48px;
  font-size: 32px;
  color: #FFE98C;
}

.listFlame {
  display: grid;
  max-width: 1000px;
  grid-template-columns: repeat(3, 1fr);
  margin: 40px auto 0;
  gap: 16px;
}

.appCard {
  cursor: pointer;
}

.thumbnail {
  height: auto;
  width: 100%;
  border-radius: 5px 5px 0 0;
}

.appTitle {
  margin-top: -5px;
  height: 40px;
  font-size: 24px;
  background: #09111F;
  align-content: center;
  border-radius: 0 0 5px 5px;
}

@media (max-width: 800px) {
  .listFlame {
    grid-template-columns: repeat(2, 1fr);
  }

  .title {
    font-size: 64px;
  }

  .message {
    font-size: 28px;
  }

  .appTitle {
    font-size: 20px;
  }

}
</style>