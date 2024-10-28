<script setup lang="ts">

import Stars from '@/components/Stars.vue';
</script>

<template>
  <main>
    <!-- <div class="stars"> -->
    <Suspense>
      <Stars />
    </Suspense>
    <!-- </div> -->
  </main>
</template>

<style scoped>
/* .stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/sky1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
} */
 main {
  height:400vh;
 }
</style>