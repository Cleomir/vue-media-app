<template>
  <transition name="fade" v-on:after-enter="fadeIn">
    <div
      v-if="displaySnackBar"
      :class="{
        success: snackBarType === 'success',
        error: snackBarType === 'error',
      }"
      class="snackbar"
    >
      <img
        v-if="snackBarType === 'success'"
        :src="checkIcon"
        alt="Success icon"
      />
      <img v-else :src="errorIcon" alt="Success icon" />
      <span>{{ this.snackBarMessage }}</span>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";

import checkSVG from "../assets/check.svg";
import errorSVG from "../assets/error.svg";

export default defineComponent({
  data() {
    return {
      checkIcon: checkSVG,
      errorIcon: errorSVG,
    };
  },
  computed: {
    ...mapState(["displaySnackBar", "snackBarMessage", "snackBarType"]),
  },
  methods: {
    ...mapMutations(["hideSnackBar"]),
  },
});
</script>

<style scoped>
.success {
  background-color: var(--primary-blue);
}
.error {
  background-color: var(--error-red);
}
.snackbar {
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: #fff;
  min-width: 250px;
  padding: 16px 25px;
  position: fixed;
  right: 3%;
  text-align: center;
  top: 10%;
  z-index: 1;
}
.snackbar img {
  width: 17px;
  height: 17px;
}
.snackbar span {
  color: #fff;
  padding-left: 16px;
  vertical-align: top;
}
.fade-enter-active {
  animation: fadein 1s;
}
.fade-leave-active {
  animation: fadeout 1s;
}
@keyframes fadein {
  from {
    right: -16%;
    opacity: 0;
  }
  to {
    right: 3%;
    opacity: 1;
  }
}
@keyframes fadeout {
  from {
    right: 3%;
    opacity: 1;
  }
  to {
    right: -16%;
    opacity: 0;
  }
}
</style>
