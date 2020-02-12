<template>
  <div
    class="flashcard"
    :class="[showQuestion ? 'question' : 'answer', cardIndex]"
    v-if="cardIndex === currentCard"
    @click="advanceCard()"
  >
    {{ showQuestion ? `Q: ${flashcard.question}` : `A: ${flashcard.answer}` }}
  </div>
</template>

<script>
export default {
  name: "Flashcard",
  props: ["flashcard", "cardIndex", "currentCard"],
  data() {
    return {
      showQuestion: true
    };
  },
  mounted() {
    // flip card when Enter key pressed
    window.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        this.showQuestion = !this.showQuestion;
      }
    });
  },
  methods: {
    advanceCard: function() {
      // advance card when Flashcard clicked
      this.$emit("advanceFlashcards", "ready for a new card");
    }
  }
};
</script>
