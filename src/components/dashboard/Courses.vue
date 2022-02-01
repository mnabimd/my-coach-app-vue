<template>
  <div class="padding-x">
    <div class="title">
      <h2>Courses</h2>
    </div>
    <hr />

    <!-- The list -->
    <div v-if="courses && courses.length != 0" class="">
      <base-course-title
        v-for="(course, index) in courses"
        :key="index"
        :title="course.name"
      >
        <template v-slot:default>{{ index + 1 }}. </template>
        <template v-slot:end>
          <a class="edit" @click="visitCourse(course._id)">Visit</a>
          <a class="edit" @click="viewCoach(course.coachId)">View Coach</a>
          <a class="red" @click="deleteCourse(course._id)">Delete</a>
        </template>
      </base-course-title>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    courses() {
      const courses = this.$store.getters['admins/courses'];
      return courses;
    },
  },
  methods: {
    visitCourse(id) {
      this.$router.push('/courses/' + id);
    },
    viewCoach(id) {
        this.$router.push('/coaches/' + id);
    },
    async deleteCourse(id) {
      const answer = confirm(
        'Are you sure you want to delete this course?'
      );

      if (!answer) return false;
      try {
        this.$store.dispatch('admins/deleteCourse', id);

        // Reload courses and admins/courses
        this.$store.dispatch('admins/loadCourses');
        this.$store.dispatch('courses/loadCourses');
      } catch (e) {
        this.$store.dispatch('setToast', e);
      }
    },
  },
};
</script>

<style scoped>
button.red {
  background: darkred !important;
  border: 1px solid darkred;
}
.actions {
  padding: 10px;
}
a {
  background: var(--primary-color);
  color: white;
  padding: 8px 10px;
  border-radius: 3px;
  font-size: 14px;
  font-family: 'Poppins';
  font-weight: bold;
  margin: 3px;
  cursor: pointer;
}

a.red {
  background: #921717;
}

ul {
  text-decoration: none;
  list-style-type: none;
  margin: 0px;
  padding: 10px;
}

li {
  background: var(--primary-color-light);
  padding: 10px 25px;
  padding-left: 0px;
}

.base-course-title {
  padding-top: 15px;
  padding-bottom: 15px;
  font-weight: bold;
}
textarea {
  width: 100%;
  padding: 10px;
  box-shadow: 0 2px 12px rgb(0 0 0 / 20%);
  outline: 1px solid var(--primary-color);
}
</style>