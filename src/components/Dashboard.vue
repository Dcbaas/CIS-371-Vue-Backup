<template>
  <div>
    <v-container>
      <v-list>
        <v-subheader>MY DOCUMENTS</v-subheader>
        <v-list-item v-for="(document, pos) in myDocsList" :key="pos">
          <v-list-item-title>{{ document.docName }}</v-list-item-title>
          <v-btn
            class="deleteBtn"
            tile
            outlined
            color="error"
            @click="deleteDocument(document.id)"
          >
            Delete
          </v-btn>
          <v-btn
            class="editBtn"
            tile
            outlined
            color="success"
            @click="handleClick(document.id)"
          >
            Edit
          </v-btn>
        </v-list-item>
      </v-list>
    </v-container>
    <v-container>
      <v-list>
        <v-subheader>SHARED WITH ME</v-subheader>
        <v-list-item v-for="(document, pos) in sharedDocsList" :key="pos">
          <v-list-item-title>{{ document.docName }}</v-list-item-title>
          <div class="listItemSpan">
            <span>Owner: {{document.ownerData.name}}</span>
            <span>Position: {{document.ownerData.position}}</span>
          </div>
          <v-btn
            class="editBtn"
            tile
            outlined
            color="success"
            @click="handleClick(document.id)"
          >
            Edit
          </v-btn>
        </v-list-item>
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
    };
  },
  mounted() {
    AppAuth.onAuthStateChanged(user => {
      this.userInfo = user;
    });

    AppDB.collection('documents').onSnapshot(querySnapshot => {
      const nullOwner = { name: 'Error', position: 'Could not find owner' };
      this.myDocsList = [];
      this.sharedDocsList = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.owner == this.userInfo.uid) {
          this.myDocsList.push({ ...data, id: doc.id });
        } else if (data.public === true && data.owner !== this.userInfo.uid) {
          AppDB.collection('users')
            .doc(data.owner)
            .get()
            .then(user => {
              this.sharedDocsList.push({
                ...data,
                id: doc.id,
                ownerData: user.data()
              });
            })
            .catch(() => {
              this.sharedDocsList.push({
                ...data,
                id: doc.id,
                ownerData: nullOwner
              });
            });
        }
      });
      this.myDocsList = this.myDocsList.sort((o1, o2) => {
        if (o1.docName < o2.docName) {
          return -1;
        } else if (o1.docName > o2.docName) {
          return 1;
        }

        return 0;
      });
      this.sharedDocsList.sort((o1, o2) => {
        if (o1.docName < o2.docName) {
          return -1;
        } else if (o1.docName > o2.docName) {
          return 1;
        }

        return 0;
      });
    });
  },
  methods: {
    handleClick(docId) {
      this.$router.push({ name: 'edit', params: { id: docId } });
    },
    deleteDocument(docId) {
      AppDB.collection('documents')
        .doc(docId)
        .delete()
        .then(() => {
          alert('Document has been successfuly deleted.');
        })
        .catch(() => {
          alert('There was an error deleting the document.');
        });
    }
  }
};
</script>
<style scoped>
.listItemSpan {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.listItemSpan> span {
 padding-left: 1vw;
}

.deleteBtn {
  margin-left: 1vw;
}
</style>
