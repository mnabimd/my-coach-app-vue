<template>
  <div class="container" v-if="user">
    <!-- Profile Photo -->
    <div class="profile-photo">
      <img
        :src="user.profile || '/assets/photos/avatar.jpg'"
        alt=""
        width="165"
        height="165"
      />
    </div>
    <h3 class="username">{{ user.firstname }}</h3>
    <small class="d-block">{{ user.email }}</small>

    <!-- For actions -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {};
  },
  computed: {
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
.d-block {
  display: block;
}
img {
  border-radius: 50%;
  border: 3px dotted var(--primary-color-light);
  padding: 5px;
  display: inline-block;
}
.container {
  padding: 10px;
  text-align: center;
  flex-direction: column;
}
h3.username {
  padding: 0;
  margin: 0;
  font-size: 24px;
  margin-top: 8px;
  margin-bottom: 2px;
  font-weight: bold;
  color: var(--primary-color);
}
.color-black {
  color: black;
}
</style>