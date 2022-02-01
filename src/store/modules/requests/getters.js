export default {
  requests(state, _, rootState, rootGetters) {
    const userId = rootGetters.userId;
    const requests = state.requests.filter(req => {
      
      
      if (req.userId === userId) {
        return req
      }

      if (rootGetters.isAdmin) {
        if (req.senderId.includes('admins')) {
          return req;
        }
      }

      let coaches = rootState.coaches.coaches;
      
      const isCoach = coaches.filter(coach => coach.id === userId);


      if (isCoach.length !== 0) {
        if (req.senderId.includes('coaches')) {
          return req;
        }
      }

      // If the user is a USER
      if (isCoach.length === 0 && !rootGetters.isAdmin) {
        // Then it is a user
        if (req.senderId.includes('users')) {
          return req;
        }
      }

      
    });
    return requests
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  }
};