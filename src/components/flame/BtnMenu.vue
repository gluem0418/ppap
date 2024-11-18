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
  width: 150px;
  /* background: linear-gradient(to bottom, rgba(84, 168, 214, 0.8), rgba(65, 64, 143, 0.8)); */
  border-radius: 10px;
  text-align: center;
  padding: 6px;
  cursor: pointer;
  text-decoration: none;
  font-family: "Marvel-Bold";
  color: #FFFFE0;
  font-size: 28px;
  user-select: none;
  border: 1px solid #090F1A;
}

.flame:hover {
  /* border: 1px solid #FFF57F; */
  border: 1px solid #FFFFE0;
}
</style>