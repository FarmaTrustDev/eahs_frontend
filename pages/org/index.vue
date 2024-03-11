<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Organizations List"
    class="specific container page-search-input-container"
  >
    <template slot="headerMenus">
      <a-button type="primary" class="" @click="goto('/org/create')">Add Organization</a-button>
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
      
        <template slot="appResDTo" slot-scope="appResDTo">
          <a-row v-for="(appRol,index) in appResDTo" :key="appRol.id">
            <a-col :span="12" style="text-align: left;">{{index+1}}. {{ appRol.appName }}</a-col>
            <a-col :span="4" style="color: red;">
              <a-popconfirm
                title="Are you sure to delete?"
                ok-text="Yes"
                cancel-text="No"
                placement="topLeft"
                @confirm="removeOrg(`${appRol.appClientId}`)"
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
                <a @click="goto(`/org/${action.globalId}`)">Edit</a>
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
      <a-modal
      :footer="null"
      :width="750"
      title="Configure Rule"
      :visible="visibleModal"
      :dialog-style="{ top: '20px' }"
      @cancel="showModal(false)"
    >
      
        <a-row :gutter="20">
          <div 
        v-for="rule in ruleData" 
        :key="rule.id" 
        class="ant-col ant-col-20 mt-15 ml-40 consentClass" 
        >
          <a-row>
            <a-col :offset="3" :lg="{span:15}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
          <div class="pt-3"><h3>{{ rule.ruleName }}</h3></div>
          </a-col>
          <a-col :lg="{span:2}" :md="{span:2}" :sm="{span:2}" :xs="{span:2}">
            <div  class="ml-10" >
              <a-switch  
                    v-decorator="[
                    'con'+rule.id,
                    {
                        rules: [],
                        valuePropName: 'checked',
                    },
                    ]"
                    class="mt4 toggle_record"   
                    data-rowId="2"
                    size="large"
                    :checked="rule.isIncluded === true"
                    checked-children="Yes"
                    un-checked-children="No"
                    @change="(value) => pushListArray(value, rule.id)"
                />
            </div>
          </a-col>
          
        </a-row>
        </div>
          
        </a-row>
       

        <a-row >
          <a-col :offset="10" :span="3" class="mt-15" >
            <a-button type="primary" @click="submitRule()" >Configure</a-button>
          </a-col>
        </a-row>
      
      
     </a-modal>
    </div>
  </page-layout>
</template>
<script>
// import JudgeServices from '~/services/API/JudgeServices'
import OrganizationsServices from '~/services/API/OrganizationsServices'
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
          title: `Organization Name`,
          dataIndex: 'clientName',
          key: 'clientName',
        },
        {
          title: `Organization Code`,
          dataIndex: 'clientCode',
          key: 'clientCode',
        },
        {
          title: `Systems`,
          dataIndex: 'appResDTo',
          key: 'appResDTo',
          scopedSlots: { customRender: 'appResDTo' },
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
      OrganizationsServices.get()
        .then((response) => {
          this.dataSource = response.data
        })
        .finally(() => (this.loading = false))
    },

    remove(id) {
      this.loading = true
      OrganizationsServices.deleteClient(id).then((response)=>{
        this.fetch()
      }).catch(this.error).finally(this.loading = false)
    }, 
    removeOrg(id) {
      this.loading = true
      OrganizationsServices.deleteClientApp(id).then((response)=>{
        this.fetch()
      }).catch(this.error).finally(this.loading = false)
    }, 
  },
}
</script>
