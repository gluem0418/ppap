<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

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
  show: { type: Boolean },
});

const selectedIndex = ref<number>(0);
const selectedApp = ref<Application | undefined>(undefined);

const detailContainer = ref<HTMLDivElement | null>(null);

const emit = defineEmits(["close", "change"]);

function closeDetail() {
  emit('close');
}

// 対象アプリケーション指定

const changeApp = (selectType: string, index?: number) => {
  // ページのトップにスクロール
  if (detailContainer.value) detailContainer.value.scrollTop = 0;
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

watch(() => props.show, () => {
  if (detailContainer.value) detailContainer.value.scrollTop = 0;
})

</script>

<template>
  <div v-if="selectedApp" class="appDetail" ref="detailContainer">

    <div class="appFlame" id="appFlame">

      <div class="appTop">
        <div v-if="selectedApp.id !== Config.appPortfolio && selectedApp.id !== Config.appDetection">
          <BtnLink class="btnLink1" :inside="'Visit Site'" :link="selectedApp.url" />
        </div>
        <BtnClose class="btnClose" @click="closeDetail" />
      </div>

      <div class="titleFlame">
        <div class="title"> {{ selectedApp.id }} </div>
        <div class="intro"> {{ selectedApp.introduction }} </div>
      </div>

      <div class="secDetail">

        <!-- Point -->
        <div class="secPoint">
          <MidTitle1 class="midTitle" :inside="'Points'" :spacing="0.1" />

          <!-- Point1 -->
          <FlexPoint class="flexPoint" :order="'1'" :point1="selectedApp.points[0]" :screen="selectedApp.screenShot[0]" />
          <!-- Point2 -->
          <FlexPoint class="flexPoint" :point1="selectedApp.points[1]" :screen="selectedApp.screenShot[1]" />

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
          <div class="secEnvToolList">
            <MidTitle1 class="midTitle" :inside="'Environment'" :spacing="0.05" />
            <div class="envToolList">
              <div v-for="(text, index) in selectedApp.environment" :key="index" class="listText">
                {{ text }}
              </div>
            </div>
          </div>

          <!-- Tool -->
          <div class="secEnvToolList">
            <MidTitle1 class="midTitle" :inside="'Tool'" :spacing="0.1" />
            <div class="envToolList">
              <div v-for="(text, index) in selectedApp.tool" :key="index" class="listText">
                {{ text }}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="btnGit"
        v-if="selectedApp.id !== Config.appDetection">
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
  height: auto;
  /* 243B66 */
  background-image: linear-gradient(rgba(36, 59, 102, 0.7), rgba(36, 59, 102, 0.7)), url('@/assets/img/sky42.jpg');
  /* 090F1A */
  /* background-image: linear-gradient(rgba(9, 15, 26, 0.5), rgba(9, 15, 26, 0.5)), url('@/assets/img/sky42.jpg'); */
  /* background-image: linear-gradient(rgba(7, 41, 81, 0.8), rgba(7, 41, 81, 0.8)), url('@/assets/img/sky21.jpg'); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  /* border-radius: 48px; */
  /* border: 4px ridge #F5F5F5; */
  padding: 16px 24px;
  overflow-y: scroll;
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
  height: 56px;
}

.btnClose {
  /* margin-right: 1%; */
  margin-left: 2%;
}

.titleFlame {
  /* margin: 0 auto 32px; */
  text-align: center;
}

.title {
  font-size: 72px;
  font-family: "Marvel-Bold";
  letter-spacing: 0.05em;
  text-shadow: 2px 2px rgba(255, 255, 224, 0.5);
  /* -webkit-text-stroke: 1px #121F30; */
}

.intro {
  margin-top: 16px;
  line-height: 1.8;
}

.secDetail {
  margin: 56px auto;
}

.secEnvTool {
  display: flex;
  justify-content: center;
  gap: 5%;
  /* gap: 20px; */
}

.secEnvToolList {
  max-width: 550px;
  flex: 1;
}


.btnGit {
  max-width: 150px;
  position:absolute;
  right:0;
  bottom:72px;
}



.envToolList {
  margin: 24px auto;
  width: fit-content;
}

.listText {
  /* font-family: "Marvel-Bold";
  font-size:20px; */
  line-height: 1.8;
}


.secDetailEnd {
  position: sticky;
  bottom: 0;
  /* margin: 0 1%; */
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

@media screen and (max-width: 800px) {
  .appDetail {
    padding: 12px 24px;
  }


  .appTop {
    height: 52px;
  }

  .title {
    font-size: 48px;
  }

  .secDetail {
    margin: 40px auto;
  }

  .secEnvTool {
    /* margin: 72px auto; */
    flex-direction: column;
  }

  .btnGit {
    bottom:64px;
  }

  .envToolList {
    margin: 16px auto 40px;
  }

}
</style>