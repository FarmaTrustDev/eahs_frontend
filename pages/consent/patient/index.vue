<template>
    <page-layout
      :loading="false"
      title="Project Title"
      class="specific container page-search-input-container"
      :create="false"
    >
      <template slot="headerMenus">
        <!-- <h3 class="page-title ml-5 mb-1 float-left">
          {{ translation.UserNew_3_136 }}
        </h3> -->
        <a-input
          ref="userNameInput"
          class="page-search-input"
          :placeholder="translation.Searcuser_2_404"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
        <a-button type="primary" @click="goto('/consent/create')">Add New Project</a-button>
      </template>
      <div slot="content">
        <div>
            <h2>Description</h2>
            <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
        </div>
        <a-table
          :columns="columns"
          :data-source="dummyDataSource"
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
            <a @click="goto(`/patient/${projectId.globalId}`)">{{
                    projectId.id
                  }}</a>
          </span>
        </template>
        <template slot="projectName" slot-scope="projectName">
          <span>
            <a @click="goto(`/patient/${projectName.globalId}`)">{{
                    projectName.name
                  }}</a>
          </span>
        </template>
          <template slot="action" slot-scope="action">
            <a-dropdown>
              <a-button class="action-button" @click="preventDefault">
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="goto(`/consent/${action.id}`)">{{
                    translation.Edit_1_450
                  }}</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <!-- <a-popconfirm
                    :title="translation.Areyou_4_484"
                    :ok-text="translation.yes_1_654"
                    :cancel-text="translation.no_1_656"
                    placement="topLeft"
                    @confirm="deleteUser(`${action.globalId}`)"
                  >
                  </a-popconfirm> -->
                  <span>{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        <a-modal
          :visible="userDeleteModal"
          :footer="null"
          class="error-model"
        >
          <center>
            <p class="cross-img">
              <span class="inner-mark">
                <span class="line-left line"></span>
                <span class="line-right line"></span>
              </span>
            </p>
            <h3>Are you sure you want to delete this user ?</h3>
            <footer class="mt-6">
              <a-button
                class="ant-btn ant-btn-primary"
                style="padding: 5px 50px"
                >Confirm</a-button
              >
              <a-button
                class="ant-btn"
                style="padding: 5px 50px"
                type="danger"
              >
                Cancel
              </a-button>
            </footer>
          </center>
        </a-modal>
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
        dummyDataSource:[
          {
            id:'123-456',
            name:'Cancer Treatment',
            projectDate:'2023-03-01',
            projectInvestigator:'McGrath',
          },
          {
            id:'785-456',
            name:'Cell Treatment',
            projectDate:'2023-03-01',
            projectInvestigator:'McGill',
          },
        ],
        columns: [
          {
            title: 'Project ID',
            key: 'id',
            scopedSlots: { customRender: 'projectId' },
          },
          {
            title: 'Project Name',
            key: 'name',
            scopedSlots: { customRender: 'projectName' },
          },
          {
            title:'Date',
            dataIndex: 'projectDate',
            key: 'projectDate',
          },
          {
            title: 'Principle Investigator',
            dataIndex: 'projectInvestigator',
            key: 'projectInvestigator',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        userDeleteModal: false,
        loading: true,
        fullName: [],
        userId: '',
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
    mounted() {
      this.fetch()
    },
    methods: {
      preventDefault,
      userDeleteMethod() {
        this.deleteUser(this.userId)
        this.userDeleteModal = false
      },
      userDelete(e, record) {
        this.userId = record
        this.userDeleteModal = e
      },
      fetch() {
        // alert('hello')
        ProjectServices.get()
          .then((response) => {
            this.datasource = response.data
          })
          .finally(() => (this.loading = false))
      },
    },
  }
  </script>
  