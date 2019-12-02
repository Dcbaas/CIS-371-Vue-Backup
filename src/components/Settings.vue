<template>
  <div>
    <v-text-field label="Name" v-model="name" />
    <v-text-field labal="Position" v-model="position" />
    <v-container>
      <v-row>
        <v-btn>Save Changes</v-btn>
      </v-row>
    </v-container>
  </div>
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
