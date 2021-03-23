<template>
  <div class="q-pa-md">
    <q-table
      grid
      card-class="bg-primary text-white"
      title="Photos"
      @row-click="clicked"
      :data="photos"
      :columns="columns"
      row-key="name"
      :filter="table_filter"
      hide-header
      v-if="focus == 'table'"
    >

      <template v-slot:item="props">
        <div class="col-xs-12 col-sm-6">
          <q-card @click.native.prevent="clicked(props.row)">
            <q-card-section>
              <q-btn color="negative" icon-right="edit" no-caps flat dense @click.stop="edit(props.row)" />
              <br />
            </q-card-section>
            <q-card-section>

              Name:  {{props.row.name}}
              <br />
              Beschreibung:
              {{ props.row.country }}
              <br />
              <amplify-s3-image
               :img-key="props.row.fullsize.key"
               class="w-4/12">
              </amplify-s3-image>
            </q-card-section>
            <q-separator />
          </q-card>
        </div>
      </template>
    </q-table>
    <div v-if="focus == 'pdf'">
      <q-layout>
        <q-header class="my-style">
          <hamburger class="right" v-on:status="closePdf()"></hamburger>
        </q-header>
        <q-page-container>
          <q-page class="q-pa-md">
            <q-pdfviewer v-model="show" type="html5" :src="pdf_link" content-class="absolute" class="my-class" />
          </q-page>
          {{ filename }}
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>
<style scoped>
.my-class {
  height: 100%;
}
.my-style {
  display: flex;
  justify-content: flex-end;
  background-color: white;
}
</style>
<script>
import "@aws-amplify/ui-vue";

export default {
  data() {
    return {
      table_filter: '',
      filename: '',
      focus: 'table',
      show: true,
      edit_id: '',
      columns: [
        { name: 'action', label: '', field: 'action' },
        {
          name: 'name',
          required: true,
          label: 'Name des Photos',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'description',
          label: 'Beschreibung',
          field: 'description',
          sortable: false
        },
      ]
    };
  },
  props: {
    photos:{default: ()=>{return []}, type: Array}
  },

  methods: {
    

    edit(props) {
      this.focus = 'edit';
      this.$emit('editItem', props);
    },
    clicked(row) {
      this.openPic(row);
      this.filename = row.filename;
    },
    closePdf() {
      this.focus = 'table';
    },
    async openPic(row) {
    }
  },

  async mounted() {},
};
</script>
