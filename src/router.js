import {
  createRouter,
  createWebHistory
} from 'vue-router';

import AddCourse from './pages/courses/AddCourse.vue';
import EditCourse from './pages/courses/EditCourse.vue';
import CoursesList from './pages/courses/CoursesList.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachRegistation from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import Profile from './pages/control/Profile.vue';

import Dashboard from './pages/dashboard/Dashboard.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [{
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/courses',
      component: CoursesList,
    },
    {
      path: '/courses/:id',
      component: CoursesList,
      props: true,
    },
    {
      path: '/addCourse',
      component: AddCourse,
      meta: {
        requiresAuth: true,
        requiresCoach: true
      }
    },
    {
      path: '/editCourse',
      component: EditCourse,
      name: 'editCourse',
      props: true,
      meta: {
        requiresAuth: true,
        requiresCoach: true
      }
    },
    {
      path: '/coaches',
      component: CoachesList
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{
          path: 'contact',
          component: ContactCoach
        } // /coaches/c1/contact
      ]
    },
    {
      path: '/register',
      component: CoachRegistation,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: {
        requiresUnauth: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else if (to.meta.requiresAdmin && !store.getters.isAdmin) {
    next('/coaches');
  } else if (to.meta.requiresCoach && !store.getters['coaches/isCoach']) {
    next('/coaches')
  } else {
    next();
  }
});

export default router;