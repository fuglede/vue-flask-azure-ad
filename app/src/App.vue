<template>
  <div>
      <authexample/>
  </div>
</template>

<script>
import authexample from './components/AuthExample.vue'
export default {
  name: 'App',
  components: {
    authexample
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-left: 20px;
  margin-top: 20px;
}
</style>
