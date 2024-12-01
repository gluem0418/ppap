<script setup lang="ts">
import { ref } from 'vue'

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
  console.log('clickApp', selectedIndex.value, app.id, showApp.value)
}

function closeAppDetail() {
  showApp.value = false;
  document.body.style.overflow = ''; // スクロールを有効に戻す
}

const changeApp = (selectType: string, index: number) => {
  // console.log('changeApp_selectType', selectType)
  // console.log('changeApp_beforeindex', selectedIndex.value)
  // console.log('changeApp_applications.length', applications.length)

  if (selectType == 'next') {
    selectedIndex.value = selectedIndex.value == applications.length - 1 ? 0 : selectedIndex.value! + 1
    selectedApp.value = applications[selectedIndex.value]
  } else if (selectType == 'prev') {
    selectedIndex.value = selectedIndex.value == 0 ? applications.length - 1 : selectedIndex.value! - 1
    selectedApp.value = applications[selectedIndex.value]
  } else if (selectType == 'select') {
    selectedIndex.value = index
    selectedApp.value = applications[index]
  }
  // console.log('changeApp_afterindex', selectedIndex.value)

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

    <AppDetail :app="selectedApp" :index="selectedIndex" :show="showApp" v-show="showApp" @close="closeAppDetail"
      @change="changeApp" />

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
  font-family: "Marvel-Bold";
  padding: 64px 24px 88px;
  /* padding: 72px 16px 88px; */
  /* padding: 72px 0 88px; */
}


.title {
  font-size: 72px;
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