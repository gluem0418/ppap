<template>
    <div v-if="point" class="appPoint">

        <div class="subTitle">
            <IconArrow class="iconArrow" />
            <span class="subTitleText">
                {{ point.title }}
            </span>
        </div>

        <div v-for="(text, index) in point.texts" :key="index" class="text">
            {{ text }}
        </div>
    
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import IconArrow from '@/components/icon/IconArrow.vue';

import { Point } from '@/class/Application.ts';

const props = defineProps({
    point: { type: Object as PropType<Point>, },
});

</script>
  
<style scoped>
.subTitle {
    font-size: 18px;
    margin-bottom: 16px;
    /* border:solid; */
    display: flex;
    align-items: center;
}

.iconArrow {
    margin-top: -2px;
}

.subTitleText {
    margin-left: 4px;
}

.text {
    margin-left: 10px;
    margin-bottom: 6px;
}
</style>