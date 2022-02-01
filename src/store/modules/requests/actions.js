export default {
  async contactCoach(context, payload) {
    const newMessage = {
      userId: payload.userId,
      senderId: payload.senderId,
      email: payload.email,
      message: payload.message,
    };

    const token = context.rootGetters.token;
    const response = await fetch(
      `/coaches/${payload.userId}/contact`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          theMessage: newMessage
        })
      }
    );

    const responseData = await response.json();

  
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }


    newMessage.userId = payload.userId;

    context.commit('addRequest', newMessage);

    context.commit('setToast', 'Your message has been sent!', {root: true});
  },
  async fetchRequests(context) {
    const token = context.rootGetters.token;

    const response = await fetch(
      `/messages`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests.'
      );
      throw error;
    }

    const messages = [];

    for (const key in responseData) {
      const message = {
        id: key,
        userId: responseData[key].userId,
        userEmail: responseData[key].email,
        senderId: responseData[key].senderId,
        message: responseData[key].message
      };

      messages.push(message);
    }


    context.commit('setRequests', messages);
  }
};
