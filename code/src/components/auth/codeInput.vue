<template>
  <div>
    <q-input
      id="af234"
      label="Code You have got via email"
      v-delayed-autofocus="700"
      type="text"
      v-model="inputcode"
      @keyup.enter.native="sendMessage($event)"
      @input="sendCode($event)"
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
      code_valid: 0, //0 undefined -> no errormessage   1 OK 2 nok
      inputcode: ""
    };
  },

  props: {
    code: { type: String, default: "" }
  },
  mounted() {},

  methods: {
    sendCode(event) {
      this.$emit("update:codevalid", this.inputcode);
    },
    sendMessage(event) {
      this.$emit("message:enter", this.inputcode);
    }
  }
};
</script>
