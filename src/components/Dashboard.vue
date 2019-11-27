<template>
  <div>
    <v-container>
      <v-list>
        <v-subheader>MY DOCUMENTS</v-subheader>
        <v-list-item v-for="(document, pos) in myDocsList" :key="pos" >
          <v-list-item-title>{{  document.docName }}</v-list-item-title>
            <v-btn class="editBtn" tile outlined color="success">
              View  
            </v-btn>
        </v-list-item>
      </v-list>
    </v-container>
    <v-container>
      <v-list>
        <v-subheader>SHARED WITH ME</v-subheader>
      </v-list>
    </v-container>
  </div>
</template>

<script>
import { AppAuth, AppDB } from '../firebase-init';
export default {
  data() {
    return {
      myDocsList: [],
      sharedDocsList: [],
      userInfo: null 
    }
  },
  mounted() {
    AppAuth.onAuthStateChanged((user) => {
      this.userInfo = user;
    });

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
  methods: {
    handleClick() {
      alert('Clicked the button');
    }
  }
}
</script>
