<template>
  <div v-if="selectedApp" class="appDetail">

    <div class="appFlame" id="appFlame">

      <BtnClose class="btnClose" @click="closeDetail" />

      <div class="titleFlame">

        <div class="title"> {{ selectedApp.id }} </div>

        <div class="intro"> {{ selectedApp.introduction }} </div>

        <BtnLink class="btnLink1" :inside="'Visit Site'" />

      </div>

      <hr size="1" color="#A8B8DC" class="titleLine">

      <div class="secDetail">
        <!-- Point -->
        <FlmItem1 class="midTitle" :inside="'Points'" />

        <!-- <div v-if="selectedApp.id == Config.app1" > -->
        <div class="secPoint">

          <div class="flameScreen">
            <img class="imgScreen" :src="selectedApp.screenShot[0]" alt="Screen Shot" />
          </div>

          <div class="flamePoint">

            <AppPoint :point="selectedApp.points[0]" />

          </div>

        </div>

        <div class="secPoint">

          <div class="flamePoint">

            <AppPoint :point="selectedApp.points[1]" />
            <br>
            <AppPoint :point="selectedApp.points[2]" />

          </div>

          <div class="flameScreen">
            <img class="imgScreen" :src="selectedApp.screenShot[1]" alt="Screen Shot" />
          </div>

        </div>

        <!-- Environment -->

        <div class="envTitle">

          <FlmItem1 class="midTitle" :inside="'Environment'" />
          <BtnLink class="btnLink2" :inside="'github'" />

        </div>

        <div class="secEnv">

          <div v-for="(text, index) in selectedApp.environment" :key="index" class="text">
            {{ text }}
          </div>

        </div>

        <div class="secDetailEnd">
          <BtnChange :inside="'Prev'" @click="changeApp('prev')" />

          <div class="indexList">
            <div v-for="(cnt, index) in Config.appCount" class="appIndex" @click="changeApp('select', index)"
              :class="{ 'selectedApp': selectedIndex == index }">
            </div>
          </div>

          <BtnChange :inside="'Next'" @click="changeApp('next')" />
        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import AppPoint from '@/components/AppPoint.vue';

import BtnLink from '@/components/flame/BtnLink.vue';
import BtnChange from '@/components/flame/BtnChange.vue';

import FlmItem1 from '@/components/flame/FlmItem1.vue';

import BtnClose from '@/components/icon/BtnClose.vue';

import Application from '@/class/Application.ts';

import Config from '@/Config.ts';

const props = defineProps({
  index: { type: Number },
  app: { type: Application },
});

const selectedIndex = ref<number>(0);
const selectedApp = ref<Application | undefined>(undefined);

const emit = defineEmits(["close", "change"]);

function closeDetail() {
  emit('close');
}

// 対象アプリケーション指定
const changeApp = (selectType: string, index?: number) => {
  // ページのトップにスクロール
  const appDetailElement = document.querySelector('.appDetail');
  if (appDetailElement) {
    appDetailElement.scrollTop = 0;
  }

  emit('change', selectType, index)

};

watch(() => props.index, () => {
  if (props.index !== undefined) {
    selectedIndex.value = props.index;
  }
})

watch(() => props.app, () => {
  if (props.app) {
    selectedApp.value = props.app;
  }
})

</script>
  
<style scoped>
.appDetail {
  position: fixed;
  inset: 0;
  margin: auto;
  width: 97%;
  height: 97%;
  background: linear-gradient(-45deg, rgba(65, 64, 143, 0.95), rgba(84, 168, 214, 1));
  border-radius: 15px;
  border: 4px ridge #F5F5F5;  
  z-index: 3;
  overflow: auto;
  /* scrollbar-width: none; */
}

.appFlame {
  position: relative;
  height: auto;
  padding: 30px;
}

.btnClose {
  position: sticky;
  top: 30px;
  display: grid;
  margin-left: auto;
  right: 0;
}

.titleFlame {
  margin-left: 4%;
  display: flex;
  align-items: center;
}

.title {
  font-size: 60px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.intro {
  margin-left: 5%;
  width: 46%;
}

.btnLink1 {
  margin-left: auto;
  margin-right: 10%;
}

.titleLine {
  margin: 30px auto;
  width: 95%;
}

.secDetail {
  width: 92%;
  margin: 0 auto;
}

.midTitle {
  position: relative;
}


.secPoint {
  display: flex;
  gap: 4%;
  font-family: "MPLUS1p";
  margin: 40px 0;
  /* border:solid; */
}

.flameScreen {
  align-content: center;
  width: 43%;
}

.imgScreen {
  width: 100%;
  border-radius: 10px;
}

.flamePoint {
  width: 53%;
}

.envTitle {
  display: flex;
  align-items: center;
}

.btnLink2 {
  margin-left: 7%;
}

.secEnv {
  font-family: "MPLUS1p";
  margin-top: 20px;
  margin-bottom: 40px;
  /* border:solid; */
}

.text {
  margin-left: 16px;
  margin-bottom: 6px;
}

.secDetailEnd {
  display: flex;
  justify-content: space-between;
  margin-bottom:30px;
}

.indexList {
  width: 130px;
  margin-top: auto;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
}

.appIndex {
  width: 20px;
  height: 8px;
  background: #F5F5F5;
  cursor: pointer;
}

.selectedApp {
  background: #121F30;
}
</style>