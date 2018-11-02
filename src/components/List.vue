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
    import ListItem from './ListItem.vue';

    export default {
        name: 'List',
        data() { 
            return {
                list: [{
                    descr: 'Go out with the Dog0',
                    done: false,
                    bucket: 'home'
                },
                {
                    descr: 'Cologne',
                    done: false,
                    bucket: 'cities'
                },
                {
                    descr: 'Buy Milk',
                    done: true,
                    bucket: 'home'
                },
                {
                    descr: 'Learn Vue!',
                    done: false,
                    bucket: 'work'
                },
                {
                    descr: 'London',
                    done: false,
                    bucket: 'cities'
                }],
                todoInput: '',
                filteredList: []
                }
        },
        watch: { 
                currentBucket: function(){
                    this.filterList(this.currentBucket)
            }
        },
        methods: {
            addTodo: function() {
                // push todo to shown List
                    this.filteredList.push({
                        descr: this.todoInput,
                        done: false,
                    })
                    this.todoInput = ''
                },
                // filter the List for the right Bucket
                filterList: function(bucket){
                    this.filteredList = this.list.filter(el => el.bucket === bucket)
                },
        },
        components: { ListItem },
        props: ['currentBucket']
    }
</script>

<style scoped>

</style>