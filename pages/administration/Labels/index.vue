<template>
  <!-- <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :back="false"
    class="specific container page-search-input-container"
    > -->
    <a-card :loading="loading" :bordered="null" class="plain-header-border">
    <!-- title="Template List" -->
    <a-row>
      <a-col :span="16" v-if="!approval">
        <span  class="page-title">Template List</span>
      </a-col>
      <a-col v-if="approval">
        <a-input     
          ref="userNameInput"
          class="page-search-input  mtminus-4 float-right"
          placeholder="Search Template"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </a-col>
      <a-col :span="4" v-else>
        <a-input
          ref="userNameInput"
          class="page-search-input wd-100"
          placeholder="Search Template"
        >
        <a-icon slot="prefix" type="search" />
        </a-input>
      </a-col>
      <a-col :span="4" v-if="!approval">
        <a-button  type="primary" class="" @click="goto('labels/create')">Add Template</a-button>
      </a-col>
    </a-row>
    <div >
      <!-- <template slot="content"> -->
      <!-- <h3 class="page-title float-left">
            {{ translation.LabList_2_551 }}
          </h3> -->

      <!-- </template> -->
      <a-table
        :columns="columns"
        :data-source="dataSource"
        class="rounded-table mtminus-3"
        :pagination="{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50', '100'],
        }"
      >
        <template  slot="action" slot-scope="action">
          <a-dropdown v-if="!approval" :disabled="action.status === approved">
            <a-button class="action-button" @click="preventDefault">
              {{ translation['Admin_1_142'] }} <a-icon type="down" />
            </a-button>
            <a-menu slot="overlay">
              <a-menu-item key="labDetail">
                <a @click="goto(`/administration/labels/${action.globalId}`)">{{
                  translation.Edit_1_450
                }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <span v-if="approval" class="color-blue" @click="goto(`/administration/labels/approval?id=${action.globalId}`)">View Detail</span>
        </template>
      </a-table>
    </div>
  </a-card>
  <!-- </page-layout> -->
</template>
<script>
import TemplateServices from '~/services/API/TemplateServices'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import { CONSENT_STATUSES } from '~/services/Constant'
// import PageLayout from '~/components/layout/PageLayout'
// import {isEmpty} from '~/services/Helpers'
// import PageLayout from '~/components/layout/PageLayout'
export default {
  components: {
    // PageLayout,
  },
  props:{
    approval:{type : Boolean, default: false}
  },
  mixins: [routeHelpers],
  data() {
    return {
      dataSource:[],
      columns: [
        {
          title: `Title`,
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: `Description`,
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: `Status`,
          key:  `status`,
          dataIndex: `status`
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      loading: true,
      fullName: [],
      approved: CONSENT_STATUSES.approved.name
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch: {
    translation(newValues, oldValue) {
      if (newValues !== oldValue) {
        // this.columns[2].title = newValues.Actio_1_220
      }
    },
  },
  mounted() {
    // this.fetch()
    this.getTranslationData()
    if(this.approval){
      this.getPending()
    } else {this.fetch()}
    
  },
  methods: {
    getTranslationData() {
      // this.columns[2].title = this.translation.Actio_1_220
    },
    preventDefault,
    fetch() {
      TemplateServices.fetchTemplates()
        .then((response) => {
          this.dataSource = response.data
        })
        .finally(() => (this.loading = false))
    }, 
    getPending(){
      TemplateServices.getPending().then((response)=>{
        this.dataSource = response.data
      }).finally(() => (this.loading = false))
    },
    searchLab(){
      console.log('hello')
    }
  },
}
</script>
