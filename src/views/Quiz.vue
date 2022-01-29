<template>
   <div class="page">
      <h1 :class="{ hide: progress === 1 }" class="heading">Question {{ onQuestion + 1 }}</h1>
      <h2 :class="{ hide: loading }" class="question">{{ questionText }}</h2>
      <div class="answerContainer">
         <div class="loader" :class="{ hide: !loading }">
            <img src="../../public/loader.png" />
         </div>
         <ul class="answers" :class="{ hide: loading }">
            <li
               v-for="(item, index) in answers"
               :key="item.id"
               @click.stop="selectedAnswer = index"
               class="answer"
               :class="{ active: selectedAnswer === index }"
            >
               {{ item.title }}
            </li>
         </ul>
      </div>
      <div class="progressBar">
         <div class="progress" :style="{ width: `${progress * 100}%` }" />
      </div>
      <div class="nextButton" :class="{ hide: progress === 1 }" @click="nextQuestion()">Next</div>
      <span class="error" :class="{ hide: !errorMsg }">{{ errorMsg }}</span>
   </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted } from '@vue/runtime-core';
export default {
   setup() {
      const route = useRoute();
      const router = useRouter();
      const { id, name } = route.params;
      const answers = ref([]);
      const selectedAnswer = ref(-1);
      const onQuestion = ref(0);
      const questionText = ref('');
      const loading = ref(true);
      const errorMsg = ref('');
      let questions = [];
      let chosenAnswers = [];
      const redirectToHome = () => {
         router.push({ name: 'Home' });
      };
      if (!id || !name) {
         redirectToHome();
         return;
      }

      const fetchQuiz = async (id) => {
         try {
            const res = await fetch(`https://printful.com/test-quiz.php?action=questions&quizId=${id}`);
            const r = await res.json();
            return r;
         } catch (e) {
            console.error('Error getting quiz data', e);
         }
      };
      const fetchAnswers = async (quizId, questionId) => {
         if (!quizId || !questionId) return;
         try {
            const res = await fetch(`https://printful.com/test-quiz.php?action=answers&quizId=${quizId}&questionId=${questionId}`);
            const r = await res.json();
            return r;
         } catch (e) {
            console.error('Error getting question', e);
         }
      };
      const progress = computed(() => {
         const val = onQuestion.value;
         if (val === 0) return 0;
         return val / questions.length;
      });
      const completeQuiz = async () => {
         try {
            let url = `https://printful.com/test-quiz.php?action=submit&quizId=${id}`;
            chosenAnswers.forEach((answer) => {
               url += `&answers[]=${answer}`;
            });
            const res = await fetch(url);
            const r = await res.json();
            router.push({ name: 'Results', params: { name, total: r.total, correct: r.correct } });
            return;
         } catch (e) {
            console.error('Error submitting results', e);
            router.push({ name: 'Home' });
         }
      };
      const nextQuestion = async () => {
         if (selectedAnswer.value === -1) {
            errorMsg.value = 'Please select an answer';
            return;
         }
         errorMsg.value = '';
         chosenAnswers.push(answers.value[selectedAnswer.value].id);
         loading.value = true;
         onQuestion.value++;
         if (onQuestion.value >= questions.length) {
            completeQuiz();
            return;
         } else {
            selectedAnswer.value = -1;
            answers.value = await fetchAnswers(id, questions[onQuestion.value].id);
            questionText.value = questions[onQuestion.value].title;
            loading.value = false;
         }
      };
      onMounted(async () => {
         questions = await fetchQuiz(id);
         if (!questions || questions.error) {
            redirectToHome();
            return;
         }
         answers.value = await fetchAnswers(id, questions[onQuestion.value].id);
         questionText.value = questions[0].title;
         loading.value = false;
      });
      return {
         id,
         name,
         answers,
         progress,
         onQuestion,
         selectedAnswer,
         questionText,
         loading,
         errorMsg,
         nextQuestion,
      };
   },
};
</script>

<style scoped>
.page {
   display: flex;
   align-items: center;
   flex-direction: column;
   min-height: 100vh;
   color: black;
}
.error {
   margin-top: 1rem;
   color: red;
   font-size: 1.3rem;
}
.heading {
   font-size: min(4.5rem, 10vw);
   margin: 0;
   margin-bottom: 1rem;
   padding-top: 0.5rem;
}
.question {
   font-size: min(3rem, 6.5vw);
   margin: 0;
   margin-bottom: 0.5rem;
   width: 90%;
}
.hide {
   opacity: 0;
}
.hide:hover,
.hide:hover * {
   cursor: default !important;
}
.answerContainer {
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   width: 100%;
   min-height: 25vh;
}
.answers {
   display: grid;
   grid-template-columns: repeat(2, minmax(0, 1fr));
   list-style: none;
   column-gap: min(5rem, 4.5vw);
   row-gap: min(1.5rem, 2.8vw);
   padding: 0;
   width: min(90%, 1750px);
}
.answer {
   display: flex;
   align-items: center;
   justify-content: center;
   box-sizing: border-box;
   padding: min(2rem, 12vw) min(6rem, 12vw);
   border-radius: 10px;
   width: 100%;
   border: 1px solid black;
   font-size: clamp(1.6rem, 4vw, 3rem);
   box-shadow: -1px 1px 3px 1px black;
   user-select: none;
   transition: 0.3s;
}
.answer:hover {
   cursor: pointer;
}
.answer.active,
.answer:hover {
   background-color: blue;
   color: white;
   border: 1px solid blue;
}
@keyframes spin {
   0% {
      transform: rotate(0deg);
   }
   100% {
      transform: rotate(360deg);
   }
}
.loader {
   position: absolute;
   font-size: 2rem;
   font-weight: bold;
   display: flex;
   align-items: center;
   justify-content: center;
   margin: 1rem 0;
}
.loader img {
   aspect-ratio: 1;
   height: 4rem;
   animation: spin 0.7s infinite linear;
}
.progressBar {
   margin-top: 2rem;
   position: relative;
   width: calc(clamp(300px, 60%, 650px));
   height: 1.2rem;
   border-radius: 1rem;
   border: 0.5px solid black;
   overflow: hidden;
}
.progress {
   position: absolute;
   background-image: linear-gradient(-45deg, rgb(54, 164, 255), rgb(0, 0, 153));
   height: 100%;
   transition: width 0.3s;
}
.nextButton {
   margin-top: 2rem;
   padding: min(0.8rem, 3vw) min(3rem, 10vw);
   border-radius: 15px;
   font-size: 1.6rem;
   transition: background-color 0.25s, color 0.25s;
   user-select: none;
   background-color: blue;
   color: white;
   box-shadow: -1px 1px 3px 1px black;
}
.nextButton:hover {
   cursor: pointer;
}
.nextButton:active {
   background-color: rgb(0, 0, 160);
   transition: background-color 0.15s, color 0.25s;
}
@media only screen and (max-width: 1000px) {
   .answers {
      width: 88%;
      grid-template-columns: 1fr;
   }
}
</style>
