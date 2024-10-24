<script setup lang="ts">

import Config from '@/Config.ts';
import FlmItem2 from '@/components/flame/FlmItem2.vue';

import imgExp1 from "/img/exp1.jpg"
import imgExp2 from "/img/exp2.jpg"

</script>

<template>

  <div class="about" id="aboutFlame">

    <div class="secAbout">

      <div class="title"> {{ Config.mainMenu2 }} </div>

      <!-- Experience -->
      <div class="secExp">

        <!-- Experience1 -->
        <div class="flexExp1">
          <div class="flameExp">
            <FlmItem2 class="midTitle" :inside="'システムエンジニアとしての経験'" />
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
            <FlmItem2 class="midTitle" :inside="'フロントエンドエンジニアに向けて'" />
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

    </div>

  </div>

</template>

<style scoped>
.about {
  position: relative;
  /* margin: 500px auto 0; */
  margin: auto;
  width: 94%;
  height: auto;
  /* background: radial-gradient(rgba(168, 184, 220, 0.97), rgba(228, 232, 242, 0.97)); */
  background: radial-gradient(rgb(168, 184, 220), rgb(228, 232, 242));
  border-radius: 30px;
  color: #121F30;
  font-size: 20px;
  z-index: 2;
  padding: 90px 0;
}

.secAbout {
  width: 90%;
  margin: 0 auto;
}

.title {
  margin-bottom: 80px;
  font-size: 60px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.secExp {
  font-family: "BIZUDPGothic";
}

.flexExp1 {
  display: flex;
  gap: 4%;
  margin-bottom:70px;
}

@media screen and (max-width: 800px) {
  .flexExp1 {
    flex-direction: column;
  }
}

.flameExp {
  width: 60%;
}

.midTitle {
  /* align-items: flex-start; */
}

.expText {
  margin-top:40px;
  font-size: 16px;
  line-height: 1.8;
}

.flameScreen {
  align-content: center;
  width: 36%;
}

.imgScreen {
  width: 100%;
  border-radius: 10px;
}

.flexExp2 {
  display: flex;
  gap: 4%;
  flex-direction: row-reverse;
  margin-bottom: 50px;
}

@media screen and (max-width: 800px) {
  .flexExp2 {
    flex-direction: column;
  }
}
</style>