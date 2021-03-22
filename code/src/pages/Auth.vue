<template>
  <div>
    <q-dialog v-model="maindialog" persistent>
      <q-card style="min-width: 350px" v-if="card == 2">
        <q-card-section>
          <div class="text-h6">{{ $t('auth.newPassword') }}</div>
        </q-card-section>
        <q-card-section v-if="currentStep > 0">
          <div class="text">{{ $t('auth.for') }} {{ email }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none" v-if="currentStep == 1">
          <passwordInput v-on:update:passwordvalid="password_valid($event)" v-on:message:enter="enter_pressed($event)" />
        </q-card-section>
        <q-card-actions align="center" class="text-primary">
          <q-btn flat :label="$t('auth.cancel')" v-close-popup @click="cancel()" />
          <q-btn flat :label="$t('auth.save')" @click="savePassword()" />
        </q-card-actions>
      </q-card>

      <q-card style="min-width: 350px" v-if="card == 1">
        <div v-if="!loggedIn">
          <q-card-section>
            <div class="text-h6">{{ process }}</div>
          </q-card-section>
          <q-card-section v-if="currentStep > 0">
            <div class="text">{{ email }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none" v-if="currentStep == 0">
            <emailInput :email="email" v-on:update:emailvalid="email_valid($event)" v-on:enter="emailEnter()" />
          </q-card-section>

          <q-card-section class="q-pt-none" v-if="currentStep == 1">
            <passwordInput v-on:update:passwordvalid="password_valid($event)" v-on:message:enter="enter_pressed($event)" />
          </q-card-section>

          <q-card-section class="q-pt-none" v-if="currentStep == 2">
            <codeInput v-on:update:codevalid="code_valid($event)" v-on:message:enter="enter_pressed($event)" />
          </q-card-section>
        </div>

        <q-card-actions align="center" class="text-primary">
          <q-btn flat :label="$t('auth.cancel')" v-close-popup @click="cancel()" />
          <q-btn flat :label="$t('auth.newPassword')" @click="newPwd()" v-if="currentStep == 1 && this.proc != 'signup'" />
          <q-btn flat :label="$t('auth.back')" @click="continueFlow(-1)" />
          <q-btn flat :label="continueLabel" v-if="showContinue" @click="continueFlow(1)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
//import codeInput from "components/codeInput.vue";
//import store from "store";
import { getForcedPWD, signUp, confirmSignUp, auth_login, getCodeforForgottenPassword, resetPassword } from 'src/services/cloud_auth.js';
import EventBus from 'src/services/eventBus';

export default {
  name: 'Auth',
  components: {
    codeInput: require('components/auth/codeInput.vue').default,
    emailInput: require('components/shared/emailInput.vue').default,
    passwordInput: require('components/auth/passwordInput.vue').default
  },
  data() {
    return {
      process: 'SignUp',
      card: 1,
      alert: false,
      confirm: false,
      maindialog: true,
      address: '',
      email: '',
      code: '',
      password: '',
      loggedIn: false,
      currentStep: 0,
      disabledContinue: true,
      showSubmit: false,
      showContinue: true,
      lastStep: 2,
      continueLabel: 'continue',
      forcedPWD: false,
      technicalUserObject: null
    };
  },
  props: {
    proc: {
      default: 'login',
      type: String
    }
  },
  methods: {
    async code_valid(event) {
      if (event == '') {
        console.log('Input is invalid');
      } else {
        this.code = event;
        console.log('this.code');
        console.log(this.code);
      }
    },
    //Passwort and email is sent only if its vailid otherwise they are empty//
    newPwd() {
      this.card = 2;
      this.process = 'reset password';
    },

    async savePassword() {
      try {
        if (this.forcedPWD) {
          const result = await getForcedPWD(this.technicalUserObject, this.password);
          console.log(result);
          EventBus.$emit('SPINNER_OFF');
          this.$router.push('/');
        } else {
          const result = await getCodeforForgottenPassword(this.email);
          if (result.status == 'error') {
            this.currentStep = 0;
            const dialogObject = {
              message: this.$t('auth.tryAgain'),
              sub_message: result.payload.message,
              nextRoute: '/'
            };
            EventBus.$emit('ERROR', dialogObject);
          } else {
            this.card = 1;
            this.currentStep = 2;
          }
        }
      } catch (error) {
        console.log('should be never reached');
        console.log(error);
      }
    },

    password_valid(event) {
      if (event == '') {
        this.disabledContinue = true;
      } else {
        this.disabledContinue = false;
        this.password = event;
      }
    },
    email_valid(event) {
      if (event == '') {
        this.disabledContinue = true;
      } else {
        this.disabledContinue = false;
        this.email = event;
      }
    },

    emailEnter() {
      if (!this.disabledContinue) {
        this.continueFlow(1);
      }
    },

    showBack() {
      if (this.currentStep > 0) {
        return true;
      } else {
        return false;
      }
    },

    cancel() {
      console.log('cancel pressed');
      this.$router.push('/');
    },

    //currentStep 1 .  --> email Input
    //currentStep 2 .  ---> PasswordInput
    //currentStep 3 , --> codeInput

    //possible process :  "signUp
    //login
    //forgotten pwd" (Subrocess of login)

    async continueFlow(numStep) {
      if (this.disabledContinue) {
        return;
      }
      this.currentStep = this.currentStep + numStep;
      if (this.lastStep == this.currentStep) {
        this.continueLabel = this.$t('auth.ready');
      }

      if (this.lastStep < this.currentStep) {
        this.$router.push('/');
      }

      if (this.currentStep == 2 && this.process == 'Signup') {
        const result = await signUp(this.email, this.password);
        if (result.status != 'ok') {
          const dialogObject = {
            message: this.$t('auth.tryAgain'),
            sub_message: result.payload.message,
            nextRoute: '/'
          };
          this.currentStep = 0;
          EventBus.$emit('DIALOG', dialogObject);
        }
      }

      if (this.currentStep == 2 && this.process == 'Login') {
        try {
          const result = await auth_login(this.email, this.password);
          if (result.status == 'ok') {
            this.technicalUserObject = result.payload.technicalUserObject;
            if (result.payload.action && result.payload.action == 'setNewPWD') {
              this.process = 'reset password';
              console.log('Reset Password now');
              this.currentStep = 1;
              this.card = 2;
              this.forcedPWD = true;
              EventBus.$emit('SPINNER_OFF');
            } else {
              this.currentStep = this.currentStep - numStep;
              await this.$store.dispatch('auth/logIn', result.payload);
              EventBus.$emit('SHORTMESSAGE', 'Sie sind eingeloggt');
              this.$router.push('/cockpit');
            }
          } else {
            const dialogObject = {
              message: this.$t('auth.tryAgain'),
              sub_message: result.message,
              nextRoute: '/'
            };
            EventBus.$emit('DIALOG', dialogObject);
            this.currentStep = this.currentStep - numStep;
          }
        } catch (err) {
          const dialogObject = {
            message: this.$t('auth.tryAgain'),
            sub_message: err.message,
            nextRoute: '/'
          };
          EventBus.$emit('ERROR', dialogObject);
          this.currentStep = this.currentStep - numStep;
        }
      }

      if (this.currentStep == 3 && this.process == 'reset password') {
        try {
          const result = await resetPassword(this.email, this.password, this.code);
          if (result.status == 'ok') {
            EventBus.$emit('SHORTMESSAGE', 'Ihr Passwort wurde geändert');
            const user = await auth_login(this.email, this.password);
            if (result.status == 'ok') {
              this.currentStep = this.currentStep + 1000;
              EventBus.$emit('SHORTMESSAGE', this.$t('auth.loggedIn'));
              this.nextRoute = '/cockpit';
              this.$store.dispatch('auth/logIn', result.payload);
              this.$router.push('/cockpit');
            }
          } else {
            this.currentStep = 0;
            const dialogObject = {
              message: this.$t('auth.tryAgain'),
              sub_message: result.payload.message,
              nextRoute: '/'
            };
            EventBus.$emit('DIALOG', dialogObject);
          }
        } catch (error) {
          EventBus.$emit('SPINNER_OFF');
          const dialogObject = {
            message: this.$t('auth.tryAgain'),
            sub_message: error.message,
            nextRoute: '/'
          };
          EventBus.$emit('DIALOG', dialogObject);
        }
      }

      if (this.currentStep == 3 && this.process == 'Signup') {
        try {
          const result = await confirmSignUp(this.email, this.code);
          console.log('return of code in signUp');
          console.log(result);
          //signUp does not mean looged in ---> if signUp logIn
          if (result.status == 'ok') {
            const user = await auth_login(this.email, this.password);
            console.log('loggedInUser');
            console.log(user);
            if (result.status == 'ok') {
              this.currentStep = this.currentStep + 1000;
              EventBus.$emit('SHORTMESSAGE', this.$t('auth.loggedIn'));
              this.nextRoute = '/cockpit';
              this.$store.dispatch('auth/logIn', result.payload);
            }
          } else {
            const dialogObject = {
              nextRoute: '/',
              message: this.$t('auth.tryAgain'),
              sub_message: this.$t('wrongCode'),
              nextRoute: '/'
            };
            EventBus.$emit('ERROR', dialogObject);
          }
        } catch (err) {
          const dialogObject = {
            nextRoute: '/',
            message: this.$t('auth.tryAgain'),
            sub_message: this.$t('auth.wrongPassword'),
            nextRoute: '/'
          };
          EventBus.$emit('ERROR', dialogObject);
        }
      }
    },

    continueIsDisabled() {
      console.log('disabled');
      console.log(this.disabledContinue);
      return this.disabledContinue;
    },

    enter_pressed(event) {
      console.log('Enter pressed');
      console.log(event);
      this.continueFlow(1);
    },
    resetPassword() {
      this.process = 'resetPwd';
      this.password = '';
      this.passwordLabel = this.$t('auth.newPassword');
    }
  },
  created() {
    this.currentStep = 0;
    this.continueLabel = this.$t('auth.continue');
    if (this.proc == 'login') {
      this.process = 'Login';
    }
    if (this.proc == 'signup') {
      this.process = 'Signup';
    }
  },
};
</script>

<style lang="scss" scoped>
.login {
  margin-top: 50px;
}
#forget {
  margin-left: 10px;
}
.email_only {
  margin-top: 10px;
}
.buttobBlock {
  diplay: flex;
  justify-items: center;
}
.link {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}

#continue {
  margin-left: 10px;
}
</style>
