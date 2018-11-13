<template>
    <div>
        <h2>Login to check your Buckets</h2>
        <v-alert
            :value="checker"
            color="warning"
            icon="priority_high"
            transition="scale-transition"
            outline
        >{{ checkerMessage }}
        </v-alert>
        <v-form v-model="valid">
            <v-text-field
                v-model="userName"
                :rules="userNameRules"
                label="Username"
                required
            ></v-text-field>
            <v-text-field
                v-model="pw"
                :rules="pwRules"
                label="Password"
                required
            ></v-text-field>
            <v-btn
            :disabled="!valid"
            @click="login"
            >
            Login
            </v-btn>
            <router-link to="register">
                <a>Not Registered?</a>
            </router-link>
        </v-form>
    </div>
</template>

<script>
import datastoreAPI from '../services/datastoreAPI.js';
export default {
    name: 'Login',
    data: () => ({
      valid: false,
      userName: '',
      userNameRules: [
        v => !!v || 'username is required',
        v => v.length <= 15 || 'Username must be less than 15 characters'
      ],
      pw: '',
      pwRules: [
        v => !!v || 'Password is required',
        v => v.length >= 5 || 'Password must be longer than 4 Characters'
      ],
      checker: false
    }),
    methods: {
        login: function(){
            // use the trim method to remove whitespace from inputs
            const user = {
                userName: this.userName.trim(),
                pw: this.pw.trim()
            }
            // console.log('run login with', user)
           datastoreAPI.login(user)
            .then(result => {
                console.log('Login Result', typeof result)
                if(typeof result === 'string'){
                    this.checker = true
                    this.checkerMessage = 'The Password you entered does not match with the Username'
                    this.$router.push('/login')
                } else if(typeof result === 'object'){
                    this.$store.commit('setUserName', result)
                    this.$router.push('/dashboard')
                }
            })
        }
    }
}
</script>

<style scoped>
    
</style>



