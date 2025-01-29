<template>
    <AdminPageWrapper class="">
        <div class="create-btn"><button class="v">Создать</button></div>
        <div class="quiz-table">
            <div class="quiz-list-header">
                <p>Создано</p>
                <p>Название</p>
                <p>Категория</p>
                <p>Тип</p>
                <p>Виден другим</p>
            </div>
            <div class="quiz-list">
                <div class="quiz-row" v-for="quiz in quizList" :key="quiz.id" @click="$router.push(`/admin/quizes/${quiz.id}`)">
                    <p>{{ quiz.created_at.replace("T", " ").slice(0, 16) }}</p>
                    <p>{{ quiz.header }}</p>
                    <p>{{ quiz.category }}</p>
                    <p>{{ quiz.type }}</p>
                    <p>{{ quiz.is_active }}</p>
                </div>
            </div>
        </div>
    </AdminPageWrapper>
</template>
<script>
import { getQuizList } from '@/api/admin/quiz';
import AdminPageWrapper from './_Wrapper.vue';
export default {
    components: { AdminPageWrapper },
    data() {
        return {
            quizList: [],
        }
    },
    async mounted() {
        this.quizList = await getQuizList()
    },
}
</script>
<style scoped>
.create-btn {
    display: flex;
    justify-content: flex-start;
}

.create-btn>button {
    width: 200px;
}
.quiz-table{
    width: 100%;
    overflow-x: scroll;
    padding: 10px;
}
.quiz-list{
    display: flex;
    flex-direction: column;
    gap: 3px;
}
.quiz-list-header{
    margin-bottom: 10px;
}
.quiz-row{
    cursor: pointer;
}
.quiz-row:hover{
    background-color: gray;
}
.quiz-list-header > p{
    font-weight: 700;
}
.quiz-list-header,
.quiz-row {
    display: flex;
    align-items: center;
    text-align: left;
    min-width: 1000px;
    padding: 10px;
}
.quiz-row > p,
.quiz-list-header > p{
    padding-right: 25px;
}
.quiz-list-header> :nth-child(1),
.quiz-row> :nth-child(1) {
    width: 180px;
}

.quiz-list-header> :nth-child(2),
.quiz-row> :nth-child(2) {
    width: 550px;
}

.quiz-list-header> :nth-child(3),
.quiz-row> :nth-child(3) {
    width: 180px;
}

.quiz-list-header> :nth-child(4),
.quiz-row> :nth-child(4) {
    width: 180px;
}
.quiz-list-header> :last-child,
.quiz-row> :last-child {
    width: 180px;
}
</style>