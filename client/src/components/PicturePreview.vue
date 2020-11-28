<template>
  <main>
    <h1 v-if="!picturePreviewUrl">No picture has been selected</h1>
    <img v-else :src="picturePreviewUrl" alt="picture preview" />
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
  height: 100vh;
  justify-content: center;
  padding: 15% 15%;
}

main img {
  height: 100%;
  object-fit: cover;
  width: 100%;
}
</style>
