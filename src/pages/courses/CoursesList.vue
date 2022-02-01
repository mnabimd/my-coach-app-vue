<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section v-if="!searchedWithCourseId">
      <course-filter @change-filter="setFilter" :placeholder="'Search courses...'"></course-filter>
    </section>
    <section id="searchResult">
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCourses && filteredCourses.length != 0">
          <course-item
            v-for="course in filteredCourses"
            :key="course.id"
            :id="course.id"
            :coachId="course.coach.id"
            :courseTitle="course.course"
            :courseDescription="course.courseDescription"
            :courseRequirements="course.courseRequirements"
            :courseGoals="course.courseGoals"
            :firstname="course.coach.firstname"
            :lastname="course.coach.lastname"
            :rate="course.coach.hourlyRate"
            :language="course.coach.language"
          ></course-item>
        </ul>
        <h1 class="text-center" v-else-if="filteredCourses.length == 0">Oops, no course found.</h1>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CourseItem from '../../components/courses/CourseItem.vue';
import CourseFilter from '../../components/courses/CourseFilter.vue';

export default {
  components: {
    CourseItem,
    CourseFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      searchedValue: ''
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    hasCourses() {
      return !this.isLoading && this.$store.getters['courses/hasCourses'];
    },
    searchedWithCourseId() {
      if (this.$route.params.id) {
        return true
      }  else {
        return false;
      }
    },
    filteredCourses() {
      const courses = this.$store.getters['courses/courses'];

      const search = this.searchedValue;


      const courseIdParam = this.$route.params.id;

      if (courseIdParam) {
        const result = courses.filter(course => {
          return course._id === courseIdParam
        });
        return result;
      }

      const filteredCourses =  courses.filter((course, index) => {
        if (!search) {
          // We only want 8 courses to show on the page
          if (index > 8) {
            return false;
          }
          return true;
        }

        if (course.course.toLowerCase().includes(search)) {
          return true
        }

        return false;
      })
      return filteredCourses
    },
  },
  created() {
    this.loadCourses();
  },
  methods: {
    async loadCourses(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('courses/loadCourses', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    setFilter(search) {
      this.searchedValue = search;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
  font-size: 25px;
  color: var(--primary-color);
  font-weight: bold;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>