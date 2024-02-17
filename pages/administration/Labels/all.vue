<template>
    <page-layout
      :create="false"
      :loading="loading"
      :bordered="false"
      :back="false"
      class="specific container page-search-input-container"
    >
    <span slot="title" class="page-title">Template List</span>
      <template slot="headerMenus">
        <!-- <a-col :offset="19"> -->
                  <a-input
                    ref="userNameInput"
                    class="page-search-input mt-m7 float-right"
                    placeholder="Search Template"
                  >
                    <a-icon slot="prefix" type="search" />
                  </a-input>
                  <!-- <a-button v-if="!approval" type="primary" class="" @click="goto('labels/create')">Add Template</a-button> -->
                <!-- </a-col> -->
        <!-- <a-button v-if="!approval" type="primary" class="" @click="goto('labels/create')">Add Template</a-button> -->
      </template>
      <template slot="content">
        
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
              <template slot="action" slot-scope="action">
                <a-dropdown v-if="!approval">
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
                <span v-if="approval" class="color-blue" @click="goto(`/administration/labels/approval?id=${action.globalId}&view=true`)">View Detail</span>
              </template>
            </a-table>
          
      </template>
      
    </page-layout>
  </template>
  <script>
  import TemplateServices from '~/services/API/TemplateServices'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  // import {isEmpty} from '~/services/Helpers'
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: {
      PageLayout,
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
        this.getAll()
      
    },
    methods: {
      getTranslationData() {
        // this.columns[2].title = this.translation.Actio_1_220
      },
      preventDefault,
      getAll(){
        TemplateServices.fetchTemplates().then((response)=>{
          this.dataSource = response.data
        }).finally(() => (this.loading = false))
      },
      searchLab(){
        console.log('hello')
      }
    },
  }
  </script>
  