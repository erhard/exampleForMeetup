<template>
  <div id="q-app">
    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">
        <div style="min-width: 250px; max-width: 300px">
          <q-select
            ref="myChipInput"
            v-model="modelMultiple"
            multiple
            use-chips
            use-input
            new-value-mode="add-unique"
            stack-label
            hide-dropdown-icon
            lazy-rules
            :rules="rules"
            :label="label"
            @input.native="doStuff($event.target.value)"
            @new-value="createValue"
            @keyup.tab.native="doOtherStuff"
            @remove="deleteItem($event)"
          >
            <template v-if="showOk" v-slot:append>
              <q-icon color="primary" name="check_circle_outline" class="cursor-pointer" @click="doOtherStuff"></q-icon>
            </template>
          </q-select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      modelMultiple: [],
      inputValue: '',
      showOk: false
    };
  },

  props: {
    label: { type: String, default: '' },
    content: { type: Array, default: () => [] },
    rules: { type: Array, default: () => [] }
  },
  watch: {
    content: function(val) {
      this.modelMultiple = val;
      this.items = val;
    }
  },
  mounted() {
    this.modelMultiple = this.content;
    this.items = this.content;
  },

  methods: {
    createValue(val, done) {
      this.items.push(val);
      //everytime a value is create the Array is send
      this.$emit('update', this.items);
      this.showOk = false;
      if (done) {
        done(val);
      }
    },
    doStuff(val) {
      console.log('doStuff');
      this.showOk = true;
      this.inputValue = val;
      console.log(this.modelMultiple);
    },
    deleteItem(event) {
      console.log('deleteItem');
      console.log(event);
      const i = this.items.indexOf(event);
      this.items.splice(i, 1);
      this.$emit('update', this.items);
    },

    doOtherStuff(event) {
      console.log('doOtherSTuf');
      console.log(event);
      this.showOk = false;
      this.$refs.myChipInput.add(this.inputValue);
      this.$refs.myChipInput.updateInputValue('');
      console.log(this.modelMultiple);
    },
    validate() {
      console.log('validate of Chip');
      console.log(this.rules);
      console.log();
    }
  }
};
</script>
