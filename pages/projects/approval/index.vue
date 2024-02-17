<template>
    <page-layout
      :loading="false"
      title="Project Approval"
      :sub_title=userType
      class="specific container page-search-input-container"
      :create="false"
      :back="true"
    >
      <!-- <template slot="headerMenus">
       
        <a-input class="page-search-input" placeholder="Search Project" @keyup="fetchProjectBySearch">
          <a-icon slot="prefix"  type="search" />
        </a-input>
        
      </template> -->
      <div slot="content">
      
          <a-row >
              <a-col :span="11">
                <h2 class="ml-5">ID</h2>
                <div class="bg-grey h-45"><h3 class="mg-t-10  pt-10 pb-10">{{ projectData.projectId }}</h3></div>
              </a-col>
              <a-col :offset="1" :span="11">
                <h2 class="ml-5">Name</h2>
                <div class="bg-grey h-45"><h3 class="mg-t-10  pt-10 pb-10">{{ projectData.name }}</h3></div>
              </a-col>
          </a-row>
          <a-row  class="mt-15">
            <a-col :span="23">
              <h2 class="ml-5">Description</h2>
              <div class="bg-grey h-45"><h3 class="mg-t-10  pt-10 pb-10">{{ projectData.description }}</h3></div>
            </a-col>
          </a-row>
          <a-row :gutter="16" class="mt-15">
              <a-col :span="11">
                <h2 class="ml-5">Investigators</h2>
                <div class="bg-grey h-45"><h3 class="mg-t-10  pt-10 pb-10" v-for="inves in projectData.investigators " :key="inves.id">{{ inves.investigatorName }}</h3></div>
              </a-col>
              <a-col :offset="1" :span="11">
                <h2 class="ml-5">Created Date</h2>
                <div class="bg-grey h-45"><h3 class="mg-t-10  pt-10 pb-10">{{ _getFormatMoment(projectData.projectDate).format("DD/MM/YYYY") }}</h3></div>
              </a-col>
          </a-row>
        <!-- <div>
          <a-statistic title="ID" :value="112893" style="margin-right: 50px" />
            <a-statistic title="Name" :value="112893" style="margin-right: 50px" />
            <a-statistic title="Description" :precision="2" :value="112893" />
            <a-statistic title="Investigators" :precision="2" :value="112893" />
            <a-statistic title="Created Date" :value="112893" style="margin-right: 50px" />
        </div> -->
      
      <a-row class="mt-15">
            <a-col :offset="20" :span="2">
              <a-button type="primary" class="wd-11" :loading="buttonLoading" @click="submitProjectApproval(projectData.globalId,status.approved.name)">Approve </a-button>
            </a-col>
            <a-col  :offset="20" :span="2" class="mt-15">
              <a-button type="danger" class="wd-11" :loading="buttonLoading" @click="submitProjectApproval(projectData.globalId,status.reject.name)">Reject </a-button>
            </a-col>
          </a-row>
      </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import ProjectServices from '~/services/API/ProjectServices'
  import  { CONSENT_STATUSES } from '~/services/Constant/index'
  import { _getFormatMoment } from '~/services/Helpers/MomentHelpers'
  import  {  USER_ROLES } from '~/services/Constant/index' 
  export default {
    components: { PageLayout },
    mixins: [routeHelpers, notifications],
    data() {
      return {
        status:CONSENT_STATUSES,
        projectData:{
        },
        buttonLoading:false
      }
    },
    computed: {  
    },
    mounted() {
      const id = this.$route.query.projectId
      this.getById(id)
    },
    methods: {
      _getFormatMoment,
     getById(id)
     {
      ProjectServices.getById(id).then((response)=>{
        this.projectData = response.data
      })
     },
     submitProjectApproval(id,inpt)
     {
      this.buttonLoading=true
      ProjectServices.submitProjectApproval(id,inpt).then((response)=>{
        this.buttonLoading = false
        const data = JSON.parse(localStorage.getItem('vuex'))
            const userRole =data.auth.user.roleName
        if(userRole===USER_ROLES.manager_type.name)
            {
              this.goto('/projects/tabs')
            }  else {
        this.goto('/projects') }
      })
     }
    },
  }

  
  </script>
  