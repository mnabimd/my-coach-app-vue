// Coach Registration Form
<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Tell us about yourself? Biography.</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        placeholder="I'm a front-end web designer with over 5 years of experience. "
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">Biography must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly rate </label>
      <div class="d-flex">
        <input
          type="number"
          id="rate"
          v-model.number="rate.val"
          @blur="clearValidity('rate')"
        />
        <span id="spanEnd">Afghani / hour</span>
      </div>
      <p v-if="!rate.isValid">Rate must be greater than 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: !phone.isValid }">
      <label for="phone">Phone Number</label>
      <input
        type="number"
        id="phone"
        v-model="phone.val"
        @keyup="phoneValidity"
        @blur="clearValidity('phone')"
      />
      <p v-if="!phone.isValid">Phone number must be at least 11 Characters.</p>
    </div>
    <div class="form-control" :class="{ invalid: !language.isValid }">
      <label for="phone">In which language you will be teaching courses?</label>
      <input
        type="text"
        id="language"
        v-model="language.val"
        placeholder="English, Pashto, Dari..."
        @blur="clearValidity('language')"
      />
      <p v-if="!language.isValid">Please select a lanaguage.</p>
    </div>

    <base-input
      label="Upload your CV"
      type="file"
      @change="getFile"
    ></base-input>
    <p v-if="!cv.isValid">Please upload a cv.</p>

    <p class="red" v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      description: {
        val: `I'm a passionate software engineer and back-end web developer with 5 years of experience and I've taught over a thousand people who to code or how to become professional software engineers through my YouTube channel and online courses.`,
        isValid: true,
      },
      rate: {
        val: 150,
        isValid: true,
      },
      phone: {
        val: '93700300555',
        isValid: true,
      },
      language: {
        val: 'Pashto',
        isValid: true,
      },
      formIsValid: true,
      cv: {
        val: null,
        isValid: true
      },
      error: null,
    };
  },
  methods: {
    getFile(e) {
      // Clear previous Error:-
      this.error = false;

      const file = e.target.files[0];

      if (!file) return false;

      // SIZE IS IN BYTES
      // 1048576 = 1 MB
      if (file.size >= 1048576 / 2) {
        this.error = 'Please upload a file less than 500 KB!';
        return false;
      }

      const reader = new FileReader();

      reader.onload = () => {
        // Save the blob and probabaly emit the blob :)
        this.cv.val = reader.result.toString();
      };

      reader.readAsDataURL(file);
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    phoneValidity() {
      if (this.phone.val.toString().length > 11) {
        this.phone.isValid = false;
      } else {
        this.phone.isValid = true;
      }
    },
    validateForm() {
      this.formIsValid = true;
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (!this.phone.val || this.phone.val.toString().length > 11) {
        this.phone.isValid = false;
        this.formIsValid = false;
      }
      if (!this.language.val || this.language.val === '') {
        this.language.isValid = false;
        this.formIsValid = false;
      }
      if (!this.cv.val) {
        this.cv.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        desc: this.description.val,
        rate: this.rate.val,
        phone: this.phone.val,
        language: this.language.val,
        cv: this.cv.val
      };

      const answer = confirm(
        'Are you sure? An Admin will review your request and be with you, shortly.'
      );

      if (!answer) return false;

      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
* {
  font-family: 'Poppins';
}
.red {
  color: red;
}
.course-title {
  color: var(--primary-color);
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
}

.d-flex {
  display: flex;
  border: 2px solid #efefef;
  background: #efefef;
}

#spanEnd {
  display: inline-flex;
  justify-self: center;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 20%;
  position: relative;
  height: 100% !important;
  text-align: center;
  float: right;
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: bold;
  background: var(--primary-color);
  color: white;
  padding: 10px;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 18px;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
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

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>