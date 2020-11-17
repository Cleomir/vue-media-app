<template>
  <aside>
    <h4>Media Cloud</h4>
    <hr />
    <!-- tab links -->
    <div>
      <button>Saved</button>
      <button>Discover</button>
    </div>

    <!-- saved tab content -->
    <div>
      <PicturesGrid />
      <input type="file" id="upload-file" style="display: none" />
      <button type="">Upload</button>
    </div>

    <!-- discover tab content -->
    <div>
      <div>
        <button>Unsplash</button>
        <button>Pexels</button>
      </div>
      <input type="text" />
      <PicturesGrid />
    </div>
  </aside>
</template>

<script>
import PicturesGrid from "./PicturesGrid.vue";

export default {
  components: {
    PicturesGrid,
  },
};
</script>

<style scoped></style>
