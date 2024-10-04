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

  <AppDetail :app="selectedApp" :index="selectedIndex" v-show="showApp" />

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

  selectedIndex.value = index;
  selectedApp.value = app;
  showApp.value = true;

}

</script>
  
<style scoped>
.appList {
  position: relative;
  margin: 0 auto;
  width: 1350px;
  height: 600px;
  background: radial-gradient(rgba(168, 184, 220, 0.95), rgba(245, 245, 245, 0.95));
  border-radius: 30px;
  text-align: center;
  color: #07315D;
  font-size: 20px;
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
}

.appCard {
  display: inline-block;
  margin-left: 10px;
}

.thumbnail {
  width: 240px;
  height: auto;
}

.appTitle {
  margin-top: -5px;
  height: 35px;
  background: #121F30;
  color: #f5f5f5;
  align-content: center;
}
</style>