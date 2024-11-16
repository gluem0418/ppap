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
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 28px;
  border: 1px solid #FFFFE0;
  user-select: none;
}

.flame:hover {
  background: linear-gradient(to bottom, #3076A3,#074D76 );
}
</style>