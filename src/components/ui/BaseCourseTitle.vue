<template>
  <span class="base-course-title">
    <div class="inline">
      <div class="inline"><slot></slot></div>
      {{ text }}
    </div>
    <div class="actions">
      <slot name="end"> </slot>
    </div>
  </span>
</template>

<script>
export default {
  props: ['title'],
  computed: {
    text() {
      return this.title;
    },
  },
};
</script>

<style scoped>
span {
  color: #000;
  padding: 0.5rem 1.5rem;
  display: block;
  /* margin-right: 1rem; */
  margin: 7px;
  border-radius: 5px;
  background: rgb(247, 247, 247);
}
.inline {
  display: inline-block;
}
.actions {
  float: right;
}

@media screen and (max-width: 600px) {
  span {
    display: flex;
    flex-direction: column;
  }
  .actions {
    margin-left: auto;
    margin-top: 10px;
  }
}

@media screen and (max-width: 370px) {
  span {
    margin: 0px;
    padding: 3px;
  }
}
</style>