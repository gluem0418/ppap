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
  background: #f5f5f5;
  border-radius: 10px;
  text-align: center;
  padding: 6px 24px;
  color: #121F30;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  text-decoration: none;

  font-family: "Marvel-Bold";
  font-size: 28px;
}

.flame:hover {
  color: #f5f5f5;
  background: #121F30;;
}

@media screen and (max-width: 800px) {
    .flame {
      font-size: 24px;
      padding: 5px 20px;
    }
}

</style>