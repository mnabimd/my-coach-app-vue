<template>
  <base-card>
    <base-dialog :show="!!error" title="An error occurred" @close="errHandler">
      <p>{{ error }}</p>
    </base-dialog>

    <base-dialog :show="!!message" title="Successfull" @close="messageHandler">
      <p>{{ message }}</p>
    </base-dialog>

    <base-input
      type="text"
      :inputValue="firstname"
      label="Firstname"
      @input-value="setFirstname"
    ></base-input>
    <base-input
      type="text"
      :inputValue="lastname"
      label="Lastname"
      @input-value="setLastname"
    ></base-input>
    <base-input
      type="email"
      :inputValue="email"
      label="Email"
      @input-value="setEmail"
      :readonly="true"
    ></base-input>
    <base-input
      type="password"
      placeholder="Enter a new password"
      :inputValue="password"
      label="New Password"
      @input-value="setPassword"
    ></base-input>

    <p class="error" v-if="!formIsValid">
      {{ validationError }}
    </p>

    <div class="text-right">
      <base-button
        v-if="changesMade"
        class="button outline"
        @click="submitForm"
        >Save Changes</base-button
      >
    </div>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      message: null,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      formIsValid: true,
      validationError: '',
    };
  },
  methods: {
    setFirstname(value) {
      this.firstname = value;
    },
    setLastname(value) {
      this.lastname = value;
    },
    setEmail(value) {
      this.email = value;
    },
    setPassword(value) {
      this.password = value;
    },
    async submitForm() {
      this.formIsValid = true;
      if (this.email === '' || !this.email.includes('@')) {
        this.validationError = 'Please enter a valid email address.';
        this.formIsValid = false;
        return;
      } else if (this.password && this.password.length <= 8) {
        this.validationError =
          'Please enter a password greater than 8 characters.';
        this.formIsValid = false;
        return;
      } else if (this.firstname.length <= 0 || this.lastname.length <= 0) {
        this.validationError = 'Please enter your firstname and lastname.';
        this.formIsValid = false;
        return;
      }
      try {
        // Send the request (Only if user is logged in (have token)):-
        const data = {
          firstname: this.firstname,
          lastname: this.lastname,
        };
        if (this.email !== this.user.email) {
          data['email'] = this.email;
        }
        if (this.password !== '') {
          data['password'] = this.password;
        }

        // If nothing was changed, do nothing then
        if (!this.changesMade) {
          this.error = 'You have not made any changes yet.';
          return false;
        }
        await this.$store.dispatch('editUser', data);

        this.message = `Successfully changed information. You'll now be logged out!`;
      } catch (err) {
        this.error = err.message || 'Failed to edit provided information.';
      }
    },
    errHandler() {
      this.error = null;
    },
    messageHandler() {
      this.message = null;
      this.$store.dispatch('logout');
      this.$router.replace('/coaches');
    },
  },
  computed: {
    user() {
      return this.$store.getters.userData;
    },
    changesMade() {
      if (
        this.email === this.user.email &&
        this.firstname === this.user.firstname &&
        this.lastname === this.user.lastname &&
        this.password === ''
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    const user = this.$store.getters.userData;

    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
  },
};
</script>

<style scoped>
.card {
  padding: 35px !important;
  margin: 1rem;
}
.text-right {
  text-align: right;
}

</style>