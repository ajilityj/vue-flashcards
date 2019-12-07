<template>
  <div id="app">
    <h1>Flashcards</h1>
    <Flashcards />
  </div>
</template>

<script>
import Flashcards from "./components/Flashcards.vue";

export default {
  name: "app",
  components: {
    Flashcards
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
