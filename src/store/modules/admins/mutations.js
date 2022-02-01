export default {
  setAllUsers(state, allUsers) {
    state.coaches = allUsers.coaches;
    state.admins = allUsers.admins;
    state.users = allUsers.users;
  },
  setCourses(state, courses) {
    state.courses = courses;
  }
};