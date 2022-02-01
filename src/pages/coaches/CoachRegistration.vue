<template>
  <section>
    <base-card v-if="!isCoach">
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
    <base-card v-else>
      <h1>You are already registered as a coach with us!</h1>
      <h3>Keep doing the great work. </h3>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    }
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/courses');
    }
  }
};
</script>

<style scoped>
  h3 {
    color: var(--primary-color)
  }
</style>