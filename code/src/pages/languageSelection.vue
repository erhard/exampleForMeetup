<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-select
        label="Select Language"
        v-model="lang"
        map-options
        :options="langs"
        class="row"
      />
      <div class="row q-pt-md">
        {{ $t("auth.examplePhrase") }} : {{ $t("auth.exampleLorem") }}
      </div>
      <div class="row q-pt-md">
        {{ $t("auth.currentLanguage") }} : {{ $i18n.locale }}
      </div>
      <div class="row q-pt-md">
        {{ $t("auth.currency") }} : {{ $n(100, "currency") }}
      </div>
      <div>
        <q-table
          :data="data"
          :columns="columns"
          row-key="name"
          :pagination.sync="pagination"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="name" :props="props">{{ props.row.name }}</q-td>
              <q-td key="surname" :props="props">{{ props.row.surname }}</q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import EventBus from "src/services/eventBus";
import { set_lang } from "src/services/locale";
export default {
  name: "PageIndex",
  data() {
    return {
      langs: [
        {
          label: "German",
          value: "de"
        },
        {
          label: "US English",
          value: "en-us"
        }
      ],
      lang: this.$i18n.locale,
      pagination: {
        rowsPerPage: 0,
        page: 1
      },
      selected: [],
      columns: [
        {
          name: "name",
          align: "center",
          label: this.$t("name"),
          field: "name",
          sortable: true
        },
        {
          name: "surname",
          align: "center",
          label: this.$t("surname"),
          field: "surname",
          sortable: true
        }
      ],
      data: [
        {
          name: "Name1",
          surname: "name 1"
        },
        {
          name: "Name2",
          surname: "name 2"
        }
      ]
    };
  },
  watch: {
    async lang(lang) {
      set_lang(lang, this);
    }
  }
};
</script>
