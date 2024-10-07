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
    width:auto;
    background: #f5f5f5;
    border-radius: 10px;
    text-align:center;
    padding:6px 24px;
    color:#121F30;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  }

  .text {
    font-size: 28px;
  }

</style>