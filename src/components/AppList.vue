<template>
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

  <AppDetail :app="selectedApp" :index="selectedIndex" v-show="showApp" @close="closeAppDetail" @change="changeApp" />
</template>
  
<script setup lang="ts">
import { ref } from 'vue'

import Application from '@/class/Application.ts';
import { applications } from '@/class/Application.ts';

import AppDetail from '@/components/AppDetail.vue';

import Config from '@/Config.ts';


//サムネイル画像クリック時の処理
const selectedIndex = ref<number | undefined>(undefined);
const selectedApp = ref<Application | undefined>(undefined);
const showApp = ref<Boolean>(false);

function clickApp(app: Application, index: number) {
  console.log('clickApp', app.id)
  selectedIndex.value = index;
  selectedApp.value = app;
  showApp.value = true;
  document.body.style.overflow = 'hidden'; // スクロールを無効にする
}

function closeAppDetail() {
  showApp.value = false;
  document.body.style.overflow = ''; // スクロールを有効に戻す
}

const changeApp = (selectType: string, index: number) => {
  console.log('changeApp_selectType', selectType)
  console.log('changeApp_beforeindex', selectedIndex.value)
  console.log('changeApp_applications.length', applications.length)

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
  console.log('changeApp_afterindex', selectedIndex.value)

}

</script>
  
<style scoped>
.appList {
  position: relative;
  margin: 840px auto 0;
  width: 94%;
  height: auto;
  background: radial-gradient(rgba(168, 184, 220, 0.95), rgba(245, 245, 245, 0.95));
  border-radius: 30px;
  text-align: center;
  color: #07315D;
  font-size: 20px;
  z-index: 2;
}

.title {
  padding-top: 90px;
  font-size: 60px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.message {
  margin-top: 60px;
  font-size: 28px;
}

.listFlame {
  margin-top: 60px;
  padding-bottom: 110px;
}

.appCard {
  display: inline-block;
  margin-left: 10px;
  width: 18%;
  cursor: pointer;
}

.thumbnail {
  height: auto;
  width: 100%;
}

.appTitle {
  margin-top: -5px;
  height: 35px;
  background: #121F30;
  color: #f5f5f5;
  align-content: center;
}
</style>