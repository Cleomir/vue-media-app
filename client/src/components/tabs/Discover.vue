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
    <PicturesGrid :files="searchedPictures" />
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

import PicturesGrid from "../PicturesGrid.vue";
import { apiUrl } from "../../config";

export default {
  data() {
    return {
      searchKeyword: "",
      searchedPictures: {},
      isActive: false,
      selectedStockButton: "",
      stockButtons: ["Unsplash", "Pexels"],
    };
  },
  methods: {
    ...mapMutations(["setPicturePreview"]),
    clearSearchBar() {
      this.searchKeyword = "";
    },
    selectStockSite(site) {
      this.selectedStockButton = site;
      this.clearSearchBar();
    },
    async searchStockPictures() {
      if (this.searchKeyword && this.selectedStockButton) {
        // TODO show spinner
        try {
          const stockSite = this.selectedStockButton.toLowerCase();
          console.log("Stock site: ", stockSite);
          const { status, data } = await axios.get(
            `${apiUrl}/api/${stockSite}/search`,
            {
              params: {
                query: this.searchKeyword,
              },
            }
          );
          if (status !== 200) {
            // TODO show error in modal
          } else {
            this.mapSearchedPictures(data);
            // TODO hide spinner
          }
        } catch (error) {
          console.error(error);
          // TODO show error in modal
        }
      }
    },
    mapSearchedPictures(responseData) {
      // Unsplash
      if (responseData.results) {
        const { total, total_pages, results } = responseData;
        const picturesUrls = results.map((picture) => picture.urls.regular);
        this.searchedPictures = { pictures: picturesUrls, total, total_pages };
      } else if (responseData.photos) {
        // Pexels
        const { next_page, photos } = responseData;
        const picturesUrls = photos.map((photos) => photos.src.large);
        this.searchedPictures = { pictures: picturesUrls, next_page };
      }
    },
  },
  created() {
    this.setPicturePreview("");
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
