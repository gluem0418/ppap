<script setup lang="ts">

import { onMounted } from 'vue'

import Config from '@/Config.ts';
import Skills from '@/components/Skills.vue';
import MidTitle1 from '@/components/flame/MidTitle1.vue';

import FlmItem2 from '@/components/flame/FlmItem2.vue';
import FlmItem3 from '@/components/flame/FlmItem3.vue';

import imgExp1 from "/img/exp1.jpg"
import imgExp2 from "/img/exp2.jpg"

onMounted(() => {
  console.log('appList.scrollHeight', document.body.scrollHeight)
});

</script>

<template>
  <div class="compAbout">
    <div class="about" id="aboutFlame">

      <div class="secAbout">

        <div class="title"> {{ Config.mainMenu2 }} </div>

        <!-- Experience -->
        <div class="secExp">
          <MidTitle1 class="midTitle" :inside="'Experience'" :spacing="0.05" />

          <!-- Experience1 -->
          <div class="flexExp1">
            <div class="flameExp">
              <div class="subTitle">システムエンジニアとしての経験</div>
              <!-- <FlmItem2 class="midTitle" :inside="'システムエンジニアとしての経験'" /> -->
              <div class="expText">
                独立系SI企業に勤務し、主に信託銀行や地方銀行のシステム部門にて、基幹システムや営業支援システム等の開発を担当しました。<br>
                複数のシステム開発を通じてシステム全体のデータフローを理解するようになりました。また、様々な案件をリーダーやサブリーダーとして進めていく中で、案件管理のノウハウを習得しました。さらに、大規模なシステム開発を通して、他システムの担当者やユーザーとの調整を経験しました。<br>
                これまでの仕事を通じて、プログラムの開発・設計から、要件定義、影響調査、対応方針の検討、工数見積りまで幅広く担当してきました。
              </div>
            </div>
            <div class="flameScreen">
              <img class="imgScreen" :src="imgExp1" alt="experience1" />
            </div>
          </div>

          <!-- Experience2 -->
          <div class="flexExp2">
            <div class="flameExp">
              <div class="subTitle">フロントエンドエンジニアに向けて</div>
              <!-- <FlmItem2 class="midTitle" :inside="'フロントエンドエンジニアに向けて'" /> -->
              <div class="expText">
                SI企業を退社後、フリーランスとして活動を開始。以前から興味があったフロントエンド分野での仕事を目指し、Vue.jsの学習を始めました。<br>
                Vue.jsを用いて独学でWEBアプリケーションを作成しながら、フロントエンド開発のノウハウを習得しました。また、Figmaを活用してアプリのデザインを行い、WEBデザインの手法も学びました。さらに、アプリで使用する素材の編集のため、ペイントソフトやBlenderの基本的な使い方を習得しました。
              </div>
            </div>
            <div class="flameScreen">
              <img class="imgScreen" :src="imgExp2" alt="experience2" />
            </div>
          </div>

        </div>

        <!-- Skill -->
        <div class="secSkill">

          <!-- <FlmItem3 class="midTitle" :inside="'Skills'" /> -->
          <MidTitle1 class="midTitle" :inside="'Skills'" :spacing="0.1" />
          <Skills class="skills" />

        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.compAbout {
  position: relative;
  margin-top: 2000px;
  padding-bottom: 200px;
}

@media screen and (max-width: 800px) {
  .compAbout {
    margin-top: 2400px;
  }
}

.about {
  height: auto;
  background: linear-gradient(to left bottom, #3076A3, #243B66 45%, #3076A3);
  /* background: radial-gradient(rgb(168, 184, 220), rgb(228, 232, 242)); */
  /* background: #A1C5D7; */
  /* background: #3076A3; */
  /* background: #074D76; */
  /* background: #021D34; */
  border-radius: 30px;
  color: #FFFFE0;
  padding: 70px 20px 80px;
}

.secAbout {
  /* width: 88%; */
  margin: 0 auto;
}

.title {
  margin-bottom: 50px;
  font-size: 70px;
  font-family: "Marvel-Bold";
  letter-spacing: 0.05em;
  text-align: center;
  text-shadow: 2px 2px rgba(255, 255, 224, 0.5);
}

.secExp {
  /* font-family: "BIZUDPGothic"; */
}

.flexExp1 {
  display: flex;
  justify-content: center;
  gap: 20px 2.5%;
  margin: 50px auto 90px;
  /* margin-bottom: 70px; */
}

.flameExp {
  width: 60%;
  max-width: 550px;
}

.subTitle {
  font-size: 20px;
  /* font-size: 18px; */
  color: #FFE98C;
  margin-bottom: 20px;
}

@media screen and (max-width: 800px) {
  .subTitle {
    width: auto;
  }
}

.expText {
  /* font-size: 16px; */
  line-height: 1.8;
}

.flameScreen {
  align-content: center;
  width: 36%;
  max-width: 450px;
}

.imgScreen {
  width: 100%;
  border-radius: 10px;
}

@media screen and (max-width: 800px) {
  .flexExp1 {
    flex-direction: column;
  }

  .flameExp {
    width: 100%;
  }

  .flameScreen {
    /* width: 100%; */
    n: 100%;
  }
}


.flexExp2 {
  display: flex;
  justify-content: center;
  gap: 20px 2.5%;
  flex-direction: row-reverse;
  margin-bottom: 50px;
}

@media screen and (max-width: 800px) {
  .flexExp2 {
    flex-direction: column;
  }
}

.secSkill {
  margin-top: 80px;
}

.skills {
  /* margin-top: 50px; */
  margin: 50px auto;
}
</style>