<template>
  <div id="globe">
    <h2>{{ currentBucket || 'Choose a Bucket' }}</h2>
    <div class="container">
      <div class="listBox">
        <List :list='list' :currentBucket='currentBucket' />
      </div>
      <div class="bucketList">
        <BucketList :list='list' @setBucket="currentBucket = $event"/>
      </div>
    </div>
  </div>
</template>

<script>
import List from "./List";
import BucketList from "./BucketList";
import axios from "axios";
import datastoreAPI from "../services/datastoreAPI.js";

export default {
  name: "Dashboard",
  components: { List, BucketList },
  data() {
    return {
      currentBucket: null,
      list: []
    };
  },
  created() {
    datastoreAPI
      .getUser()
      .then(response => {
        this.list = response.buckets;
        // user response
      })
      .catch(err => console.log(`Error in getting User info: ${err}`));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
}
.listBox {
  flex: 2;
  border: 1px solid black;
}
.bucketList {
  flex: 1;
  border: 1px solid red;
}
</style>
