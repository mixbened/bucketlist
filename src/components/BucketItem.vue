<template>
    <div>
        <li @click="$emit('chooseBucket', title)">{{ title }}</li>
        <v-icon @click="$emit('deleteBucket', title)">delete</v-icon>
    </div>
</template>

<script>
export default {
  props: ["title"],
  methods: {}
};
</script>

<style scoped>
</style>