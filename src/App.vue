<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h1>Blanks</h1>
      </div>

      <v-spacer></v-spacer>
      <v-container class="dashboardBar">
        <v-btn color="secondary">
          <span class="mr-2">Create Document</span>
        </v-btn>
        <v-menu offset-y >
          <template v-slot:activator="{ on }">
            <v-btn
              color="secondary"
              dark
              v-on="on" 
            >
            Account
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                Settings
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
      <!-- <v-btn v-show="loginInfo !== null" @click="handleSignOut">
        <span class="mr-2">Sign Out</span>
      </v-btn> -->
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { AppAuth } from './firebase-init';

export default {
  name: 'App',
  components: {
  },

  data: () => ({
    loginInfo: null,
  }),
  mounted() {
    AppAuth.onAuthStateChanged((user) => {
      this.loginInfo = user;
    });
  },
  methods: {
    handleSignOut() {
      AppAuth.signOut().then(() => {
        alert('Signed out');
        this.$router.back();
      });
    }
  }
};
</script>
