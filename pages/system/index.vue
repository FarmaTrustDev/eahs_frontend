<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Systems List"
    class="specific container page-search-input-container"
  >
    <template slot="headerMenus">
      <a-button type="primary" class="" @click="goto('/system/create')">Add System</a-button>
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
        <template slot="appRoles" slot-scope="appRoles">
          
          <a-row v-for="(appRol,index) in appRoles" :key="appRol.id">
            <a-col :span="12" style="text-align: left;">{{index+1}}. {{ appRol.roleName }}</a-col>
            <a-col :span="4" style="color: red;">
              <a-popconfirm
                title="Are you sure to delete?"
                ok-text="Yes"
                cancel-text="No"
                placement="topLeft"
                @confirm="removeRoles(`${appRol.appRolesId}`)"
                >
                X
              </a-popconfirm>
            </a-col>
          </a-row>
        </template>
        <template slot="action" slot-scope="action">
          <a-dropdown>
            <a-button class="action-button" @click="preventDefault">
              Admin <a-icon type="down" />
            </a-button>
            <a-menu slot="overlay">
              <a-menu-item key="labDetail">
                <a @click="goto(`/system/${action.globalId}`)">Edit</a>
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
import AppServices from '~/services/API/AppServices'
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
          title: `System Name`,
          key: 'appName',
          dataIndex: 'appName',
        },
        {
          title: `System Code`,
          key: 'appCode',
          dataIndex: 'appCode',
        },
        {
          title: `Roles`,
          key: 'appRoles',
          dataIndex: 'appRoles',
          scopedSlots: { customRender: 'appRoles' },
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
      AppServices.get()
        .then((response) => {
          this.dataSource = response.data
        })
        .finally(() => (this.loading = false))
    },

    remove(id) {
      this.loading = true
      AppServices.deleteApp(id).then((response)=>{
        this.fetch()
      }).catch(this.error).finally(this.loading = false)
    },
    removeRoles(appRolesId) {
      this.loading = true
      AppServices.deleteRoleSystem(appRolesId).then((response)=>{
        this.fetch()
      }).catch(this.error).finally(this.loading = false)
    },
   
  },
}
</script>
