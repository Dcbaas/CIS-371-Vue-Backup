<template>
  <div id="loginForm">
    <v-text-field label="Email" v-model="email"></v-text-field>
    <v-text-field
      type="password"
      label="Password"
      v-model="password"
    ></v-text-field>
    <v-container id="btnCtn" v-show="loginState === null">
      <v-row justify="end">
        <v-btn @click="handleSignIn">Sign In</v-btn>
        <v-btn @click="handleSignUp">Sign Up</v-btn>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { AppAuth } from '../firebase-init';
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loginState: null
    };
  },
  mounted() {
    AppAuth.onAuthStateChanged(user => {
      this.loginState = user;
    });
  },
  methods: {
    handleSignUp() {
      AppAuth.createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert(`Created new user with ${user.uesr.uid}`);
        })
        .catch(err => {
          alert(`Error ${err}`);
        });
    },
    handleSignIn() {
      AppAuth.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ path: '/dashboard' });
        })
        .catch(err => {
          alert(`Error ${err}`);
        });
    }
  }
};
</script>

<style>
#loginForm {
  width: 50vw;
  border: solid 0.1em black;
  border-radius: 0.5em;
}
#btnCtn {
  padding: 2em;
}
</style>
