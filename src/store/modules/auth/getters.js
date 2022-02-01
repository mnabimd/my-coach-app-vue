export default {
  userId(state) {
    return state.userId;
  },
  isAdmin(state) {
    return state.userData.isAdmin ? true : false;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  email(state) {
    return state.email;
  },
  userData(state) {
    const user = state.userData;

    if (user) {
      user.fullname = `${user.firstname} ${user.lastname}`;
    }
    
    return user;
  }
};