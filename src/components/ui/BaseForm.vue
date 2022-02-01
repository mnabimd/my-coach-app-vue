<template>
  <div>
    <base-card>
      <form :action="action">
        <slot></slot>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  props: ['action']
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}
.validation {
  color: red !important;
  font-weight: bold;
}
textarea:focus {
  background-color: var(--primary-color-light);
  outline: none;
  border-color: var(--primary-color);
}
textarea {
  display: block;
  width: 100%;
  border: 2px solid #efefef;
  background: #efefef;
  font: inherit;
  padding: 10px;
  padding-left: 15px;
  font-size: 15px;
}
</style>