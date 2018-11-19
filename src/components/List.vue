<template>
    <div>
        <h2>Choose a Bucket</h2>
        <input type="text" v-model="todoInput">
        <button @click='addTodo'>Add Task</button>
        <ul>
            <ListItem @checkTodo="checkTodo($event)" @deleteTodo="deleteTodo($event)" v-for='item in filteredList' v-bind:key='item.descr' :descr='item.descr' :done='item.done' />
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
      console.log("Bucket changed");
      this.filterList(this.currentBucket);
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
      const bucketIndex = this.list.findIndex(
        el => el.title === this.currentBucket
      );
      console.log("List: ", this.list, "and", bucketIndex);
      this.list[bucketIndex].todos.push(star.todo);
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
      console.log("New List: ", newList);
      this.filteredList = newList[0].todos;
    },
    checkTodo: function(descr) {
      // console.log("Check Todo", descr, this.currentBucket);
      // frontend check
      console.log("Handler: ", this.list, this.currentBucket);
      const bucketIndex = this.list.findIndex(
        el => el.title === this.currentBucket
      );
      const todoIndex = this.list[bucketIndex].todos.findIndex(
        el => el.descr === descr
      );
      console.log("before check: ", this.list);
      this.list[bucketIndex].todos[todoIndex].done = !this.list[bucketIndex]
        .todos[todoIndex].done;
      console.log("after check: ", this.list);
      this.filterList(this.currentBucket);
      const todo = {
        bucket: this.currentBucket,
        descr
      };
      // database check
      datastoreAPI
        .checkTodo(todo)
        .then(response => {
          if (response === "Changed State successfull!") {
            console.log("Checked Todo.");
          } else {
            console.log("Error in checking Todo.");
          }
        })
        .catch(err => console.log(`Error in checking Todo: ${err}`));
    },
    deleteTodo: function(descr) {
      console.log("Delete Function!", this.currentBucket);
      // frontend deletion
      const bucketIndex = this.list.findIndex(
        el => el.title === this.currentBucket
      );
      console.log("Bucket Index", bucketIndex);
      const todoIndex = this.list[bucketIndex].todos.findIndex(
        el => el.descr === descr
      );
      console.log("Todo Index", todoIndex);
      this.list[bucketIndex].todos.splice(todoIndex, 1);

      const todo = {
        descr,
        bucket: this.currentBucket
      };
      // database deletion
      datastoreAPI
        .deleteTodo(todo)
        .then(response => {
          if (response === "Deleted!") {
            console.log("Deleted Successfully!");
          } else {
            console.log("Error in deleting Todo");
          }
        })
        .catch(err => console.log(`Error in deleting Todo ${err}`));
    }
  },
  components: { ListItem },
  props: ["currentBucket", "list"]
};
</script>

<style scoped>
</style>