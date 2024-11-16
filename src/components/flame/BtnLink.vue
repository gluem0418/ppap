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
  background: linear-gradient(to bottom, #FEF263, #B1E9FF);
  border-radius: 30px;
  text-align: center;
  padding: 6px 24px;
  color: #021D34;
  /* box-shadow: 4px 4px 4px rgba(254, 242, 99, 1); */
  /* box-shadow: 4px 4px 4px rgba(177, 233, 255, 0.3); */
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  text-decoration: none;
  font-family: "Marvel-Bold";
  font-size: 28px;
  user-select: none;
}

.flame:hover {
  /* color: #f5f5f5; */
  /* background: linear-gradient(to bottom, #B1E9FF, #FEF263); */
  /* color:#FFFFE0; */
  background: #FFFFE0;
}

@media screen and (max-width: 800px) {
  .flame {
    font-size: 24px;
    padding: 5px 20px;
  }
}
</style>