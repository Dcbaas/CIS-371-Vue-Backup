<template>
  <p >{{ returnedObject.body }}</p>
</template>

<script>
import { AppDB } from '../firebase-init';
export default {
  name: 'Viewer',

  data() {
    return { 
      documentId: this.$route.params.id,
      returnedObject: null
    }
  },
  mounted() {
    AppDB.collection('documents').doc(this.documentId).get()
      .then((doc) => {
        this.returnedObject = doc.data();
      })
      .catch(() => {
        alert('There was a problem retriving the file.');
      });
  }
}
</script>
