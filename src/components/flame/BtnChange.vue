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
  /* width: fit-content; */
  background: #121F30;
  border-radius: 10px;
  text-align: center;
  padding: 7px 30px;
  color: #F5F5F5;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.flame:hover {
  color: #121F30;
  background: #f5f5f5;
  ;
}

.text {
  font-family: "Marvel-Bold";
  font-size: 28px;
}

@media screen and (max-width: 800px) {
  .flame {
    padding: 5px 20px;
  }
  .text {
    font-family: "Marvel-Bold";
    font-size: 24px;
  }
}
</style>