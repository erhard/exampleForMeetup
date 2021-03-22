<template>
  <q-dialog v-model="messageDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ message }}</div>
      </q-card-section>
      <q-card-section>
        <div>{{ sub_message }}</div>
      </q-card-section>
      <q-card-actions align="center" class="text-primary">
        <q-btn flat label="OK" @click="messageAction()" ref="okButton" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  data() {
    return {
      messageDialog: true
    };
  },

  props: {
    message: {
      default: "",
      type: String
    },

    sub_message: {
      default: "",
      type: String
    }
  },
  mounted() {
    this.$nextTick(() => {
      const button = this.$refs.okButton.$el;
      button.focus();
    });
  },
  methods: {
    messageAction() {
      this.$emit("ok", "");
    }
  }
};
</script>
