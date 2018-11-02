<template>
    <div>
        <input v-model='titleInput' type="text">
        <button @click='addBucket'>Add Bucket</button>
        <ul>
            <BucketItem @chooseBucket="$emit('chooseBucket', $event)" v-for='item in bucketList' :key='item.key' :title='item.title'/>
        </ul>
    </div>
</template>

<script>
import BucketItem from './BucketItem';

export default {
    name: 'BucketList',
    data () {
        return {
            bucketList: [{
                id: 1224,
                title: 'cities'
            },
            {
                id: 334,
                title: 'home'
            }],
            titleInput: ''
        }
    },
    components: { BucketItem },
    methods: {
        addBucket: function(title) {
            const bucket = {
                id: null,
                title: this.titleInput,
            }
            this.bucketList.push(bucket)
            this.titleInput = ''
        },
        chooseBucket: function(){
            console.log('This is triggered by the Child')
        }
    },
}
</script>

<style scoped>

</style>


