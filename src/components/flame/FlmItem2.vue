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
    width: fit-content;
    background: #C7AC70;
    border-radius: 5px;
    padding:6px 30px;
    text-align:center;
    color:#F5F5F5;
  }

  .text {
    font-size: 24px;
  }

</style>