<template>
  <div class="dashboard">
    <Sidebar />
    <Preview />
  </div>
</template>

<script>
import Sidebar from "../components/containers/Sidebar.vue";
import Preview from "../components/Preview.vue";

export default {
  components: {
    Sidebar,
    Preview,
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
