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
    border-radius: 5px;
    text-align:center;
    padding:6px 40px;
  }

  .text {
    font-family: "Marvel-Bold";
    font-size: 40px;
  }

</style>