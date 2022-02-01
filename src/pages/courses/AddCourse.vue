<template>
  <base-card>
    <base-dialog :show="!!message" title="Message" @close="handleDialogAndReplace">
      <p>{{ message }}</p>
    </base-dialog>
    <h2>{{ title }}</h2>
    <form @submit.prevent>
      <div class="form-control" :class="{ invalid: !name.isValid }">
        <label>Course title</label>
        <input
          type="text"
          id="name"
          v-model="name.val"
          placeholder="PHP for Beginners with MySQL"
          @blur="clearValidity('name')"
        />
        <p v-if="!name.isValid">Please enter your course details!</p>
      </div>

      <div class="form-control" :class="{ invalid: !description.isValid }">
        <label>Description</label>
        <textarea
          type="text"
          id="description"
          v-model="description.val"
          placeholder="Learn everything you need to become a professional PHP developer with practical exercises & projects. In addition, you will learn PhP Security, password hashing, email sending and Object Oriented Programming. "
          rows="5"
          @blur="clearValidity('description')"
        />
        <p v-if="!description.isValid">Please enter your course description!</p>
      </div>

      <div class="form-control" :class="{ invalid: !goals.isValid }">
        <label>Primary goal of the course</label>
        <input
          type="text"
          id="goals"
          placeholder="Become a PHP Master with MySQL"
          v-model="goals.val"
          @blur="clearValidity('goals')"
        />
        <p v-if="!goals.isValid">Please enter your course goals!</p>
      </div>

      <div class="form-control" :class="{ invalid: !requirements.isValid }">
        <label>Minimum Requirements</label>
        <input
          type="text"
          id="requirements"
          v-model="requirements.val"
          placeholder="HTML, CSS & JavaScript is mandatory"
          @blur="clearValidity('requirements')"
        />
        <p class="error" v-if="!requirements.isValid">
          Please enter your course requirements!
        </p>
      </div>

      <div class="text-right">
        <base-button class="button" @click="submitForm">Add Course</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      message: null,
      title: 'Create your course',
      name: {
        val: 'Vue.js Complete Guide with Practices',
        isValid: true,
      },
      description: {
        val: 'Ultimate guide to Vue 3 Development! Build large scale applications and deploy to production. Testing your application with Jest, snapshot testing, and even E2E testing!',
        isValid: true,
      },
      goals: {
        val: 'Able to build large and scalable Vue applications with Vuex and Routers.',
        isValid: true,
      },
      requirements: {
        val: 'Basics of JavaScript and Node.js with some MySQL or MongoDB knowledge.',
        isValid: true,
      },
    };
  },
  methods: {
    handleDialogAndReplace() {
      this.message = null;
      this.$router.replace('/profile');
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      if (this.name.val === '') {
        this.name.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (this.goals.val === '') {
        this.goals.isValid = false;
        this.formIsValid = false;
      }
      if (this.requirements.val === '') {
        this.requirements.isValid = false;
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.message = null;
      this.formIsValid = true;
      this.validateForm();

      if (!this.formIsValid) {
        return false;
      }

      const timestamp = new Date().getTime();

      const data = {
        name: this.name.val,
        description: this.description.val,
        goals: this.goals.val,
        requirements: this.requirements.val,
        timestamp: parseInt(timestamp)
      };

      try {
        await this.$store.dispatch('courses/addCourse', data);
        
        this.$router.replace('/profile');
      } catch (e) {
        this.message = e || 'Failed to add course';
      }

    },
  },
};
</script>

<style scoped>
.text-right {
  float: right;
  margin: 5px !important;
}
h2 {
  color: var(--primary-color);
}
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

@media screen and (max-width: 600px) {
  .text-right {
    float: none
  }  
}

</style>