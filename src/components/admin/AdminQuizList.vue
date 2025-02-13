<template>
    <AdminPageWrapper>
        <div class="quiz-table">
            <div class="quiz-list-header">
                <p>Создано</p>
                <p>Название</p>
                <p>Категория</p>
                <p>Тип</p>
                <p>Виден другим</p>
            </div>
            <div class="quiz-list">
                <div class="quiz-row" v-for="quiz in quizList" :key="quiz.id"
                    @click="$router.push(`/admin/quizes/${quiz.id}`)">
                    <p>{{ quiz.created_at.replace("T", " ").slice(0, 16) }}</p>
                    <p>{{ quiz.header }}</p>
                    <p>{{ quiz.category }}</p>
                    <p>{{ quiz.type }}</p>
                    <p>{{ quiz.is_active }}</p>
                </div>
            </div>
        </div>
        <div class="add-question-btn">
            <button class="v small" @click="isAddingQuiz = true">Создать квиз</button>
            <button class="gr small" v-if="isAddingQuiz" @click="isAddingQuiz = false">Закрыть</button>
        </div>
        <div v-if="isAddingQuiz" class="add-question-config">
            <div class="quiz-field">
                <p>Заголовок</p>
                <input v-model="newQuiz.header">
            </div>
            <div class="quiz-field">
                <p>Описание</p>
                <textarea v-model="newQuiz.text"></textarea>
            </div>
            <div class="quiz-field">
                <p>Категория</p>
                <select v-model="newQuiz.category">
                    <option value="Общество">Общество</option>
                    <option value="Искусство">Искусство</option>
                    <option value="Кино">Кино</option>
                    <option value="Литература">Литература</option>
                    <option value="Музыка">Музыка</option>
                </select>
            </div>
            <div class="quiz-field">
                <p>Категория</p>
                <input type="file" accept="image/png, image/jpeg, image/jpg"
                    @change="(event) => { newQuizLogo = event.target.files[0] }" />
            </div>
            <button class="g small" @click="createQuiz()">Создать</button>
        </div>
    </AdminPageWrapper>
</template>
<script>
import { getQuizListAdmin, apiCreateQuiz } from '@/api/admin/quiz';
import AdminPageWrapper from './_Wrapper.vue';
export default {
    components: { AdminPageWrapper },
    data() {
        return {
            quizList: [],
            isAddingQuiz: false,

            newQuiz: { point_keys: null, config: null, short_name: null, type: "Викторина", },
            newQuizLogo: null,
        }
    },
    methods: {
        async createQuiz() {
            await apiCreateQuiz(this.newQuiz, this.newQuizLogo);
            location.reload();
        }
    },
    async mounted() {
        this.quizList = await getQuizListAdmin()
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

.quiz-table {
    width: 100%;
    overflow-x: scroll;
    padding: 10px;
}

.quiz-list {
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.quiz-list-header {
    margin-bottom: 10px;
}

.quiz-row {
    cursor: pointer;
}

.quiz-row:hover {
    background-color: gray;
}

.quiz-list-header>p {
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

.quiz-row>p,
.quiz-list-header>p {
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

.add-question-btn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.quiz-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.quiz-field> :last-child {
    width: 500px;
}

.add-question-config {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    border: 1px solid white;
    border-radius: 15px;
}

.add-question-config>button {
    width: 150px !important;
}
</style>