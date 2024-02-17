<template >
    <page-layout
      :loading="false"
      title="Document Library"
      class="specific container page-search-input-container"
      :create="false"
      :back="false"
    >
      <template slot="headerMenus">
        <!-- <h3 class="page-title ml-5 mb-1 float-left">
          {{ translation.UserNew_3_136 }}
        </h3> -->
        <a-input
          ref="userNameInput" 
          class="page-search-input" style="margin-right: 455px;width:280px;height: 40px;border-radius: 20px;"
          placeholder="search document"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
        <!--<a-button type="primary" @click="goto('/consent/create')">Add New Project</a-button>-->
      </template>
      <div  slot="content">
        <div 
        v-if="isConsent"
        class="ant-col ant-col-18 mt-40" 
        >
          <a-empty >
            <span slot="description"> There is no <a>Consent Form</a> </span>
          </a-empty>
        </div>
        <div 
        v-for="consent in consentDummyData" 
        :key="consent.id" 
        class="ant-col ant-col-20 mt-15 consentClass" 
        >
          <a-row>
          <a-col :lg="{span:20}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
          <div class="pt-3 ml-15"><h3>{{ consent.name }}</h3></div>
          </a-col>
        <a-col :lg="{span:3}" :md="{span:6}" :sm="{span:7}" :xs="{span:6}">
          <div class="ant-col ant-col-2"><a-button class="approvedButton" >{{ consent.consentStatusResponseDTO  !==null ?consent.consentStatusResponseDTO.name:"Incomplete"}}</a-button></div>
        </a-col>
        </a-row>
        </div>
      <div>
    
  </div>

    </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import ProjectConsentService from '~/services/API/ProjectConsentServices'

  
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout },
    mixins: [routeHelpers, notifications],
    props:{
      entity: { 
        type: Object,
         default: () => ({}) 
        }
    },
    data() {
      return {
        isProject:false,
        isCreateCheck:false,
        visibleConfirm:false,
        isConsent:false,
        consentIds:[],
        consentDummyData:[],
        userDeleteModal: false,
        loading: true,
        fullName: [],
        isExist:false,
        userId: '',
        consentList:[]
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
      this.projectId = this.$route.query.id;
      this.getProjectConsent() 
    },
    methods: {
      preventDefault,
      getProjectConsent() {
        // alert('hello')
        ProjectConsentService.gAPCDataByPID(this.projectId)
          .then((response) => {
            this.consentDummyData = response.data
          })
          .finally(() => (this.loading = false))
      },
    },
  }
  </script>
  