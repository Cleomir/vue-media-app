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

<style scoped>
main {
  align-items: center;
  display: flex;
  justify-content: center;
  max-height: 100vh;
  padding: 20%;
}

main img {
  max-width: 100%;
  object-fit: contain;
}
</style>
