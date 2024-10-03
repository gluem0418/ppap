<template>
  <div class="tresBg">

    <Suspense>

      <Stars />

    </Suspense>

  </div>

  <main>

    <!-- <div class="mainSec"> -->

    <div class="menu">

      <BlueFlame1 class="menu1" :inside="Config.txtMenu1" />
      <BlueFlame1 class="menu2" :inside="Config.txtMenu2" />

    </div>


    <BlueFlame2 class="titleApp" :inside="Config.txtMenu1" />


    <!-- </div> -->

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
  margin: 0;
  width: 100%;
  height: auto;
  /* overflow-y: scroll; */
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
  position: relative;
  margin: 0;
  width: 100%;
  height: auto;
  border: solid;
}

.menu {
  position: absolute;
  top: 4vh;
  right: 3vw;
  width: 150px;
  height: auto;
  /* float: right;
  margin-top: 45px;
  margin-right: 45px; */
  /* border: solid; */
}

.menu2 {
  margin-top: 20px;
}

.titleApp {
  position: absolute;
  /* top: 1000px; */
  top: 150vh;
  left: 50%;
  transform: translateX(-50%);
}
</style>