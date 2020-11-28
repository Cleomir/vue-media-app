<template>
  <ul ref="picturesGrid">
    <li
      v-for="(picture, index) in pictures"
      :key="index"
      :class="{
        'is-selected': displayType === 'saved' && picture === isSelected,
      }"
      @click="selectPicture(picture)"
    >
      <img :src="picture" alt="picture" />
      <div v-if="displayType === 'discover'" class="use-overlay">
        <button @click.stop="usePicture(picture)" :disabled="displaySpinner">
          <span class="icon">&plus;</span> Use
          <Spinner v-show="displaySpinner" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";

import {
  cloudinaryListPicturesUrl,
  uploadPictureUrl,
  // pexelsSearchUrl,
  // unsplashSearchUrl,
} from "../config";
import Spinner from "../components/Spinner.vue";

export default {
  props: ["displayType", "onScrollUrl"],
  data() {
    return {
      isSelected: "",
    };
  },

  computed: {
    ...mapState(["displaySpinner", "pictures", "nextPage"]),
  },

  methods: {
    ...mapMutations([
      "setPicturePreview",
      "showSpinner",
      "hideSpinner",
      "setNextPage",
      "setPictures",
      "clearPictures",
    ]),
    selectPicture(url) {
      this.isSelected = url;
      this.setPicturePreview(url);
    },

    async onScroll() {
      this.$refs.picturesGrid.onscroll = async () => {
        const bottomOfPage =
          this.$refs.picturesGrid.scrollTop +
            this.$refs.picturesGrid.clientHeight >=
          this.$refs.picturesGrid.scrollHeight;

        if (bottomOfPage) {
          if (this.nextPage.nextCursor) {
            try {
              // TODO handle pagination for other providers
              const { status, data } = await this.onScrollFetchNextPage(
                this.onScrollUrl,
                {
                  next_cursor: this.nextPage.nextCursor,
                }
              );
              if (status !== 200) {
                // TODO show modal with error
              } else {
                this.OnScrollHandleResponse(data, this.onScrollUrl);
              }
            } catch (error) {
              // TODO show modal with error
              console.error(error);
            }
          }
        }
      };
    },

    async onScrollFetchNextPage(url, params) {
      return axios.get(url, { params: { ...params } });
    },

    OnScrollHandleResponse(data, url) {
      switch (url) {
        case cloudinaryListPicturesUrl: {
          const picturesUrl = data.resources.map((file) => file.secure_url);
          this.setNextPage({ next_cursor: data.next_cursor || undefined });
          this.setPictures(picturesUrl);
          break;
        }

        default:
          break;
      }
    },
    async usePicture(url) {
      this.showSpinner();

      try {
        const { status } = await axios.post(uploadPictureUrl, {
          files: [url],
        });

        if (status !== 201) {
          this.hideSpinner();
          // TODO show success or error message
        } else {
          this.hideSpinner();
          // TODO show success or error message
        }
      } catch (error) {
        console.error(error);
        this.hideSpinner();
        // TODO show success or error message
      }
    },
  },

  mounted() {
    this.onScroll();
  },
  components: {
    Spinner,
  },
};
</script>

<style scoped>
.is-selected {
  outline: 3px solid red;
}

ul {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 50% calc(50% - 10px);
  height: 693px;
  list-style: none;
  margin: 15px 0;
  overflow-y: auto;
  padding: 3px 15px 0 15px;
}
ul li {
  cursor: pointer;
  height: 200px;
  outline: 2px solid var(--border-light-gray);
  position: relative;
  width: 100%;
}
ul li img {
  display: block;
  height: inherit;
  object-fit: cover;
  width: inherit;
}

.use-overlay {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  transition: 0.5s ease;
  width: 100%;
}
.use-overlay:hover {
  opacity: 1;
}
.use-overlay span {
  color: #fff;
  padding-right: 5px;
}
.use-overlay button {
  align-items: center;
  background-color: var(--primary-blue);
  border-radius: 5px;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  outline: none;
  padding: 10px 25px;
  position: absolute;
}
</style>
