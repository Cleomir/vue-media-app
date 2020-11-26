<template>
  <div class="tabs">
    <ul>
      <li v-for="(tab, index) in links" :key="index">
        <router-link :to="{ name: tab.path }">{{ tab.name }}</router-link>
      </li>
    </ul>

    <div class="tab-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  props: ["links"],
};
</script>

<style scoped>
.router-link-active {
  color: var(--primary-blue);
  border-bottom: 2px solid var(--primary-blue);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
  width: 50%;
}

li a {
  display: block;
  padding: 15px 0;
  border-bottom: 2px solid var(--border-light-gray);
  text-align: center;
  text-decoration: none;
}
</style>
