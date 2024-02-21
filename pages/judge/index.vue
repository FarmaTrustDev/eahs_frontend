<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Judges List"
    class="specific container page-search-input-container"
  >
    <template slot="headerMenus">
      <!-- <a-input
        ref="userNameInput"
        class="page-search-input"
        :placeholder="translation.SearcLab_2_561"
        
      >
        <a-icon slot="prefix" type="search" />
      </a-input> -->
      <a-button type="primary" class="" @click="showModal(true)">Configure Rule</a-button>
      <a-button type="primary" class="" @click="goto('/judge/create')">Add Judge</a-button>
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
        <template slot="isMember" slot-scope="isMember">
          <a-icon v-if="isMember.isMember===true" type="check"  class="txt-green" />
          <a-icon v-else type="close"  class="txt-red" />
        </template>
        <template slot="isConflict" slot-scope="isConflict">
          <a-icon v-if="isConflict.isConflict===true" type="check"  class="txt-green" />
          <a-icon v-else type="close"  class="txt-red" />
        </template>
        <template slot="action" slot-scope="action">
          <a-dropdown>
            <a-button class="action-button" @click="preventDefault">
              Admin <a-icon type="down" />
            </a-button>
            <a-menu slot="overlay">
              <a-menu-item key="labDetail">
                <a @click="goto(`/judge/${action.globalId}`)">Edit</a>
              </a-menu-item>
              <a-menu-item v-if="action.deletedBy===1" key="labDisable">
                <a-popconfirm
                title="Are you sure to enable?"
                ok-text="Yes"
                cancel-text="No"
                placement="topLeft"
                @confirm="enable(`${action.globalId}`)"
                >
                Enable
              </a-popconfirm>
                
              </a-menu-item>
              <a-menu-item v-else key="labDisable">
                <a-popconfirm
                title="Are you sure to disable?"
                ok-text="Yes"
                cancel-text="No"
                placement="topLeft"
                @confirm="disable(`${action.globalId}`)"
                >
                Disable
              </a-popconfirm>
                
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
import JudgeServices from '~/services/API/JudgeServices'
import RuleServices from '~/services/API/RuleServices'
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
          title: `Judge Name`,
          dataIndex: 'judgeName',
          key: 'judgeName',
        },
        {
          title: `Country Name`,
          dataIndex: 'countryName',
          key: 'countryName',
        },
        {
          title: `Has Conflict of Interest`,
          key: 'isConflict',
          scopedSlots: { customRender: 'isConflict' }
          
        },
        {
          title: `Is Eahs Member`,
          key: 'isMember ',
          scopedSlots: { customRender: 'isMember' }
          
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
     this.getRules()
  },
  methods: {
    
    preventDefault,
    fetch() {
      JudgeServices.get()
        .then((response) => {
          this.dataSource = response.data
        })
        .finally(() => (this.loading = false))
    },

    remove(id) {
      this.loading = true
      JudgeServices.remove(id).then((response)=>{
        this.fetch()
      }).catch(this.error).finally(this.loading = false)
    },
    disable(id) {
      this.loading = true
      JudgeServices.disable(id).then((response)=>{
        this.fetch()
      }).catch(this.error).finally(this.loading = false)
    },
    enable(id) {
      this.loading = true
      JudgeServices.enable(id).then((response)=>{
        this.fetch()
      }).catch(this.error).finally(this.loading = false)
    },
    showModal(e){

      this.visibleModal = e
    },
    searchLab(){
      console.log('hello')
    },
    getRules(){
      RuleServices.get()
        .then((response) => {
          this.ruleData = response.data
        })
        .finally(() => (this.loading = false))
    },
    pushListArray( newValue,id) {
      // Create a new array with the updated object
      this.ruleData = this.ruleData.map(item => (item.id === id ? { ...item, isIncluded: newValue } : item));
      console.log(this.ruleData)
    },
    submitRule()
    {
      RuleServices.put(this.ruleData).then((response)=>{
        this.visibleModal = false
      })
    }
    
  },
}
</script>
