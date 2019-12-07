<template>
  <div id="app">
    <h1>Flashcards</h1>
    <Flashcard
      v-for="(flashcard, index) in flashcards"
      :key="index"
      :flashcard="flashcard"
    />
  </div>
</template>

<script>
import Flashcard from "./components/Flashcard.vue";

export default {
  name: "app",
  components: {
    Flashcard
  },
  data() {
    return {
      flashcards: null
    };
  },
  mounted() {
    this.fetchFlashcards();
  },
  methods: {
    fetchFlashcards: function() {
      async function getFlashcards() {
        const response = await fetch("./flashcards.json");
        const data = await response.json();
        return data;
      }
      getFlashcards().then(data => (this.flashcards = data.flashcards));
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
