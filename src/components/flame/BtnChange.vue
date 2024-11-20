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
  /* background: #121F30; */
  border-radius: 10px;
  text-align: center;
  padding: 7px 30px;
  color: #FFE98C;
  border: 1px solid #FFE98C;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  user-select: none;
}

.flame:active {
  background: #090F1A;
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

@media screen and (min-width: 800px) {
  .flame:hover {
    background: #090F1A;
  }
}
</style>