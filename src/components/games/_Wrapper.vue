<template>
    <div class="quiz-page-wrapper">
        <div class="quiz-page">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { apiInitSession } from '@/api/session';
export default {
    data() {
    },
    async mounted() {
        await this.init();
    },
    methods: {
        async init() {
            const tg = window?.Telegram?.WebApp;
            if (tg) {
                this.tg.setHeaderColor("#000000");
                this.tg.setBackgroundColor("#000000");
                this.tg.setBottomBarColor("#000000");
            }
            console.log(this.tg)
            const userData = this.tg?.initDataUnsafe?.user
            await apiInitSession({ userData });
        }
    },
}
</script>
<style>
.quiz-page-wrapper {
    display: flex;
    justify-content: center;
    text-align: center;
    color: #2c3e50;
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    user-select: none;
}

.quiz-page {
    width: 600px;
}
</style>