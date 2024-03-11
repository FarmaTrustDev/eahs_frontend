<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Users List"
    class="specific container page-search-input-container"
  >
    <template slot="headerMenus">
      <!-- <a-input
        ref="userNameInput"
        class="page-search-input"
        :placeholder="translation.SearcLab_2_561"
        
      >
        <a-icon slot="prefix" type="search" />
      </a-input> 
      <a-button type="primary" class="" @click="goto('/system/')">Systems</a-button>
      <a-button type="primary" class="" @click="goto('/role/')">Roles</a-button>
      <a-button type="primary" class="" @click="goto('/org/')">Organizations</a-button>
      <a-button type="primary" class="" @click="goto('/team/')">Teams</a-button> -->
      <a-button type="primary" class="" @click="goto('/user/create')">Add Users</a-button>
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
        <template slot="userName" slot-scope="userName">
          {{ userName.firstName + ' ' +userName.lastName }}
        </template>
        <template slot="systemAccess" slot-scope="systemAccess">
          <a-row v-for="system in systemAccess" :key="system.id">
            <a-col :span="5">{{ system.systemName }}</a-col>
            <a-col :span="5">{{ system.roleName }}</a-col>
            <a-col :span="5">{{ system.organizationName }}</a-col>
            <a-col :span="5">{{ system.teamName }}</a-col>
            <a-col :span="4" style="color: red;">
              <a-popconfirm
                title="Are you sure to delete?"
                ok-text="Yes"
                cancel-text="No"
                placement="topLeft"
                @confirm="removeUserSystem(`${system.userAppClientRoleId}`,`${system.userAppRoleId}`)"
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
                <a @click="goto(`/user/${action.globalId}`)">Edit</a>
              </a-menu-item>
              <a-menu-item key="labDetails">
                <a @click="goto(`/user/assignRole/${action.globalId}`)">Assign Role</a>
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
import UsersServices from '~/services/API/UsersServices'
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
          title: `User Name`,
          key: 'userName',
          scopedSlots: { customRender: 'userName' },
        },
        {
          title: `Email`,
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: `System/ Role/ Organization/ Team`,
          dataIndex: 'systemAccess',
          key: 'systemAccess',
          scopedSlots: { customRender: 'systemAccess' },      
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
    user() {
      return this.$store.getters.getUser
    },
   
  },
  
  mounted() {
     this.fetch()
  },
  methods: {
    
    preventDefault,
    fetch() {
      UsersServices.getComplete()
        .then((response) => {
          this.dataSource = response.data
        })
        .finally(() => (this.loading = false))
    },
    remove(id) {
      this.loading = true
      UsersServices.deleteUser(id).then((response)=>{
        this.fetch()
      }).catch(this.error).finally(this.loading = false)
    },
    removeUserSystem(appClId, appRoleId) {
      this.loading = true
      UsersServices.deleteUserSystem(appClId, appRoleId).then((response)=>{
        this.fetch()
      }).catch(this.error).finally(this.loading = false)
    },
  },
}
</script>
