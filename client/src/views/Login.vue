<template>
  <Email />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Email from "../components/login/Email.vue";

export default defineComponent({
  name: "Login",
  components: {
    Email,
  },
});
</script>
