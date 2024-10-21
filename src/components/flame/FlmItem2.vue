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
    border-radius: 4px;
    padding:12px 6%;
    text-align:center;
    color:#F5F5F5;
  }

  .text {
    font-size: 24px;
  }

</style>