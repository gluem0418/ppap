<script setup lang="ts">
import { PropType } from 'vue';

import AppPoint from '@/components/AppPoint.vue';

import { Point } from '@/class/Application.ts';

const props = defineProps({
    order: { type: String },
    point1: { type: Object as PropType<Point>, },
    point2: { type: Object as PropType<Point>, },
    screen: { type: String },
});

</script>

<template>

    <div class="flexPoint" :class="{ 'reverse': order === '1' }">

        <div class="flamePoint">
            <AppPoint class="appPoint" :point="point1" />
            <AppPoint v-if="point2" class="appPoint2" :point="point2" />
        </div>

        <div class="flameScreen">
            <img class="imgScreen" :src="screen" alt="Screen Shot" />
        </div>

    </div>

</template>

<style scoped>
.flexPoint {
    display: flex;
    /* align-items: center; */
    gap: 20px 3%;
    margin: 50px auto;
}

@media screen and (max-width: 800px) {
    .flexPoint {
        margin: 40px auto;
        flex-direction: column;
    }
}

.reverse {
    flex-direction: row-reverse;
}

@media screen and (max-width: 800px) {
    .reverse {
        flex-direction: column;
    }
}

.flameScreen {
    /* align-content: center; */
    flex: 1;
}

.imgScreen {
    width: 100%;
    border-radius: 10px;
}

.flamePoint {
    padding: 10px 1%;
    border-radius: 10px;
    flex: 1;
}

.appPoint2 {
    margin-top: 30px;
}
</style>