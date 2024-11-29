<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

import Stars from '@/components/Stars.vue';
import AppList from '@/components/AppList.vue';
import About from '@/components/About.vue';

import BtnMenu from '@/components/flame/BtnMenu.vue';

import Config from '@/Config.ts';

// const refAppList = ref<HTMLElement | null>(null);
// const refAbout = ref<HTMLElement | null>(null);

// const elementsToObserve = ref([
//   { target: refAppList, paused: false },
//   { target: refAbout, paused: false },
// ]);

const progress = ref(0); // スクロール率
const isScrollPaused = ref(false); // スクロールを一時停止するフラグ
let scrollableHeight = 0;

// スクロール量を更新
const handleScroll = () => {
  // if (isScrollPaused.value) return; // スクロールが停止中なら無視
  progress.value = window.scrollY / scrollableHeight;
};

// スクロールを一時停止する処理
// const pauseScroll = () => {
//   isScrollPaused.value = true;
//   document.body.style.overflow = 'hidden'; // スクロールを無効化
//   setTimeout(() => {
//     isScrollPaused.value = false;
//     document.body.style.overflow = ''; // スクロールを再有効化
//   }, 1000); // 1秒間停止
// };

onMounted(() => {
  // スクロールイベントを設定
  window.addEventListener('scroll', handleScroll);
  scrollableHeight = document.body.scrollHeight - window.innerHeight;

  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach((entry) => {
  //       const elementData = elementsToObserve.value.find(
  //         (el) => el.target === entry.target
  //       );

  //       if (!elementData) return;

  //       if (entry.isIntersecting && !elementData.paused) {
  //         pauseScroll(); // 要素が表示されたらスクロール停止
  //         elementData.paused = true; // この要素では一度だけ停止
  //       } else if (!entry.isIntersecting) {
  //         elementData.paused = false; // 要素が見えなくなったらリセット
  //       }
  //     });
  //   },
  //   { threshold: 0.5 } // 50%表示されたら検知
  // );

  // // 各リアクティブ要素を監視
  // elementsToObserve.value.forEach(({ target }) => {
  //   if (target) observer.observe(target);
  //   console.log('elementsToObserve_observer', observer)
  //   console.log('elementsToObserve_target', target)
  // });

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

  <div v-else class="scroll_down">
    <span>Scroll</span>
  </div>

  <div class="space"></div>

  <!-- <div :id="Config.mainMenu1" ref="refAppList"> -->
  <div :id="Config.mainMenu1">
    <AppList />
  </div>

  <!-- <div :id="Config.mainMenu2" ref="refAbout"> -->
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
  /* -webkit-overflow-scrolling: touch; */
  /* pointer-events: auto !important; */
}

.dummy {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
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

.scroll_down span {
  position: absolute;
  left: -24px;
  bottom: 16px;
  font-size: 18px;
  font-family: "Marvel-Bold";
  letter-spacing: .2em;
  writing-mode: vertical-rl;
  text-transform: uppercase;
}

.scroll_down:before {
  content: "";
  position: absolute;
  bottom: 5px;
  right: -8px;
  width: 2px;
  height: 20px;
  background: #ffffe0;
  transform: skewX(-31deg);
}

.scroll_down:after {
  content: "";
  position: absolute;
  bottom: 5px;
  width: 2px;
  height: 85px;
  background: #ffffe0;
}
</style>