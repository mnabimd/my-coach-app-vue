export default {
  courses(state) {
    return state.courses;
  },
  hasCourses(state) {
    return state.courses && state.courses.length > 0;
  },
  coachCourses(state, getters, _3, rootGetters) {
    const coachId = rootGetters.userId;

    const courses = getters.courses.filter(course => {
      return course.coach.id === coachId
    });

    return courses;
  }
};