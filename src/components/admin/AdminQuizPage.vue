<template>
    <AdminPageWrapper v-if="quiz">
        <div class="top">
            <button class="v" @click="$router.push('/admin/quizes')">Назад</button>
            <button class="g" v-if="changed" @click="update()">Обновить</button>
        </div>
        <div class="quiz-config">
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
            <div>
                <button class="r" @click="sureDelete=true" v-if="!sureDelete">Удалить</button>
                <button class="r" @click="delete_()" v-else>Да, хочу удалить</button>
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
        }
    },
    methods: {
        async update() {
            await updateQuiz(this.quiz, this.newLogo)
            location.reload()
        },
        async delete_() {
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
.top {
    display: flex;
    justify-content: space-between;
    min-width: 500px;
    max-width: 1000px;
    margin-bottom: 40px;
}
.top > button{
    width: 300px;
}

.quiz-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    min-width: 500px;
    max-width: 1000px;
}

.quiz-field> :last-child {
    width: auto;
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
input[type=text]{
    width: 600px !important;
}

.back-btn {
    margin-bottom: 40px;
}

.back-btn>button {
    width: 200px;
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
button.r{
    background-color: red;
}
</style>