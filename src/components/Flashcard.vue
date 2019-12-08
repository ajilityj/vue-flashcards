<template>
  <span @click="flipCard()">
    {{ q ? flashcard.question : flashcard.answer }}
  </span>
</template>

<script>
export default {
  name: "Flashcard",
  props: ["flashcard", "q"],
  mounted() {
    window.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        this.flipCard();
      }
    });
  },
  methods: {
    flipCard: function() {
      this.$emit("flipCard", "ready to flip card");
    }
  }
};
</script>
