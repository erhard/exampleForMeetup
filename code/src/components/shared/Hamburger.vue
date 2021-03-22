<template>
  <div class="hcontainer" v-on:click="clicked($event)" ref="hamburger">
    <div v-show="stat"></div>
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      el: {},
      stat: true,
      hamburger_status: null
    };
  },

  props: {
    initialStatus: {
      default: "closed",
      type: String
    }
  },
  mounted() {
    this.hamburger_status = this.initialStatus;
    this.el = this.$refs["hamburger"];
    this.el.classList.toggle("change");
  },

  computed: {
    status() {
      return this.hamburger_status;
    }
  },
  methods: {
    clicked(event) {
      console.log(this.hamburger_status);
      if (this.hamburger_status == "closed") {
        this.hamburger_status = "open";
      } else {
        this.hamburger_status = "closed";
      }
      this.el.classList.toggle("change");
      this.$emit("status", this.hamburger_status);
    }
  }
};
</script>

<style lang="scss" scoped>
.hcontainer {
  float: left;
  width: 50px;
  display: inline-block;
  cursor: pointer;
}

.bar1,
.bar2,
.bar3 {
  width: 35px;
  height: 5px;
  background-color: black;
  margin: 6px 0;
  transition: 0.4s;
}

.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-9px, 6px);
}

.change .bar2 {
  opacity: 0;
}

.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}
</style>
