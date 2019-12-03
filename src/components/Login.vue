<template>
  <v-container id="loginForm">
    <div id="textFields">
      <v-text-field label="Email" v-model="email"></v-text-field>
      <v-text-field
        type="password"
        label="Password"
        v-model="password"
      ></v-text-field>
    </div>
    <v-container id="btnCtn" v-show="loginState === null">
      <v-row justify="center">
        <v-btn @click="handleSignIn">Sign In</v-btn>
        <v-dialog v-model="createDialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">
              Sign Up
            </v-btn>
          </template>
          <v-card>
            <v-card-title primary-title>
              Enter a name and position
            </v-card-title>
            <v-text-field label="Name" v-model="dialogName" />
            <v-text-field label="Position" v-model="dialogPosition" />
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn @click="handleSignUp">Create Account</v-btn>
              <v-btn @click="cancelAction">Cancel Action</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
import { AppAuth, AppDB } from '../firebase-init';
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loginState: null,
      createDialog: false,
      dialogName: '',
      dialogPosition: ''
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
          AppDB.collection('users')
            .doc(user.user.uid)
            .set({ name: this.dialogName, position: this.dialogPosition })
            .then(() => {
              alert('New user successfuly created');
              this.createDialog = false;
              this.dialogName = '';
              this.dialogPosition = '';
              this.$router.push({ path: '/dashboard' });
            })
            .catch(() => {
              alert('Error creating DB entry');
            });
        })
        .catch(() => {
          alert(`Error in creating account`);
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid;
  margin-top: 3vw;
  width: 25vw; 
}

#textFields{
  margin-left: 1vw;
  margin-right: 1vw;
  width: 100%;
}

#btnCtn.container {
  width: 25vw;
}
</style>
