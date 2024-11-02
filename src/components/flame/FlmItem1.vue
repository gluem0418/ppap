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
  min-width: 120px;
  background: #D6A254;
  border-radius: 5px;
  text-align: center;
  padding: 6px 30px;
}

.text {
  font-family: "Marvel-Bold";
  font-size: 40px;
}

@media screen and (max-width: 800px) {
  .flame {
    padding: 4px 20px;
    width: auto;
}

  .text {
    font-size: 36px;
  }

}
</style>