import Vue from "vue";
import VueRouter from "vue-router";
import QuizPage from "@/components/games/QuizPage.vue";
import QuizList from "@/components/games/HomePage.vue";
import GamePage from "@/components/games/GamePage.vue";
import GameResult from "@/components/games/GameResult.vue";
import LoginPage from "@/components/admin/AdminLoginPage.vue";
import AdminQuizList from "@/components/admin/AdminQuizList.vue";
import AdminQuizPage from "@/components/admin/AdminQuizPage.vue";
import AdminQuizQuestion from "@/components/admin/AdminQuizQuestion.vue";
import AdminQuizAnswer from "@/components/admin/AdminQuizAnswer.vue";
import AdminQuizResult from "@/components/admin/AdminQuizResult.vue";


Vue.use(VueRouter);

const routes = [
  { path: "/", component: QuizList, name: 'home' },
  { path: "/quiz/:quizId", component: QuizPage, props: true },
  { path: "/game/:gameId/result", component: GameResult, props: true },
  { path: "/game/:gameId", component: GamePage, props: true },
  { path: "/admin/login", component: LoginPage },
  { path: "/admin/quizes/:quizId", component: AdminQuizPage, props: true },
  { path: "/admin/quizes", component: AdminQuizList },
  { path: "/admin/questions/:questionId", component: AdminQuizQuestion, props: true },
  { path: "/admin/answers/:answerId", component: AdminQuizAnswer, props: true },
  { path: "/admin/quizes/results/:resultId", component: AdminQuizResult, props: true },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
