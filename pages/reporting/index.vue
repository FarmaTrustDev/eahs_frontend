<template>
  <page-layout
    :create="false"
    :bordered="false"
    :loading="loading"
    :title="translation.Repor_1_786"
    class="container page-search-input-container"
  >
    <template slot="headerMenus">
      <a-input
        ref="userNameInput"
        :placeholder="translation.searc_1_488"
        class="page-search-input"
        @change="searchLabel"
      >
        <a-icon slot="prefix" type="search" />
      </a-input>
    </template>
    <template slot="content">
      <a-row class="">
        <a-table
          :columns="columns"
          :data-source="datasource"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
          class="rounded-table"
        >
          <div slot="status" slot-scope="value, row">
            <div v-if="row.statusId === 'tag1'">
              <span :id="row.statusId">{{ value }}</span>
            </div>
            <div v-else>
              <span :id="row.statusId">{{ value }}</span>
            </div>
          </div>
          <div slot="doc" slot-scope="value, row">
            <a-button
              icon="printer"
              class="print-btn"
              type="primary"
              size="small"
              @click="goto(`/report?report=${row.statusId}`)"
              >{{ translation.ViewForm_2_789 }}</a-button
            >
          </div>
        </a-table>
      </a-row></template
    ></page-layout
  >
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
// import Table from '~/components/labeling/Listing'
import routeHelpers from '~/mixins/route-helpers'
import LabelServices from '~/services/API/LabelServices'
export default {
  components: {
    'page-layout': PageLayout,
  },
  mixins:[routeHelpers],
  data() {
    return {
      data: [],
      loading: true,
      datasource: [
        {
          id: 'DAC49784',
          sample: 'Novartis',
          name: 'Stephen Jones',
          date: '12/07/2022',
          status: 'New',
          statusId: 'tag1',
          doc: 'View Form',
        },
        {
          id: 'DAC517847',
          sample: 'Adaptimmune',
          name: 'Chris Smith',
          date: '15/08/2022',
          status: 'New',
          statusId: 'tag1',
          doc: 'View Form',
        },
        {
          id: 'DAC69254',
          sample: 'TCR',
          name: 'Stephen Jones',
          date: '19/08/2022',
          status: 'New',
          statusId: 'tag1',
          doc: 'View Form',
        },
        {
          id: 'DAC79798',
          sample: 'Novartis',
          name: 'Oliver Jack',
          date: '20/08/2022',
          status: 'New',
          statusId: 'tag1',
          doc: 'View Form',
        },
        {
          id: 'DAC795412',
          sample: 'Novartis',
          name: 'John Smith',
          date: '29/07/2022',
          status: 'New',
          statusId: 'tag1',
          doc: 'View Form',
        },
        // {
        //   id: 'DAC37790',
        //   sample: 'Adaptimmune',
        //   name: 'Jack Connor',
        //   date: '20/08/2022',
        //   status: 'Saved',
        //   statusId: 'tag2',
        //   doc: 'View Form',
        // },
      ],
      columns: [
        {
          title: `${this.$store.getters.getTranslation.SamplID_2_502}`,
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: `${this.$store.getters.getTranslation.Clien_1_505}`,
          dataIndex: 'sample',
          key: 'sample',
        },
        {
          title: `${this.$store.getters.getTranslation.QualiPerso_2_787}`,
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: `${this.$store.getters.getTranslation.ArrivDate_2_788}`,
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: `${this.$store.getters.getTranslation.Statu_1_202}`,
          dataIndex: 'status',
          key: 'status',
          class: 'status-sample',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: `${this.$store.getters.getTranslation.Docum_1_507}`,
          dataIndex: 'doc',
          key: 'doc',
          scopedSlots: { customRender: 'doc' },
        },
      ],
    }
  },
  mounted() {
    this.fetch()
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.columns[0].title=newValues.SamplID_2_502
        this.columns[1].title=newValues.Clien_1_505
        this.columns[2].title=newValues.QualiPerso_2_787
        this.columns[3].title=newValues.ArrivDate_2_788
        this.columns[4].title=newValues.Statu_1_202
        this.columns[5].title=newValues.Docum_1_507
      }
    }
  },
  methods: {
    fetch() {
      this.loading = true
      LabelServices.hospital()
        .then((response) => {
          this.data = response.data
        })
        .finally(() => (this.loading = false))
    },
    fetchSearch(params) {
      this.loading = true
      LabelServices.hospital(params)
        .then((response) => {
          this.data = response.data
        })
        .finally(() => (this.loading = false))
    },
    searchLabel(e) {
      const search = e.target.value
      if (search !== '') {
        this.fetchSearch({
          patientEnrollmentNumber: search,
          TreatmentTypeName: search,
        })
      } else {
        this.fetch()
      }
    },
  },
}
</script>
