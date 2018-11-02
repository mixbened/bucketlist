<template>
    <li @click="$emit('chooseBucket', title)">{{ title }}</li>
</template>

<script>
    export default {
        props: [ 'title' ]
    }
</script>

<style scoped>

</style>