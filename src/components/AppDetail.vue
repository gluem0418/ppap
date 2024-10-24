<script setup lang="ts">
import { ref, watch } from 'vue';

import FlexPoint from '@/components/FlexPoint.vue';

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

<template>
  <div v-if="selectedApp" class="appDetail">

    <div class="appFlame" id="appFlame">

      <div class="appTop">
        <BtnLink class="btnLink1" :inside="'Visit Site'" />
        <BtnClose class="btnClose" @click="closeDetail" />
      </div>

      <div class="titleFlame">
        <div class="title"> {{ selectedApp.id }} </div>
        <div class="intro"> {{ selectedApp.introduction }} </div>
      </div>

      <!-- <hr size="1" color="#A8B8DC" class="titleLine"> -->
      <hr class="titleLine">

      <div class="secDetail">

        <!-- Point -->
        <div class="secPoint">
          <FlmItem1 class="midTitle" :inside="'Points'" />

          <!-- Point1 -->
          <FlexPoint class="flexPoint" :order="'1'" :point1="selectedApp.points[0]" :screen="selectedApp.screenShot[0]" />
          <!-- Point2 -->
          <div v-if="selectedApp.id == Config.appPortfolio || selectedApp.id == Config.appStarry">
            <FlexPoint class="flexPoint" :point1="selectedApp.points[1]" :point2="selectedApp.points[2]"
              :screen="selectedApp.screenShot[1]" />
          </div>
          <div v-else>
            <FlexPoint class="flexPoint" :point1="selectedApp.points[1]" :screen="selectedApp.screenShot[1]" />
          </div>

          <!-- Point3 -->
          <div v-if="selectedApp.id == Config.appSeventh">
            <FlexPoint class="flexPoint" :order="'1'" :point1="selectedApp.points[2]"
              :screen="selectedApp.screenShot[2]" />
          </div>
          <!-- Point4 -->
          <div v-if="selectedApp.id == Config.appSeventh">
            <FlexPoint class="flexPoint" :point1="selectedApp.points[3]" :point2="selectedApp.points[4]"
              :screen="selectedApp.screenShot[3]" />
          </div>

        </div>

        <div class="secEnvTool">

          <!-- Environment -->
          <div class="flmEnvTool">
            <div class="envToolTitle">
              <FlmItem1 class="midTitle" :inside="'Environment'" />
              <BtnLink class="btnLink2" :inside="'github'" />
            </div>
            <div class="envToolList">
              <div v-for="(text, index) in selectedApp.environment" :key="index" class="text">
                {{ text }}
              </div>
            </div>
          </div>

          <!-- Tool -->
          <div class="flmEnvTool">
            <div class="envToolTitle">
              <FlmItem1 class="midTitle" :inside="'Tool'" />
            </div>
            <div class="envToolList">
              <div v-for="(text, index) in selectedApp.tool" :key="index" class="text">
                {{ text }}
              </div>
            </div>
          </div>
        </div>

        <div class="secDetailEnd">
          <BtnChange :inside="'Prev'" @click="changeApp('prev')" />
          <div class="indexList">
            <div v-for="cnt in Config.appCount" class="appIndex" @click="changeApp('select', cnt - 1)"
              :class="{ 'selectedApp': selectedIndex == cnt - 1 }">
            </div>
          </div>
          <BtnChange :inside="'Next'" @click="changeApp('next')" />
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
.appDetail {
  position: fixed;
  inset: 0;
  margin: auto;
  width: 98%;
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
  /* padding: 30px 3%; */
  padding: 30px 0;
}

.appTop {
  position: sticky;
  top: 30px;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  right: 0;
}

.btnClose {
  margin-right: 3%;
  margin-left: 3%;
}

/* .titleFlame {
  margin-left: 4%;
  margin-top: -24px;
  display: flex;
  align-items: center;
} */

.titleFlame {
  margin: 0 auto;
  text-align:center;
}

.title {
  font-size: 60px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  -webkit-text-stroke: 1px #121F30;
}

.intro {
  margin-top: 30px;
  line-height: 30px;
  /* width: 50%; */
  font-family: "BIZUDPGothic";
}

hr {
  height: 2px;
  background: linear-gradient(to right, #F5F5F5, #32DBDB);
  border: none;
}

.titleLine {
  margin: 50px auto;
  width: 93%;
}

.secDetail {
  width: 90%;
  margin: 0 auto;
}

.midTitle {
  position: relative;
}

.secEnvTool {
  margin-top: 80px;
  display: flex;
}

.envToolTitle {
  display: flex;
  align-items: center;
}

.btnLink2 {
  margin-left: 7%;
}

.flmEnvTool {
  flex: 1;
}

.envToolList {
  margin-top: 30px;
  margin-bottom: 50px;
  /* font-family: "MPLUS1p"; */
  font-family: "BIZUDPGothic";
  line-height: 1.5;
}

.text {
  margin-left: 16px;
  margin-bottom: 6px;
}


.secDetailEnd {
  position: sticky;
  bottom: 30px;
  display: flex;
  justify-content: space-between;
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