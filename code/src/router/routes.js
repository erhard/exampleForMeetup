const routes = [
  {
    path: '/',
    beforeEnter(to, from, next) {
      // See if any of the matched routes has meta "requiresAuth"
      let locale = 'de';
      if (localStorage.locale) {
        locale = localStorage.locale;
      }
      next('/' + locale);
      return;
    }
  },
  {
    path: '/:locale',
    component: () => import('src/layouts/MainLayout.vue'),

    beforeEnter(to, from, next) {
      // See if any of the matched routes has meta "requiresAuth"

      let locale = 'de';
      if (localStorage.locale) {
        locale = localStorage.locale;
      }
      next();
      return;
    },

    children: [
      {
        path: '',
        component: () => import('src/pages/home.vue')
      },
      {
        path: 'login',
        component: () => import('src/pages/Auth.vue'),
        props: { proc: 'login' }
      },
      {
        path: 'signup',
        component: () => import('src/pages/Auth.vue'),
        props: { proc: 'signup' }
      },
      {
        path: 'cockpit',
        name: 'cockpit',
        component: () => import('src/pages/Cockpit.vue'),
        props: { proc: 'vkb' }
      },
      {
        path: 'upload',
        name: 'upload',
        component: () => import('pages/Upload.vue')
      },
      {
        path: 'language',
        name: 'language',
        component: () => import('src/pages/languageSelection.vue'),
        props: { proc: 'vkb' }
      },
     
      {
        path: 'impressum',
        name: 'impressum',
        component: () => import('src/pages/Impressum.vue'),
      },


    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('src/pages/Error404.vue')
  });
}

export default routes;
