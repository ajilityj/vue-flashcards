<template>
  <div class="flashcards" @click="flipCard()">
    <div
      class="flashcard"
      v-for="(flashcard, index) in flashcards"
      :key="index"
    >
      <span
        v-if="index + 1 === currentCard"
        :class="[showQuestion ? 'question' : 'answer']"
      >
        {{
          showQuestion ? `Q: ${flashcard.question}` : `A: ${flashcard.answer}`
        }}
      </span>
      <span class="progress" v-if="index + 1 === currentCard">
        {{ currentCard }} / {{ flashcardsCount }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Flashcards",
  props: ["flashcards", "flashcardsCount", "showFlashcards"],
  data() {
    return {
      currentCard: this.showFlashcards ? 1 : null,
      lastCard: this.flashcardsCount > 1 ? false : true,
      showQuestion: true
    };
  },
  mounted() {
    window.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        this.flipCard();
      }
    });
  },
  methods: {
    flipCard: function() {
      if (this.showQuestion) {
        this.showQuestion = false;
      } else if (this.currentCard < this.flashcardsCount) {
        this.currentCard = this.currentCard + 1;
        this.showQuestion = true;

        if (this.currentCard + 1 === this.flashcardsCount) this.lastCard = true;
      } else {
        this.$emit("lastCard", "ready for reshuffle");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
.progress {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 0.5em;
}
</style>
