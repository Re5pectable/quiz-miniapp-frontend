<template>
    <WrapperComponent>
        <HeaderComponent :total="total" :current="order" />
        <QuestionLoader v-if="!question"/>
        <div class="question-container pad" v-else>
            <img :src="question?.pic_url" alt="" v-if="question?.pic_url">
            <h2>{{ question?.text }}</h2>
            <div class="answers-list">
                <div class="answer-container" v-for="answer in answers" :key="answer.id">
                    <div class="radio-container">
                        <input type="radio" :id="answer.id" name="answer" v-model="selectedAnswerId" :value="answer.id"
                            :disabled="answered" class="custom-radio"
                            :class="{ 'wrong': selectedAnswerId === answer.id && !answer.correct && answered }">
                        <label :for="answer.id"></label>
                    </div>
                    <div class="answer">
                        <p @click="choose(answer.id)" :class="{
                            'correct': answer.correct && answered,
                            'wrong': selectedAnswerId === answer.id && !answer.correct && answered
                        }">
                            {{ answer.text }}
                        </p>
                        <p v-if="answer.note" class="answer-note">{{ answer.note }}</p>
                    </div>
                </div>
            </div>
            <button class="v" :disabled="!selectedAnswerId || requesting" @click="makeAnswer()" v-if="!answered">Ответить</button>
            <button class="g" :disabled="!selectedAnswerId || requesting" @click="next()" v-else>Дальше</button>
        </div>
    </WrapperComponent>
</template>
<script>
import { apiGetGame, apiGameNext, apiMakeAnswer } from '@/api/game';
import HeaderComponent from './_Header.vue';
import QuestionLoader from './_Loader.vue';
import WrapperComponent from './_Wrapper.vue';

export default {
    props: {
        gameId: {
            type: String,
            required: true
        }
    },
    components: { HeaderComponent, QuestionLoader, WrapperComponent },
    data() {
        return {
            gameInfo: null,

            question: null,
            answers: [],

            selectedAnswerId: null,
            answered: null,
            order: null,
            total: null,

            requesting: null,
        }
    },
    async mounted() {
        this.gameInfo = await apiGetGame(this.gameId)
        if (this.gameInfo.is_finished) {
            this.$router.push(`/game/${this.gameId}/result`)
            return
        }
        await this.next()
        this.total = this.gameInfo.quiz.n_questions
    },
    methods: {
        choose(answerId) {
            if (this.answered) return;
            this.selectedAnswerId = answerId;
        },
        clear() {
            this.answered = null;
            this.selectedAnswerId = null;
            this.question = null;
            this.answers = [];
        },
        async next() {
            this.requesting = true;
            const data = await apiGameNext(this.gameId);
            if (data.is_finished) {
                this.$router.push(`/game/${this.gameId}/result`)
                return
            }
            this.requesting = false;

            this.clear()

            this.question = data.question;
            this.answers = data.answers
            this.order = data.question.order;
        },
        async makeAnswer() {
            this.requesting = true;
            const data = await apiMakeAnswer(this.gameId, this.selectedAnswerId);

            this.answers.forEach(answer => {
                if (answer.id === data.correct_id) {
                    answer.correct = true;
                }
                if (answer.id === this.selectedAnswerId) {
                    answer.note = data.chosen_note;
                }
            });
            this.answered = true;
            this.requesting = false;
        },
    }
}
</script>
<style scoped>
h2 {
    margin-left: 2px;
    margin-bottom: 32px;
}

.answers-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 48px;
}

.answer-container {
    display: flex;
    align-items: flex-start;
    /* gap: 15px */
}

img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 32px;
    pointer-events: none;
}

.answer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 3px;
    width: 100%;
}

.answer> :first-child {
    cursor: pointer;
}

.answer-note {
    margin-top: 16px;
    padding: 14px;
    color: #D7DBEB;
    background-color: #353535;
    border: 1px solid #BABFD1;
    border-radius: 8px;
}

.correct {
    color: #758BFD;
}

.wrong {
    color: #F21423
}

.radio-container {
    position: relative;
    width: 24px;
    height: 24px;
    margin-right: 15px;
}

.custom-radio {
    opacity: 0;
    position: absolute;
}

.custom-radio+label {
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: #333;
    border-radius: 50%;
    border: 2px solid #666;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.custom-radio:checked+label {
    background-color: #333;
}

.custom-radio:checked+label::after {
    content: '';
    width: 12px;
    height: 12px;
    background-color: #758BFD;
    border-radius: 50%;
}

.custom-radio.wrong:checked+label::after {
    background-color: #F21423;
}

.question-container {
    margin-top: 20px;
    /* pointer-events: none;  */
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
</style>