<template>
  <div class="flex-container">
    <form @submit.prevent="onSubmit" class="card">
      <h3>Log in</h3>
      <p>
        Enter your e-mail to access your media selection panel, no password
        required. Haven't signed in before? No problem just enter your e-mail
        and be welcome!
      </p>
      <input
        @keyup="validateEmail"
        type="text"
        placeholder="e-mail@example.com"
      />
      <button type="submit" :disabled="!isValidEmail">Log in</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isValidEmail: false,
    };
  },
  methods: {
    validateEmail(event) {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      this.isValidEmail = emailRegex.test(event.target.value);
    },
    onSubmit() {
      if (this.isValidEmail) {
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
  background-color: #f6f9fc;
  border: 2px solid var(--border);
  border-radius: 5px;
}

input {
  display: block;
  width: 80%;
  padding: 5px;
}

button {
  border: none;
  display: block;
  cursor: pointer;
  margin-top: 14.4px;
  padding: 10px 15px;
  border-radius: 5px;
  color: var(--primary-light-blue);
  background-color: var(--primary-blue);
}

button:disabled {
  background-color: #555;
}
</style>
