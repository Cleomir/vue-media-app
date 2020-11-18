<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  --primary-blue: #2885e9;
  --primary-light-blue: #f6f9fc;
  --text-gray: #4a5a83;
  --border-light-gray: #d7dde9;
  --error-red: #bb0728;
}

* {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  margin: 0;
  background-color: #eee;
  color: var(--text-gray);
}
</style>
