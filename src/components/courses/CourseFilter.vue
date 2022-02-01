<template>
  <base-card>
    <h2>A broad selection of courses...</h2>
    <div id="searchbar-wrapper">
      <span>
        <box-icon name="search"></box-icon>
      </span>
      <input type="text" :placeholder="placeholder" @keyup="setFilter" />
      <a href="#searchResult" type="button">Search</a>
    </div>
    <p>Skills for your present and your future.</p>
  </base-card>
</template>

<script>
export default {
  props: ['placeholder'],
  emits: ['change-filter'],
  data() {
    return {
      searchValue: '',
    };
  },
  methods: {
    setFilter(event) {
      const inputValue = event.target.value.toLowerCase();

      this.$emit('change-filter', inputValue);
    },
  },
};
</script>

<style scoped>
#searchbar-wrapper {
  width: 98%;
  height: 45px;
  margin: 0px;
  margin-left: auto;
  margin-right: auto;
  padding: 0px;
  display: flex;
  background: #f7f7f7;
  border-radius: 5px;
}

#searchbar-wrapper span {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 15px;
}
h2 {
  font-weight: bold;
  font-size: 29px;
}
p {
  font-size: 12px;
  font-weight: normal;
  margin-top: 20px;
  padding-left: 10px;
  color: rgb(37, 35, 35);
}
input {
  width: 80%;
  padding: 0px 10px;
  font-family: 'Poppins';
  display: inline-block;
  height: 100%;
  border: none;
  outline: none;
  margin: 0px;
  background: #f7f7f7;
  box-sizing: border-box;
}
a {
  width: 20%;
  padding: 0px 10px;
  margin: 0px;
  border: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: var(--primary-color);
  color: white;
  font-size: 16px;
  font-family: 'Poppins';
  font-weight: bold;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.4s;
  border-end-end-radius: 5px;
  border-start-end-radius: 5px;
  text-decoration: none;
}

a:hover {
  transition: 0.4s;
  background: var(--primary-color);
}
</style>