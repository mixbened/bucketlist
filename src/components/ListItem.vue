<template>
    <div>
        <li><span>{{ descr }}</span><span @click="$emit('checkTodo', descr)">{{ ' | ' + done }}</span></li>
        <v-icon @click="$emit('deleteTodo', descr)">delete</v-icon>
    </div>
</template>

<script>
export default {
  props: ["descr", "done"]
};
</script>

<style scoped>
</style>


