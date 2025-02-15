<template>
    <WrapperComponent>
        <HeaderComponent :hideMore="true" />
        <div class="quiz-list pad">
            <div v-for="quiz in quizList" class="quiz-wrapper" :key="quiz.id" @click="$router.push(`/quiz/${quiz.id}`)">
                <img class="quiz-logo" :src="quiz.logo_url">
                <h1>ТЕСТ</h1>
                <div class="quiz-info">
                    <TagList :quiz="quiz" />
                    <h3>{{ quiz.header.toUpperCase() }}</h3>
                </div>
            </div>
        </div>
    </WrapperComponent>
</template>

<script>
import WrapperComponent from './_Wrapper.vue';
import HeaderComponent from './_Header.vue';
import TagList from './_TagList.vue';
import { apiGetQuizList } from '@/api/quiz';
import { sleep } from '@/utils';


export default {
    components: { HeaderComponent, TagList, WrapperComponent },
    data() {
        return {
            quizList: [],
            selectedId: null,
        };
    },
    async mounted() {
        const startQuizPage = window?.Telegram?.WebApp?.initDataUnsafe?.start_param
        console.log("Start param:", startQuizPage)
        this.quizList = await apiGetQuizList();
        alert("HUY")
        await sleep(5)
        if (startQuizPage) {
            this.$router.replace(`/quiz/${startQuizPage}`);
        }
    },
};
</script>
<style scoped>
.quiz-wrapper {
    padding: 16px 0;
}

.quiz-logo {
    width: 100%;
    height: 240px;
    background-color: transparent;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 16px;
}

.quiz-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
}

.quiz-tags-list {
    display: flex;
    gap: 10px;
}

.quiz-tag {
    font-size: 14px;
    padding: 6px 13px;
    border-radius: 20px;
    font-weight: 500;
    border: 1px solid rgb(172, 172, 172);
    color: rgb(194, 194, 194);
}

.quiz-tag.category {
    background-color: #ffc759;
    padding: 7px 14px;
    color: white;
    border: none;
}
</style>