export default {
  setCourses(state, payload) {
    state.courses = payload;
  },
  addCourse(state, payload) {
    state.courses.push(payload);
  },
  updateCourse(state, updatedCourse) {
    state.courses = state.courses.filter(course => {
      if (course._id === updatedCourse.courseId) {
        course['name'] = updatedCourse['name'];
        course['description'] = updatedCourse['description'];
        course['goals'] = updatedCourse['goals'];
        course['requirements'] = updatedCourse['requirements'];
      }

      return course;
    })
  },
  deleteCourse(state, courseId) {
    state.courses = state.courses.filter(course => course._id !== courseId);
  },
};