<script setup lang="ts">

import Config from '@/Config.ts';
import Skills from '@/components/Skills.vue';
import MidTitle1 from '@/components/flame/MidTitle1.vue';

import imgExp1 from "/img/exp1.jpg"
import imgExp2 from "/img/exp2.jpg"

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
                SI企業において、信託銀行や地方銀行のシステム開発を担当し、設計・開発から要件定義、影響調査、工数見積りに至るまで、幅広い業務に従事しました。<br>
                様々な案件を進める中で、以下のスキルを身につけました。<br>
                ・システム全体を把握する力<br>
                ・案件管理のノウハウ<br>
                ・他システム担当者やユーザーとの調整力<br>
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
                SI企業を退職後、フリーランスとして活動を開始し、フロントエンド分野でのキャリアを目指してVue.jsの学習を始めました。<br>
                Vue.jsを活用してさまざまなWebアプリを開発する中で、以下のスキルを身につけました。<br>
                ・リアクティブ性を活用したアプリの作成<br>
                ・コンポーネントベースのアプリ設計・開発<br>
                ・Webデザインの基本手法およびFigmaの使用方法<br>
                ・ペイントソフトやBlenderを用いた作業スキル<br>
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
  padding-bottom: 160px;
}


.about {
  height: auto;
  background: linear-gradient(to left bottom, #3076A3, #243B66 45%, #3076A3);
  /* background: radial-gradient(rgb(168, 184, 220), rgb(228, 232, 242)); */
  /* background: #A1C5D7; */
  /* background: #3076A3; */
  /* background: #074D76; */
  /* background: #021D34; */
  border-radius: 48px;
  color: #FFFFE0;
  padding: 64px 24px 88px;
}

.secAbout {
  /* width: 88%; */
  margin: 0 auto;
}

.title {
  margin-bottom: 40px;
  font-size: 72px;
  /* font-family: "Marvel-Bold"; */
  /* font-family: "Akshar-Light"; */
  font-family: "Akshar";
  letter-spacing: 0.1em;
  text-align: center;
  text-shadow: 2px 2px rgba(255, 255, 224, 0.5);
}


.flexExp1 {
  display: flex;
  justify-content: center;
  gap: 20px 2.5%;
  margin: 48px auto 88px;
}

.flameExp {
  width: 60%;
  max-width: 550px;
}

.subTitle {
  font-size: 20px;
  font-family: "MPLUS2-Medium";
  color: #FFE98C;
  margin-bottom: 20px;
}


.expText {
  /* font-size: 16px; */
  line-height: 1.7;
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


.flexExp2 {
  display: flex;
  justify-content: center;
  gap: 20px 2.5%;
  flex-direction: row-reverse;
}


.secSkill {
  margin-top: 88px;
}

.skills {
  margin: 40px auto 0;
}

@media screen and (max-width: 800px) {
  .compAbout {
    margin-top: 2500px;
    padding-bottom: 120px;
  }

  .title {
    font-size: 64px;
    /* margin-bottom: 32px; */
  }

  .subTitle {
    /* width: auto; */
    font-size: 16px;
    margin-bottom: 16px;
  }

  .flexExp1 {
    flex-direction: column;
    margin: 32px auto 64px;
  }

  .flameExp {
    width: 100%;
  }

  .flameScreen {
    width: 100%;
  }

  .flexExp2 {
    flex-direction: column;
  }

  .secSkill {
    margin-top: 72px;
  }

  .skills {
    margin: 32px auto 0;
  }

}
</style>