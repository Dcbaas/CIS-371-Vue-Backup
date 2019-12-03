<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>Blanks</h1>
      </div>

      <v-spacer></v-spacer>

      <v-container class="dashboardBar" v-show="$route.path === '/dashboard'">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="secondary" v-on="on">
              <span class="mr-2">Create Document</span>
            </v-btn>
          </template>
          <v-card>
            <v-card-title primary-title>
              Create a new Document
            </v-card-title>
            <v-text-field
              label="Document Name"
              v-model="newDocTitle"
            ></v-text-field>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="createNewDocument">
                Create
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="secondary" dark v-on="on">
              Account
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title @click="goToSettings">
                Settings
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="handleSignOut">Sign Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>

      <v-btn v-show="loginInfo !== null" @click="handleSignOut">
        <span class="mr-2">Sign Out (Functional Placeholder)</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { AppAuth, AppDB } from './firebase-init';

export default {
  name: 'App',

  data: () => ({
    loginInfo: null,
    dialog: false,
    newDocTitle: '',
    docInstance: null
  }),
  mounted() {
    AppAuth.onAuthStateChanged(user => {
      this.loginInfo = user;
    });
  },
  methods: {
    handleSignOut() {
      AppAuth.signOut().then(() => {
        alert('Signed out');
        this.$router.back();
      });
    },
    createNewDocument() {
      AppDB.collection('documents')
        .doc()
        .set({
          docName: this.newDocTitle,
          owner: this.loginInfo.uid,
          public: false,
          body: ''
        })
        .then(() => {
          alert('Document created');
        })
        .catch(() => {
          alert('Failed to create new Document');
        });
      // Cleanup
      this.dialog = false;
      this.newDocTitle = '';
    },
    editDocument() {
      const docId = this.$route.params.id;
      this.$router.push({ name: 'edit', params: { id: docId } });
    },
    deleteDocument() {
      const docId = this.$$route.params.id;
      AppDB.collection
        .doc(docId)
        .delete()
        .then(() => {
          alert('Document has been successfuly deleted.');
          this.$router.back();
        })
        .catch(() => {
          alert('There was an error deleting the document.');
        });
    },
    goToSettings() {
      this.$router.push({name: 'settings'});
    }
  }
};
</script>
