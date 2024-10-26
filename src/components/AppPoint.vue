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
            <div class="subTitleText">
                {{ point.title }}
            </div>
            <hr class="pointLine1">
        </div>
        <div v-for="(text, index) in point.texts" :key="index" class="text">
            {{ text }}
        </div>

    </div>
</template>

<style scoped>
.subTitle {
    margin-bottom: 20px;
}


.subTitleText {
    font-size: 18px;
}

hr {
    height: 2px;
    background: linear-gradient(to right, #32DBDB, #F5F5F5);
    border: none;
}

.pointLine1 {
    margin-top:2px;
}
.text {
    line-height: 1.7;
}
</style>