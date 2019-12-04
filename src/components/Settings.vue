<template>
  <v-container class="settings">
    <div id="textFields">
    <v-text-field label="Name" v-model="name" />
    <v-text-field label="Position" v-model="position" />
    </div>
    <v-container>
      <v-row>
        <v-btn @click="saveChanges">Save Changes</v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { AppAuth, AppDB } from '../firebase-init';

export default {
  name: 'Settings',
  data() {
    return {
      name: '',
      position: '',
      uid: ''
    }
  },
  mounted() {
    AppAuth.onAuthStateChanged((user) => {
      this.uid = user.uid;
      AppDB.collection('users').doc(user.uid).get()
        .then((doc) => {
          const data = doc.data();
          this.name = data.name;
          this.position = data.position;
        })
    });
  },
  methods: {
    saveChanges() {
      AppDB.collection('users').doc(this.uid).update({ name: this.name, position: this.position })
        .then(() => {
          alert('User updated successfuly');
        })
        .catch(() => {
          alert('Error updating User data');
        })
        
    }
  }

}
</script>
<style scoped>
  .settings {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: solid;
    margin-top: 3vw;
    width: 50vw; 
  }

  #textFields{
    margin-left: 1vw;
    margin-right: 1vw;
    width: 100%;
  }

  #btnCtn.container {
    width: 25vw;
  }

  .dialogText {
    margin-left: 1vw;
    margin-right: 1vw;
  }

</style>