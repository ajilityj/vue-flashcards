<template>
  <div class="flashcard" @click="flipCard()">
    <span v-if="showQuestion">Q: {{ flashcard.question }}</span>
    <span v-else>A: {{ flashcard.answer }}</span>
  </div>
</template>

<script>
export default {
  name: "Flashcard",
  props: ["flashcard", "q"],
  data() {
    return {
      showQuestion: this.q
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
      if (this.showQuestion) this.showQuestion = false;
      else {
        this.$emit("nextQuestion", "ready for next question");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.flashcard {
  font-size: 1.5em;
  line-height: 1.25;
  margin: 0 auto;

  span {
    max-width: 80%;
  }
}
</style>
