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
        @keyup.enter="searchStockPhotos"
        class="clear-form-icon"
        type="text"
      />
      <button v-show="searchKeyword" @click="clearSearchBar">&#x1F5D9;</button>
    </div>
    <PicturesGrid :pictures="searchedPictures" />
  </div>
</template>

<script>
import axios from "axios";

import PicturesGrid from "../PicturesGrid.vue";

export default {
  props: ["name", "selected"],
  data() {
    return {
      searchKeyword: "",
      searchedPictures: [],
      isActive: false,
      selectedStockButton: "",
      stockButtons: ["Unsplash", "Pexels"],
    };
  },
  methods: {
    clearSearchBar() {
      this.searchKeyword = "";
    },
    selectStockSite(site) {
      this.selectedStockButton = site;
      this.clearSearchBar();
    },
    async searchStockPhotos() {
      if (this.searchKeyword && this.selectedStockButton) {
        try {
          const stockSite = this.selectedStockButton.toLowerCase();
          const { status, data } = await axios.get(
            `http://localhost:3000/api/${stockSite}/search`,
            {
              params: {
                query: this.searchKeyword,
              },
            }
          );
          if (status !== 200) {
            // TODO show error in modal
          } else {
            this.searchedPictures = data.photos
              ? data.photos
              : data.data.results;

            console.log("Response: ", data);
            
          }
        } catch (error) {
          console.error(error);
          // TODO show error in modal
        }
      }
    },
  },
  computed: {
    href() {
      return `#${this.name.toLowerCase()}`;
    },
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
