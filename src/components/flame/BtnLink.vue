<template>
  <a :href="`${link}`" target="_blank" class="flame">
    {{ inside }}
  </a>
</template>

<script setup lang="ts">

const props = defineProps({
  inside: { type: String },
  link: { type: String },
});

</script>
<style scoped>
.flame {
  display: block;
  width: fit-content;
  /* width: auto; */
  /* background: linear-gradient(to bottom, #FFF57F, #B1E9FF); */
  background: linear-gradient(to bottom, #FFE98C, #A1F6FF);
  border-radius: 30px;
  text-align: center;
  padding: 7px 30px;
  color: #090F1A;
  /* box-shadow: 4px 4px 4px rgba(254, 242, 99, 1); */
  /* box-shadow: 4px 4px 4px rgba(177, 233, 255, 0.3); */
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  text-decoration: none;
  font-family: "Marvel-Bold";
  font-size: 28px;
  user-select: none;
}


@media screen and (max-width: 800px) {
  .flame {
    font-size: 24px;
    padding: 5px 20px;
  }
}

.flame:active {
  background: #FFFFE0;
}

@media screen and (min-width: 800px) {
  .flame:hover {
    background: #FFFFE0;
  }
}
</style>