<template>
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
        <v-text-field
            v-model="mail"
            :rules="mailRules"
            label="Email"
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
        @click="register"
        >
        Register
        </v-btn>
        <router-link to="login">
            <a>Already registered?</a>
        </router-link>
    </v-form>
</template>

<script>
import datastoreAPI from "../services/datastoreAPI.js";
export default {
  name: "Register",
  data() {
    return {
      userName: "",
      valid: false,
      pw: "",
      mail: "",
      checker: false,
      checkerMessage: "",
      pwRules: [
        v => !!v || "Password is required",
        v => v.length >= 5 || "Username must be longer than 4 Characters"
      ],
      userNameRules: [
        v => !!v || "Username is required",
        v => v.length >= 5 || "Password must be longer than 4 Characters"
      ],
      mailRules: [
        v => !!v || "Mail-Adress is required",
        v => /.+@.+/.test(v) || "Provide a valid Email Adress"
      ]
    };
  },
  methods: {
    register: function() {
      const user = {
        userName: this.userName.trim(),
        pw: this.pw.trim(),
        mail: this.mail.trim()
      };

      datastoreAPI.register(user).then(response => {
        if (response === "Successfull creation of User") {
          this.$store.commit("setUserName", user);
          this.$router.push("/login");
        } else if (response === "User already exists!") {
          this.checker = true;
          this.checkerMessage =
            "This username already exists. Please choose another one.";
        } else {
          console.log("ERR: Registration Error");
          this.userName = "";
          this.pw = "";
          this.mail = "";
        }
      });
    }
  }
};
</script>

<style scoped>
</style>