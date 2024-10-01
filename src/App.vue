<template>
  <main>

    <div class="tresBg">

      <Suspense>

        <Stars />

      </Suspense>

    </div>

    <div class="mainSec">

      <div class="menu">

        <BlueFlame1 class="menu1" :inside="Config.txtMenu1"></BlueFlame1>
        <BlueFlame1 class="menu2" :inside="Config.txtMenu2"></BlueFlame1>

      </div>

      <div class="application">

        <BlueFlame2 class="titleApp" :inside="Config.txtMenu1"></BlueFlame2>

      </div>

    </div>

  </main>
</template>

<script setup lang="ts">

import Stars from '@/components/Stars.vue';
import Config from '@/Config.ts'

import BlueFlame1 from '@/components/flame/blueFlame1.vue';
import BlueFlame2 from '@/components/flame/blueFlame2.vue';

</script>

<style scoped>
main {
  position: relative;
  width: 100%;
  height: auto;
  font-family: "Marvel-Bold";
  color: #F5F5F5;
  overflow-y: scroll;
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
}


.mainSec {
  position: fixed;
  /* position: relative; */
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
}

.menu {
  position: absolute;
  top: 45px;
  right: 45px;
}

.menu2 {
  margin-top: 20px;
}

.application {
  margin-top: 1000px;
  position: relative;
  width: 100%;
  height: auto;
  /* text-align:center; */
}

.titleApp {}
</style>