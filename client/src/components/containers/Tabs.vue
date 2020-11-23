<template>
  <div class="tabs">
    <ul>
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ 'is-active': tab.isActive }"
      >
        <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
      </li>
    </ul>

    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      tabs: [],
    };
  },
  methods: {
    ...mapMutations(["setPicturePreview"]),
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = tab.name === selectedTab.name;
      });
      this.setPicturePreview("");
    },
  },
  created() {
    this.tabs = this.$children;
  },
};
</script>

<style scoped>
li.is-active {
  border-bottom: 2px solid var(--primary-blue);
}
.is-active a {
  color: var(--primary-blue);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
  width: 50%;
  padding: 15px 0;
  border-bottom: 2px solid var(--border-light-gray);
  text-align: center;
}

li a {
  text-decoration: none;
}
</style>
