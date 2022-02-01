<template>
  <div>
    <section>
      <base-card v-if="selectedCoach">
        <div class="text-center center flex">
          <img
            :src="profile || '/assets/photos/avatar.jpg'"
            alt=""
            width="250"
          />
          <span class="">{{ fullName }}</span>
        </div>

        <div class="inline-wrapper">
          <div>
            <box-icon name="world"></box-icon> <span>{{ language }}</span>
          </div>
          <div>
            <box-icon name="money"></box-icon>
            <span>{{ rate }} Afghani / hour</span>
          </div>
          <div>
            <box-icon name="phone"></box-icon> <span>0{{ phone }}</span>
          </div>
        </div>

        <div class="bio">
          <h5 class="padding-x">"{{ description }}"</h5>
          <!-- Courses I teach -->
          <div class="padding-x courses" v-if="courses.length != 0">
            <h4>Courses that I teach</h4>
            <base-course-title
              v-for="(course, index) in courses"
              :key="index"
              :title="course.name"
            >
              <template v-slot:default>{{ index + 1 }}. </template>
              <template v-slot:end
                ><router-link :to="`/courses/${course._id}`"
                  >View</router-link
                ></template
              >
            </base-course-title>
          </div>
        </div>
      </base-card>
    </section>
    <section>
      <base-card v-if="!coachIsLoggedIn">
        <header>
          <h2>Interested? Reach me now!</h2>
          <base-button
            class="float-right"
            v-if="!inContactPage"
            link
            :to="contactLink"
            >Contact</base-button
          >
        </header>
        <router-view></router-view>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    courses() {
      return this.selectedCoach.courses;
    },
    language() {
      return this.selectedCoach.language;
    },
    phone() {
      return this.selectedCoach.phone;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    profile() {
      return this.selectedCoach.profile;
    },
    contactLink() {
      return this.$route.path + '/contact';
    },
    inContactPage() {
      const route = this.$route.path;

      if (route.endsWith('contact')) {
        return true;
      } else {
        return false;
      }
    },
    coachIsLoggedIn() {
      return this.$store.getters.userId === this.id;
    },
  },
  async created() {
    await this.$store.dispatch('coaches/loadCoaches', {
      forceRefresh: true,
    });

    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>

<style scoped>
.float-right {
  float: right;
}
.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flex span {
  font-size: 24px;
  font-weight: bold;
  margin-top: 15px;
  font-family: 'Roboto';
  border-bottom: 5px double var(--primary-color-light);
}
img {
  border: 3px dotted var(--primary-color-light);
  padding: 5px;
  border-radius: 100%;
}
.courses {
  margin-bottom: 20px;
}
.courses h4 {
  text-align: center !important;
  padding: 15px;
  font-size: 20px;
  border-bottom: 2px solid var(--primary-color);
  background: rgb(247, 247, 247);
  border-radius: 5px;
}

.bio h5 {
  font-size: 17px;
  font-weight: normal;
}
h2 {
  padding-left: 10px;
  font-weight: bold !important;
  font-size: 1.9rem;
  display: inline-block;
  margin: 0px;
}

.background-primary {
  background: var(--primary-color) !important;
  color: white !important;
  padding: 7px 15px;
  border-radius: 5px;
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
  font-weight: bold !important;
}

.inline-wrapper div span {
  margin: 0px 5px;
}

@media screen and (max-width: 600px) {
  .float-right {
    float: none;
  }
}

@media screen and (max-width: 550px) {
  .inline-wrapper {
    flex-direction: column;
  }
  .inline-wrapper div {
    margin: 3px;
  }
}
</style>