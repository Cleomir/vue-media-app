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
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 100vh;
  padding: 15%;
}

main img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: cover;
}
</style>
