<template>
    <AdminPageWrapper v-if="answer" class="quiz-config-page">
        <div class="back-btn">
            <button class="v small" @click="$router.push(`/admin/questions/${answer?.quiz_question_id}`)">Назад</button>
            <h1>Редактирование ответа</h1>
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
                <p>{{ answer.id }}</p>
            </div>
            <div class="quiz-field">
                <p>Текст</p>
                <textarea v-model="answer.text"></textarea>
            </div>
            <div class="quiz-field">
                <p>Пометка</p>
                <textarea type="number" v-model="answer.note"></textarea>
            </div>
            <div class="quiz-field">
                <p>Номер</p>
                <input type="number" v-model.number="answer.order">
            </div>
            <div class="quiz-field">
                <p>Дается балллов</p>
                <input type="number" v-model.number="answer.points">
            </div>
        </div>
    </AdminPageWrapper>
</template>
<script>
import { apiGetOneAnswer } from '@/api/admin/answers';
import { apiUpdateAnswer, apiDeleteAnswer } from '@/api/admin/answers';
import AdminPageWrapper from './_Wrapper.vue';

export default {
    props: {
        answerId: {
            type: String,
            required: true
        },
    },
    components: { AdminPageWrapper },
    data() {
        return {
            answer: null,
            copiedData: null,

            changed: false,

            sureDelete: false,
        }
    },
    methods: {
        async update() {
            await apiUpdateAnswer(this.answer)
            location.reload()
        },
        async deleteFunc() {
            await apiDeleteAnswer(this.answer.id)
            this.$router.push(`/admin/questions/${this.answer.quiz_question_id}`)
        },
    },
    async mounted() {
        this.answer = await apiGetOneAnswer(this.answerId)
        this.copiedData = { ...this.answer }
    },
    watch: {
        answer: {
            handler() {
                this.changed = JSON.stringify(this.answer) !== JSON.stringify(this.copiedData);
            },
            deep: true
        }
    }
}
</script>
<style scoped>
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
    background-color: black;
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