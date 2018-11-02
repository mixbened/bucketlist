<template>
    <li>{{ descr + ' | ' + done }}</li>
</template>

<script>
    export default {
        props: [ 'descr', 'done' ]
    }
</script>

<style scoped>

</style>


