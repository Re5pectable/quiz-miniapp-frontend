import Vue from "vue";
import VueRouter from "vue-router";
import QuizPage from "@/components/QuizPage.vue";
import QuizList from "@/components/HomePage.vue";
import GamePage from "@/components/GamePage.vue";
import GameResult from "@/components/GameResult.vue";

Vue.use(VueRouter);

const routes = [
  { path: "", component: QuizList },
  { path: "/quiz/:quizId", component: QuizPage, props: true },
  { path: "/game/:gameId/result", component: GameResult, props: true },
  { path: "/game/:gameId", component: GamePage, props: true },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
