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

/* .midTitle1 {
  letter-spacing: 0.1em;
}

.midTitle2 {
  letter-spacing: 0.05em;
} */

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
  .flame {
    /* padding: 4px 20px; */
    padding: 4px 10px;
    width: auto;
  }

  .text {
    font-size: 36px;
  }

}
</style>