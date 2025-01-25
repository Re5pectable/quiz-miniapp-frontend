<template>
    <div class="header pad" :class="{'non-solid': nonSolid}">
        <div v-if="!hideMore" class="more-btn" @click="$router.push('/')"></div>
        <img src="/img/Logo_Dark.png" class="logo">
        <span class="question-counter" v-if="current">{{ current }}/{{ total }}</span>
    </div>
</template>
<script>
export default {
    props: {
        current: {
            type: Number,
        },
        total: {
            type: Number,
        },
        hideMore: {
            type: Boolean,
            default: false,
        },
        nonSolid: {
            type: Boolean,
            default: false,
        },
    }
}
</script>
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    position: relative;
    z-index: 100;
}

img {
    width: auto;
    height: 22px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.more-btn{
    background-image: url("/public/img/more.svg");
    background-repeat: no-repeat;
    background-position: center;
    width: 20px;
    height: 20px;
    padding: 5px;
    cursor: pointer;
}
.question-counter{
    background-color: #19D429;
    padding: 4px 12px;
    color: white;
    font-size: 18px;
    border-radius: 40px;
    font-stretch: condensed;
    font-feature-settings: 'tnum' on, 'lnum' on;
}
.header.non-solid{
    margin-bottom: -72px;
}
</style>