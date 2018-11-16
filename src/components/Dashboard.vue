<template>
  <div id="globe">
    <h2>Heading</h2>
    <div class="container">
      <div class="listBox">
        <List :currentBucket='currentBucket' />
      </div>
      <div class="bucketList">
        <BucketList @chooseBucket="currentBucket = $event"/>
      </div>
    </div>
  </div>
</template>

<script>
import List from "./List";
import BucketList from "./BucketList";
import axios from "axios";

export default {
  name: "Dashboard",
  components: { List, BucketList },
  data() {
    return {
      currentBucket: null
    };
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
