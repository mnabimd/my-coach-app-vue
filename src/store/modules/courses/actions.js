export default {
  async loadCourses(context) {

    const response = await fetch(
      `/api/courses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const responseData = await response.json();

    let courses = responseData;

    courses = courses.map(course => {
      course['courseGoals'] = course.goals;
      course['courseDescription'] = course.description;
      course['courseRequirements'] = course.requirements;
      course['course'] = course.name;

      delete course.goals;
      delete course.description;
      delete course.requirements;
      delete course.name;

      return course;
    })

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch courses!');
      throw error;
    }

    context.commit('setCourses', courses);
  },
  async addCourse(context, payload) {
    const token = context.rootGetters.token;

    const response = await fetch(
      `/api/addCourse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          course: payload
        })
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to add new course!');
      throw error;
    }

    context.commit('addCourse', payload);
    context.commit('setToast', 'New course has been added, successfully', {root: true});
  },
  async editCourse(context, course) {
    const token = context.rootGetters.token;

    const response = await fetch(
      `/api/editCourse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          course
        })
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to edit the course! Try again later');
      context.commit('setToast', 'Failed to edit the course! Try again later', {root: true});
      throw error;
    }

    context.commit('updateCourse', course);
    context.commit('setToast', 'Course information has been updated successfully.', {root: true})
  },
  async deleteCourse(context, id) {
    const token = context.rootGetters.token;

    const response = await fetch(
      `/api/deleteCourse`, {
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
      const error = new Error(responseData.message || 'Failed to delete the course! Try again later');
      context.commit('setToast', 'Failed to delete the course! Try again later', {root: true});
      throw error;
    }

    context.commit('deleteCourse', id);
    context.commit('setToast', 'Course has been deleted successfully.', {root: true})
  }
};