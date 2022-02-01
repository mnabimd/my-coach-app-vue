<template>
  <base-card>
    <base-modal :show="showMessageModal" @close="toggleMessageModal">
      <div>
        <h3>Send Message</h3>
        <!-- Send a message -->
        <div class="reply-wrapper">
          <div class="to">
            <p></p>
            <span class="checks">
              <span
                >Admins<input
                  type="checkbox"
                  value="admins"
                  v-model="checkedParticipants"
              /></span>
              <span
                >Coaches<input
                  type="checkbox"
                  value="coaches"
                  v-model="checkedParticipants"
              /></span>
              <span
                >Users<input
                  type="checkbox"
                  value="users"
                  v-model="checkedParticipants"
              /></span>
            </span>
          </div>
          <textarea
            rows="10"
            placeholder="Write your message here..."
            v-model="reply"
          ></textarea>
          <p class="error" v-if="!formIsValid">
            Please enter a message & select at-least 1 participant!
          </p>
          <base-button-secondary class="button" @click="sendMessage"
            >Send</base-button-secondary
          >
        </div>
      </div>
    </base-modal>
    <h3 class="dashboard-title">Dashboard & Control</h3>

    <div class="links">
      <span v-for="(link, index) in links" :key="index">
        <base-button-secondary
          @click="setComponent(link.component)"
          :class="button(link.component)"
          >{{ link.name }}</base-button-secondary
        >
      </span>
    </div>

    <keep-alive>
      <component :is="active"></component>
    </keep-alive>

    <!-- Float Buttons -->
    <base-float-button :style="buttonStyle" @button-click="toggleMessageModal"
      ><box-icon type="solid" name="message" color="white"></box-icon
    ></base-float-button>
  </base-card>
</template>

<script>
import Admins from '../../components/dashboard/Admins.vue';
import Coaches from '../../components/dashboard/Coaches.vue';
import Users from '../../components/dashboard/Users.vue';
import CoachRequests from '../../components/dashboard/CoachRequests.vue';
import Courses from '../../components/dashboard/Courses.vue';

export default {
  components: {
    Admins,
    Coaches,
    Users,
    Courses,
    CoachRequests,
  },
  data() {
    return {
      showMessageModal: false,
      reply: '',
      formIsValid: true,
      active: 'coaches',
      checkedParticipants: ['users'],
      links: [
        { name: 'Coaches', component: 'coaches' },
        { name: 'Admins', component: 'admins' },
        { name: 'Users', component: 'users' },
        { name: 'Courses', component: 'courses' },
        { name: 'Coach Requests', component: 'coach-requests' },
      ],
    };
  },
  methods: {
    async sendMessage() {
      let participants = this.checkedParticipants;

      if (!this.reply || participants.length === 0) {
        this.formIsValid = false;
        return false;
      }

      participants = participants.join('_');

      try {
        const data = {
          email: this.$store.getters.email,
          message: this.reply,
          userId: this.$store.getters.userId,
          senderId: `${participants}-${this.$store.getters.userId}`,
        };

        await this.$store.dispatch('requests/contactCoach', data);
      } catch (e) {
        console.log(e);
      }

      this.showMessageModal = false;
    },
    toggleMessageModal() {
      this.showMessageModal = !this.showMessageModal;
    },
    button(name) {
      return this.active === name ? 'button-outline' : 'button';
    },
    setComponent(name) {
      this.active = name;
    },
    async loadAllUsers() {
      await this.$store.dispatch('admins/loadAllUsers');
    },
    async loadCourses() {
      await this.$store.dispatch('admins/loadCourses');
    },
  },
  computed: {
    buttonStyle() {
      return {
        backgroundColor: 'var(--primary-color)',
        borderRadius: '7px',
        padding: '10px',
      };
    },
  },
  created() {
    this.loadAllUsers();
    this.loadCourses();
  },
};
</script>

<style scoped>
.error {
  font-size: 14px;
}
.dashboard-title {
  display: inline-block;
  width: 100%;
  background: var(--primary-color-light);
  padding: 15px;
  color: black;
  border-radius: 7px;
}
textarea {
  width: 100%;
  padding: 10px;
  box-shadow: 0 2px 12px rgb(0 0 0 / 20%);
  outline: 1px solid var(--primary-color);
}
.to {
  font-weight: normal !important;
  margin-bottom: 15px;
}
.to p {
  display: inline;
  margin-right: 10px;
}
.checks {
  float: right;
}
.checks span {
  margin: 0 10px;
}

@media screen and (max-width: 600px) {
  .links {
    text-align: center;
  }
}

@media screen and (max-width: 500px) {
  .checks {
    font-size: 15px;
  }
}


@media screen and (max-width: 420px) {
  .checks {
    display: flex;
    flex-direction: column;
    float: left;
    margin: 10px;
  }
}



</style>