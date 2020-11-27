<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  --border-light-gray: #e5e5e5;
  --error-red: #bb0728;
  --primary-blue: #4b91f5;
  --primary-light-blue: #f6f9fc;
  --text-dark-blue: #16315d;
  --text-gray: #7e8da5;
}

* {
  box-sizing: border-box;
  color: var(--text-gray);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: 300;
}

body {
  background-color: #f7f9fc;
  margin: 0;
}

.icon {
  color: #fff;
  font-size: 1.2rem;
  margin-right: 5px;
}
</style>
