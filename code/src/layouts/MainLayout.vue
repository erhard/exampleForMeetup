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

         <div class="absolute-right" v-if="loggedIn">
          {{this.user}}
          <q-btn @click="logout()" flat label="LogOut" class="right" />
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
    
     <amplify-authenticator v-if="!loggedIn" username-alias="email" hideDefault={true}>
     </amplify-authenticator>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import '@aws-amplify/ui-vue';
import {auth_logout} from 'src/services/cloud'
import { onAuthUIStateChange } from '@aws-amplify/ui-components'


export default {
  name: 'MainLayout',
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      console.log(this.loggedIn);
        this.loggedIn=false
      if(authData){
        this.loggedIn = true
      this.user = authData.username;
      console.log(this.user);
      }
      else{
        this.user=""
      }
      }
    )
  },
  
  data () {
    return {
      leftDrawerOpen: false,
    
menuList:  [
  {
    title: 'Upload',
    caption: 'This is to upload the files',
    icon: '',
    link: '/upload'
  },
  {
    title: 'View',
    caption: '',
    icon: 'code',
    link: '/view'
  },
  {
    title: 'Impressum',
    caption: '',
    icon: '',
    link: '/impressum'
  },
  
],
   loggedIn: false,
   user: "",
    


signUpConfig: {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'username',
      required: true,
      placeholder: 'Email',
      type: 'email',
      displayOrder: 1,
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      placeholder: 'Password',
      type: 'password',
      displayOrder: 2,
    },
  ],
}

    }



  },

  methods: {
    localized_url(url){
      return(url)
    },
    async logout(){
  console.log("logout called");
     const stat = await auth_logout();
     if (stat.status == "ok"){
       this.loggedIn=false;
     }
    }
  }

}
</script>
