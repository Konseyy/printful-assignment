<template>
   <div class="page">
      <h1 class="heading">Thanks, {{ name }}!</h1>
      <p class="description">You responded correctly to {{ correct }} out of {{ total }} questions.</p>
      <button @click="returnHome" class="returnButton">Back</button>
   </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
export default {
   setup() {
      const route = useRoute();
      const router = useRouter();
      const { name, total, correct } = route.params;
      const returnHome = () => {
         router.push({ name: 'Home' });
      };
      if (!name || !total || !correct) {
         router.push({ name: 'Home' });
      }
      return {
         name,
         total,
         correct,
         returnHome,
      };
   },
};
</script>

<style scoped>
* {
   margin: 0;
   padding: 0;
}
.page {
   min-height: 100vh;
   color: black;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
}
.heading {
   margin-bottom: 1rem;
   font-size: min(3.5rem, 10vw);
}
.description {
   font-size: min(1.5rem, 5vw);
   margin-bottom: 2rem;
}
.returnButton {
   font-size: 2rem;
   padding: 0.5rem 1.5rem;
   background-color: blue;
   border: none;
   border-radius: 10px;
   color: white;
   box-shadow: -1px 1px 3px 1px black;
   transition: 0.25s;
}
.returnButton:hover {
   cursor: pointer;
}
.returnButton:active {
   background-color: rgb(0, 0, 160);
}
</style>
