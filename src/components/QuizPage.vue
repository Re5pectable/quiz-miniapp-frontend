<template>
    <div>
        <HeaderComponent />
        <div class="image-container">
            <img :src="quiz?.logo_url" alt="Quiz Logo" />
        </div>
        <h1>{{ quiz?.header }}</h1>
        <p class="description">{{ quiz?.text }}</p>
        <button @click="startGame()">Начать</button>
    </div>

</template>
<script>
import HeaderComponent from './HeaderComponent.vue';
import { apiGetQuiz } from '@/api/quiz';
import { apiStartGame } from '@/api/game';

export default {
    props: {
        quizId: {
            type: String,
            required: true,
        }
    },
    components: { HeaderComponent },
    data() {
        return {
            quiz: null,
        }
    },
    methods: {
        async startGame() {
            const { game_id } = await apiStartGame(this.quizId)
            this.$router.push(`/game/${game_id}`)
        }
    },
    async mounted() {
        this.quiz = await apiGetQuiz(this.quizId);
    },
}
</script>
<style scoped>
.image-container {
    position: relative;
    width: 100%;
}

img {
    max-height: 500px;
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
}

h1 {
    color: white;
    text-align: left;
    margin: 0px;
    margin-top: 15px;
    margin-bottom: 5px;
}

p {
    text-align: left;
    color: white;
    margin: 0;
}

button {
    background-color: #758BFD;
}
</style>