<template>
    <div>
        <li @click="$emit('chooseBucket', title)">{{ title }}</li>
        <v-btn id="delete" icon>
            <v-icon v-if="edit" @click="$emit('deleteBucket', title)">delete</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
  props: ["title", "edit"],
  methods: {}
};
</script>

<style scoped>
div {
  /* display: flex; */
  border: 1px solid black;
  justify-content: space-between;
  padding: 0.2em;
  font-size: 1.5em;
  text-align: center;
  margin: 1em 0;
  position: relative;
}
li {
  width: 100%;
}
#delete {
  position: absolute;
  top: 0.2em;
  right: 0.2em;
  margin: 0;
}
</style>