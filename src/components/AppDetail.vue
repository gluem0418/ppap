<template>
  <div v-if="selectedApp" class="appDetail">

    <div class="appFlame">

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
          <BtnChange class="btnPrev" :inside="'Prev'" @click="prevApp" />

          <BtnChange class="btnNext" :inside="'Next'" @click="nextApp"/>
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

// 対象キャラクター指定
const changeApp = (selectType: string) => {
  emit('change', selectType)
};

function nextApp() {
  changeApp('next')
}

function prevApp() {
  changeApp('prev')
}

watch(() => props.index, () => {
  if (props.index) {
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
  /* position: sticky; */
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 3;
}

.appFlame {
  position: relative;
  width: 90%;
  margin: 0 auto;
  height: auto;
  padding: 30px;
  background: linear-gradient(-45deg, rgba(65, 64, 143, 0.95), rgba(84, 168, 214, 0.95));
  border-radius: 30px;
  /* text-align: center; */
  /* font-size: 20px; */
}

.btnClose {
  position: absolute;
  top: 30px;
  right: 30px;
}

.titleFlame {
  margin-top: 10px;
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
  width: 45%;
}

.btnLink1 {
  margin-left: auto;
  margin-right: 10%;
}

.titleLine {
  margin: 30px auto;
  width: 92%;
}

.secDetail {
  width: 90%;
  margin: 0 auto;
}

.midTitle {
  position: relative;
}


.secPoint {
  display: flex;
  gap: 4%;
  font-family: "MPLUS1p";
  margin: 20px 0;
}

.flameScreen {
  align-content: center;
  width: 45%;
}

.imgScreen {
  width: 100%;
  border-radius: 10px;
}

.flamePoint {
  width: 55%;
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
  margin-bottom: 30px;
}

.text {
  margin-left: 16px;
  margin-bottom: 6px;
}

.secDetailEnd {
  /* margin-top:20px; */
  display: flex;
  justify-content: space-between;
}

.btnPrev {}
</style>