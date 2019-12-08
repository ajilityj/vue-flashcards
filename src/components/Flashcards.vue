<template>
  <div class="flashcards">
    <div v-for="(flashcard, index) in flashcards" :key="index">
      <Flashcard
        :flashcard="flashcard"
        :q="showQuestion"
        v-if="index + 1 === currentCard"
        @nextQuestion="nextQuestion()"
      />
    </div>
  </div>
</template>

<script>
import Flashcard from "./Flashcard.vue";

export default {
  name: "Flashcards",
  components: {
    Flashcard
  },
  props: ["flashcards", "showFlashcards"],
  data() {
    return {
      currentCard: this.showFlashcards ? 1 : null,
      numCards: this.flashcards.length,
      lastCard: this.flashcards.length > 1 ? false : true,
      showQuestion: true
    };
  },
  methods: {
    nextQuestion: function() {
      if (this.currentCard < this.numCards) {
        this.currentCard = this.currentCard + 1;

        if (this.currentCard + 1 === this.numCards) this.lastCard = true;
      } else {
        this.$emit("lastCard", "ready for reshuffle");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.flashcards {
  background-color: #eee;
  border: 1px solid black;
  border-radius: 0.5em;

  align-items: center;
  display: flex;
  min-height: 250px;
  justify-content: center;
  margin: 2em auto;
  max-width: 100%;
  // padding: 2em;
  width: 500px;
}
</style>
