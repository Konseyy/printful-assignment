<template>
   <div class="page" @click="selectionExpanded = false">
      <div class="container">
         <h1 class="heading">Technical Task</h1>
         <input class="nameInput" v-model="selectedName" placeholder="Enter your name" type="text" />
         <div class="selector" :class="{ expanded: selectionExpanded }">
            <div
               class="selectedOption"
               @click.stop="
                  if (!loading && selectOptions.length > 1) {
                     selectionExpanded = !selectionExpanded;
                  }
               "
            >
               <p v-if="selectedOption">{{ selectedOption.title }}</p>
               <img class="loader" v-if="loading" src="../../public/loader.png" />
            </div>
            <div class="listContainer">
               <ul class="selectContainer">
                  <li
                     @click.stop="
                        selectionExpanded = !selectionExpanded;
                        selectedId = item.id;
                     "
                     v-for="item in selectOptions"
                     :key="item.id"
                     class="selectOption"
                  >
                     {{ item.title }}
                  </li>
               </ul>
            </div>
         </div>

         <button class="startButton" @click="startQuiz()">Start</button>
         <span class="error" v-if="errorMsg">{{ errorMsg }}</span>
      </div>
   </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
export default {
   name: 'Home',
   setup: () => {
      const router = useRouter();
      const quizes = ref([]);
      const selectedId = ref(-1);
      const selectedName = ref('');
      const errorMsg = ref('');
      const selectionExpanded = ref(false);
      const loading = ref(true);
      const startQuiz = () => {
         const id = selectedId.value;
         const name = selectedName.value;
         if (id === -1) {
            errorMsg.value = 'No quiz selected';
            return;
         }
         if (!name) {
            errorMsg.value = 'You must choose a name';
            return;
         }
         router.push({ name: 'Quiz', params: { id, name } });
      };
      const selectOptions = computed(() => {
         return quizes.value.filter((quiz) => quiz.id !== selectedId.value);
      });
      const selectedOption = computed(() => {
         return quizes.value.filter((quiz) => quiz.id === selectedId.value)[0];
      });
      onMounted(async () => {
         try {
            const url = process.env.VUE_APP_USE_LOCAL_SERVER
               ? `http://localhost:${process.env.VUE_APP_SERVER_PORT}/quizes`
               : 'https://printful.com/test-quiz.php?action=quizzes';
            const res = await fetch(url);
            const r = await res.json();
            if (!r || !r[0] || !r[0].id) return;
            selectedId.value = r[0].id;
            quizes.value = r;
         } catch (e) {
            console.error('Error getting quizes', e);
         }
         loading.value = false;
      });
      return {
         quizes,
         selectedId,
         selectedName,
         startQuiz,
         selectOptions,
         selectedOption,
         selectionExpanded,
         errorMsg,
         loading,
      };
   },
};
</script>

<style scoped>
.page {
   display: flex;
   justify-content: center;
   min-height: 100vh;
   color: black;
}
* {
   box-sizing: border-box;
}
.error {
   color: red;
   margin-top: 1rem;
   font-size: 1.3rem;
}
.container {
   display: flex;
   flex-direction: column;
   align-items: center;
   width: max(35vw, 300px);
}
.heading {
   font-size: 3.5rem;
}
input {
   outline: none;
}
.nameInput,
.selectedOption,
.startButton {
   height: 3.5rem;
   text-align: center;
   font-size: 1.6rem;
   border-radius: 10px;
   box-shadow: -1px 1px 3px 1px black;
}
.nameInput {
   padding: 0 0.75rem;
   width: 100%;
   border: 1px solid black;
   margin-bottom: 1rem;
   background-color: white;
   transition: background-color 0.2s;
}
.nameInput:hover,
.nameInput:focus {
   background-color: rgb(243, 243, 243);
}
.selector {
   display: flex;
   flex-direction: column;
   width: 100%;
   margin-bottom: 1.2rem;
   user-select: none;
}
.listContainer {
   position: relative;
   display: flex;
   justify-content: center;
}
.selectContainer {
   box-shadow: -1px 1px 3px 1px black;
   width: 100%;
   display: flex;
   flex-direction: column;
   position: absolute;
   margin: 0;
   padding: 0;
   list-style: none;
   transform: scaleY(0);
   transform-origin: top;
   background-color: white;
   border: 1px solid black;
   border-top: none;
   background-color: white;
   border-bottom-right-radius: 10px;
   border-bottom-left-radius: 10px;
   opacity: 0;
   transition: transform 0.15s;
}
.expanded .selectContainer {
   opacity: 1;
   transform: scaleY(1);
}
.selectedOption {
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   border-radius: 10px;
   border: 1px solid black;
   transition: background-color 0.2s;
}
.selectedOption:hover,
.expanded .selectedOption {
   background-color: rgb(241, 241, 241);
}
.expanded .selectedOption {
   border-bottom-right-radius: 0;
   border-bottom-left-radius: 0;
}
.selectedOption p {
   margin: 0;
   font-size: 1.6rem;
}
.selectedOption:hover {
   cursor: pointer;
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
   aspect-ratio: 1;
   height: 60%;
   animation: spin 0.7s infinite linear;
}
.selectOption {
   font-size: 1.6rem;
   padding-bottom: 0.7rem;
   padding-top: 0.7rem;
   border-bottom: 1px solid black;
   transition: background-color 0.2s;
}
.selectOption:last-of-type {
   border-bottom: none;
   border-bottom-right-radius: 10px;
   border-bottom-left-radius: 10px;
}
.selectOption:hover {
   cursor: pointer;
   background-color: rgb(241, 241, 241);
}
.startButton {
   width: max(30%, 140px);
   border: none;
   background-color: blue;
   color: white;
   user-select: none;
   transition: background-color 0.25s, color 0.25s;
}
.startButton:hover {
   cursor: pointer;
}
.startButton:active {
   background-color: rgb(0, 0, 160);
   transition: background-color 0.15s, color 0.25s;
}
</style>
