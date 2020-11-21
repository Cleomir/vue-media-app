<template>
  <div v-show="isActive">
    <PicturesGrid />
    <input
      type="file"
      ref="fileUpload"
      style="display: none"
      accept="image/*"
      multiple
      @change="handleFileChange"
    />
    <button @click="openFileSelection">
      <span class="icon">+</span> Upload
    </button>
  </div>
</template>

<script>
import PicturesGrid from "../PicturesGrid";

export default {
  props: ["name", "selected"],
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    openFileSelection() {
      this.$refs.fileUpload.click();
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    async handleFileChange(e) {
      const base64ImagePromises = [];
      e.target.files.forEach((image) =>
        base64ImagePromises.push(this.toBase64(image))
      );
      const base64Images = await Promise.all(base64ImagePromises);
      console.log(base64Images);
      // TODO send base64 images to server
    },
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

<style scoped>
div {
  text-align: center;
}
button {
  background-color: var(--primary-blue);
  border-radius: 5px;
  border: none;
  color: #fff;
  cursor: pointer;
  outline: none;
  padding: 10px 0;
  width: 90%;
}
</style>
