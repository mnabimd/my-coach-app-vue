<template>
  <li>
    <div class="profile text-center">
      <img :src="profile || '/assets/photos/avatar.jpg'" width="200" />
      <span class="fullname">{{ firstName }}</span>
    </div>
    <div>
      <h5 class="padding-x">
        <span class="font-weight-bold primary-color" style="font-size: 14px"
          >Biogrpahy:</span
        >
        "{{ description }}"
      </h5>
      <div>
        <!-- <base-course-title v-for="course in courses" :key="course" :title="course.course"></base-course-title> -->

        <div class="inline-wrapper">
          <div>
            <box-icon name="world"></box-icon> <span>{{ language }}</span>
          </div>
          <div>
            <box-icon name="money"></box-icon>
            <span>{{ rate }} Afghani / hour</span>
          </div>
          <div
            class="active"
            @click="toggleCourses"
            v-if="courses && courses.length != 0"
          >
            <box-icon name="rectangle"></box-icon>
            <span v-if="!showCourses">Show Courses</span
            ><span v-else>Hide Courses</span>
          </div>
        </div>

        <!-- Courses I teach -->
        <div
          v-if="showCourses && courses && courses.length != 0"
          class="padding-x courses"
        >
          <h4>Courses that I teach</h4>
          <base-course-title
            v-for="(course, index) in courses"
            :key="index"
            :title="course.name"
          >
            <template v-slot:default>{{ index + 1 }}. </template>
            <template v-slot:end
              ><router-link :to="`/courses/${course._id}`"
                >View</router-link
              ></template
            >
          </base-course-title>
        </div>
      </div>
      <div class="actions">
        <base-button
          v-if="!coachIsLoggedIn"
          mode="outline"
          link
          :to="coachContactLink"
          >Contact</base-button
        >
        <base-button link :to="coachDetailsLink">View Details</base-button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: [
    'id',
    'firstName',
    'lastName',
    'description',
    'rate',
    'phone',
    'language',
    'profile',
    'courses',
  ],
  data() {
    return {
      showCourses: false,
    };
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    coachContactLink() {
      return this.$route.path + '/' + this.id + '/contact'; // /coaches/c1/contact
    },
    coachDetailsLink() {
      return this.$route.path + '/' + this.id; // /coaches/c1
    },
    coachIsLoggedIn() {
      return this.$store.getters.userId === this.id;
    },
  },
  methods: {
    toggleCourses() {
      this.showCourses = !this.showCourses;
    },
  },
};
</script>

<style scoped>
.primary-color {
  color: var(--primary-color);
}
.profile {
  font-weight: bold;
  font-size: 21px;
  /* border-right: 1px solid black; */
  font-family: 'Roboto';
  color: rgb(37, 35, 35);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.profile span {
  border-bottom: 5px double var(--primary-color-light);
}
img {
  border: 3px dotted var(--primary-color-light);
  padding: 5px;
  border-radius: 100%;
}
a {
  text-decoration: none;
}

.courses {
  margin-bottom: 20px;
}
.courses h4 {
  text-align: center;
  padding: 15px;
  font-size: 20px;
  border-bottom: 2px solid var(--primary-color);
  background: rgb(247, 247, 247);
  border-radius: 5px;
}

.active {
  cursor: pointer;
  border-bottom: 2px solid var(--primary-color);
}
.inline-wrapper {
  display: flex;
  margin-top: 20px;
  padding-left: 20px;
}

.inline-wrapper div:first-child {
  margin-left: 0px;
}

.inline-wrapper div {
  margin-left: 7px;
  margin-right: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 9px 12px;
  font-family: 'Roboto';
  background: #eee;
  font-weight: bold !important;
}

.inline-wrapper div span {
  margin: 0px 5px;
}
h2 {
  padding-left: 10px;
  font-weight: bold !important;
  font-size: 1.9rem;
  /* border-bottom: 2px solid var(--primary-color); */
  display: inline-block;
  margin: 0px;
  color: var(--primary-color);
}

.background-primary {
  background: var(--primary-color) !important;
  color: white !important;
  padding: 7px 15px;
  border-radius: 5px;
}

h5 {
  font-weight: normal;
  padding: 0px;
  margin: 0px;
  margin-top: 15px;
}

li {
  margin: 1rem 0;
  border: 2px solid rgb(245, 245, 245);
  box-shadow: 0 2px 15px rgb(0 0 0 / 20%);
  border-radius: 0px;
  padding: 1rem;
  display: flex;
  box-sizing: content-box;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}
h4 {
  color: var(--primary-color);
}
div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 768px) {
  li {
    flex-direction: column;
  }

  .inline-wrapper {
    flex-direction: row;
  }

  img {
    max-width: 180px;
  }
}

@media screen and (max-width: 500px) {
  .inline-wrapper {
    flex-direction: column;
  }

  img {
    max-width: 220px;
  }
}
</style>