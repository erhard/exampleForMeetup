<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          Photo App
        </q-toolbar-title>

        <div class="absolute-right" v-if="!loggedIn">
          <q-btn :to="{ path: localized_url('/language') }" flat :label="$t('auth.language')" class="right" />
          <q-btn :to="localized_url('/signup')" flat :label="$t('auth.signUp')" class="right" />
          <q-btn :to="localized_url('/login')" flat icon-right="account_circle" :label="$t('auth.login')" />
        </div>
        <div class="absolute-right" v-if="loggedIn">
          {{ user }}
          <q-btn :to="{ path: localized_url('/language') }" flat :label="$t('auth.language')" class="right" />
          <q-btn @click="logOut" flat label="LogOut" class="right" />
        </div> 
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
     <q-list v-for="(menuItem, index) in menuList" :key="index">
          <q-item :to="localized_url(menuItem.link)" clickable v-ripple>
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.title }}
              <q-item-label caption>{{ menuItem.caption }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator v-if="menuItem.separator" />
        </q-list> 
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { auth_restore_session } from 'src/services/cloud_auth';
import EventBus from 'src/services/eventBus';
import { sleep, localized_url } from 'src/services/functions';
import { set_lang } from 'src/services/locale';

export default {
  name: 'MainLayout',
  async created() {
    this.createMenu(this.loggedIn);
    let locale = 'de';
    if (localStorage.locale) {
      locale = localStorage.locale;
    }
    set_lang({ value: locale }, this);
    const result = await auth_restore_session();
    if (result.status == 'ok') {
      this.$store.dispatch('auth/logIn', result.payload);
    }
    EventBus.$on('ERROR', payload => {
      console.log('Error was fired');
      this.message = payload.message;
      this.sub_message = payload.sub_message;
      this.nextRoute = payload.nextRoute;
      this.messageDialog = true;
    }); 
  
  EventBus.$on('DIALOG', payload => {
      this.message = payload.message;
      this.sub_message = payload.sub_message;
      this.nextRoute = payload.nextRoute;
      this.messageDialog = true;
    });
  
  EventBus.$on('SPINNER_ON', payload => {
      this.oldMessageDialog = this.messageDialog;
      this.spinner = true;
      this.currentTime = Date.now();
    });
    EventBus.$on('SPINNER_OFF', async payload => {
      if (payload && payload.minTime) {
        this.minWaitTime = payload.minTime;
      }
      const accessTime = Date.now() - this.currentTime;
      if (accessTime < this.minWaitTime) {
        const restTime = this.minWaitTime - accessTime;
        await sleep(restTime);
      }
      this.spinner = false;
    });

    EventBus.$on('SHORTMESSAGE', message => {
      this.$q.notify(message);
    });

    EventBus.$on('CLOSE_DRAWER', message => {
      this.leftDrawerOpen = false;
    });
  },
  
  data () {
    return {
      leftDrawerOpen: false,
    
menuList:[],
    
basicMenuList: [
        {
          title: 'languages',
          caption: '',
          icon: 'language',
          link: '/language'
        },

        {
          title: 'Impressum',
          caption: '',
          icon: 'impressum',
          link: '/impressum'
        }
      ],
     userMenuList: [
        {
          title: 'Cockpit',
          caption: '',
          icon: 'home',
          link: '/cockpit'
        },
        {
          title: 'upload',
          caption: '',
          icon: 'cloud_upload',
          link: '/upload'
        }
      ],
    }
  },
  
  watch: {
   //example for a watcher -- here watches the loggedIn variable and changes
   //the menue accordingly
   //the loggedIn Variable is a computed which is treated like a variable
   loggedIn: function(newValue, oldValue) {
      this.createMenu(newValue);
    }
  },
  
  computed:{
     loggedIn() {
      return this.$store.getters['auth/loggedIn'];
    },
    user() {
      return this.$store.getters['auth/user'];
    },
  },


  methods: {
   createMenu(loggedIn) {
      this.menuList = [];
      if (!loggedIn) {
        this.menuList = this.basicMenuList;
      }
      if (loggedIn) {
        this.menuList = this.basicMenuList.concat(this.userMenuList);
      }
    }, 
    logOut() {
      this.$store.dispatch('auth/logOut', {});
      EventBus.$emit('SHORTMESSAGE', 'Du bist ausgeloggt');
      this.$router.push(localized_url('/'));
    },
    localized_url(url) {
      return localized_url(url);
    },  
  }

}
</script>
