<template>
    <AdminPageWrapper v-if="quiz" class="quiz-config-page">
        <div class="back-btn">
            <button class="v small" @click="$router.push('/admin/quizes')">Назад</button>
            <h1>Редактирование квиза</h1>
        </div>
        <div class="devider"></div>
        <div class="quiz-config">
            <div class="quiz-manage-btn">
                <div class="delete-btn">
                    <button class="r small" @click="sureDelete = true" v-if="!sureDelete">Удалить</button>
                    <button class="r small" @click="deleteFunc()" v-else>Да, хочу удалить</button>
                </div>
                <button class="g small" v-if="changed" @click="update()">Обновить</button>
            </div>
            <div class="quiz-field">
                <p>ID</p>
                <p>{{ quiz.id }}</p>
            </div>
            <div class="quiz-field">
                <p>Опубликован</p>
                <select v-model="quiz.is_active">
                    <option :value="true">Да</option>
                    <option :value="false">Нет</option>
                </select>
            </div>
            <div class="devider"></div>
            <div class="quiz-field">
                <p>Заголовок</p>
                <input type="text" v-model="quiz.header">
            </div>
            <div class="quiz-field">
                <p>Описание</p>
                <textarea v-model="quiz.text"></textarea>
            </div>
            <div class="quiz-field">
                <p>Тип</p>
                <select v-model="quiz.type">
                    <option value="Викторина">Викторина</option>
                </select>
            </div>
            <div class="quiz-field">
                <p>Категория</p>
                <select v-model="quiz.category">
                    <option value="Общество">Общество</option>
                    <option value="Искусство">Искусство</option>
                    <option value="Кино">Кино</option>
                    <option value="Литература">Литература</option>
                    <option value="Музыка">Музыка</option>
                </select>
            </div>
            <div class="quiz-field">
                <p>Обложка</p>
                <div class="quiz-logo">
                    <img :src="quiz.logo_url">
                    <input type="file" accept="image/png, image/jpeg, image/jpg"
                        @change="(event) => { newLogo = event.target.files[0]; changed = true }" />
                </div>
            </div>
        </div>
        <div class="devider"></div>
        <h2>Результаты</h2>
        <div>
            <div class="add-question-btn">
                <button class="v small" @click="isAddingResult = true">Создать результат</button>
                <button class="gr small" v-if="isAddingResult" @click="isAddingResult = false">Закрыть</button>
            </div>
            <div v-if="isAddingResult" class="add-question-config">
                <div class="quiz-field">
                    <p>Заголовок</p>
                    <input v-model="newResult.header">
                </div>
                <div class="quiz-field">
                    <p>Текст</p>
                    <textarea v-model="newResult.text"></textarea>
                </div>
                <div class="quiz-field">
                    <p>Нужно очков, минимум</p>
                    <input type="number" v-model.number="newResult.points[0]">
                </div>
                <div class="quiz-field">
                    <p>Нужно очков, максимум</p>
                    <input type="number" v-model.number="newResult.points[1]">
                </div>
                <div class="quiz-field">
                    <p>Обложка</p>
                    <input type="file" accept="image/png, image/jpeg, image/jpg"
                        @change="(event) => { newResultPic = event.target.files[0] }" />
                </div>
                <button class="g small" @click="createResult()">Создать</button>
            </div>
        </div>
        <div class="result-list">
            <div class="result-row" v-for="result in results" :key="result.id" @click="$router.push(`/admin/quizes/results/${result.id}`)">
                <p>"{{ result.header }}", баллы от {{ result.points[0] }} до {{ result.points[1] }}</p>
            </div>
        </div>
        <div class="devider"></div>
        <h2>Вопросы</h2>
        <div>
            <div class="add-question-btn">
                <button class="v small" @click="isAddingQuestion = true">Создать вопрос</button>
                <button class="gr small" v-if="isAddingQuestion" @click="isAddingQuestion = false">Закрыть</button>
            </div>
            <div v-if="isAddingQuestion" class="add-question-config">
                <div class="quiz-field">
                    <p>Текст</p>
                    <input v-model="newQuestion.text">
                </div>
                <div class="quiz-field">
                    <p>Номер</p>
                    <input type="number" v-model.number="newQuestion.order">
                </div>
                <div class="quiz-field">
                    <p>Обложка</p>
                    <input type="file" accept="image/png, image/jpeg, image/jpg"
                        @change="(event) => { newQuestionPic = event.target.files[0] }" />
                </div>
                <button class="g small" @click="createQuestion()">Создать</button>
            </div>
        </div>
        <div class="question-list">
            <div class="question-row" v-for="question in questions" :key="question.id" @click="$router.push(`/admin/questions/${question.id}`)">
                <img :src="question.pic_url">
                <p>{{ question.text }}</p>
                <p>{{ question.order }}</p>
            </div>
        </div>
    </AdminPageWrapper>
</template>
<script>
import { apiGetQuestions, apiCreateQuestion } from '@/api/admin/questions';
import { apiGetQuiz, apiUpdateQuiz, apiDeleteQuiz } from '@/api/admin/quiz'
import AdminPageWrapper from './_Wrapper.vue';
import { apiCreateResult, getResultList } from '@/api/admin/results';

export default {
    props: {
        quizId: {
            type: String,
            required: true
        },
    },
    components: { AdminPageWrapper },
    data() {
        return {
            deleteQuiz: apiDeleteQuiz,
            quiz: null,
            questions: [],
            results: [],

            copiedData: null,
            newLogo: null,
            changed: false,

            sureDelete: false,

            isAddingQuestion: false,
            isAddingResult: false,

            newQuestion: { quiz_id: this.quizId, order: 1 },
            newQuestionPic: null,

            newResult: { quiz_id: this.quizId, points: [null, null]},
            newResultPic: null,
        }
    },
    methods: {
        async update() {
            await apiUpdateQuiz(this.quiz, this.newLogo)
            location.reload()
        },
        async deleteFunc() {
            await apiDeleteQuiz(this.quizId)
            this.$router.push("/admin/quizes")
        },
        async createQuestion() {
            try {
                await apiCreateQuestion(this.newQuestion, this.newQuestionPic)
                location.reload()    
            } catch (error) {
                alert(error.response.data.detail[0].msg)
            }
        },
        async createResult() {
            try {
                await apiCreateResult(this.newResult, this.newResultPic)
                location.reload()    
            } catch (error) {
                alert(error.response.data.detail[0].msg)
            }
        },
    },
    async mounted() {
        this.quiz = await apiGetQuiz(this.quizId)
        this.copiedData = { ...this.quiz }
        this.questions = await apiGetQuestions(this.quizId)
        this.results = await getResultList(this.quizId)
    },
    watch: {
        quiz: {
            handler() {
                this.changed = JSON.stringify(this.quiz) !== JSON.stringify(this.copiedData);
            },
            deep: true
        }
    }
}
</script>
<style scoped>
h2{
    margin-bottom: 20px;
}
.back-btn {
    display: flex;
    align-items: center;
    gap: 15px;
}

.quiz-manage-btn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.right-top-btn {
    display: flex;
    gap: 10px;
}

.top>button {
    width: 300px;
}

.quiz-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.quiz-field> :last-child {
    width: auto;
}

.quiz-config-page {
    min-width: 500px;
    max-width: 1000px;
}

.quiz-config {
    display: flex;
    flex-direction: column;
    gap: 15px;
}


textarea {
    height: 400px;
    width: 600px !important;
}

input[type=text] {
    width: 600px !important;
}

img {
    height: auto;
    width: 100px;
}

.quiz-logo {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.quiz-logo>input {
    width: 150px
}

button.r {
    background-color: red;
}

.delete-btn>button {
    width: 200px;
}
.question-list{
    width: 100%;
    display: flex;
    gap: 15px;
    flex-direction: column;
}

.devider {
    width: 100%;
    height: 1px;
    background-color: white;
    margin: 30px 0;
}

.add-question-btn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    
}
.add-question-config{
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    border: 1px solid white;
    border-radius: 15px;
}
.add-question-config > button{
    width: 150px !important;
}
.question-row{
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid white;
    padding: 15px;
    border-radius: 15px;
    box-sizing: border-box;
    cursor: pointer;
}
.question-row > :nth-child(1){
    width: 50px !important;
    margin-right: 20px;
}
.question-row > :nth-child(2){
    width: 450px;
    margin-right: 120px;
}


.question-row:hover{
    background-color: gray;
}
.result-list{
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.result-row{
    border: 1px solid white;
    padding: 15px;
    border-radius: 15px;
}
.result-row:hover{
    background-color: grey;
    box-sizing: border-box;
    cursor: pointer;
}
</style>