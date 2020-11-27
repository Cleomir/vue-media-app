<template>
  <div :class="{ small: small, blue: blue, centered: centered }" class="loader">
    Loading...
  </div>
</template>

<script>
export default {
  props: ["small", "blue", "centered"],
};
</script>

<style scoped>
.blue {
  background-color: var(--primary-blue) !important;
}
.blue::before {
  background-color: var(--primary-blue) !important;
}
.blue::after {
  background-color: #fff !important;
}

.small {
  font-size: 2px !important;
}

.centered {
  margin: 10px auto !important;
}

.loader {
  display: block;
  font-size: 10px;
  margin-left: 10px;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #fff;
  background: linear-gradient(to right, #fff 10%, rgba(75, 145, 245, 0) 42%);
  position: relative;
  animation: load3 1.4s infinite linear;
  transform: translateZ(0);
}
.loader::before {
  width: 50%;
  height: 50%;
  background: #fff;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
}
.loader::after {
  background: var(--primary-blue);
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: "";
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
