<template>
  <div>
    <Sidebar />
    <Preview />
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Preview from "../components/Preview.vue";

export default {
  components: {
    Sidebar,
    Preview,
  },
};
</script>
