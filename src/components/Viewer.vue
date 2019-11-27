<template>
  <p>This is the viewer page</p>
</template>

<script>
import { AppStorage } from '../firebase-init';
export default {
  data() {
    return {
      // TODO make this extracted from route. 
      documentId: 'test-text1.txt',
      returnedObject: null
    }
  },
  mounted() {
    AppStorage.ref(this.documentId).getDownloadURL()
      .then((a) => {
        this.returnedObject = a;
      });
  }
}
</script>
