<template>
  <div>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ message }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="primary"
            v-close-popup
            @click="ok_action()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert: true
    };
  },
  props: {
    message: { type: String, default: "" },
    title: { type: String, default: "Alert" },
    goto: { type: String, default: "/" }
  },
  mounted() {},
  methods: {
    ok_action() {
      this.$emit("ok_action", "");
      this.$router.push(this.goto);
    }
  }
};
</script>
<style lang="scss" scoped></style>
