<template>
  <div class="tresBg">

    <Suspense>

      <Stars />

    </Suspense>

  </div>

  <main>

    <div class="menu">

      <BtnMenu class="menu1" :inside="Config.mainMenu1" />
      <BtnMenu class="menu2" :inside="Config.mainMenu2" />

    </div>

    <AppList />

    <div class="experience">
    </div>

  </main>
</template>

<script setup lang="ts">

import Stars from '@/components/Stars.vue';
import Config from '@/Config.ts'

import BtnMenu from '@/components/flame/BtnMenu.vue';
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
.experience {
  position: relative;
  margin: 840px auto 0;
  width: 94%;
  height: 800px;
  background: radial-gradient(rgba(168, 184, 220, 0.95), rgba(245, 245, 245, 0.95));
  border-radius: 30px;
  text-align: center;
  color: #07315D;
  font-size: 20px;
  z-index: 2;
}

</style>