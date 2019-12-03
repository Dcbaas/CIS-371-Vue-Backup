<template>
  <div>
    <v-container>
      <v-btn @click="makePublic" v-show="!docInstance.public && isOwner"
        >Make Public</v-btn
      >
      <v-btn @click="makePrivate" v-show="docInstance.public && isOwner"
        >Make Private</v-btn
      >
      <v-btn @click="saveDocument">Save</v-btn>
    </v-container>
    <ckeditor :editor="editor" v-model="docInstance.body"></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';
import { AppAuth, AppDB } from '../firebase-init';

export default {
  name: 'Editor',
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      editor: ClassicEditor,
      docInstance: null,
      docId: this.$route.params.id,
      isOwner: undefined
    };
  },
  mounted() {
    AppAuth.onAuthStateChanged(user => {
      if (user) {
        AppDB.collection('documents')
          .doc(this.docId)
          .get()
          .then(snapshot => {
            const data = snapshot.data();
            this.docInstance = data;
            this.isOwner = user.uid === data.owner;
          })
          .catch(() => {
            alert('Error loading data');
          });
      }
    });
  },
  methods: {
    makePublic() {
      this.docInstance.public = true;
      AppDB.collection('documents')
        .doc(this.docId)
        .set({ public: this.docInstance.public }, { merge: true })
        .then(() => {
          alert('Document Made Public');
        })
        .catch(() => {
          alert('Error making document Public');
        });
    },
    makePrivate() {
      this.docInstance.public = false;
      AppDB.collection('documents')
        .doc(this.docId)
        .set({ public: this.docInstance.public }, { merge: true })
        .then(() => {
          alert('Document Made Public');
        })
        .catch(() => {
          alert('Error making document Public');
        });
    },
    saveDocument() {
      AppDB.collection('documents')
        .doc(this.docId)
        .set({ body: this.docInstance.body }, { merge: true })
        .then(() => {
          alert('Document Saved');
          this.$router.back();
        })
        .catch(() => {
          alert('Error Saving the document');
        });
    }
  }
};
</script>
