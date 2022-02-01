<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
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
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.55rem 1.4rem;
  font: inherit;
  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.flat {
  background-color: transparent;
  color: var(--primary-color);
  border: none;
}

.outline {
  background-color: transparent;
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.ternary {
  background: var(--primary-color-light);
  border: none;
  color: var(--primary-color);
  border-color: transparent;
  transition: 0.3s;
}

.ternary:hover {
  transition: 0.3s;
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: var(--primary-color-light);
}
</style>