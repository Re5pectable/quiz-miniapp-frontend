<template>
    <WrapperComponent>
        <QuestionLoader v-if="!result" />
        <div v-else>
            <HeaderComponent :nonSolid="true" />
            <img :src="result?.pic_url || gameInfo.quiz.logo_url">
            <div class="result pad">
                <h1>{{ result?.copy?.points }}/{{ result?.copy?.total_questions }}</h1>
                <h3>Вы {{ result?.header.toUpperCase() }}</h3>
                <div class="result-text">
                    <p v-html="enterToBR(result?.text)"></p>
                </div>
                <div class="tools">
                    <button class="v" @click="share">Поделиться результатом</button>
                    <div class="extra-tools">
                        <button class="gr" @click="$router.push('/')">Все тесты</button>
                        <button class="gr" @click="$router.push(`/quiz/${gameInfo.quiz.id}`)">Заново</button>
                    </div>
                </div>
            </div>
        </div>
    </WrapperComponent>
</template>
<script>
import HeaderComponent from './_Header.vue';
import { apiGetGame, apiGetResult } from '@/api/game';
import QuestionLoader from './_Loader.vue';
import WrapperComponent from './_Wrapper.vue';
import { enterToBR } from '@/utils';

export default {
    components: { HeaderComponent, QuestionLoader, WrapperComponent },
    props: {
        gameId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            enterToBR,

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
            const url = `https://quiz.kley.media/share/${this.result.invitation_id}`
            const shareData = {
                // title: `Пройти тест "${this.gameInfo.quiz.header}"`,
                text: `Я ${this.result?.header}! А ты?\n\n${url}`,
                url: `https://quiz.kley.media/share/${url}`,
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