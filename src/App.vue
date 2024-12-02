<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import anime from 'animejs';

import Stars from '@/components/Stars.vue';
import AppList from '@/components/AppList.vue';
import About from '@/components/About.vue';

import BtnMenu from '@/components/flame/BtnMenu.vue';
import ScrollDown from '@/components/icon/ScrollDown.vue';

import Config from '@/Config.ts';

const refAppList = ref<HTMLElement | null>(null);
const refAbout = ref<HTMLElement | null>(null);

const progress = ref(0); // スクロール率
let scrollableHeight = 0;

// スクロール量を更新
const handleScroll = () => {
  progress.value = window.scrollY / scrollableHeight;
};

onMounted(() => {
  // スクロールイベントを設定
  window.addEventListener('scroll', handleScroll);
  // scrollableHeight = document.body.scrollHeight - window.innerHeight;
  scrollableHeight = document.body.scrollHeight;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // entry.target.classList.add('scaleFlame');
        anime({
          targets: entry.target,
          // scale: [0.5, 1],
          opacity: [0 , 1],
          duration: 800,
          easing: 'easeOutCubic' // 加減速の種類
        });
      } else {
        // entry.target.classList.remove('scaleFlame');
      }
    });
  });

  if (refAppList.value) observer.observe(refAppList.value);
  if (refAbout.value) observer.observe(refAbout.value);

  console.log('scrollHeight', document.body.scrollHeight, 'documentElement.scrollHeight', document.documentElement.scrollHeight, 'window.innerHeight', window.innerHeight)
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

  <ScrollDown v-else class="scroll_down" />

  <div class="space"></div>

  <div :id="Config.mainMenu1" ref="refAppList">
    <AppList />
  </div>

  <div :id="Config.mainMenu2" ref="refAbout">
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
  /* -webkit-overflow-scrolling: touch; */
  /* pointer-events: auto !important; */
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
  height: 2500px;
}

.enter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-size: 28px;
  font-family: "Marvel-Bold";
}

.scroll_down {
  position: absolute;
  bottom: 2%;
  left: 40px;
}
</style>