// :loading="loading"
<template>
  <page-layout
    :create="false"
    :title="translation['suppoissue_2_176']"
    class="specific container page-search-input-container"
  >
    <template slot="headerMenus">
      <a-input
        ref="userNameInput"
        :placeholder="translation.searc_1_488"
        class="page-search-input"
        @change="searchSupport"
      >
        <a-icon slot="prefix" type="search" />
      </a-input>
      <a-button type="primary" @click="showModal(true)"
        >{{ translation.AddNew_3_182 }}
      </a-button>
    </template>
    <div slot="content" class="specific-page container support_page">
      <a-tabs type="card" @change="callback">
        <a-tab-pane key="1" :tab="translation.All_1_210">
          <a-table
            class="rounded-table"
            :loading="loading"
            :data-source="data"
            :columns="columns"
            :custom-row="customRowReDirect"
          >
            <template slot="tickets" slot-scope="id"> CKD-{{ id }} </template>
            <template slot="status" slot-scope="status, record">
              <b><span :class="'status status-' + getStatusName(status, record)">{{
                record.status_Name
              }}</span></b>
            </template>

            <span slot="action" slot-scope="text, record">
              <!-- <a-button type="link">
                  <a-icon type="edit" />
                </a-button> -->
              <a-dropdown>
                <a-button class="action-button admin-btn" size="small"
                  >{{ translation.Admin_1_142 }} <a-icon type="down" />
                </a-button>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a @click="showUpdate(record)"
                      ><a-icon type="search" />
                      {{ translation.Updatticke_2_222 }}</a
                    >
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </span>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="translation.Archi_1_226">
          <Table
            type="archive"
            :dump-data="archivedData"
            @fetchData="fetchData"
          />
        </a-tab-pane>
        <a-tab-pane key="3" :tab="translation.InPro_1_533">
          <InProgress
            type="inProgress"
            :dump-data="inprogressData"
            @fetchData="fetchData"
          />
        </a-tab-pane>
        <a-tab-pane key="4" :tab="translation.Resol_1_230">
          <Resolved
            type="resolved"
            :dump-data="resolvedData"
            @fetchData="fetchData"
          />
        </a-tab-pane>
      </a-tabs>
      <!-- Add New Ticket Modal -->
      <a-skeleton :loading="loadingTicket">
        <add-new-ticket
          v-if="showAddModal"
          :ticket="ticket"
          :is-created="isCreated"
          @closeModal="closeModal"
      /></a-skeleton>
    </div>
  </page-layout>
</template>

<script>
import moment from 'moment';
import Table from '~/components/support/Listing'
import AddNewTicketModal from '~/components/support/Add'
import SupportServices from '~/services/API/SupportServices'
import InProgress from '~/components/support/InProgress.vue'
import Resolved from '~/components/support/Resolved.vue'
import PageLayout from '~/components/layout/PageLayout'
// import PageLayout from '~/components/layout/PageLayout'
import routeHelpers from '~/mixins/route-helpers'

export default {
  components: {
    Table,
    InProgress,
    PageLayout,
    Resolved,
    'add-new-ticket': AddNewTicketModal,
    // PageLayout
  },
  mixins: [routeHelpers],
  data() {
    return {
      showAddModal: false,
      data: [],
      inprogressData: [],
      resolvedData: [],
      archivedData: [],
      columns: [
        {
          title: `${this.$store.getters.getTranslation.date_1_510}`,
          dataIndex: 'created_At',
          width: 100,
        },
        {
          title: `${this.$store.getters.getTranslation.TickeID_2_212}`,
          dataIndex: 'id',
          scopedSlots: { customRender: 'tickets' },
          width: 100,
        },
        {
          title: 'Name(PUID)',
          dataIndex: 'reporter_name',
          width: 100,
        },
        {
          title: `${this.$store.getters.getTranslation.BagID_2_540}`,
          dataIndex: 'reference_Id',
          width: 100,
        },
        {
          title: `${this.$store.getters.getTranslation.IssueDetai_2_214}`,
          dataIndex: 'description',
          width: 300,
        },
        {
          title: `${this.$store.getters.getTranslation.LastUpdat_2_216}`,
          dataIndex: 'last_Updated_At',
          width: 100,
        },
        {
          title: `${this.$store.getters.getTranslation.Statu_1_202}`,
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          width: 100,
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          dataIndex: 'actions',
          scopedSlots: { customRender: 'action' },
          width: 100,
        },
      ],
      loading: true,
      ticket: {},
      isCreated: false,
      loadingTicket: false,
      globalId: '',
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch: {
    translation(newValues, oldValue) {
      if (newValues !== oldValue) {
        this.columns[0].title = newValues.date_1_510
        this.columns[1].title = newValues.TickeID_2_212
        this.columns[3].title = newValues.BagID_2_540
        this.columns[4].title = newValues.IssueDetai_2_214
        this.columns[5].title = newValues.LastUpdat_2_216
        this.columns[6].title = newValues.Statu_1_202
        this.columns[7].title = newValues.Actio_1_220
      }
    },
  },
  mounted() {
    this.fetch()
    this.showModelFromPatient()
  },
  methods: {
    showModelFromPatient() {
      // console.log(this.$route.query.showModel)
      if (this.$route.query.showModel) {
        this.showAddModal = true
      }
    },
    customRowReDirect(record) {
      // alert(record)
      // console.log(record)
      return {
        on: {
          click: (event) => {
            // console.log(record)
            this.goto(`/support/${record.global_Id}`)
          },
        },
      }
    },
    fetchData() {
      this.fetch()
    },
    showUpdate(record) {
      this.fetchTicket(record.id)
    },
    callback(key) {
      // console.log(key)
    },
    showModal(value) {
      this.showAddModal = value
      if (!value) {
        this.isCreated = false
      }
    },
    closeModal(value) {
      this.showModal(value)
      this.fetch()
    },
    getStatusName(status, record) {
      if (record.status_Name) {
        return record.status_Name.toLowerCase()
      }
      return record.status_Name
      // status_Name.toLowerCase()
    },
    fetch(params = {}) {
      // console.log(params.reference_Id)
      this.loading = true
      SupportServices.get(params)
        .then((response) => {
          this.data = response.ticket
          this.archivedData.splice(0)
          this.inprogressData.splice(0)
          this.resolvedData.splice(0)
          for (const dat in this.data) {
            // console.log(this.data[dat])
            
            // const dates = this.data[dat].created_At.split('T')[0]
            const dates = moment(String(this.data[dat].created_At)).format('Do MMMM YYYY')
            this.data[dat].created_At = dates
            // console.log(dates)
            if (this.data[dat].reporter_name === 'Test User (DAC3138N)') {
              this.data[dat].reporter_name = 'Chris Murphy (DAC3138P)'
            }
            if (this.data[dat].status_Name === 'In progress') {
              this.inprogressData.push(this.data[dat])
            }
            if (this.data[dat].status_Name === 'Resolved') {
              this.resolvedData.push(this.data[dat])
            }
            if (this.data[dat].status_Name === 'Archived') {
              this.archivedData.push(this.data[dat])
            }
          }
          // console.log(this.resolvedData)
          // this.data[1].reporter_name='Chris Murphy (DAC3138P)'
        })
        .finally(() => {
          this.loading = false
        })
    },
    fetchTicket(globalId) {
      this.loadingTicket = true
      this.showModal(true)
      SupportServices.getById(globalId)
        .then((response) => {
          this.ticket = response.ticket
          this.isCreated = true
        })
        .finally(() => {
          this.loadingTicket = false
        })
    },
    searchSupport(e) {
      const search = e.target.value
      this.fetch({ statusName: search, generalSearch: search })
    },
  },
}
</script>
