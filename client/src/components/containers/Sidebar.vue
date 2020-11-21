<template>
  <aside>
    <h4>Media Cloud</h4>
    <hr />
    <Tabs>
      <SavedTab name="Saved" :selected="true" />
      <DiscoverTab name="Discover" />
    </Tabs>
  </aside>
</template>

<script>
import Tabs from "./Tabs";
import SavedTab from "../SavedTab.vue";
import DiscoverTab from "../DiscoverTab.vue";

export default {
  components: {
    Tabs,
    SavedTab,
    DiscoverTab,
  },
};
</script>

<style scoped>
h4 {
  margin: 20px;
  font-weight: 300;
  color: var(--text-dark-blue);
}

hr {
  color: #EFF2F5;
}
</style>
