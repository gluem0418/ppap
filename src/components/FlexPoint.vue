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
    justify-content: center;
    gap: 20px 2%;
    /* margin: 40px auto 64px; */
    margin: 32px auto 64px;
}


.reverse {
    flex-direction: row-reverse;
}


.flameScreen {
    flex: 1;
    max-width: 500px;
}

.imgScreen {
    width: 100%;
    border-radius: 10px;
}

.flamePoint {
    max-width: 500px;
    flex: 1;
}

.appPoint2 {
    margin-top: 32px;
}

@media screen and (max-width: 800px) {
    .flexPoint {
        margin: 32px auto 64px;
        flex-direction: column;
    }

    .reverse {
        flex-direction: column;
    }

    .appPoint2 {
        margin-top: 24px;
    }


}
</style>