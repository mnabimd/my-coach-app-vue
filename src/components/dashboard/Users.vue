<template>
  <div class="padding-x">
    <base-modal :show="showModal" @close="toggleModal">
      <user-modal :user="currentUser">
        <div class="actions" v-if="currentUser">
          <base-button-secondary class="button" @click="toggleReplySender"
            >Send a message</base-button-secondary
          >
          <base-button-secondary
            class="button"
            v-if="!currentUser.isAdmin"
            @click="promoteAsAdmin(currentUser._id)"
            >Promote as Admin</base-button-secondary
          >
          <base-button-secondary
            v-if="!currentUser.isAdmin"
            class="button red"
            @click="deleteUser(currentUser._id)"
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
      <h2>Users/Students</h2>
    </div>
    <hr />

    <!-- The list -->
    <div v-if="users && users.length != 0" class="">
      <base-course-title
        v-for="(user, index) in users"
        :key="index"
        :title="`${user.firstname} ${user.lastname}`"
      >
        <template v-slot:default>{{ index + 1 }}. </template>
        <template v-slot:end>
          <a class="edit" @click="toggleModal(user)">View</a>
          <a class="red" @click="deleteUser(user._id)">Delete</a>
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
      currentUser: null,
      reply: '',
      formIsValid: true,
      showReplySender: false,
    };
  },
  computed: {
    users() {
      return this.$store.getters['admins/users'];
    },
    loggedInUserEmail() {
      return this.$store.getters.email;
    },
  },
  methods: {
    toggleReplySender() {
      this.showReplySender = !this.showReplySender;
    },
    toggleModal(user) {
      this.showModal = !this.showModal;

      this.currentUser = user;
    },
    async deleteUser(id) {
      const answer = confirm(
        'Are you sure you want to delete this user? All related data will be deleted.'
      );

      if (!answer) return false;
      try {
        this.$store.dispatch('admins/deleteUser', id);

        // Reload coaches and admins/coaches
        this.$store.dispatch('admins/loadAllUsers');
        this.$store.dispatch('coaches/loadCoaches');
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
    async sendMessage() {
      if (!this.reply) {
        this.formIsValid = false;
        return false;
      }

      try {
        const data = {
          email: this.loggedInUserEmail,
          message: this.reply,
          userId: this.currentUser._id,
          senderId: this.$store.getters.userId,
        };

        await this.$store.dispatch('requests/contactCoach', data);
      } catch (e) {
        console.log(e);
      }

      this.showReplySender = false;
    },
  }
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
</style>