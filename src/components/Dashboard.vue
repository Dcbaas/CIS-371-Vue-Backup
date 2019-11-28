<template>
  <div>
    <v-container>
      <v-list>
        <v-subheader>MY DOCUMENTS</v-subheader>
        <v-list-item v-for="(document, pos) in myDocsList" :key="pos" >
          <v-list-item-title>{{  document.docName }}</v-list-item-title>
            <v-btn 
              class="editBtn" 
              tile outlined color="success"
              @click="handleClick(document.id)"
            >
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
  name: 'Dashboard',
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
      this.myDocsList = []
      querySnapshot.forEach((doc) =>{
        const data = doc.data();
        if (data.owner == this.userInfo.uid){
          this.myDocsList.push({...data, id: doc.id})
        } else if (data.sharedWith.includes(this.userInfo.uid)) {
          this.sharedDocsList.push({...data, id: doc.id});
        }
      });
      this.myDocsList = this.myDocsList.sort((o1, o2) => {
        if (o1.docName < o2.docName){
          return -1;
        } else if (o1.docName > o2.docName){
          return 1;
        }

        return 0;
      });
    });
  },
  methods: {
    handleClick(docId) {
      this.$router.push({name: 'view', params: { id: docId } });
    }
  }
}
</script>
