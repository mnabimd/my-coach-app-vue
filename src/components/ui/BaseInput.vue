<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="value"
      @keyup="$emit('input-value', value)"
      :accept="accept"
      :readonly="readonly"
    />
    <!-- accept is for file type only:- eg:- images/* -->
  </div>
</template>

<script>
export default {
  props: ['label', 'type', 'placeholder', 'inputValue', 'accept', 'readonly'],
  data() {
    return {
      value: this.inputValue,
    };
  },
  emits: ['input-value']
};
</script>

<style scoped>
div {
  margin: 10px 0px;
}
label {
  font-weight: bold;
  margin-bottom: 0.2rem;
  display: block;
  font-size: 18px;
  color: var(--primary-color);
}

input {
  display: block;
  width: 100%;
  border: 2px solid #efefef;
  background: #efefef;
  font: inherit;
  padding: 10px;
  padding-left: 15px;
  font-size: 15px;
}

input:focus {
  background-color: var(--primary-color-light);
  outline: none;
  border-color: var(--primary-color);
}
</style>