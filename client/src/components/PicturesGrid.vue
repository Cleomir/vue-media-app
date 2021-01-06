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

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import {
  cloudinaryListPicturesUrl,
  uploadPictureUrl,
  pexelsSearchUrl,
  unsplashSearchUrl,
} from "../config";
import Spinner from "../components/Spinner.vue";

export default defineComponent({
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
      "showSnackBar",
    ]),
    selectPicture(url: string) {
      this.isSelected = url;
      this.setPicturePreview(url);
    },
    async onScroll() {
      (this.$refs as Record<
        string,
        Record<string, unknown>
      >).picturesGrid.onscroll = async () => {
        const bottomOfPage =
          (this.$refs as Record<string, any>).picturesGrid.scrollTop +
            (this.$refs.picturesGrid as Record<string, any>).clientHeight >=
          (this.$refs.picturesGrid as Record<string, any>).scrollHeight;
        const {
          cloudinaryNextPage,
          pexelsNextPage,
          unsplashNextPage,
        } = this.nextPage;
        if (bottomOfPage) {
          if (cloudinaryNextPage || pexelsNextPage || unsplashNextPage) {
            try {
              const { status, data } = await this.onScrollFetchNextPage(
                this.onScrollUrl,
                {
                  nextCursor: cloudinaryNextPage,
                  pexelsNextPage: pexelsNextPage,
                  unsplashNextPage: unsplashNextPage,
                }
              );
              if (status !== 200) {
                this.showSnackBar({
                  message: "An error has occurred. Please try again later",
                  type: "error",
                });
              } else {
                this.OnScrollHandleResponse(data, this.onScrollUrl);
              }
            } catch (error) {
              this.showSnackBar({
                message: "An error has occurred. Please try again later",
                type: "error",
              });
              console.error(error);
            }
          }
        }
      };
    },
    async onScrollFetchNextPage(url: string, params: Record<string, any>) {
      return axios.get(url, { params: { ...params } });
    },
    OnScrollHandleResponse(data: Record<string, any>, url: string) {
      switch (url) {
        case cloudinaryListPicturesUrl: {
          const picturesUrl = data.resources.map(
            (file: Record<string, any>) => file.secure_url
          );
          this.setNextPage({
            cloudinaryNextPage: data.next_cursor || undefined,
          });
          this.setPictures(picturesUrl);
          break;
        }
        case unsplashSearchUrl: {
          const picturesUrls = data.data.results.map(
            (picture: Record<string, any>) => picture.urls.regular
          );
          // extract next page link from headers
          const nextPage = data.headers.link
            .split(", ")
            .find((page: string) => page.includes('rel="next'))
            .replaceAll(/([<>;\s]+|rel="next")/g, "");
          this.setNextPage({ unsplashNextPage: nextPage });
          this.setPictures(picturesUrls);
          break;
        }
        case pexelsSearchUrl: {
          const { nextPage, photos } = data.data;
          const picturesUrls = photos.map(
            (photos: Record<string, any>) => photos.src.large
          );
          this.setNextPage({ pexelsNextPage: nextPage });
          this.setPictures(picturesUrls);
          break;
        }
        default:
          console.error("Unsupported stock site");
          break;
      }
    },
    async usePicture(url: string) {
      this.showSpinner();
      try {
        const { status } = await axios.post(uploadPictureUrl, {
          files: [url],
        });
        if (status !== 201) {
          this.hideSpinner();
          this.showSnackBar({
            message: "An error has occurred. Please try again later",
            type: "error",
          });
        } else {
          this.hideSpinner();
          this.showSnackBar({
            message: "Photo saved successfully",
            type: "success",
          });
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
  },
  mounted() {
    this.onScroll();
  },
  components: {
    Spinner,
  },
});
</script>

<style scoped>
.is-selected {
  outline: 3px solid red;
}
ul {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 50% calc(50% - 10px);
  height: 744px;
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
