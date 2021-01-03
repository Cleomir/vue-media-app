<template>
  <div class="flex-container">
    <form @submit.prevent="onSubmit" class="card">
      <h3>Log in</h3>
      <p>
        Enter your e-mail to access your media selection panel, no password
        required. Haven't signed in before? No problem just enter your e-mail
        and be welcome!
      </p>
      <input v-model="email" type="text" placeholder="e-mail@example.com" />
      <p v-show="invalidEmail" class="error-label">
        Please enter a valid email address
      </p>
      <button type="submit">Log in</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      invalidEmail: false,
      email: "",
    };
  },
  methods: {
    validateEmail(email) {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        email
      );
    },
    onSubmit() {
      if (!this.email) {
        this.invalidEmail = true;
      } else if (this.email && !this.validateEmail(this.email)) {
        this.invalidEmail = true;
      } else {
        this.$router.push("/dashboard");
      }
    },
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.card {
  width: 680px;
  padding: 30px;
  font-size: 0.9rem;
  background-color: #fff;
  border: 2px solid var(--border-light-gray);
  border-radius: 5px;
}
.error-label {
  color: var(--error-red);
}
input {
  display: block;
  width: 80%;
  padding: 5px;
  border: 2px solid var(--border-light-gray);
  background-color: #e9f0fd;
  color: #000;
  border-radius: 5px;
}
button {
  border: none;
  display: block;
  cursor: pointer;
  margin-top: 14.4px;
  padding: 10px 15px;
  border-radius: 5px;
  color: #fff;
  background-color: var(--primary-blue);
}
</style>
