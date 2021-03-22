<template>
  <div>
    <q-input
      id="df234"
      label="email"
      type="email"
      v-model="inputmail"
      v-delayed-autofocus="700"
      @keyup.enter.native="sendEnter2Parent()"
      @input="checkEmail($event)"
      lazy-rules
      hint="valid email adress"
      error-message="email has invalid format"
      :error="!isValid"
    />
  </div>
</template>

<script>
import { delayedAutofocus } from "src/directives/delayedAutofocus";
export default {
  directives: {
    delayedAutofocus
  },
  data() {
    return {
      email_valid: 0, //0 undefined -> no errormessage   1 OK 2 nok
      email_error: "",
      inputmail: "",
      isValid: true,
      retwert: ""
    };
  },
  mounted() {
    this.inputmail = this.email;
    this.checkEmail(this.inputmail);
  },

  props: {
    email: {
      type: String,
      default: ""
    },
    hasFocus: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    checkEmail(event) {
      if (this.inputmail.length > 5) {
        this.isValid = true;
        const reg = new RegExp(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        this.email_valid = reg.test(this.inputmail) ? 1 : 2;
      } else {
        this.email_valid = 0;
        this.email_error = "";
      }
      if (this.email_valid == 2) {
        this.isValid = false;
      }
      if (this.email_valid == 1) {
        this.isValid = true;
      }
      //it emits the email only when the email is vaild otherwise ""
      this.retwert = this.email_valid === 1 ? this.inputmail : "";
      this.sendMail();
    },

    sendMail() {
      this.$emit("update:emailvalid", this.retwert);
    },

    sendEnter2Parent(event) {
      this.$emit("enter", "");
    }
  }
};
</script>
