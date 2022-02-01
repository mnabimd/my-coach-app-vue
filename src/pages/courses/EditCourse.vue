<template>
  <base-card>
    <h2>Edit your course</h2>
    <form @submit.prevent>
      <div class="form-control" :class="{ invalid: !name.isValid }">
        <label>Course title</label>
        <input
          type="text"
          id="name"
          v-model="name.val"
          placeholder="PHP for Beginners with MySQL"
          @blur="clearValidity('name')"
          @keyup="lookForChange('name')"
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
          @keyup="lookForChange('description')"
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
          @keyup="lookForChange('goals')"
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
          @keyup="lookForChange('requirements')"
        />
        <p class="error" v-if="!requirements.isValid">
          Please enter your course requirements!
        </p>
      </div>

      <div class="text-right">
        <base-button v-if="changesMade" class="button" @click="submitForm"
          >Save Changes</base-button
        >
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      courseId: null,
      theCourse: {},
      title: 'Create your first course',
      changesMade: false,
      name: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      goals: {
        val: '',
        isValid: true,
      },
      requirements: {
        val: '',
        isValid: true,
      },
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    lookForChange(input) {
      if (this[input].val !== this.theCourse[input]) {
        this.changesMade = true;
      } else {
        this.changesMade = false;
      }
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
      this.formIsValid = true;
      this.validateForm();

      if (!this.formIsValid) {
        return false;
      }

      const data = {
        courseId: this.courseId,
        name: this.name.val,
        description: this.description.val,
        goals: this.goals.val,
        requirements: this.requirements.val,
      };

      await this.$store.dispatch('courses/editCourse', data);
      this.$router.replace('/profile');
    },
  },
  created() {
    // If no course id was passsed, redirect
    const courseId = this.$route.params.courseId;
    if (!courseId) {
      this.$router.replace('/profile');
    }
    // Set courseId
    this.courseId = courseId;

    // Load coach's courses
    const coachCourses = this.$store.getters['courses/coachCourses'];
    let theCourse = coachCourses.filter((course) => course._id === courseId)[0];

    if (theCourse) {
      // Apply the values to the inputs and also to the [theCourse] obj
      this.theCourse.name = this.name.val = theCourse.course;
      this.theCourse.description = this.description.val = theCourse.courseDescription;
      this.theCourse.goals = this.goals.val = theCourse.courseGoals;
      this.theCourse.requirements = this.requirements.val = theCourse.courseRequirements;
    }
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
</style>