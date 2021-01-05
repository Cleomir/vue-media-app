<template>
  <div class="dashboard">
    <Sidebar />
    <PicturePreview />
    <Snackbar />
  </div>
</template>

<script>
import { defineComponent } from "vue";

import Sidebar from "../components/containers/Sidebar.vue";
import PicturePreview from "../components/PicturePreview.vue";
import Snackbar from "../components/Snackbar.vue";

export default defineComponent({
  components: {
    Sidebar,
    PicturePreview,
    Snackbar,
  },
});
</script>

<style scoped>
.dashboard {
  background-color: #fff;
  border: 15px solid var(--border-light-gray);
  display: grid;
  grid-template-columns: 30% 70%;
  height: 100vh;
  overflow: hidden;
}
</style>
