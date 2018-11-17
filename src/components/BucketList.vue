<template>
    <div>
        <input v-model='titleInput' type="text">
        <button @click='addBucket'>Add Bucket</button>
        <ul>
            <BucketItem @deleteBucket="deleteBucket($event)" @chooseBucket="$emit('setBucket', $event)" v-for='item in list' :key='item.key' :title='item.title'/>
        </ul>
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
      titleInput: ""
    };
  },
  components: { BucketItem },
  methods: {
    addBucket: function(title) {
      const bucket = {
        title: this.titleInput
      };
      this.bucketList.push(bucket);
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
      const index = this.bucketList.findIndex(el => el.title === title);
      this.bucketList.splice(index, 1);
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
</style>


