<template>
  <div v-show="isActive">
    <div>
      <button>Unsplash</button>
      <button>Pexels</button>
    </div>
    <input type="text" />
    <PicturesGrid />
  </div>
</template>

<script>
import PicturesGrid from "./PicturesGrid.vue";

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
