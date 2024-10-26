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
  gap: 30px 10%;
}

.skill {
  width:280px;
}

.subTitle {
  margin-bottom: 16px;
}

hr {
  height: 2px;
  background: linear-gradient(to right, #C7AC70, #E4E8F2);
  border: none;
}
.titleLine1 {
  margin-top:2px;
}
.subTitleText {
  font-size: 18px;
}

.techs {
  display: flex;
  font-size: 16px;
  margin-left: 12px;
  width:250px;
  justify-content: space-between;
  line-height: 1.7;
}
.techRank {
  /* color:#C7AC70; */
}

</style>