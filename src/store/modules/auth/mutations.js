export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.email = payload.email;

    // Set user datta
    state.userData = payload.userData;
  },
  updateProfilePhoto(state, payload) {
    state.userData.profile = payload;

    const userData = JSON.stringify(state.userData);

    localStorage.setItem('userData', userData)
  },
  setMessageNotification(state, payload) {
    state.userData.messageAlert = payload;

    const userData = JSON.stringify(state.userData);

    localStorage.setItem('userData', userData);
  }
};