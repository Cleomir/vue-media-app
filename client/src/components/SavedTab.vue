<template>
  <div v-show="isActive">
    <PicturesGrid />
    <input type="file" id="upload-file" style="display: none" />
    <button type="">Upload</button>
  </div>
</template>

<script>
import PicturesGrid from "./PicturesGrid";

export default {
  props: ["name", "selected"],
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    href() {
      return `#${this.name.toLowerCase()}`;
    },
  },
  mounted() {
    this.isActive = this.selected;
  },
  components: {
    PicturesGrid,
  },
};
</script>
