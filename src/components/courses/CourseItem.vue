<template>
  <li>
    <h1>{{ courseTitle }}</h1>
    <h4><span>Description:</span> {{ courseDescription }}</h4>

    <h4><span>Primary Goal:</span> {{ courseGoals }}</h4>

    <h4><span>Requirements:</span> {{ courseRequirements }}</h4>

    <div class="inline-wrapper">
      <div>
        <box-icon name="user-circle"></box-icon> <span>{{ fullname }}</span>
      </div>
      <div>
        <box-icon name="world"></box-icon> <span>{{ language }}</span>
      </div>
      <div>
        <box-icon name="money"></box-icon>
        <span>{{ rate }} Afghani / hour</span>
      </div>
    </div>

    <div class="actions">
      <base-button mode="ternary" @click="coachContactLink"
        >Contact Coach</base-button
      >
      <base-button link mode="outline" @click="coachDetailsLink"
        >View Coach</base-button
      >
    </div>
  </li>
</template>

<script>
export default {
  props: [
    'id',
    'coachId',
    'courseTitle',
    'courseDescription',
    'courseRequirements',
    'courseGoals',
    'language',
    'firstname',
    'lastname',
    'rate',
  ],
  computed: {
    fullname() {
      return this.firstname + ' ' + this.lastname;
    },
    coachIsLoggedIn() {
      return this.$store.getters.userId === this.id;
    },
  },
  methods: {
    coachContactLink() {
      this.$router.push(`/coaches/${this.coachId}/contact`)
    },
    coachDetailsLink(){
      this.$router.push(`/coaches/${this.coachId}`)
    }
  }
};
</script>

<style scoped>
* {
  font-weight: normal;
  font-family: 'Roboto';
}
li {
  margin: 1rem 0;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 2px 12px rgb(0 0 0 / 20%);
}

h1 {
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Poppins';
  background: var(--primary-color);
  padding: 1.5rem;
  margin: 0;
  color: white;
  text-align: center;
}

h4 {
  padding: 0rem 1rem;
  font-size: 1.05rem;
}

span {
  font-weight: bold;
}

div {
  margin: 0.5rem 0;
}

.inline-wrapper {
  display: flex;
  margin-top: 20px;
  padding-left: 20px;
}

.inline-wrapper div:first-child {
  margin-left: 0px;
}

.inline-wrapper div {
  margin-left: 7px;
  margin-right: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 9px 12px;
  font-family: 'Roboto';
  background: #eee;
  font-weight: normal !important;
}

.inline-wrapper div span {
  margin: 0px 5px;
}

base-button,
a {
  font-family: 'Poppins' !important;
  font-weight: bold;
}
.actions {
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 500px) {
  .inline-wrapper {
    flex-direction: column;
  }
}
</style>