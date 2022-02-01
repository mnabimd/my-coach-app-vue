export default {
  async registerCoach(context, data) {
    // For this, the user first should always have logged in as USER.
    const userId = context.rootGetters.userId;
    const coachData = {
      _id: userId,
      firstname: data.first,
      lastname: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      phone: data.phone,
      language: data.language,
      cv: data.cv
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `/registerAsCoach/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(coachData),
      }
    );

    if (!response.ok) {
      // error ...
    }

    context.commit('setToast', 'Request Sent', {root: true});
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `/api/coaches`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: responseData[key]._id,
        firstName: responseData[key].firstname,
        lastName: responseData[key].lastname,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        phone: responseData[key].phone,
        language: responseData[key].language,
        courses: responseData[key].courses,
        profile: responseData[key].profile,
        createdAt: responseData[key].createdAt,
        updatedAt: responseData[key].updatedAt,
      };
      coaches.push(coach);
    }

    console.log(coaches)

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
};