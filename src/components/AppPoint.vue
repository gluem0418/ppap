<script setup lang="ts">

import { PropType } from 'vue';
import { Point } from '@/class/Application.ts';

const props = defineProps({
    point: { type: Object as PropType<Point>, },
});

</script>

<template>
    <div v-if="point" class="appPoint">

        <div class="subTitle">
            {{ point.title }}
        </div>
        <div v-for="(text, index) in point.texts" :key="index" class="text">
            {{ text }}
        </div>

    </div>
</template>

<style scoped>
.subTitle {
    margin-bottom: 20px;
    font-family: "MPLUS2-Medium";
    font-size: 20px;
    /* font-size: 18px; */
    color:#FFE98C;
}

@media screen and (max-width: 800px) {
    .subTitle {
        margin-bottom: 16px;
        font-size: 16px;
    }
}

.text {
    line-height: 1.7;
    transform: rotate(0.05deg);
}
</style>