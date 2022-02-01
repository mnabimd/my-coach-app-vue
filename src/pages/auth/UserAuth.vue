<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div v-if="mode !== 'login'" class="form-control">
          <label for="firstname">Firstname</label>
          <input type="text" id="firstname" v-model.trim="firstname" />
        </div>
        <div v-if="mode !== 'login'" class="form-control">
          <label for="fullname">Lastname</label>
          <input type="text" id="lastname" v-model.trim="lastname" />
        </div>
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid" class="validation">
          Please enter a valid email and password (must be at least 6 characters
          long).
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      if (this.mode !== 'login') {
        if (this.firstname.length <= 0 || this.lastname.length <= 0) {
          this.formIsValid = false;
          return;
        }
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      if (this.mode !== 'login') {
        // Only in signup!
        actionPayload['firstname'] = this.firstname;
        actionPayload['lastname'] = this.lastname;
      }

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }

        const isAdmin = this.$store.getters.isAdmin;

        let redirectUrl = '/' + (this.$route.query.redirect || 'coaches');

        if (isAdmin) {
          redirectUrl = '/dashboard';
        }
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later.';
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
        this.password = '';
      } else {
        this.mode = 'login';
        this.password = '';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
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

.validation {
  color: red !important;
  font-weight: bold;
}
</style>