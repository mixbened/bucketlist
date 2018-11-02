<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav'

export default {
  name: 'App',
  components: {
    Nav
  },
}
</script>

<style>
  body {
    margin: 0;
  }
  h1,h2,h3,h4,h5,h6,ul {
    margin: 0;
    padding: 0
  }
</style>
