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
    background: #D6A254;
    border-radius: 4px;
    text-align:center;
    padding:7px 30px;
  }

  .text {
    font-size: 40px;
  }

</style>