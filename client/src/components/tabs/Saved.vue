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
      <button @click="openFileSelection" :disabled="displaySpinner">
        <span class="icon">+</span> Upload
        <Spinner v-show="displaySpinner" :small="true" />
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";

import PicturesGrid from "../PicturesGrid";
import Spinner from "../Spinner.vue";
import { apiUrl } from "../../config";

export default {
  data() {
    return {
      isActive: false,
      files: {},
    };
  },
  computed: {
    ...mapState(["displaySpinner"]),
    loadNextPageUrl() {
      return `${apiUrl}/api/cloudinary/`;
    },
  },
  methods: {
    ...mapMutations(["setPicturePreview", "showSpinner", "hideSpinner"]),
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
        this.showSpinner();
        const base64FilePromises = [];
        event.target.files.forEach((file) =>
          base64FilePromises.push(this.fileToBase64(file))
        );
        const base64Files = await Promise.all(base64FilePromises);
        const { status, data } = await this.uploadFiles({ files: base64Files });

        if (status !== 201) {
          // TODO show a modal with the error
        } else {
          const newPictures = data.map((picture) => picture.secure_url);
          this.files = {
            ...this.files,
            pictures: [...this.files.pictures, ...newPictures],
          };
          this.hideSpinner();
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
    Spinner,
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
  align-items: center;
  background-color: var(--primary-blue);
  border-radius: 5px;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  outline: none;
  padding: 5px 0;
  width: 100%;
}
</style>
