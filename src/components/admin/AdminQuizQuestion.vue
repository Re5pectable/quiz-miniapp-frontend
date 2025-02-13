<template>
    <AdminPageWrapper v-if="question" class="quiz-config-page">
        <div class="back-btn">
            <button class="v small" @click="$router.push(`/admin/quizes/${question?.quiz_id}`)">Назад</button>
            <h1>Редактирование вопроса</h1>
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
                <p>{{ question.id }}</p>
            </div>
            <div class="quiz-field">
                <p>Текст</p>
                <input type="text" v-model="question.text">
            </div>
            <div class="quiz-field">
                <p>Номер</p>
                <input type="number" v-model.number="question.order">
            </div>
            <div class="quiz-field">
                <p>Изображение</p>
                <div class="quiz-logo">
                    <img :src="question.pic_url">
                    <input type="file" accept="image/png, image/jpeg, image/jpg"
                        @change="(event) => { newPicture = event.target.files[0]; changed = true }" />
                </div>
            </div>
        </div>
        <div class="devider"></div>
        <h2>Ответы</h2>
        <div>
            <div class="add-question-btn">
                <button class="v small" @click="isAddingAnswer = true">Создать ответ</button>
                <button class="gr small" v-if="isAddingAnswer" @click="isAddingAnswer = false">Закрыть</button>
            </div>
            <div v-if="isAddingAnswer" class="add-question-config">
                <div class="quiz-field">
                    <p>Текст</p>
                    <input v-model="newAnswer.text">
                </div>
                <div class="quiz-field">
                    <p>Пометка</p>
                    <input v-model="newAnswer.note">
                </div>
                <div class="quiz-field">
                    <p>Порядок</p>
                    <input type="number" v-model.number="newAnswer.order">
                </div>
                <div class="quiz-field">
                    <p>Дается балллов</p>
                    <input type="number" v-model.number="newAnswer.points">
                </div>
                <button class="g small" @click="createAnswer()">Создать</button>
            </div>
        </div>
        <div class="question-list">
            <div class="question-row" v-for="answer in answers" :key="answer.id" @click="$router.push(`/admin/answers/${answer.id}`)">
                <p>{{ answer.text }}</p>
                <p>{{ answer.points }}</p>
                <p>{{ answer.order }}</p>
            </div>
        </div>
    </AdminPageWrapper>
</template>
<script>
import { apiGetOneQuestion, apiUpdateQuestion, apiDeleteQuestion } from '@/api/admin/questions';
import { apiGetAnswers, apiCreateAnswer } from '@/api/admin/answers';
import AdminPageWrapper from './_Wrapper.vue';

export default {
    props: {
        questionId: {
            type: String,
            required: true
        },
    },
    components: { AdminPageWrapper },
    data() {
        return {
            question: null,

            copiedData: null,
            newPicture: null,
            changed: false,

            sureDelete: false,

            isAddingAnswer: false,
            newAnswer: { quiz_question_id: this.questionId, points: 1, order: 1 },

            answers: [],
        }
    },
    methods: {
        async update() {
            await apiUpdateQuestion(this.question, this.newPicture)
            location.reload()
        },
        async deleteFunc() {
            await apiDeleteQuestion(this.question.id)
            this.$router.push(`/admin/quizes/${this.question.quiz_id}`)
        },
        async createAnswer() {
            try {
                await apiCreateAnswer(this.newAnswer)
                location.reload()    
            } catch (error) {
                alert(error.response.data.detail[0].msg)
            }
            
        },
    },
    async mounted() {
        this.question = await apiGetOneQuestion(this.questionId)
        this.copiedData = { ...this.question }
        this.answers = await apiGetAnswers(this.question.id)
    },
    watch: {
        question: {
            handler() {
                this.changed = JSON.stringify(this.question) !== JSON.stringify(this.copiedData);
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
    width: 500px;
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
    width: 800px;
    margin-right: 20px;
}
.question-row > :nth-child(2){
    width: 50px;
    margin-right: 120px;
}
.question-row:hover{
    background-color: gray;
}
</style>