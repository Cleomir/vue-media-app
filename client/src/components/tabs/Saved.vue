<template>
  <div v-show="isActive">
    <PicturesGrid :pictures="files" />
    <input
      type="file"
      ref="fileUpload"
      style="display: none"
      accept="image/*"
      multiple
      @change="handleFileChange"
    />
    <div class="upload-overlay">
      <button @click="openFileSelection">
        <span class="icon">+</span> Upload
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import PicturesGrid from "../PicturesGrid";

export default {
  props: ["name", "selected"],
  data() {
    return {
      isActive: false,
      files: [],
    };
  },
  methods: {
    openFileSelection() {
      this.$refs.fileUpload.click();
    },
    fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    async handleFileChange(event) {
      try {
        // convert files to base64
        // TODO show spinner
        const base64FilePromises = [];
        event.target.files.forEach((file) =>
          base64FilePromises.push(this.fileToBase64(file))
        );
        const base64Files = await Promise.all(base64FilePromises);

        const { status, data } = await this.uploadFiles({ files: base64Files });
        // TODO remove spinner
        if (status !== 201) {
          // TODO show a modal with the error
        } else {
          const newPictures = data.response.map(
            (picture) => picture.secure_url
          );
          this.files = [...this.files, ...newPictures];
        }
      } catch (error) {
        // TODO show a modal with the error
        console.error(error);
      }
    },

    async uploadFiles(requestBody) {
      return axios.post(
        "http://localhost:3000/api/cloudinary/upload",
        requestBody
      );
    },
  },
  computed: {
    href() {
      return `#${this.name.toLowerCase()}`;
    },
  },
  async created() {
    try {
      const { status, data } = await axios.get(
        "http://localhost:3000/api/cloudinary/"
      );
      if (status === 500) {
        console.error(data.message);
      } else {
        this.files = data.resources.map((picture) => picture.secure_url);
      }
    } catch (error) {
      console.error(error);
    }
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
  position: relative;
  text-align: center;
}

.upload-overlay {
  background-color: #fff;
  bottom: 15px;
  padding: 15px;
  position: fixed;
  width: calc(30% - 27px);
}

.upload-overlay button {
  background-color: var(--primary-blue);
  border-radius: 5px;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 5px 0;
  width: 100%;
}
</style>
