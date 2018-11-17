<template>
    <div>
        <h2>Choose a Bucket</h2>
        <input type="text" v-model="todoInput">
        <button @click='addTodo'>Add Task</button>
        <ul>
            <ListItem v-for='item in filteredList' v-bind:key='item.descr' :descr='item.descr' :done='item.done' />
        </ul>
    </div>
</template>

<script>
import ListItem from "./ListItem.vue";
import datastoreAPI from "../services/datastoreAPI";

export default {
  name: "List",
  data() {
    return {
      todoInput: "",
      filteredList: []
    };
  },
  watch: {
    currentBucket: function() {
      this.filteredList = this.filterList(this.currentBucket);
    }
  },
  methods: {
    addTodo: function() {
      // create new todo
      const star = {
        todo: {
          descr: this.todoInput,
          done: false,
          bucket: this.currentBucket
        }
      };
      // push todo to shown List
      this.filteredList.push(star);
      this.list.push(star);
      // add Todo to the Database
      datastoreAPI
        .addTodo(star)
        .then(response => {
          if (response === "Todo added to Bucket!") {
            console.log("Successfull added.");
          }
        })
        .catch(err => console.log(`Error in adding Todo: ${err}`));
      this.todoInput = "";
    },
    // filter the List for the right Bucket
    filterList: function(bucket) {
      const newList = this.list.filter(el => el.title === bucket);
      this.filteredList = newList.todos;
    },
    checkTodo: function(descr) {
      // frontend check
      const bucketIndex = this.list.findIndex(
        el => el.bucket === currentBucket
      );
      const todoIndex = this.list[bucketIndex].todos.findIndex(
        el => el.descr === descr
      );
      let check = this.list[bucketIndex].todos[todoIndex].done;
      check = !check;
      this.filteredList = this.filterList(this.list);
      // database check
      datastoreAPI
        .checkTodo(id)
        .then(response => {})
        .catch(err => console.log(`Error in checking Todo: ${err}`));
    }
  },
  components: { ListItem },
  props: ["currentBucket", "list"]
};
</script>

<style scoped>
</style>