<template>
  <div class="dashboard">
    <Sidebar />
    <PicturePreview />
  </div>
</template>

<script>
import Sidebar from "../components/containers/Sidebar.vue";
import PicturePreview from "../components/PicturePreview.vue";

export default {
  components: {
    Sidebar,
    PicturePreview,
  },
};
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 30% 80%;
  background-color: #fff;
  border: 15px solid var(--border-light-gray);
  overflow: hidden;
  height: 100vh;
}
</style>
