<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
    <slot name="icon"></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
};
</script>

<style scoped>
.button {
  border: 1px solid var(--primary-color);
  background: var(--primary-color);
  padding: 7px 13px;
  font-size: 14px;
  font-family: 'Poppins';
  font-weight: bold;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin: 3px;
  display: inline-block;
  text-decoration: none;
}
.button-outline {
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  background: transparent;
  padding: 7px 13px;
  font-size: 14px;
  font-family: 'Poppins';
  font-weight: bold;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 3px;
  text-decoration: none;
  display: inline-block;
}

.active {
  background: var(--primary-color-dark);
}

@media screen and (max-width: 600px) {
  button, a {
    margin: 0px;
    padding: 1px;
  }
}
</style>