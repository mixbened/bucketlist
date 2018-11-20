<template>
    <div>
        <li :class="{ checked: done }" @click="$emit('checkTodo', descr)">{{ descr }}</li>
        <div class="editContainer"><v-icon @click="$emit('deleteTodo', descr)">delete</v-icon></div>
    </div>
</template>

<script>
export default {
  props: ["descr", "done"]
};
</script>

<style scoped>
div {
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.editContainer {
  padding: 0.5em;
  border: 0;
  background: red;
  color: white;
}
.checked {
  color: green;
}
</style>


