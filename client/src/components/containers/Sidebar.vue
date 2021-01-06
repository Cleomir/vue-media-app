<template>
  <aside>
    <h4>Media Cloud</h4>
    <hr />
    <Tabs :links="tabLinks"> </Tabs>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Tabs from "./Tabs.vue";

export default defineComponent({
  data() {
    return {
      tabLinks: [
        { name: "Saved", path: `saved` },
        { name: "Discover", path: "discover" },
      ],
    };
  },
  components: {
    Tabs,
  },
});
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
