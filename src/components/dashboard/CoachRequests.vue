<template>
  <div class="padding-x">
    <base-modal :show="showModal" @close="toggleModal">
      <user-modal :user="currentCoach">
        <div class="actions" v-if="currentCoach">
          <base-button-secondary class="button-outline" @click="openCV(currentCoach)"
            >View CV/Resume</base-button-secondary
          >
          <a class="success" @click="acceptAsCoach(currentCoach._id)">Accept</a>
          <a class="red" @click="rejectAsCoach(currentCoach._id)">Reject</a>
        </div>

        <div>
          <h5 class="padding-x">"{{ currentCoach.description }}"</h5>

          <div class="inline-wrapper">
            <div>
              <box-icon name="world"></box-icon>
              <span>{{ currentCoach.language }}</span>
            </div>
            <div>
              <box-icon name="money"></box-icon>
              <span>{{ currentCoach.hourlyRate }} Afghani / hour</span>
            </div>
          </div>
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
      <h2>Coaches Requests</h2>
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
          <a class="edit" @click="toggleModal(coach)">View</a>
          <a class="success" @click="acceptAsCoach(coach._id)">Accept</a>
          <a class="red" @click="rejectAsCoach(coach._id)">Reject</a>
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

      if (!coaches) return [];
      return coaches.filter((coach) => {
        if (!coach.requestApproved) return coach;
      });
    },
  },
  methods: {
    toggleModal(coach) {
      this.showModal = !this.showModal;

      this.currentCoach = coach;
    },
    toggleReplySender() {
      this.showReplySender = !this.showReplySender;
    },
    openCV(coach) {
      var image = new Image();
        image.src = coach.cv;

        var w = window.open("");
        w.document.write(image.outerHTML);
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
    acceptAsCoach(coachId) {
      const answer = confirm('Are you sure?');

      if (!answer) return false;

      try {
        this.$store.dispatch('admins/coachApproval', {
          coachId,
          approval: true,
        });
        this.$store.dispatch('admins/loadAllUsers');
        this.$store.dispatch('coaches/loadCoaches');

        // Hide modal
        this.showModal = false;
      } catch (e) {
        alert(e.message);
      }
    },
    rejectAsCoach(coachId) {
      const answer = confirm(
        'Are you sure? All submited data will be deleted.'
      );

      if (!answer) return false;

      try {
        this.$store.dispatch('admins/coachApproval', {
          coachId,
          approval: false,
        });
        this.$store.dispatch('admins/loadAllUsers');
        this.$store.dispatch('coaches/loadCoaches');

        // Hide modal
        this.showModal = false;
      } catch (e) {
        alert(e.message);
      }
    },
  },
};
</script>

<style scoped>
.primary-color {
  color: var(--primary-color);
}
.inline-wrapper {
  display: flex;
  margin-top: 20px;
  padding-left: 20px;
}

.inline-wrapper div:first-child {
  margin-left: 0px;
}

.inline-wrapper div {
  margin-left: 7px;
  margin-right: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 9px 12px;
  font-family: 'Roboto';
  background: #eee;
  font-weight: bold !important;
}

.inline-wrapper div span {
  margin: 0px 5px;
}
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

.base-course-title {
  padding-top: 15px;
  padding-bottom: 15px;
  font-weight: bold;
}
</style>