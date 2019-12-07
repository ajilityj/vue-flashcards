<template>
  <div>
    <h2>{{ flashcard.question }}</h2>
    <h3>{{ flashcard.answer }}</h3>
  </div>
</template>

<script>
export default {
  name: "Flashcard",
  props: ["flashcard"]
};
</script>

<style lang="scss" scoped></style>
