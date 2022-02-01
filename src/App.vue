<template>
  <div>
    <the-header></the-header>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>

    <base-toast :content="toastContent" v-if="showToast"></base-toast>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  data() {
    return {};
  },
  computed: {
    toastContent() {
      return this.$store.getters.toastContent;
    },
    toastTime() {
      return this.$store.getters.toastTime;
    },
    showToast() {
      return this.$store.getters.showToast;
    },
  },
  components: {
    TheHeader,
  },
  async created() {
    this.$store.dispatch('tryLogin');
    await this.$store.dispatch('coaches/loadCoaches', {
      forceRefresh: true,
    });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Poppins', sans-serif;
}

body {
  margin: 0;
}

.padding-x {
  padding-left: 20px !important;
  padding-right: 20px !important;
}

.font-weight-bold {
  font-weight: bold;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.text-center {
  text-align: center;
}

.error {
  color: red;
  font-weight: bold;
}

.success {
  color: var(--primary-color);
  font-weight: bold;
}

/* Global Media Queries */
@media screen and (max-width: 768px) {

}
</style>