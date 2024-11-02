<script setup lang="ts">
import { ref, onMounted } from 'vue';

import Stars from '@/components/Stars.vue';
import AppList from '@/components/AppList.vue';
import About from '@/components/About.vue';

import BtnMenu from '@/components/flame/BtnMenu.vue';

import Config from '@/Config.ts';

const starsRef = ref<HTMLElement | null>(null)
const appListRef = ref<HTMLElement | null>(null)
const aboutRef = ref<HTMLElement | null>(null)

const getElementHeightWithMargin = (element: Element) => {
  if (!element) return 0;
  console.log('element', element)
  // const styles = window.getComputedStyle(element);
  // const marginTop = parseFloat(styles.marginTop);
  // const marginBottom = parseFloat(styles.marginBottom);
  const height = element.getBoundingClientRect().height;

  // return height + marginTop + marginBottom;
  return height;
};


onMounted(() => {
  // 各コンポーネントの高さを取得
  if (!starsRef.value) return
  if (!appListRef.value) return
  if (!aboutRef.value) return

  const starsHeight = starsRef.value.offsetHeight;
  const appListHeight = appListRef.value.offsetHeight;
  const aboutHeight = aboutRef.value.offsetHeight;

  const totalCompHeight = starsHeight + appListHeight + aboutHeight;

  console.log('app.scrollHeight:', document.body.scrollHeight)

  console.log("starsHeight:", starsHeight);
  console.log("appListHeight:", appListHeight);
  console.log("aboutHeight:", aboutHeight);

  console.log("totalCompHeight:", totalCompHeight);
});

</script>

<template>

  <div ref="starsRef" class="compStars">
    <Suspense>
      <Stars />
    </Suspense>
  </div>

  <div class="menu">

    <BtnMenu class="menu1" :inside="Config.mainMenu1" />
    <BtnMenu class="menu2" :inside="Config.mainMenu2" />

  </div>

  <div ref="appListRef" :id="Config.mainMenu1">
    <AppList />
  </div>

  <div ref="aboutRef" :id="Config.mainMenu2">
    <About />
  </div>

</template>

<style scoped>
.compStars {
  padding-bottom: 2100px;
}

@media screen and (max-width: 800px) {
  .compStars {
    padding-bottom: 2400px;
  }
}


.menu {
  position: absolute;
  top: 20px;
  right: 1%;
  height: auto;
}

.menu2 {
  margin-top: 20px;
}
</style>