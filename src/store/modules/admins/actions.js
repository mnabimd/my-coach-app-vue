export default {
    async loadAllUsers(context) {
        const token = context.rootGetters.token;

        const response = await fetch(
            `/api/admins/allUsers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        );

        const allUsers = await response.json();

        if (!response.ok) {
            const error = new Error(allUsers.message || 'Failed to load all users! Try again later');

            throw error;
        }

        context.commit('setAllUsers', allUsers);
        
    },
    async loadCourses(context) {
        const token = context.rootGetters.token;

        const response = await fetch(
            `/api/admins/courses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        );

        const courses = await response.json();

        if (!response.ok) {
            const error = new Error(courses.message || 'Failed to load all users! Try again later');

            throw error;
        }
        
        context.commit('setCourses', courses);
        
    },
    async removeAsCoach(context, id) {
        const token = context.rootGetters.token;

        const response = await fetch(
            `/api/admins/removeAsCoach`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id
                })
            }
        );

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to remove as a coach! Try again later');

            throw error;
        }
        // Let's just reload coaches and admins/coaches
        context.commit('setToast', 'User has been removed as a coach, successfully', {root: true});
    },
    async deleteUser(context, id) {
        const token = context.rootGetters.token;

        const response = await fetch(
            `/api/admins/deleteUser`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id
                })
            }
        );

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message);

            throw error;
        }

        // Let's just reload coaches and admins/coaches and that should be done in submission page. Where the event occurs.

        context.commit('setToast', 'User has been deleted, successfully', {root: true});
    },
    async deleteCourse(context, id) {
        const token = context.rootGetters.token;

        const response = await fetch(
            `/api/admins/deleteCourse`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    courseId: id
                })
            }
        );

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message);

            throw error;
        }

        // Let's just reload coaches and admins/coaches and that should be done in submission page. Where the event occurs.

        context.commit('setToast', 'Course has been deleted, successfully', {root: true});
    },
    async promoteAsAdmin(context, id) {
        const token = context.rootGetters.token;

        const response = await fetch(
            `/api/admins/promoteAsAdmin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id
                })
            }
        );

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message);

            throw error;
        }


        // Let's just reload coaches and admins/coaches and that should be done in submission page. Where the event occurs.

        context.commit('setToast', 'User has been promoted as Admin, successfully', {root: true});
    },
    async demoteAsAdmin(context, id) {
        const token = context.rootGetters.token;

        const response = await fetch(
            `/api/admins/demoteAsAdmin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id
                })
            }
        );

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message);

            throw error;
        }

        // Let's just reload coaches and admins/coaches and that should be done in submission page. Where the event occurs.

        context.commit('setToast', 'User has been demoted as Admin, successfully', {root: true});
    },
    async coachApproval(context, payload) {
        const token = context.rootGetters.token;

        const response = await fetch(
            `/api/admins/coachApproval`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload)
            }
        );

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message);

            throw error;
        }

        // Let's just reload coaches and admins/coaches and that should be done in submission page. Where the event occurs.

        if (payload.approval === true) {
            context.commit('setToast', 'Coach approval status has been updated , successfully', {root: true});
        } else {
            context.commit('setToast', 'User coach request has been reject, successfully.', {root: true})
        }
    },
    
};

