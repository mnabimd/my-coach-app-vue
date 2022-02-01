<template>
  <div>
    <ul v-if="coachCourses">
      <base-course-title
        v-for="(course, index) in coachCourses"
        :title="course.course"
        :key="index"
      >
        <template v-slot:default>{{ index + 1 }}. </template>
        <template v-slot:end>
          <a class="edit" @click="viewCourse(course._id)">View</a>
          <a class="edit" @click="editCourse(course._id)">Edit</a>
          <a class="red" @click="deleteCourse(course._id)">Delete</a>
        </template>
      </base-course-title>
    </ul>

    <!-- Float Buttons -->
    <base-float-button v-if="isCoach" :style="buttonStyle" @button-click="addNewCourseLink"
      ><box-icon type="solid" name="plus-circle" color="white"></box-icon
    ></base-float-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coachCourses: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.userData;
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    buttonStyle() {
      return {
        backgroundColor: 'var(--primary-color)',
        borderRadius: '7px',
        padding: '10px',
      };
    },
  },
  methods: {
    addNewCourseLink() {
      this.$router.push('/addCourse')
    },
    async updateCourses() {
      await this.$store.dispatch('courses/loadCourses');
    },
    setCourses() {
      let courses = this.$store.getters['courses/coachCourses'];
      this.coachCourses = courses;
    },
    viewCourse(id) {
      this.$router.push('/courses/' + id);
    },
    editCourse(id) {
      this.$router.push({ name: 'editCourse', params: { courseId: id } });
    },
    async deleteCourse(id) {
      const answer = confirm('Do you really want to delete this course?');

      if (!answer) return false;

      // Let's delete the course:-
      try {
        await this.$store.dispatch('courses/deleteCourse', id);
        // Update courses
        this.setCourses();
      } catch (e) {
        console.log(e || 'Failed deleting the course');
      }
    },
  },
  async mounted() {
    // Load courses, if user directly opened the [profile] page
    await this.updateCourses();
    this.setCourses();
  },
};
</script>

<style scoped>
.base-course-title {
  padding: 15px 25px;
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
</style>