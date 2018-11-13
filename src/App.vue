<template>
  <div id="app">
    <v-app>
      <Nav />
      <div id="content">
        <router-view/>
      </div>
    </v-app>
  </div>
</template>

<script>
import Nav from './components/Nav'

export default {
  name: 'App',
  components: {
    Nav
  }
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
  #content {
    margin: 5em;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
</style>
