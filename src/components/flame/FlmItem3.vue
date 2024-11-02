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
  padding: 6px 40px;
  text-align: center;
  color: #F5F5F5;
}

.text {
  font-family: "Marvel-Bold";
  font-size: 40px;
}

@media screen and (max-width: 800px) {
  .flame {
    padding: 6px 20px;
  }

  .text {
    font-size: 36px;
  }
}
</style>