<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  --primary-blue: #4b91f5;
  --primary-light-blue: #f6f9fc;
  --text-gray: #7e8da5;
  --text-dark-blue: #16315d;
  --border-light-gray: #e5e5e5;
  --error-red: #bb0728;
}

* {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: 300;
  color: var(--text-gray);
}

body {
  margin: 0;
  background-color: #f7f9fc;
}
</style>
