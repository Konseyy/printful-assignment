<template>
   <div class="page">
      <h1 :class="{ hide: progress === 1 }">Question {{ onQuestion + 1 }}</h1>
      <h2 :class="{ hide: loading }">{{ questionText }}</h2>
      <div class="answerContainer">
         <div class="loader" :class="{ hide: !loading }">Loading...</div>
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
      console.log('params', id, name);
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
            console.log('results', r);
            return;
         } catch (e) {
            console.error('Error submitting results', e);
         }
      };
      const nextQuestion = async () => {
         console.log('selected answer', answers.value[selectedAnswer.value]);
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
   /* justify-content: center; */
   align-items: center;
   flex-direction: column;
   min-height: 100vh;
}
.error {
   margin-top: 1rem;
   color: red;
}
.hide {
   opacity: 0;
}
.hide:hover, .hide:hover *{
   cursor: default !important;
}
.answerContainer {
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
}
.answers {
   display: grid;
   grid-template-columns: 1fr 1fr;
   list-style: none;
   column-gap: 1.5rem;
   row-gap: 0.65rem;
   padding: 0;
}
.answer {
   display: flex;
   align-items: center;
   justify-content: center;
   box-sizing: border-box;
   padding: 2rem 5.5rem;
   border-radius: 10px;
   width: 100%;
   border: 1px solid black;
   font-size: 1.4rem;
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
.loader {
   position: absolute;
	font-size: 2rem;
	font-weight: bold;
}
.progressBar {
   margin-top: 2rem;
   position: relative;
   width: calc(clamp(300px, 25vw, 650px));
   height: 1rem;
   background-color: white;
   border-radius: 10px;
   border: 1px solid black;
   overflow: hidden;
}
.progress {
   position: absolute;
   background-color: black;
   height: 100%;
   transition: width 0.3s;
}
.nextButton {
   margin-top: 2rem;
   padding: 0.5rem 2.5rem;
   background-color: gray;
   border-radius: 1rem;
   color: white;
}
.nextButton:hover {
   cursor: pointer;
}
</style>
