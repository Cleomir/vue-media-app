<template>
  <div>
    <ul>
      <li
        v-for="(picture, index) in pictures"
        :key="index"
        :class="{ 'is-selected': picture === isSelected }"
        @click="selectPicture(picture)"
      >
        <img :src="picture" alt="savedPicture" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: ["pictures"],
  data() {
    return {
      isSelected: "",
    };
  },
  methods: {
    ...mapMutations(["setPicturePreview"]),
    selectPicture(url) {
      this.isSelected = url;
      this.setPicturePreview(url);
    },
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
