<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 3px;
  box-shadow: 0 2px 12px rgb(0 0 0 / 20%);
  padding: 1.3rem;
  margin: 2rem auto;
  max-width: 50rem;
}

@media screen and (max-width: 600px) {
  .card {
    padding: 0.5rem !important;
  }
}
</style>