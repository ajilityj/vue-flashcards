<template>
  <div id="app">
    <h1>Flashcards<span>By: AJ Johnson</span></h1>

    <h2 v-if="!flashcardsLoaded">Loading cards...</h2>
    <h2 v-else>
      Instructions
      <span v-if="initialStart">to Start</span>
      <span v-if="isLastCard">to Reshuffle</span>
    </h2>

    <ul>
      <li v-if="initialStart">Press [ENTER] <small>or</small> Click (START)</li>
      <li v-if="cardsAdvancing">
        Press [ENTER] to Flip <small>or</small> Click Card to Advance
      </li>
      <li v-if="isLastCard">
        Press [ENTER] <small>or</small> Click (RESHUFFLE)
      </li>
    </ul>

    <div class="flashcards" v-if="flashcardsLoaded && viewFlashcards">
      <Flashcard
        v-for="(flashcard, index) in flashcards"
        :key="index"
        :cardIndex="index"
        :currentCard="currentCard"
        :flashcard="flashcard"
        @advanceFlashcards="advanceFlashcards()"
      />
    </div>

    <p v-if="flashcardsLoaded">
      There are {{ flashcardsCount }} questions in this stack.
    </p>
    <p v-if="viewFlashcards">You are viewing #{{ currentCard + 1 }}</p>
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
      currentCard: 0,
      flashcards: null,
      flashcardsCount: null,
      flashcardsLoaded: false,
      viewFlashcards: false
    };
  },
  mounted() {
    this.fetchFlashcards();
  },
  computed: {
    initialStart: function() {
      return this.flashcardsLoaded && !this.viewFlashcards ? true : false;
    },
    isLastCard: function() {
      return this.flashcardsLoaded &&
        this.currentCard === this.flashcardsCount - 1
        ? true
        : false;
    },
    cardsAdvancing: function() {
      return this.flashcardsLoaded && !this.initialStart && !this.isLastCard
        ? true
        : false;
    }
  },
  methods: {
    fetchFlashcards: function() {
      async function getFlashcards() {
        const response = await fetch("./flashcards.json");
        const data = await response.json();
        return data;
      }

      getFlashcards().then(data => {
        this.flashcards = data.flashcards;
        this.flashcardsCount = this.flashcards.length;
        this.flashcardsLoaded = true;
        this.viewFlashcards = true;
        this.currentCard = 0;
      });
    },
    shuffleFlashcards: function() {
      // find 'active' card
      const flashcard = document.getElementsByClassName("flashcard")[0];

      // add click event to reshuffle on click
      flashcard.addEventListener("click", () => {
        for (let i = this.flashcardsCount - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i);
          const temp = this.flashcards[i];
          this.flashcards[i] = this.flashcards[j];
          this.flashcards[j] = temp;
        }
        this.currentCard = 0;
      });
    },
    advanceFlashcards: function() {
      // if not the last card, advance to next card
      if (!this.isLastCard) this.currentCard = this.currentCard + 1;
      else {
        const flashcard = document.getElementsByClassName("flashcard")[0];

        // else, we're at the last card
        flashcard.innerHTML = "RESHUFFLE";

        this.shuffleFlashcards();
      }

      return;
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 18px;
  margin: 2em 1em;
  text-align: center;
}

h1 {
  border-bottom: 1px dashed black;
  margin: 1em 0;
  padding-bottom: 1em;
  text-transform: uppercase;

  span {
    display: block;
    font-size: 0.5em;
    line-height: 1;
    text-transform: initial;
  }
}

h2 {
  margin: 0.5em 0;
  text-transform: uppercase;
}

button {
  align-items: center;
  background-color: #eee;
  border: 1px solid black;
  border-radius: 0.5em;
  display: flex;
  font-size: 1.5em;
  line-height: 1.25;
  min-height: 300px;
  justify-content: center;
  margin: 2em auto;
  max-width: 100%;
  width: 600px;
  text-transform: uppercase;
}

ul {
  list-style: none;
  padding: 0;
}

.flashcards {
  align-items: center;
  background-color: #eee;
  border: 1px solid black;
  border-radius: 0.5em;
  display: flex;
  font-size: 1.5em;
  justify-content: center;
  line-height: 1.25;
  min-height: 300px;
  margin: 2em auto;
  max-width: 100%;
  padding: 2em;
  position: relative;
  width: 600px;
}
</style>
