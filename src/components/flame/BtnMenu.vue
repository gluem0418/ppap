<template>
  <div class="flame">
    <div class="text">{{ inside }}</div>
  </div>
</template>

<script setup lang="ts">

  const props = defineProps({
    inside: { type: String },
  });

</script>
<style scoped>
  .flame {
    width:150px;
    background: linear-gradient(to bottom, rgba(84, 168, 214, 0.8), rgba(65, 64, 143, 0.8));
    border-radius: 10px;
    text-align:center;
    padding:6px;
  }

  .text {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    font-size: 28px;
  }

</style>