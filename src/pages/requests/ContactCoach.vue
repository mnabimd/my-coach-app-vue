<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your E-Mail:</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">Message:</label>
      <textarea rows="5" id="message" v-model.trim="message"></textarea>
    </div>
    <p class="errors" v-if="!formIsValid">
      Please enter a valid email and non-empty message.
    </p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  props: ['teacher'],
  data() {
    return {
      email: this.$store.getters.email || '',
      message: `Hello, teacher! \nI'm intereseted in one of your course. Could you provide me some more information about it? \nThank you in advance.
      `,
      formIsValid: true,
    };
  },
  computed: {
    loggedInUserEmail() {
      return this.$store.getters.email;
    },
    loggedInUserId() {
      return this.$store.getters.userId;
    }
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.message === ''
      ) {
        this.formIsValid = false;
        return;
      }
      this.$store.dispatch('requests/contactCoach', {
        email: this.email,
        message: this.message,
        userId: this.$route.params.id,
        senderId: this.loggedInUserId
      });

      // Show a successfull or failure alert!
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgb(0 0 0 / 20%);
  margin-top: 40px;
  margin-bottom: 40px;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 2px solid #efefef;
  background: #efefef;
  font: inherit;
  padding: 10px;
  padding-left: 15px;
  font-size: 15px;
}


input:focus,
textarea:focus {
  background-color: var(--primary-color-light);
  outline: none;
  border-color: var(--primary-color);
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>