<template>
  <div v-show="isActive">
    <PicturesGrid
      :files="files"
      :displayType="'saved'"
      :onScrollUrl="loadNextPageUrl"
    />
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
import { mapMutations } from "vuex";

import PicturesGrid from "../PicturesGrid";
import { apiUrl } from "../../config";

export default {
  data() {
    return {
      isActive: false,
      files: {},
    };
  },
  computed: {
    loadNextPageUrl() {
      return `${apiUrl}/api/cloudinary/`;
    },
  },
  methods: {
    ...mapMutations(["setPicturePreview"]),
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
          const newPictures = data.map((picture) => picture.secure_url);
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
  async created() {
    this.setPicturePreview("");
    
    try {
      const { status, data } = await axios.get(`${apiUrl}/api/cloudinary/`);
      if (status === 500) {
        console.error(data.message);
      } else {
        const pictures = data.resources.map((picture) => picture.secure_url);
        this.files = { nextCursor: data.next_cursor, pictures };
      }
    } catch (error) {
      console.error(error);
    }
  },
  mounted() {
    this.isActive = true;
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
