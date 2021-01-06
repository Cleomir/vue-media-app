<template>
  <div v-show="isActive">
    <PicturesGrid :displayType="'saved'" :onScrollUrl="loadNextPageUrl" />
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
        <span class="icon">&plus;</span> Upload
        <Spinner v-show="displaySpinner" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import PicturesGrid from "../PicturesGrid.vue";
import Spinner from "../Spinner.vue";
import { apiUrl } from "../../config";

export default defineComponent({
  data() {
    return {
      isActive: false,
      selectedFile: "",
    };
  },
  computed: {
    ...mapState(["displaySpinner"]),
    loadNextPageUrl() {
      return `${apiUrl}/api/cloudinary/`;
    },
  },
  methods: {
    ...mapMutations([
      "setPicturePreview",
      "showSpinner",
      "hideSpinner",
      "setPictures",
      "setNextPage",
      "clearPictures",
      "showSnackBar",
      "hideSnackBar",
    ]),
    openFileSelection() {
      (this.$refs as Record<string, any>).fileUpload.click();
    },
    fileToBase64(file: Blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    async handleFileChange(event: any) {
      try {
        // convert files to base64
        this.showSpinner();
        const base64FilePromises: Promise<unknown>[] = [];
        event.target.files.forEach((file: Blob) =>
          base64FilePromises.push(this.fileToBase64(file))
        );
        const base64Files = await Promise.all(base64FilePromises);
        const { status, data } = await this.uploadFiles({ files: base64Files });
        if (status !== 201) {
          this.hideSpinner();
          this.showSnackBar({
            message: "An error has occurred. Please try again later",
            type: "error",
          });
        } else {
          const picturesUrls = data.map(
            (picture: Record<string, any>) => picture.secure_url
          );
          this.setPictures(picturesUrls);
          this.hideSpinner();
          this.showSnackBar({
            message: "Photo Uploaded successfully",
            type: "success",
          });
          (this.$refs as Record<string, any>).fileUpload.value = "";
        }
      } catch (error) {
        console.error(error);
        this.hideSpinner();
        this.showSnackBar({
          message: "An error has occurred. Please try again later",
          type: "error",
        });
      }
    },
    async uploadFiles(requestBody: Record<string, any>) {
      return axios.post(
        "http://localhost:3000/api/cloudinary/upload",
        requestBody
      );
    },
  },
  async created() {
    this.isActive = true;
    this.setPicturePreview("");
    this.clearPictures();
    try {
      const { status, data } = await axios.get(`${apiUrl}/api/cloudinary/`);
      if (status !== 200) {
        this.showSnackBar({
          message: "An error has occurred. Please try again later",
          type: "error",
        });
      } else {
        const picturesUrls = data.resources.map(
          (picture: Record<string, any>) => picture.secure_url
        );
        this.setNextPage({ cloudinaryNextPage: data.next_cursor });
        this.setPictures(picturesUrls);
      }
    } catch (error) {
      this.showSnackBar({
        message: "An error has occurred. Please try again later",
        type: "error",
      });
      console.error(error);
    }
  },
  components: {
    PicturesGrid,
    Spinner,
  },
});
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
