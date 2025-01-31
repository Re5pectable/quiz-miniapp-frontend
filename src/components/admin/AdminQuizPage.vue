<template>
    <AdminPageWrapper v-if="quiz" class="quiz-config-page">
        <div class="back-btn">
            <button class="v small" @click="$router.push('/admin/quizes')">Назад</button>
        </div>
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
                <p>Виден другим</p>
                <select v-model="quiz.is_active">
                    <option :value="true">Да</option>
                    <option :value="false">Нет</option>
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
        
        <div class="devider"></div>
        <div class="add-question">
            <button class="v small" @click="isAddingQuestion=true">Создать вопрос</button>
            <div>
                
            </div>
        </div>
        
        <div class="question-list">
            <p>{{ questions }}</p>
            <div class="question-row" v-for="question in questions" :key="question.id">
                <p>{{ question.header }}</p>
                <p>{{ question.note }}</p>
                <p>{{ question.points }}</p>
            </div>
        </div>
    </div>
    </AdminPageWrapper>
</template>
<script>
import { getQuestions } from '@/api/admin/questions';
import { getQuiz, updateQuiz, deleteQuiz } from '@/api/admin/quiz'
import AdminPageWrapper from './_Wrapper.vue';

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
            deleteQuiz,
            quiz: null,
            questions: null,

            copiedData: null,
            newLogo: null,
            changed: false,

            sureDelete: false,

            isAddingQuestion: false,
        }
    },
    methods: {
        async update() {
            await updateQuiz(this.quiz, this.newLogo)
            location.reload()
        },
        async deleteFunc() {
            await deleteQuiz(this.quizId)
            this.$router.push("/admin/quizes")
        },
    },
    async mounted() {
        this.quiz = await getQuiz(this.quizId)
        this.copiedData = { ...this.quiz }
        this.questions = await getQuestions(this.quizId)
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
.back-btn {
    margin-bottom: 40px;
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
.quiz-config{
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

.question-list>button {
    width: 200px;
}
.devider{
    width: 100%;
    height: 1px;
    background-color: white;
}
</style>