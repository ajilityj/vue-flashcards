<template>
  <div id="app">
    <h1>Flashcards<span>By: AJ Johnson</span></h1>

    <h2>
      Instructions
      <span v-if="initialStart">to Start</span>
      <span v-if="cardsAdvancing">to Advance</span>
      <span v-if="cardsEnd">to Reshuffle</span>
    </h2>

    <ul>
      <li v-if="initialStart">Press [ENTER] <small>or</small> Click (START)</li>
      <li v-if="cardsAdvancing">Press [ENTER] <small>or</small> Click Card</li>
      <li v-if="cardsEnd">Press [ENTER] <small>or</small> Click (RESHUFFLE)</li>
    </ul>

    <button v-if="initialStart || cardsEnd" @click="showFlashcards()">
      {{ initialStart && !flashcardsLoaded ? "Loading Flashcards..." : "" }}
      {{ initialStart && flashcardsLoaded ? "Start" : "" }}
      {{ cardsEnd ? "Reshuffle" : "" }}
    </button>

    <Flashcards
      v-if="flashcardsLoaded && cardsAdvancing"
      :flashcards="flashcards"
      :flashcardsCount="flashcardsCount"
      :showFlashcards="cardsAdvancing"
      @lastCard="hideFlashcards()"
    />

    <p v-if="flashcardsLoaded && !cardsAdvancing">
      There are {{ flashcardsCount }} cards in this stack.
    </p>
  </div>
</template>

<script>
import Flashcards from "./components/Flashcards.vue";

export default {
  name: "app",
  components: {
    Flashcards
  },
  data() {
    return {
      flashcardsLoaded: false,
      initialStart: true,
      cardsAdvancing: false,
      cardsEnd: false,
      flashcards: null,
      flashcardsCount: null
    };
  },
  mounted() {
    this.fetchFlashcards();

    window.addEventListener("keyup", event => {
      if (event.keyCode === 13 && this.flashcardsLoaded) this.showFlashcards();
    });
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
      });
    },
    showFlashcards: function() {
      if (this.flashcardsLoaded) {
        this.initialStart = false;
        this.cardsEnd = false;
        this.shuffleFlashcards();
      } else {
        console.log("cards not yet loaded");
      }
    },
    hideFlashcards: function() {
      this.cardsAdvancing = false;
      this.cardsEnd = true;
    },
    shuffleFlashcards: function() {
      for (let i = this.flashcards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = this.flashcards[i];
        this.flashcards[i] = this.flashcards[j];
        this.flashcards[j] = temp;
      }
      this.cardsAdvancing = true;
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
</style>
