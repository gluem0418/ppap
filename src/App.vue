<template>
  <div class="tresBg">

    <Suspense>

      <Stars />

    </Suspense>

  </div>

  <main>

    <div class="menu">

      <BlueFlame1 class="menu1" :inside="Config.mainMenu1" />
      <BlueFlame1 class="menu2" :inside="Config.mainMenu2" />

    </div>

    <AppList class="appList" />

  </main>
</template>

<script setup lang="ts">

import Stars from '@/components/Stars.vue';
import Config from '@/Config.ts'

import BlueFlame1 from '@/components/flame/blueFlame1.vue';
import AppList from '@/components/AppList.vue';

</script>

<style scoped>
main {
  position: relative;
  margin: 0;
  width: 100%;
  height: auto;
}

.tresBg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/sky1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.menu {
  /* position: absolute;
  top: 45px;
  left: 45px; */
  position:relative;
  margin: 45px 45px 0 auto;
  width: 150px;
  height: auto;
  z-index: 2;
}

.menu2 {
  margin-top: 20px;
}

.appList {
  margin-top: 840px;
  z-index: 2;
}
</style>