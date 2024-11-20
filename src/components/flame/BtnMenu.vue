<template>
  <a :href="`#${inside}`" class="flame">
    {{ inside }}
  </a>
</template>

<script setup lang="ts">

const props = defineProps({
  inside: { type: String },
});

</script>
<style scoped>
.flame {
  display: block;
  /* width: 150px; */
  /* width: fit-content; */
  /* background: linear-gradient(to bottom, rgba(84, 168, 214, 0.8), rgba(65, 64, 143, 0.8)); */
  border-radius: 10px;
  text-align: center;
  padding: 4px 10px;
  cursor: pointer;
  text-decoration: none;
  font-family: "Marvel-Bold";
  color: #FFFFE0;
  font-size: 28px;
  user-select: none;
  border: 1px solid rgba(0, 0, 0, 0);
}

@media screen and (min-width: 800px) {
  .flame:hover {
    border: 1px solid #FFFFE0;
  }
}

.flame:active {
  border: 1px solid #FFFFE0;
}
</style>