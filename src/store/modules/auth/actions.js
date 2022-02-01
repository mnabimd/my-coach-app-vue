export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      '/signIn';

    if (mode === 'signup') {
      url =
        '/signUp';
    }

    const data = {
      email: payload.email,
      password: payload.password
    };

    if (mode === 'signup') {
      data['firstname'] = payload.firstname;
      data['lastname'] = payload.lastname;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.error || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('userEmail', payload.email);
    localStorage.setItem('userData', JSON.stringify(responseData.userData));

    context.commit('setToast', `Welcome, ${responseData.userData.firstname}`);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      email: payload.email,
      userData: responseData.userData
    });

  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('userEmail');
    const userData = localStorage.getItem('userData');

    const data = JSON.parse(userData);

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        email,
        userData: data
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userData')

    context.commit('setUser', {
      token: null,
      userId: null,
      email: null,
      userData: null
    });

    context.commit('setToast', 'You have logged out successfully');
  },
  async editUser(context, payload) {

    const updatedUserData = payload;
    const token = context.rootGetters.token;

    const response = await fetch('/api/editProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedUserData)
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.error || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }
  },
  async updatePhoto(context, payload) {
    const token = context.rootGetters.token;

    const image = payload;

    const data = {
      imageBlob: image
    };

    const response = await fetch('/api/updatePhoto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.error || 'Failed to update photo.'
      );
      throw error;
    }

    context.commit('updateProfilePhoto', image);
    context.commit('setToast', 'Profile photo has been updated')
  },
  async updateMessageNotification(context, payload) {
    const token = context.rootGetters.token;

    const data = {
      type: 'message',
      messageState: payload
    }

    const response = await fetch('/api/notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.error || 'Failed to update message notification state.'
      );
      throw error;
    }

    context.commit('setMessageNotification', payload);
  }
};