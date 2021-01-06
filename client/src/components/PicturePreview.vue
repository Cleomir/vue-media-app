<template>
  <main>
    <h1 v-if="!picturePreviewUrl">No picture has been selected</h1>
    <img v-else :src="picturePreviewUrl" alt="picture preview" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  computed: {
    ...mapState(["picturePreviewUrl"]),
  },
});
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
