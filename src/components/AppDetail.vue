<script setup lang="ts">
import { ref, watch } from 'vue';

import FlexPoint from '@/components/FlexPoint.vue';

import BtnLink from '@/components/flame/BtnLink.vue';
import BtnChange from '@/components/flame/BtnChange.vue';

import MidTitle1 from '@/components/flame/MidTitle1.vue';

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
        <div v-if="selectedApp.id !== Config.appPortfolio">
          <BtnLink class="btnLink1" :inside="'Visit Site'" :link="selectedApp.url" />
        </div>
        <BtnClose class="btnClose" @click="closeDetail" />
      </div>

      <div class="titleFlame">
        <div class="title"> {{ selectedApp.id }} </div>
        <div class="intro"> {{ selectedApp.introduction }} </div>
        <div v-if="selectedApp.id == Config.appSeventh" class="caution"> {{ selectedApp.caution }} </div>
      </div>

      <!-- <hr size="1" color="#A8B8DC" class="titleLine"> -->
      <!-- <hr class="titleLine"> -->

      <div class="secDetail">

        <!-- Point -->
        <div class="secPoint">
          <MidTitle1 class="midTitle" :inside="'Points'" :spacing="0.1" />
          <!-- <div class="midTitle">
            <div class="midTitle1">Points</div>
          </div> -->

          <!-- Point1 -->
          <FlexPoint class="flexPoint" :order="'1'" :point1="selectedApp.points[0]" :screen="selectedApp.screenShot[0]" />
          <!-- Point2 -->
          <!-- <div v-if="selectedApp.id == Config.appPortfolio || selectedApp.id == Config.appStarry"> -->
          <div v-if="selectedApp.id == Config.appStarry">
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
          <div class="secEnv">
            <MidTitle1 class="midTitle" :inside="'Environment'" :spacing="0.05" />
            <!-- <div class="flmEnv1"> -->
            <!-- <div class="midTitle">
              <div class="midTitle2">Environment</div>
            </div> -->
            <div class="envToolList">
              <div v-for="(text, index) in selectedApp.environment" :key="index" class="listText">
                {{ text }}
              </div>
            </div>
          </div>

          <!-- Tool -->
          <div class="secTool">
            <MidTitle1 class="midTitle" :inside="'Tool'" :spacing="0.1" />
            <!-- <div class="midTitle">
              <div class="midTitle1">Tool</div>
            </div> -->
            <div class="envToolList">
              <div v-for="(text, index) in selectedApp.tool" :key="index" class="listText">
                {{ text }}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="btnGit"
        v-if="selectedApp.id == Config.appStarry || selectedApp.id == Config.appWhack || selectedApp.id == Config.appFear">
        <BtnLink :inside="'GitHub'" :link="selectedApp.githubUrl" />
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
</template>

<style scoped>
.appDetail {
  position: fixed;
  inset: 0;
  /* margin: 10px 1%; */
  height: auto;
  /* 243B66 */
  background-image: linear-gradient(rgba(36, 59, 102, 0.7), rgba(36, 59, 102, 0.7)), url('@/assets/img/sky42.jpg');
  /* 090F1A */
  /* background-image: linear-gradient(rgba(9, 15, 26, 0.5), rgba(9, 15, 26, 0.5)), url('@/assets/img/sky42.jpg'); */
  /* background-image: linear-gradient(rgba(7, 41, 81, 0.8), rgba(7, 41, 81, 0.8)), url('@/assets/img/sky21.jpg'); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  /* border-radius: 15px; */
  /* border: 4px ridge #F5F5F5; */
  padding: 20px;
  overflow-y: scroll;
}

@media screen and (max-width: 800px) {
  .appDetail {
    padding: 10px;
  }
}

.appFlame {
  position: relative;
}

.appTop {
  position: sticky;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  height: 60px;
}

.btnClose {
  margin-right: 1%;
  margin-left: 2%;
}

.titleFlame {
  margin: 0 auto 30px;
  text-align: center;
}

.title {
  font-size: 70px;
  font-family: "Marvel-Bold";
  letter-spacing: 0.05em;
  text-shadow: 2px 2px rgba(255, 255, 224, 0.5);
  /* -webkit-text-stroke: 1px #121F30; */
}

@media screen and (max-width: 800px) {
  .title {
    font-size: 60px;
  }
}

.intro {
  margin: 20px auto 0;
  /* width: 90%; */
  line-height: 1.8;
}

.caution {
  margin: 10px 10px 0;
}

.secDetail {
  margin: 70px auto;
}

.secEnvTool {
  /* margin: 100px auto; */
  margin: 100px auto 50px;
  display: flex;
  justify-content: center;
  gap: 5%;
  /* gap: 20px; */
}

.secEnv {
  max-width: 550px;
  flex: 1;
}

@media screen and (max-width: 800px) {
  .secDetail {
    margin: 60px auto;
  }

  .secEnvTool {
    margin: 70px auto;
    flex-direction: column;
  }

}


.btnGit {
  max-width: 150px;
  margin: 0 0 30px auto;
}

@media screen and (max-width: 800px) {
  .btnGit {
    margin-bottom: 40px;
  }
}

.secTool {
  max-width: 550px;
  flex: 1;
}

.envToolList {
  margin: 20px auto;
  width: fit-content;
}

@media screen and (max-width: 800px) {
  .envToolList {
    margin-bottom: 40px;
  }
}

.text {
}

.listText {
  font-family: "Marvel-Bold";
  font-size:20px;
  line-height: 1.5;
}


.secDetailEnd {
  position: sticky;
  bottom: 0;
  margin: 0 1%;
  display: flex;
  justify-content: space-between;
}

.indexList {
  margin-top: auto;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 130px;
  height: 8px;
}

.appIndex {
  width: 20px;
  background: #FFFFE0;
  cursor: pointer;
}

.selectedApp {
  background: #090F1A;
}
</style>