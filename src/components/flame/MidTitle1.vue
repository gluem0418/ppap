<template>
  <div class="midTitle">
    <div class="text" :style="{ 'letter-spacing': spacing + 'em' }">{{ inside }}</div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  inside: { type: String },
  spacing: { type: Number },
});

</script>
<style scoped>
.midTitle {
  margin: 0 auto;
  max-width: 1200px;
  font-size: 48px;
  font-family: "Marvel-Bold";
  display: flex;
  align-items: center;
  color: #FFE98C;
}

.midTitle:before,
.midTitle:after {
  content: "";
  flex-grow: 1;
  height: 2px;
}

.midTitle:before {
  margin-right: 20px;
  background: linear-gradient(to right, rgba(255, 233, 140, 0), rgba(255, 233, 140, 1));
}

.midTitle:after {
  margin-left: 20px;
  background: linear-gradient(to left, rgba(255, 233, 140, 0), rgba(255, 233, 140, 1));
}


@media screen and (max-width: 800px) {
  .midTitle {
    font-size: 40px;
  }

  .text {
    font-size: 36px;
  }

}
</style>