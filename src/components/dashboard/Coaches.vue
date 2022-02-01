<template>
  <div class="padding-x" v-if="coaches">
    <base-modal :show="showModal" @close="toggleModal">
      <user-modal :user="currentCoach">
        <div class="actions" v-if="currentCoach">
          <base-button-secondary
            class="button-outline"
            v-if="currentCoach.isAdmin"
            >Admin</base-button-secondary
          >
          <base-button-secondary
            v-if="!coachIsLoggedIn(currentCoach._id)"
            class="button"
            @click="toggleReplySender"
            >Send a message</base-button-secondary
          >

          <base-button-secondary
            v-if="coachIsLoggedIn(currentCoach._id)"
            class="button"
            @click="gotoProfilePage"
            >View Profile</base-button-secondary
          >
          <base-button-secondary
            class="button"
            v-if="!currentCoach.isAdmin"
            @click="promoteAsAdmin(currentCoach._id)"
            >Promote as Admin</base-button-secondary
          >
          <base-button-secondary
            v-if="!currentCoach.isAdmin"
            class="button red"
            @click="deleteUser(currentCoach._id)"
            >Delete</base-button-secondary
          >
        </div>

        <!-- Send a message -->
        <div class="reply-wrapper" v-if="showReplySender">
          <textarea
            rows="5"
            placeholder="Write your message here..."
            v-model="reply"
          ></textarea>
          <p class="error" v-if="!formIsValid">
            Please fill-out the message first!
          </p>
          <base-button-secondary class="button" @click="sendMessage"
            >Send</base-button-secondary
          >
        </div>
      </user-modal>
    </base-modal>
    <div class="title">
      <h2>Coaches</h2>
    </div>
    <hr />

    <!-- The list -->
    <div v-if="coaches && coaches.length != 0" class="">
      <base-course-title
        v-for="(coach, index) in coaches"
        :key="index"
        :title="`${coach.firstname} ${coach.lastname}`"
      >
        <template v-slot:default>{{ index + 1 }}. </template>
        <template v-slot:end>
          <a class="edit" @click="visitCoach(coach._id)">Visit</a>
          <a class="edit" @click="toggleModal(coach)">View</a>
          <a class="red" @click="removeCoach(coach._id)">Remove as Coach</a>
        </template>
      </base-course-title>
    </div>
  </div>
</template>

<script>
import UserModal from './UserModal.vue';
export default {
  components: {
    UserModal,
  },
  data() {
    return {
      showModal: false,
      currentCoach: null,
      reply: '',
      formIsValid: true,
      showReplySender: false,
    };
  },
  computed: {
    coaches() {
      const coaches = this.$store.getters['admins/coaches'];

      if (!coaches) return []

      return coaches.filter((coach) => {
        if (coach.requestApproved) return coach;
      });
    },
    loggedInUserEmail() {
      return this.$store.getters.email;
    },
  },
  methods: {
    coachIsLoggedIn(coachId) {
      const userId = this.$store.getters.userId;
      return userId === coachId ? true : false;
    },
    gotoProfilePage() {
      this.$router.push('/profile');
    },
    toggleReplySender() {
      this.showReplySender = !this.showReplySender;
    },
    toggleModal(coach) {
      this.showModal = !this.showModal;

      this.currentCoach = coach;
    },
    visitCoach(id) {
      this.$router.push('/coaches/' + id);
    },
    async removeCoach(id) {
      const answer = confirm(
        'Are you sure you want to remove this user as a coach? All related data will be deleted.'
      );

      if (!answer) return false;
      try {
        this.$store.dispatch('admins/removeAsCoach', id);

        // Reload coaches and admins/coaches
        this.$store.dispatch('coaches/loadCoaches');
        this.$store.dispatch('admins/loadAllUsers');
      } catch (e) {
        this.$store.dispatch('setToast', e);
      }
    },
    async deleteUser(id) {
      const answer = confirm(
        'Are you sure you want to delete this user? All related data will be deleted.'
      );

      if (!answer) return false;
      try {
        this.$store.dispatch('admins/deleteUser', id);

        // Reload coaches and admins/coaches
        this.$store.dispatch('coaches/loadCoaches');
        this.$store.dispatch('admins/loadAllUsers');
      } catch (e) {
        this.$store.dispatch('setToast', e);
      }
    },
    promoteAsAdmin(id) {
      const answer = confirm(
        'Are you sure you want promote this user as Admin?'
      );

      if (!answer) return false;
      try {
        this.$store.dispatch('admins/promoteAsAdmin', id);

        // Reload coaches and admins/coaches
        this.$store.dispatch('coaches/loadCoaches', { forceRefresh: true });
        this.$store.dispatch('admins/loadAllUsers');
      } catch (e) {
        console.log(e);
      }
    },
    demoteAsAdmin(id) {
      const answer = confirm(
        'Are you sure you want demote this user as Admin?'
      );

      if (!answer) return false;
      try {
        this.$store.dispatch('admins/demoteAsAdmin', id);

        // Reload coaches and admins/coaches
        this.$store.dispatch('coaches/loadCoaches');
        this.$store.dispatch('admins/loadAllUsers');
      } catch (e) {
        this.$store.dispatch('setToast', e);
      }
    },
    async sendMessage() {
      if (!this.reply) {
        this.formIsValid = false;
        return false;
      }

      try {
        const data = {
          email: this.loggedInUserEmail,
          message: this.reply,
          userId: this.currentCoach._id,
          senderId: this.$store.getters.userId,
        };
        await this.$store.dispatch('requests/contactCoach', data);
      } catch (e) {
        console.log(e);
      }

      this.showReplySender = false;
      this.serverResponse = true;
    },
  },
};
</script>

<style scoped>
button.red {
  background: darkred !important;
  border: 1px solid darkred;
}
.actions {
  padding: 10px;
}
a {
  background: var(--primary-color);
  color: white;
  padding: 8px 10px;
  border-radius: 3px;
  font-size: 14px;
  font-family: 'Poppins';
  font-weight: bold;
  margin: 3px;
  cursor: pointer;
}

a.red {
  background: #921717;
}

ul {
  text-decoration: none;
  list-style-type: none;
  margin: 0px;
  padding: 10px;
}

li {
  background: var(--primary-color-light);
  padding: 10px 25px;
  padding-left: 0px;
}

.base-course-title {
  padding-top: 15px;
  padding-bottom: 15px;
  font-weight: bold;
}
textarea {
  width: 100%;
  padding: 10px;
  box-shadow: 0 2px 12px rgb(0 0 0 / 20%);
  outline: 1px solid var(--primary-color);
}

@media screen and (max-width: 600px) {
  .padding-x {
    padding: 0 3px !important;
  }
}

@media screen and (max-width: 370px) {
  .padding-x {
    padding: 0px !important;
  }
}
</style>