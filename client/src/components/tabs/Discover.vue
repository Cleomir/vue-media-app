<template>
  <div v-show="isActive">
    <div class="stock-buttons">
      <button
        v-for="(stockButton, index) in stockButtons"
        :key="index"
        :class="{ 'is-active': stockButton === selectedStockButton }"
        @click="selectStockSite(stockButton)"
      >
        {{ stockButton }}
      </button>
    </div>
    <div class="search-bar">
      <input
        v-model="searchKeyword"
        @keyup.enter="searchStockPictures"
        class="clear-form-icon"
        type="text"
        placeholder="Search for a keyword..."
      />
      <button v-show="searchKeyword" @click="clearSearchBar">&#x1F5D9;</button>
    </div>
    <PicturesGrid
      :displayType="'discover'"
      :onScrollUrl="selectedStockSiteUrl"
    />
  </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import PicturesGrid from "../PicturesGrid.vue";
import { pexelsSearchUrl, unsplashSearchUrl } from "../../config";

export default defineComponent({
  data() {
    return {
      searchKeyword: "",
      isActive: false,
      selectedStockButton: "",
      selectedStockSiteUrl: "",
      stockButtons: ["Unsplash", "Pexels"],
    };
  },
  methods: {
    ...mapMutations([
      "setPicturePreview",
      "setPictures",
      "setNextPage",
      "clearPictures",
      "showSnackBar",
    ]),
    clearSearchBar() {
      this.searchKeyword = "";
    },
    selectStockSite(site: string) {
      this.selectedStockButton = site;
    },
    async searchStockPictures() {
      this.selectedStockSiteUrl =
        this.selectedStockButton === "Unsplash"
          ? unsplashSearchUrl
          : pexelsSearchUrl;
      if (this.searchKeyword && this.selectedStockButton) {
        this.clearPictures();
        try {
          const { status, data } = await axios.get(this.selectedStockSiteUrl, {
            params: {
              query: this.searchKeyword,
            },
          });
          if (status !== 200) {
            this.showSnackBar({
              message: "An error has occurred. Please try again later",
              type: "error",
            });
          } else {
            this.mapSearchedPictures(data);
          }
        } catch (error) {
          console.error(error);
          this.showSnackBar({
            message: "An error has occurred. Please try again later",
            type: "error",
          });
        }
      }
    },
    mapSearchedPictures(responseData: AxiosResponse) {
      const { data, headers } = responseData;
      // Unsplash
      if (data.results) {
        const picturesUrls = data.results.map(
          (picture: Record<string, any>) => picture.urls.regular
        );
        // extract next page link from headers
        const nextPage = headers.link
          .split(", ")
          .find((page: string) => page.includes('rel="next'))
          .replaceAll(/([<>;\s]+|rel="next")/g, "");
        this.setNextPage({ unsplashNextPage: nextPage });
        this.setPictures(picturesUrls);
      } else if (data.photos) {
        // Pexels
        const { nextPage, photos } = data;
        const picturesUrls = photos.map(
          (photos: Record<string, any>) => photos.src.large
        );
        this.setNextPage({ pexelsNextPage: nextPage });
        this.setPictures(picturesUrls);
      }
    },
  },
  created() {
    this.isActive = true;
    this.setPicturePreview("");
    this.clearPictures();
  },
  components: {
    PicturesGrid,
  },
});
</script>

<style scoped>
.stock-buttons {
  display: flex;
  justify-content: space-around;
}
.stock-buttons button {
  background-color: #fff;
  border-radius: 5px;
  border: 2px solid var(--border-light-gray);
  cursor: pointer;
  margin: 15px 0;
  padding: 5px 0;
  width: 30%;
  outline: none;
}
button.is-active {
  border: 2px solid var(--primary-blue);
  color: var(--primary-blue);
}
.search-bar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-bar button {
  background-color: #fff;
  border: none;
  color: #3d5993;
  cursor: pointer;
  outline: none;
  position: absolute;
  right: 25px;
  font-weight: 600;
}
input[type="text"] {
  border-radius: 5px;
  border: 2px solid var(--border-light-gray);
  color: #000;
  margin: 0 15px;
  outline: none;
  padding: 10px;
  width: calc(100% - 30px);
}
input[type="text"]:focus {
  border: 2px solid var(--primary-blue);
}
</style>
