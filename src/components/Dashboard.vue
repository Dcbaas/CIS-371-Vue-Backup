<template>
  <div>
    <v-container>
      <v-list>
        <v-subheader>MY DOCUMENTS</v-subheader>
        <v-list-item>
          <v-list-item-title>Place 1</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>

<script>
import { AppDB } from '../firebase-init';
export default {
  data() {
    return {
      myDocsList: [],
      sharedDocsList: [],
      userInfo: null 
    }
  },
  mounted() {
    // TODO integrate with authentication 
    // AppAuth.onAuthStateChanged((user) => {
    //   this.userInfo = user;
    // });
    this.userInfo = {email: 'blah', uid: 'NzVSdyaGmUVEy2ZlpgqvJjkiENB2'};

    AppDB.collection('documents').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) =>{
        const data = doc.data();
        if (data.owner == this.userInfo.uid){
          this.myDocsList.push({...data, id: doc.id})
        } else if (data.sharedWith.includes(this.userInfo.uid)) {
          this.sharedDocsList.push({...data, id: doc.id});
        }
      });
    });
  },
}
</script>
