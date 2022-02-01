<template>
  <li :class="{'fromAdmins': fromAdmins}" v-if="!self">
    <div>
      <span>From: </span><a :href="emailLink" target="_blank"> {{ email }}</a>
    </div>

    <p class="margin-bottom"></p>
    <div>
      <p class="theMessage mb">{{ message }}</p>
      <span class="color-primary" v-if="fromAdmins"
        >Sincerely, <p>Coach App Team</p></span
      >
    </div>
    <button class="button" @click="toggleReplySender" v-if="!fromAdmins">Reply back</button>
    <a class="button-outline" :href="emailLink" target="_blank" v-if="!fromAdmins">Send as mail</a>

    <div class="reply-wrapper" v-if="showReplySender && !fromAdmins">
      <textarea
        rows="5"
        placeholder="Write your reply..."
        v-model="reply"
      ></textarea>
      <p class="error" v-if="!formIsValid">Please fill-out the form first!</p>
      <button class="button" @click="sendMessage">Send</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['email', 'message', 'to', 'from', 'senderName'],
  data() {
    return {
      reply: '',
      formIsValid: true,
      showReplySender: false,
    };
  },
  computed: {
    emailLink() {
      return 'mailto:' + this.email;
    },
    loggedInUserEmail() {
      return this.$store.getters.email;
    },
    self() {
      return this.to.includes(this.$store.getters.userId);
    },
    fromAdmins() {
      
      if (this.to.includes('admins')) {
        return true
      } else if (this.to.includes('coaches')) {
        return true
      } else if (this.to.includes('users')) {
        return true
      } else {
        return false;
      }
    }
  },
  methods: {
    toggleReplySender() {
      this.showReplySender = !this.showReplySender;
    },
    async sendMessage() {
      if (!this.reply) {
        this.formIsValid = false;
        return false;
      }

      await this.$store.dispatch('requests/contactCoach', {
        email: this.loggedInUserEmail,
        message: this.reply,
        userId: this.to,
        senderId: this.from,
      });

      this.showReplySender = false;
      this.serverResponse = true;
    },
  },
  watch: {
    reply(newVal) {
      if (newVal.length != '') {
        this.formIsValid = true;
      }
    },
  },
};
</script>

<style scoped>
.mb {
  margin-bottom: 10px !important;
}
.color-primary {
  font-style: italic;
  color: var(--primary-color);
  padding-left: 5px;
}
.color-primary p {
  padding-left: 5px;
}
textarea {
  width: 100%;
  padding: 10px;
}
a {
  margin: 5px;
}

.button {
  border: 1px solid var(--primary-color);
  background: var(--primary-color);
  padding: 7px 13px;
  font-size: 14px;
  font-family: 'Poppins';
  font-weight: bold;
  color: white;
  float: right;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.button-outline {
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  background: transparent;
  padding: 7px 13px;
  font-size: 14px;
  font-family: 'Poppins';
  font-weight: bold;
  float: right;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.margin-bottom {
  margin-bottom: 6px;
  margin-top: 6px !important;
  border-bottom: 2px dotted var(--primary-color);
}
.theMessage {
  background: rgb(247, 247, 247);
  padding: 5px;
  margin-top: 10px !important;
}
p {
  padding: 0px;
  margin: 0px !important;
}
li {
  margin: 1rem 0;
  border: 2px solid rgb(245, 245, 245);
  box-shadow: 0 2px 15px rgb(0 0 0 / 20%);
  border-radius: 0px;
  padding: 1rem;
  padding-bottom: 55px !important;
}

.fromAdmins {
  padding-bottom: 1rem !important;
  border: 1.5px dotted var(--primary-color);
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

.button-outline:hover {
  color: var(--primary-color);
}

.button:hover {
  color: white;
}

p {
  margin: 0.5rem 0 0 0;
}

.error {
  color: red;
  font-size: 12px;
  padding-left: 5px;
}
</style>