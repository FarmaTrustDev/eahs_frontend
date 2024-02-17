<template>
    <page-layout
      :loading="false"
      title="Projects/Studies"
      sub-title="Partner"
      class="specific container page-search-input-container"
      :create="false"
      :back="false"
    >
      <template slot="headerMenus">
       
        <!-- <a-input
          ref="userNameInput"
          class="page-search-input"
          placeholder="Search Project"
        >
          <a-icon slot="prefix" type="search" />
        </a-input> -->
       </template>
      <div slot="content">
        <a-table
          :columns="columns"
          :data-source="datasource"
          :loading="loading"
          class="rounded-table pt-10 users-list"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
        >
        <template slot="projectId" slot-scope="projectId">
          <span>
            <a @click="goto('/consent/consents?id='+projectId.gloablId)">{{
                    projectId.projectId
                  }}</a>
          </span>
        </template>
        </a-table>
        
      </div>
    </page-layout>
  </template>
  <script>
  import ProjectServices from '~/services/API/ProjectServices'
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout },
    mixins: [routeHelpers, notifications],
    data() {
      return {
        datasource: [],
        dummyDataSource:[],
        columns: [
          {
            title: 'Project ID',
            key: 'projectId',
            scopedSlots: { customRender: 'projectId' },
          },
          {
            title: 'Project Description',
            key: 'description',
            dataIndex:'description',
          },
          {
            title:'Date',
            dataIndex: 'projectDate',
            key: 'projectDate',
          }
        ],
        userDeleteModal: false,
        loading: true,
        fullName: [],
        userId: '',
      }
    },
    computed: {
      // ...mapGetters(['getUser']),  
    },
    mounted() {
      this.fetch()
    },
    methods: {
      preventDefault,
      fetch() {
        // alert('hello')
        ProjectServices.getAllPartnerProject()
          .then((response) => {
            this.datasource = response.data
          })
          .finally(() => (this.loading = false))
      },
    },
  }
  </script>
  