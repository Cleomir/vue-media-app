<template>
  <aside>
    <h4>Media Cloud</h4>
    <hr />
    <Tabs>
      <Saved name="Saved" :selected="true" />
      <Discover name="Discover" />
    </Tabs>
  </aside>
</template>

<script>
import Tabs from "./Tabs";
import Saved from "../tabs/Saved.vue";
import Discover from "../tabs/Discover.vue";

export default {
  components: {
    Tabs,
    Saved,
    Discover,
  },
};
</script>

<style scoped>
aside {
  border-right: 2px solid var(--border-light-gray);
}

h4 {
  color: var(--text-dark-blue);
  font-weight: 300;
  margin: 20px;
}

hr {
  border: 1px solid var(--border-light-gray);
}
</style>
