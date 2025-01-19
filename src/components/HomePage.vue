<template>
    <div>
        <HeaderComponent :hideMore="true"/>
        <div class="quiz-list">
            <div v-for="quiz in quizList" class="quiz-wrapper" :key="quiz.id" @click="$router.push(`/quiz/${quiz.id}`)">
                <img class="quiz-logo" :src="quiz.logo_url">
                <div class="quiz-info">
                    <h1 class="quiz-header">{{ quiz.header }}</h1>
                    <div class="quiz-tags-list">
                        <div class="quiz-tag type">Викторина</div>
                        <div class="quiz-tag category">Искусство</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from './HeaderComponent.vue';
import { apiGetQuizList } from '@/api/quiz';

export default {
    components: { HeaderComponent },
    data() {
        return {
            quizList: [],
            selectedId: null,
        };
    },
    async mounted() {
        this.quizList = await apiGetQuizList();
    },
};
</script>
<style scoped>
.quiz-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

h1 {
    margin: 0;
    font-weight: 700;
    font-size: 24px;
    color: white;
}

.quiz-wrapper {
    background-color: #282828;
    border-radius: 20px;
    padding: 15px;
    gap: 20px;
    display: flex;
    cursor: pointer;
}

.quiz-logo {
    width: 120px;
    height: 120px;
    background-color: red;
    border-radius: 8px;
    object-fit: cover;
}

.quiz-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2px 0px;
}

.quiz-tags-list {
    display: flex;
    gap: 10px;
}

.quiz-tag {
    font-size: 14px;
    padding: 6px 13px;
    border-radius: 20px;
    font-weight: 600;
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