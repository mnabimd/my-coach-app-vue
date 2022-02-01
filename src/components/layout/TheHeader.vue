<template>
  <header>
    <base-container>
      <div class="topnav" id="myTopnav">
        <router-link to="/coaches" href="#home" id="logo"
          >My Coach App</router-link
        >
        <router-link to="/profile" v-if="isLoggedIn">Profile</router-link>

        <router-link to="/auth" v-if="!isLoggedIn">Login</router-link>
        <router-link to="/requests" v-if="isLoggedIn"
          >Messages<span class="alert" v-if="userData.messageAlert"></span
        ></router-link>
        <router-link to="/coaches">Coaches</router-link>
        <router-link to="/courses">Courses</router-link>
        <router-link v-if="isLoggedIn && isAdmin" to="/dashboard">Dashboard</router-link>

        <a class="icon" @click="toggle">
          <i class="fa fa-bars">Menu</i>
        </a>
      </div>
    </base-container>
  </header>
</template>

<script>
export default {
  data() {
    return {
      pages: ['auth', 'contact', 'courses', 'coaches'],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    currentPage() {
      const path = this.$route.path.split('/');
      return path[path.length - 1];
    },
    matchedPage() {
      return this.pages.find((page) => page === this.currentPage);
    },
    userData() {
      return this.$store.getters.userData
    },
    isAdmin() {
      return this.$store.getters.isAdmin || false;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/coaches');
    },
    toggle() {
      var x = document.getElementById('myTopnav');
      if (x.className === 'topnav') {
        x.className += ' responsive';
      } else {
        x.className = 'topnav';
      }
    },
  }
};
</script>

<style scoped>
.alert {
  height: 12px;
  width: 12px;
  background: var(--primary-color);
  display: inline-block;
  border-radius: 100%;
  position: absolute;
  margin-left: 4px !important;
  margin-top: -2px !important;
}
* {
  font-family: 'Roboto';
}
.router-link-active {
  background: var(--primary-color);
  color: white !important;
  font-weight: bold;
}
#logo {
  float: left;
  background: var(--primary-color);
  color: #fff;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer !important;
}

.loggedIn {
  background: var(--primary-color);
  color: #fff !important;
  cursor: pointer;
}
.topnav,
header {
  overflow: hidden;
  background-color: #fff;
}

header {
  border-bottom: solid 2px var(--primary-color);
}

.topnav a {
  float: right;
  display: block;
  color: #0b2545;
  text-align: center;
  padding: 22px 16px;
  text-decoration: none;
  font-size: 17px;
  margin-left: 1px;
  margin-right: 1px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04aa6d;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 768px) {
  .topnav a:not(:first-child) {
    display: none;
  }
  .topnav a.icon {
    float: right;
    display: block;
  }

  .topnav a,
  #logo {
    padding: 14px 16px;
  }

  .topnav a {
    border-bottom: solid 1px #ddd;
  }
}

@media screen and (max-width: 768px) {
  .topnav.responsive {
    position: relative;
    transition: 1s;
  }
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a,
  #logo {
    float: none;
    display: block;
    text-align: center;
  }

  #logo {
    display: inline-block;
  }
}
</style>