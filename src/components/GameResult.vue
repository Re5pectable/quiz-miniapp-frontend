<template>
    <div>
        <QuestionLoader v-if="!result" />
        <div v-else>
            <HeaderComponent :nonSolid="true" />
            <img :src="result?.pic_url">
            <div class="result pad">
                <h1>{{ result?.copy?.points }}/{{ result?.copy?.total_questions }}</h1>
                <h3>Вы {{ result?.header }}</h3>
                <div class="result-text">
                    <p>{{ result?.text }}</p>
                </div>
                <div class="tools">
                    <button class="v" @click="share">Поделиться</button>
                    <div class="extra-tools">
                        <button class="gr" @click="$router.push('/')">Все тесты</button>
                        <button class="gr" @click="$router.push(`/quiz/${gameInfo.quiz.id}`)">Заново</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderComponent from './HeaderComponent.vue';
import { apiGetGame, apiGetResult } from '@/api/game';
import QuestionLoader from './QuestionLoader.vue';

export default {
    components: { HeaderComponent, QuestionLoader },
    props: {
        gameId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            gameInfo: null,
            result: null,
        }
    },
    async mounted() {
        this.gameInfo = await apiGetGame(this.gameId)
        if (!this.gameInfo.is_finished) {
            return
        }
        this.result = await apiGetResult(this.gameId)
    },
    methods: {
        async share() {
            const shareData = {
                title: `Тест "${this.gameInfo.quiz.header}"`,
                text: `Я прошел тест "${this.gameInfo.quiz.header}" и тебе советую!\n\nЛови ссылку: https://quiz.kley.media/quiz/${this.gameInfo.quiz.id}`,
                // url: `https://quiz.kley.media/quiz/${this.gameInfo.quiz.id}`,
            };
            await navigator.share(shareData);
        }
    }

}
</script>
<style scoped>
h1 {
    font-size: 88px;
    line-height: auto;
}

h3 {
    margin-bottom: 24px;
}

img {
    max-height: 500px;
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
}

.result {
    display: flex;
    align-items: center;
    flex-direction: column;
    /* width: 100%; */
}

.result-text {
    display: block;
    width: 100%;
    margin-bottom: 48px;
}

.tools {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.extra-tools {
    display: flex;
    gap: 12px;
}
</style>