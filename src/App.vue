<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

import Stars from '@/components/Stars.vue';
import AppList from '@/components/AppList.vue';
import About from '@/components/About.vue';

import BtnMenu from '@/components/flame/BtnMenu.vue';

import Config from '@/Config.ts';

const progress = ref(0); // スクロール率
let scrollableHeight = 0;

const handleScroll = () => {
  progress.value = window.scrollY / scrollableHeight;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  scrollableHeight = document.body.scrollHeight - window.innerHeight;
  console.log('documentElement.scrollHeight', document.documentElement.scrollHeight)
  console.log('scrollHeight', document.body.scrollHeight, 'window.innerHeight', window.innerHeight, 'scrollableHeight', scrollableHeight)
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const startAnimation = ref<boolean>(true);
const starsVisible = ref<boolean>(false);


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

</script>

<template>

  <!-- <div @click="clickScreen">
    <Suspense>
      <Stars class="Stars" :progress="progress" :starsVisible="starsVisible" />
    </Suspense>
    <div class="dummy"> </div>
  </div> -->

  <div class="Stars-container" @click.once="clickScreen">
    <Suspense>
      <Stars class="Stars" :progress="progress" :starsVisible="starsVisible" />
    </Suspense>
  </div>

  <div class="menu">
    <BtnMenu class="menu1" :inside="Config.mainMenu1" />
    <BtnMenu class="menu2" :inside="Config.mainMenu2" />
  </div>

  <div v-if="startAnimation" class="enter">{{ Config.msgEnter }}</div>

  <div class="space"></div>
  <div :id="Config.mainMenu1">
    <AppList />
  </div>

  <div :id="Config.mainMenu2">
    <About />
  </div>

</template>

<style scoped>
.Stars-container {
  position: fixed;
  inset: 0;
  overflow: hidden;
}

.Stars {
  position: absolute;
  inset: 0;
  touch-action: auto !important;
  pointer-events: auto !important;
}

/* .Stars {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #ffff00;
} */

.dummy {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  /* pointer-events: none; */
  /* touch-action: auto;
  -webkit-overflow-scrolling: touch; */
}

.menu {
  position: absolute;
  top: 12px;
  right: 1%;
  height: auto;
}

.menu2 {
  margin-top: 8px;
}

.space {
  width: 100%;
  height: 2000px;
}

.enter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-size: 28px;
  font-family: "Marvel-Bold";
  /* color: #FFF57F */
}
</style>