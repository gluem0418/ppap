<script setup lang="ts">

import { skills } from '@/class/Skill.ts';

function getStars(rank: number): string {
  const maxStars = 5;
  const filledStars = '★'.repeat(rank);
  const emptyStars = '☆'.repeat(maxStars - rank);
  return filledStars + emptyStars;
}

</script>

<template>
  <div class="skillFlame">

    <div v-for="(skill, index) in skills" :key="index" class="skill">

      <div class="subTitle">
        <div class="subTitleText">
          {{ skill.category }}
        </div>
        <hr class="titleLine1">
      </div>

      <div v-for="(tech, index) in skill.techs" :key="index" class="techs">
        <div class="techName">
          {{ tech.name }}
        </div>
        <div class="techRank">
          {{ getStars(tech.rank) }}
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.skillFlame {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 40px 5%;
  max-width: 1100px;
}

.skill {
  width: 270px;
}

.subTitle {
  margin-bottom: 16px;
}

hr {
  height: 2px;
  background: linear-gradient(to right, rgba(255, 233, 140, 1), rgba(255, 233, 140, 0));
  border: none;
}

.titleLine1 {
  margin-top: 6px;
}

.subTitleText {
  font-size: 18px;
}


.techs {
  display: flex;
  justify-content: space-between;
  line-height: 1.7;
}

@media screen and (max-width: 800px) {
  .skillFlame {
    gap: 32px
  }

  .subTitleText {
    font-size: 16px;
  }
}
</style>