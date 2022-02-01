<template>
  <base-container>
    <base-card>
      <div class="title">
        <h2>Profile</h2>
        <base-button-secondary class="button-outline">{{
          userType
        }}</base-button-secondary>
        <base-button-secondary v-if="isAdmin && isCoach" class="button-outline">Coach</base-button-secondary>
      </div>

      <hr />

      <div>
        <div class="profile-bio text-center">
          <div class="profile-photo">
            <img
              :src="user.profile || '/assets/photos/avatar.jpg'"
              alt=""
              width="165"
              height="165"
              ref="profileImage"
            />
          </div>

          <p class="name">{{ user.fullname }}</p>
          <span class="email">{{ user.email }}</span>

          <div class="center">
            <base-button-secondary
              :class="button('update-photo')"
              @click="setComponent('update-photo')"
              >Update Photo</base-button-secondary
            >
            <base-button-secondary
              :class="button('edit-profile')"
              @click="setComponent('edit-profile')"
              >Edit Profile</base-button-secondary
            >
            <base-button-secondary
              v-if="isCoach"
              :class="button('my-courses')"
              @click="setComponent('my-courses')"
              >My Courses</base-button-secondary
            >
            <base-button-secondary class="button-outline" @click="logout"
              >Logout</base-button-secondary
            >
          </div>
        </div>
        <component :is="active" @image-blob="updateImage"></component>
      </div>
    </base-card>
  </base-container>
</template>

<script>
import EditProfile from '../../components/control/EditProfile.vue';
import MyCourses from '../../components/control/MyCourses.vue';
import UpdatePhoto from '../../components/control/UpdatePhoto.vue';
export default {
  components: {
    EditProfile,
    MyCourses,
    UpdatePhoto,
  },
  data() {
    return {
      toastContent: '',
      showToast: false,
      active: 'my-courses',
    };
  },
  computed: {
    user() {
      return this.$store.getters.userData;
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    userType() {
      if (this.isAdmin) {
        return 'Admin';
      } else if (this.isCoach) {
        return 'Coach';
      } else {
        return 'User';
      }
    },
  },
  methods: {
    button(name) {
      return this.active === name ? 'button active' : 'button';
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/auth');
    },
    setComponent(name) {
      this.active = name;
    },
    updateImage(blob) {
      this.imageBlob = blob;
      this.$refs.profileImage.src = blob;
    },
  },
};
</script>

<style scoped>
img {
  border-radius: 50%;
  border: 3px dotted var(--primary-color-light);
  padding: 5px;
}
.title h2 {
  display: inline-block;
  margin-right: 12px;
}
.user-role {
  color: var(--primary-color);
}
.center {
  text-align: center;
  margin: 5px;
}
.profile-bio {
  margin: 25px;
}

.profile-bio img {
  cursor: pointer;
}

.profile-bio .name {
  font-size: 24px;
  font-weight: bold;
  margin: 0px;
  margin-top: 15px;
}

.profile-bio .email {
  display: block;
  color: var(--primary-color);
}
</style>