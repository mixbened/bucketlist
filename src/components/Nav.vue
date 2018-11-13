<template>
    <nav>
        <h1>Buckets.io</h1>
        <ul>
            <router-link to="login">
                <v-btn v-if="!this.$store.getters.user.userName" color="info">Login</v-btn>
                <v-btn v-if="this.$store.getters.user.userName" @click="logout" color="info">Logout</v-btn>
            </router-link>
        </ul>
    </nav>
</template>

<script>
import datastoreAPI from '../services/datastoreAPI.js';
export default {
    name: 'Nav',
    data(){
        return {
            
        }
    },
    methods: {
        logout: function(){
            datastoreAPI.logout()
                .then(response => {
                    console.log('Log out, ', response)
                    this.$store.commit('setUserName', {})
                })
        }
    }
}
</script>

<style scoped>
    nav {
        display: flex;
        justify-content: space-between;
        padding: 1em;
        align-items: center;
    }
    a {
        padding: 0 0.5em;
        font-size: 1.1em;
    }
</style>

