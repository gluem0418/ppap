<template>
  <div class="scrollDown">
    <span>Scroll</span>
  </div>
</template>
  
<script setup lang="ts">

</script>
<style scoped>

.scrollDown span {
  position: absolute;
  left: -24px;
  bottom: 16px;
  font-size: 18px;
  font-family: "Marvel-Bold";
  letter-spacing: .2em;
  writing-mode: vertical-rl;
  text-transform: uppercase;
}

.scrollDown:before {
  content: "";
  position: absolute;
  bottom: 5px;
  right: -8px;
  width: 2px;
  height: 20px;
  background: #ffffe0;
  transform: skewX(-31deg);
}

.scrollDown:after {
  content: "";
  position: absolute;
  bottom: 5px;
  width: 2px;
  height: 85px;
  background: #ffffe0;
}

</style>