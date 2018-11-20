<template>
    <div>
      <v-btn  id="edit" icon>
        <v-icon @click="edit = !edit">edit</v-icon>
      </v-btn>
        <h2>Your Buckets</h2>
        <ul>
            <BucketItem :edit="edit" @deleteBucket="deleteBucket($event)" @chooseBucket="$emit('setBucket', $event)" v-for='item in list' :key='item.key' :title='item.title'/>
        </ul>
        <v-text-field
        v-if="edit"
        @keyup.enter="addBucket"
        v-model="titleInput"
        label="New Bucket"
        ></v-text-field>
    </div>
</template>

<script>
import BucketItem from "./BucketItem";
import datastoreAPI from "../services/datastoreAPI.js";

export default {
  name: "BucketList",
  props: ["list"],
  data() {
    return {
      titleInput: "",
      edit: false
    };
  },
  components: { BucketItem },
  methods: {
    addBucket: function(title) {
      const bucket = {
        title: this.titleInput,
        todos: []
      };
      this.list.push(bucket);
      datastoreAPI
        .addBucket(bucket)
        .then(result => {
          if (result === "Successfull Creation of Bucket") {
            console.log("Added Successfull");
          } else {
            console.log("Problem with Bucket Creation");
          }
        })
        .catch(err => console.log(`Could not add Bucket: ${err}`));
      this.titleInput = "";
    },
    chooseBucket: function(val) {
      $emit("setBucket", val);
    },
    deleteBucket: function(title) {
      // delete in Frontend
      const index = this.list.findIndex(el => el.title === title);
      this.list.splice(index, 1);
      // delete in Database
      datastoreAPI
        .deleteBucket(title)
        .then(response => {
          console.log("Successfull Deletion");
        })
        .catch(err => console.log(`Error in deleting Bucket: ${err}`));
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
h2 {
  text-align: center;
}
div {
  padding: 0.5em;
  position: relative;
}
#edit {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  margin: 0;
}
</style>


