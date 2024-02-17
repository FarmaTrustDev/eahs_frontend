<template>
    <page-layout
      :create="false"
      :loading="false"
      :bordered="false"
      :back="false"
      class="specific container page-search-input-container"
      >
      <!-- title="Lab List" -->
      <template slot="headerMenus">
        <a-input
          ref="userNameInput"
          class="page-search-input mtminus-7 float-right"
          :placeholder="translation.SearcLab_2_561"
          
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </template>
      <div slot="content">
        <template slot="content">
        <h3 class="page-title float-left">
              {{ translation.LabList_2_551 }}
            </h3>
  
        </template>
        <a-table
          :columns="columns"
          :data-source="dataSource"
          :loading="loading"
          class="rounded-table mtminus-3"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
        >
        <template slot="createNewSites" slot-scope="createNewSites">
          <span>
            <a-tooltip title="View Site" placement="top">
            <a-icon type="eye" :style="{color:'blue',fontSize: '15px'}" @click="goto('/administration/sites/newSite?lId='+createNewSites.globalId+'&viewOnly='+true)" />
            </a-tooltip>
          </span>
        </template>
        </a-table>
      </div>
    </page-layout>
  </template>
  <script>
  import LabServices from '~/services/API/LabServices'
  // import { success } from '~/services/Helpers/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  // import PageLayout from '~/components/layout/PageLayout'
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
            title: `Lab`,
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `Address`,
            dataIndex: 'address',
            key: 'address',
          },
          {
            title: `Lab Manager`,
            dataIndex: 'headName',
            key: 'headName',
          },
          {
            title: `City`,
            dataIndex: 'city',
            key: 'city',
          },
          {
            title: `Country`,
            dataIndex: 'countryName',
            key: 'country',
          },
          {
            title: `Email Address`,
            key: 'email',
            dataIndex: 'email',
          },
          {
            title: 'Status',
            key: 'status',
            dataIndex: 'status'
          },
          {
          title: `View Sites`,
          key: 'createNewSites',
          scopedSlots: { customRender: 'createNewSites' },
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
    //   translation(newValues, oldValue) {
    //     if (newValues !== oldValue) {
    //       this.columns[0].title = newValues.Lab_1_566
    //       this.columns[1].title = newValues.Addre_1_559
    //       this.columns[2].title = newValues.Headof_3_549
    //       this.columns[3].title = newValues.City_1_446
    //       this.columns[4].title = newValues.Count_1_49
    //       this.columns[5].title = newValues.EmailAddre_2_140
    //       this.columns[7].title = newValues.Actio_1_220
    //     }
    //   },
    },
    mounted() {
      this.fetch()
    //   this.getTranslationData()
    },
    methods: {
    //   getTranslationData() {
    //     this.columns[0].title = this.translation.Lab_1_566
    //     this.columns[1].title = this.translation.Addre_1_559
    //     this.columns[2].title = this.translation.Headof_3_549
    //     this.columns[3].title = this.translation.City_1_446
    //     this.columns[4].title = this.translation.Count_1_49
    //     this.columns[5].title = this.translation.EmailAddre_2_140
    //     this.columns[7].title = this.translation.Actio_1_220
    //   },
      preventDefault,
      fetch() {
        LabServices.getAccepted()
          .then((response) => {
            this.dataSource = response.data
          })
          .finally(() => (this.loading = false))
      },
    //   remove(id) {
    //     this.loading = true
    //     LabServices.remove(id).then((response)=>{
    //       this.fetch()
    //     }).catch(this.error).finally(this.loading = false)
    //   },
      searchLab(){
        console.log('hello')
      }
    },
  }
  </script>
  