<template>
  <q-input
    v-model="password"
    :type="isPwd ? 'password' : 'text'"
    hint="Password at least 8 Characters with 2 Nummers"
    v-delayed-autofocus="2000"
    @keyup.enter.native="sendMessage($event)"
    @input="checkPasswd($event)"
  >
    <template v-slot:append>
      <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
    </template>
  </q-input>
</template>

<script>
import { delayedAutofocus } from 'src/directives/delayedAutofocus';
export default {
  directives: {
    delayedAutofocus
  },
  data() {
    return {
      isPwd: true,

      password: '',
      passwordFieldType: 'password',
      pwd_helper: ' enter Your password',
      password_valid: false
    };
  },
  props: {
    label: {
      type: String,
      default: 'password'
    }
  },

  methods: {
    checkPasswd(event) {
      const reg1 = new RegExp(/\d/);
      const reg2 = new RegExp(/^.{8,}$/);
      const valid1 = reg1.test(this.password);
      const valid2 = reg2.test(this.password);
      this.pwd_helper = 'missing ';
      if (!valid1) {
        this.pwd_helper = this.pwd_helper + ' number ';
      }
      if (!valid2) {
        if (!valid1) {
          this.pwd_helper = this.pwd_helper + 'and ';
        }
        this.pwd_helper = this.pwd_helper + 'length > 8 ';
      }
      if (valid1 && valid2) {
        this.pwd_helper = 'password check OK';
        this.password_valid = true;
      } else {
        this.password_valid = false;
      }
      //Only a valid pwd is given to the login View
      //const retpwd = this.password_valid == true ? this.password : "";

      this.$emit('update:passwordvalid', this.password);
    },

    sendMessage(event) {
      this.$emit('message:enter');
    },

    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }
  }
};
</script>
