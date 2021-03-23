<template>
  <div>
    <q-form ref="form" v-if="display == 'form'">
      <div class="q-pa-md upload">
        <div class="q-gutter-y-md column mainelement">
          <q-file v-model="file" label="Datei" v-if="edit == false">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        
         <q-input
         label= "Name"
         type="text"
         v-model="name"
         hint="Name des Bildes"
         />
         <q-input
         label="Beschreibung"
         type ="text"
         v-model="description"
         hint="Beschreibung des Bildes"
          />
            </div>
          </div>
          <q-btn flat label="Submit" @click="submit()" />
    </q-form>

    <messageDialog
      v-if="display == 'message'"
      title="Achtung"
      message="Es ist ein Fehler beim Upload aufgetreten,
bitte versuchen Sie es später noch einmal"
    >
    </messageDialog>
  </div>
</template>

<script>
import EventBus from 'src/services/eventBus';
import { uid } from 'quasar';
export default {
  components: {
    messageDialog: require('components/shared/MessageDialog.vue').default
  },
  name: 'fileMeta',
  data() {
    return {
      edit: false,
      display: 'form',
      name: "",
      description: "",
      file: null
    };
  },

  props: {
    item: {
      default: function() {
        return {};
      },
      type: Object
    }
  },

  methods: {
    async submit() {
      this.$refs.form.validate().then(async success => {
        if (success) {
          try {
            //tagsArrray unique machen
            EventBus.$emit('SPINNER_ON');
            const uuid = uid();
            const payload = {
              file: this.file,
              metaData: {name: this.name, description: this.description}
            };
            console.log("payload");
            console.log(payload)
            if (this.edit) {
              //await this.$store.dispatch('photo/updateMetaData', payload);
            } else {
              await this.$store.dispatch('photo/createPhoto', payload);
            }
            EventBus.$emit('SPINNER_OFF');
          } catch (err) {
            EventBus.$emit('SPINNER_OFF');
            EventBus.$emit('ERROR', {
              message: 'Fehler beim Upload',
              sub_message: err.message,
              nextRoute: '/'
            });
          }
        } else {
          //TODO Diplay message to this.display = "message";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.mainelement {
  min-width: 300px;
}
</style>
