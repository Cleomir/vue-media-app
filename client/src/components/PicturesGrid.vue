<template>
  <div>
    <ul ref="picturesGrid" v-if="Object.entries(onScrollFiles).length >= 1">
      <li
        v-for="(picture, index) in onScrollFiles.pictures"
        :key="index"
        :class="{
          'is-selected': displayType === 'saved' && picture === isSelected,
        }"
        @click="selectPicture(picture)"
      >
        <img :src="picture" alt="picture" />
      </li>
    </ul>
    <ul ref="picturesGrid" v-else>
      <li
        v-for="(picture, index) in files.pictures"
        :key="index"
        :class="{
          'is-selected': displayType === 'saved' && picture === isSelected,
        }"
        @click="selectPicture(picture)"
      >
        <img :src="picture" alt="picture" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

import {
  cloudinaryListPicturesUrl,
  // pexelsSearchUrl,
  // unsplashSearchUrl,
} from "../config";

export default {
  props: ["files", "displayType", "onScrollUrl"],
  data() {
    return {
      isSelected: "",
      onScrollFiles: {},
      firstRender: true,
    };
  },

  methods: {
    ...mapMutations(["setPicturePreview"]),
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
          // use props values in the first event triggered, otherwise use values in state
          if ((this.files.nextCursor && this.firstRender) || this.nextCursor) {
            // TODO show spinner
            this.firstRender = false;
            try {
              const { status, data } = await this.onScrollFetchNextPage(
                this.onScrollUrl,
                {
                  next_cursor: this.nextCursor
                    ? this.nextCursor
                    : this.files.nextCursor,
                }
              );
              if (status !== 200) {
                // TODO show modal with error
              } else {
                this.OnScrollHandleResponse(data, this.onScrollUrl);
                // TODO hide spinner
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
          this.onScrollFiles = {
            next_cursor: data.next_cursor || undefined,
            pictures: [...this.files.pictures, ...picturesUrl],
          };
          break;
        }

        default:
          break;
      }
    },
  },
  mounted() {
    this.onScroll();
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
  list-style: none;
  margin: 0;
  padding: 15px 15px 0 15px;
  overflow-y: auto;
  max-height: 820px;
}
ul li {
  cursor: pointer;
  outline: 2px solid var(--border-light-gray);
}
ul li img {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
}
</style>
