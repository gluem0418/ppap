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
  /* justify-content: center; */
  flex-wrap: wrap;
  gap: 40px 5%;
  max-width:1100px;
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

@media screen and (max-width: 800px) {
  .subTitleText {
    font-size: 16px;
  }
}

.techs {
  display: flex;
  /* font-size: 16px; */
  /* margin-left: 12px; */
  /* width: 250px; */
  justify-content: space-between;
  font-size: 15px;
  line-height: 1.8;
}

.techRank {
  /* color:#FFE98C; */
}
</style>