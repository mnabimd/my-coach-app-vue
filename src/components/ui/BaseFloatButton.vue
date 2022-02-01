<template>
  <teleport to="body">
    <div class="button">
      <button @click="buttonClicked" :style="style">
        <slot></slot>
      </button>
    </div>
  </teleport>
</template>

<script>
export default {
  props: ['style'],
  data() {
    return {};
  },
  methods: {
    buttonClicked() {
      this.$emit('button-click');
    },
  },
  emits: ['button-click'],
};
</script>

<style scoped>
.button {
  position: fixed;
  left: 45px;
  bottom: 45px;
  cursor: pointer;
}
button {
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 12px rgb(0 0 0 / 20%) !important;
  padding: 10px;
  font-weight: bold;
}
</style>