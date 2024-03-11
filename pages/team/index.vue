<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Teams List"
    class="specific container page-search-input-container"
  >
    <template slot="headerMenus">
      <a-button type="primary" class="" @click="goto('/team/create')">Add Team</a-button>
    </template>
    <div slot="content">
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        class="rounded-table"
        :pagination="{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50', '100'],
        }"
      >
        
        <template slot="action" slot-scope="action">
          <a-dropdown>
            <a-button class="action-button" @click="preventDefault">
              Admin <a-icon type="down" />
            </a-button>
            <a-menu slot="overlay">
              <a-menu-item key="labDetail">
                <a @click="goto(`/team/${action.globalId}`)">Edit</a>
              </a-menu-item>
              <a-menu-item key="labDelete">
                <a-popconfirm
                title="Are you sure to delete?"
                ok-text="Yes"
                cancel-text="No"
                placement="topLeft"
                @confirm="remove(`${action.globalId}`)"
                >
                Delete
              </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </a-table>
    </div>
  </page-layout>
</template>
<script>
// import JudgeServices from '~/services/API/JudgeServices'
import TeamServices from '~/services/API/TeamServices'
// import { success } from '~/services/Helpers/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import PageLayout from '~/components/layout/PageLayout'
export default {
  components: {
    PageLayout,
  },
  mixins: [routeHelpers],
  data() {
    return {
      dataSource:[],
      columns: [
        {
          title: `Team Name`,
          key: 'teamName',
          dataIndex: 'teamName',
        },
        {
          title: `Client Name`,
          key: 'clientName',
          dataIndex: 'clientName',
        },
        {
          title: `System Name`,
          key: 'appName',
          dataIndex: 'appName',
        },
        {
          title: `Action`,
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      loading: true,
      fullName: [],
      visibleModal:false,
      ruleData:[]
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      return this.$store.getters.getUser
    },
   
  },
  
  mounted() {
     this.fetch()
     // this.getRules()
  },
  methods: {
    
    preventDefault,
    fetch() {
      TeamServices.get()
        .then((response) => {
          this.dataSource = response.data
        })
        .finally(() => (this.loading = false))
    },

    remove(id) {
      this.loading = true
      TeamServices.remove(id).then((response)=>{
        this.fetch()
      }).catch(this.error).finally(this.loading = false)
    },
    disable(id) {
      this.loading = true
      TeamServices.disable(id).then((response)=>{
        this.fetch()
      }).catch(this.error).finally(this.loading = false)
    },
    enable(id) {
      this.loading = true
      TeamServices.enable(id).then((response)=>{
        this.fetch()
      }).catch(this.error).finally(this.loading = false)
    },
    showModal(e){

      this.visibleModal = e
    },
    searchLab(){
      console.log('hello')
    },
    /* getRules(){
      RuleServices.get()
        .then((response) => {
          this.ruleData = response.data
        })
        .finally(() => (this.loading = false))
    }, */
    pushListArray( newValue,id) {
      // Create a new array with the updated object
      this.ruleData = this.ruleData.map(item => (item.id === id ? { ...item, isIncluded: newValue } : item));
      console.log(this.ruleData)
    },
    /* submitRule()
    {
      RuleServices.put(this.ruleData).then((response)=>{
        this.visibleModal = false
      })
    } */
    
  },
}
</script>
