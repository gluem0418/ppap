<template>
  <main>
    <div class="tresBg">

      <Suspense>

        <Stars />

      </Suspense>

      <div class="title">{{ Config.title }}</div>

    </div>

  </main>
</template>

<script setup lang="ts">

import Stars from '@/components/Stars.vue';
import Config from '@/Config.ts'

</script>

<style scoped>
main {
  position: relative;
  width: 100%;
  height: auto;
  font-family: "Marvel-Bold";
  color: #D5E0F1;
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

.top {
  position: relative;
  margin: 0;
  width: 100%;
  height: 93vh;
}

.title {
  margin-top: 1%;
  margin-left: 3%;
  font-size: 4vw;
}

.enter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2vw;
  color: #041A25;
}
</style>