<template>
  <div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.uuid"
      :data-source="inProgressData != null ? inProgressData : dumpData"
      :loading="loading"
      class="rounded-table"
      :customRow="customRowReDirect"
    >
      <template slot="tickets" slot-scope="id"> CKD-{{ id }} </template>
      <template slot="status" slot-scope="status, record">
        <span :class="'status status-' + getStatusName(status, record)">{{
          record.status_Name
        }}</span>
      </template>

      <span slot="action" slot-scope="text, record">
        <!-- <a-button type="link">
                  <a-icon type="edit" />
                </a-button> -->
        <a-dropdown>
          <a-button class="action-button admin-btn" size="small">{{
            translation.Admin_1_142
          }}</a-button>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" @click="showUpdate(record)"
                ><a-icon type="search" /> {{ translation.Updatticke_2_222 }}</a
              >
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>

      <template slot="supportAction">
        <a-dropdown :trigger="['click']">
          <a-button class="action-button">
            Admin <a-icon type="down" />
          </a-button>
          <a-menu slot="overlay">
            <a-menu-item key="0"
              ><a-icon type="plus" />
              {{ this.$store.getters.getTranslation.Updatticke_2_222 }}
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
    </a-table>
    <!-- Add New Ticket Modal -->
    <a-skeleton :loading="loadingTicket">
      <add-new-ticket
        v-if="showAddModal"
        :ticket="ticket"
        :is-created="isCreated"
        @closeModal="closeModal"
    /></a-skeleton>
  </div>
</template>

<script>
import SupportServices from '~/services/API/SupportServices'
import AddNewTicketModal from '~/components/support/Add'
import routeHelpers from '~/mixins/route-helpers'
export default {
  components: {
    'add-new-ticket': AddNewTicketModal,
  },
  props: {
    dumpData: { type: Array },
    type: {
      type: String,
      default: '',
    },
  },
  mixins: [routeHelpers],
  data() {
    return {
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
      data: [],
      loading: false,
      loadingTicket: false,
      isCreated: false,
      showAddModal: false,
      ticket: {},
      inProgressData:this.dumpData,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    customRowReDirect(record) {
      // alert(record)
      // console.log(record)
      return {
        on: {
          click: (event) => {
            // console.log(record)
            this.goto(`support/${record.global_Id}`)
          },
        },
      }
    },
    handleTableChange(pagination, filters, sorter) {
      // console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      })
    },
    getStatusName(status, record) {
      if (record.status_Name) {
        return record.status_Name.toLowerCase()
      }
      return record.status_Name
      // status_Name.toLowerCase()
    },
    closeModal(value) {
      this.showModal(value)
      this.fetch()
    },
    showUpdate(record) {
      this.fetchTicket(record.id)
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
    fetch(params = {}) {
      // console.log(params.reference_Id)
      this.loading = true
      SupportServices.get(params)
        .then((response) => {
          this.data = response.ticket
          // this.archivedData.splice(0)
          this.inProgressData.splice(0)
          // this.resolvedData.splice(0)
          for (const dat in this.data) {
            // console.log(this.data[dat])
            const dates = this.data[dat].created_At.split('T')[0]
            this.data[dat].created_At = dates
            // console.log(dates)
            if (this.data[dat].reporter_name === 'Test User (DAC3138N)') {
              this.data[dat].reporter_name = 'Chris Murphy (DAC3138P)'
            }
            if (this.data[dat].status_Name === 'In progress') {
              this.inProgressData.push(this.data[dat])
            }
            if (this.data[dat].status_Name === 'Resolved') {
              // this.resolvedData.push(this.data[dat])
            }
            if (this.data[dat].status_Name === 'Archived') {
              // this.archivedData.push(this.data[dat])
            }
          }
          // console.log(this.resolvedData)
          // this.data[1].reporter_name='Chris Murphy (DAC3138P)'
        })
        .finally(() => {
          this.loading = false
        })
        this.$emit('fetchData','')
    },
    showModal(value) {
      this.showAddModal = value
      if (!value) {
        this.isCreated = false
      }
    },
  },
}
</script>
