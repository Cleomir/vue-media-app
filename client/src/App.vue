<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  --primary-blue: #2885e9;
  --primary-light-blue: #f6f9fc;
  --text-dark: #4a5a83;
  --border: #d7dde9;
}

* {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  margin: 0;
  background-color: #eee;
  color: var(--text-dark);
}
</style>
