<template>
    <div>
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
            <v-alert
                :value="checker"
                color="warning"
                icon="priority_high"
                transition="scale-transition"
                outline
            >{{ checkerMessage }}
            </v-alert>
            <v-btn
            :disabled="!valid"
            @click="login"
            >
            Login
            </v-btn>
            <router-link to="register">
                <a>Not Registered?</a>
            </router-link>
            <v-btn @click='session'>Session</v-btn>
        </v-form>
    </div>
</template>

<script>
import datastoreAPI from "../services/datastoreAPI.js";
import axios from "axios";

export default {
  name: "Login",
  data: () => ({
    valid: false,
    userName: "",
    userNameRules: [
      v => !!v || "username is required",
      v => v.length <= 15 || "Username must be less than 15 characters"
    ],
    pw: "",
    pwRules: [
      v => !!v || "Password is required",
      v => v.length >= 5 || "Password must be longer than 4 Characters"
    ],
    checker: false,
    checkerMessage: ""
  }),
  methods: {
    login: function() {
      // use the trim method to remove whitespace from inputs
      const user = {
        userName: this.userName.trim(),
        pw: this.pw.trim()
      };
      // console.log('run login with', user)
      datastoreAPI.login(user).then(result => {
        console.log("Login Result", result);

        if (typeof result === "string") {
          // Case: Did not find a matching username
          if (result === "User does not exist.") {
            this.checker = true;

            this.checkerMessage =
              "We could not find a User matching that Username.";

            // Case: User found, but Password incorrect
          } else {
            this.checker = true;

            this.checkerMessage =
              "The Password you entered does not match with the Username.";
          }
          // Case: User found and Password correct
        } else if (typeof result === "object") {
          console.log("Corrreeeect!");
          this.$store.commit("setUserName", result);

          this.$router.push("/dashboard");
        }
      });
    },
    session: function() {
      axios.get("/check", { withCredentials: true }).then(res => {
        console.log("Session Response: ", res);
      });
    }
  }
};
</script>

<style scoped>
</style>



