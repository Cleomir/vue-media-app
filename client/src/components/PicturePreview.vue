<template>
  <main>
    <h1 v-if="!picturePreviewUrl">No picture has been selected</h1>
    <img
      v-else-if="picturePreviewUrl"
      :src="picturePreviewUrl"
      alt="picture preview"
    />
  </main>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["picturePreviewUrl"]),
  },
};
</script>

<style scoped></style>
