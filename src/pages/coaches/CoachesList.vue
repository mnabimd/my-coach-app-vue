<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilter" :placeholder="'Search coaches...'"></coach-filter>
    </section>
    <section id="searchResult">
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to Register as Coach</base-button
          >
          <base-button
            v-if="isLoggedIn && !isCoach && !isLoading"
            link
            to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        
        <ul v-else-if="hasCoaches && filteredCoaches.length != 0">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :description="coach.description"
            :rate="coach.hourlyRate"
            :phone="coach.phone"
            :language="coach.language"
            :courses="coach.courses"
            :profile="coach.profile"
          ></coach-item>
        </ul>
        <h1 class="text-center" v-else-if="filteredCoaches.length == 0">Oops, no couch found.</h1>
        <h1 class="text-center" v-else>No coaches found.</h1>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
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
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];

      if (!coaches) return [];

      const search = this.searchedValue;

      // When searching...
      const filteredCoaches =  coaches.filter((coach, index) => {
        if (!search) {
          // We only want 8 coaches to show on the page
          if (index > 8) {
            return false;
          }
          return true;
        }

        if (coach.firstName.toLowerCase().includes(search)) {
          return true
        }

        return false;
      })  

      return filteredCoaches
    },
  },
  methods: {
    async loadCoaches(refresh = true) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
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