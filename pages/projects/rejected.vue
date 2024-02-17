<template>
    <page-layout
      :loading="false"
      :sub_title=userType
      class="specific container page-search-input-container"
      :create="false"
      :back="false"
      >
      <!-- title="Projects" -->
      <template slot="headerMenus">
        
        <a-input class="page-search-input mtminus-8 float-right" placeholder="Search Project" @keyup="fetchProjectBySearch">
          <a-icon slot="prefix"  type="search" />
        </a-input>
        <!-- <a-button type="primary" @click="goto('/consent/consentlist')">All Consents</a-button> -->
        <a-button v-if="!isManager" type="primary" @click="goto('/consent/create')">Add New Project</a-button>
      </template>
      <div slot="content">
        <div id="result"></div>
        <a-table
          :columns="columnsManager"
          :data-source="datasource"
          :loading="loading"
          class="rounded-table pt-10 users-list mtminus-4"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
        >
        <template slot="projectId" slot-scope="projectId">
        <span>
          <a @click="goto(`/consent/patient/${projectId.globalId}`)">{{
                  projectId.projectId
                }}</a>
        </span>
      </template>
      <template slot="projectName" slot-scope="projectName">
        <span>
          <a @click="goto(`/consent/patient/${projectName.globalId}`)">{{
                  projectName.name
                }}</a>
        </span>
      </template>
      <template slot="projectStatus" slot-scope="projectStatus">
        <span >
                <a :style="{'color': projectStatus.projectStatus === pending && userRole === roleUsers.manager_type.name ? 'red' : 'blue'}" @click="projectStatus.projectStatus === pending && userRole === roleUsers.manager_type.name ? goToApproval(projectStatus.globalId):''" >{{
                  projectStatus.projectStatus
                }}</a>
        </span>
      </template>
      <template slot="projectDate" slot-scope="data">
        {{  _getFormatMoment(data.projectDate).format("DD/MM/YYYY") }}
      </template>
        <template slot="investigator" slot-scope="investigator">
        
          <span v-for="ivestigator,index in investigator.investigators" :key="index+'inv'">
            {{"(" +ivestigator.investigatorName + ") "}}
          </span>
        </template>
        <template slot="createNewConsent" slot-scope="createNewConsent">
          <span>
            <a-tooltip title="Create Consent" placement="top">
            <a-icon type="plus-circle" :style="{color:'blue',fontSize: '15px'}" @click="goto('/consent/consentlist?id='+createNewConsent.globalId)"  />
          </a-tooltip> |
          <a-tooltip title="View Consent" placement="top">
            <a-icon type="eye" :style="{color:'blue',fontSize: '18px'}" @click="goto('/consent/consentlist?id='+createNewConsent.globalId)" />
          </a-tooltip>
            <!-- <a-button type="primary" class="wd-11" @click="goto('/consent/consentlist?id='+createNewConsent.globalId)">Create Consent</a-button> -->
          </span>
        </template>
        <template slot="createNewProcess" slot-scope="createNewProcess">
          <span>
            <a-tooltip title="Create Process" placement="top">
            <a-icon type="plus-circle" :style="{color:'blue',fontSize: '15px'}" @click="goto('/projects/newProcess?pId='+createNewProcess.globalId)" />
            </a-tooltip>
            | <a-tooltip title="View Process" :color="hoverColor" placement="top">
              <a-icon type="eye" :style="{color:'blue',fontSize: '18px'}" @click="goto('/projects/newProcess?pId='+createNewProcess.globalId)" />
            </a-tooltip>
            <!-- <a-button type="primary" class="wd-11" @click="goto('/projects/newProcess?pId='+createNewProcess.globalId)">Create Process</a-button> -->
          </span>
        </template>
        <template slot="processStatus"  slot-scope="processStatus">
          <span :style="{'color': processStatus.processStatus === pending ? 'red' : 'blue'}" >
            {{ processStatus.processStatus }}
          </span>
        </template>
        <template slot="projectConsent"  slot-scope="projectConsent">
        <div  v-if="isManager" class="mt-10">
          <span @click="fetchAllConsentByProId(projectConsent.globalId , projectConsent.projectStatus)">
            <h4 v-if="projectConsent.projectConsent.length===0">({{ projectConsent.projectConsent.length }}) </h4>
            <h4 v-else style="color: red;">({{ projectConsent.projectConsent.length }}) </h4>
           <!-- <a-button v-if="projectConsen.consentStatusName==='Pending'"  @click="goto('/consent/consentApproval?id='+projectConsen.consentGuid+'&pId='+projectConsent.id+'&pCSId='+projectConsen.consentStatusGuid)" :style="{ backgroundColor: projectConsen.color , color:'black' , height:'30px',border:'none' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button>
           <a-button v-else :style="{ backgroundColor: 'white' , color:'black' , height:'30px','border-color':'#f1f1f1' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button> -->
          </span>
        </div>
        <div v-if="isNurse || isResearcher || isLabAttendant">
          <span @click="fetchAllConsentByProId(projectConsent.globalId,projectConsent.projectStatus)"  >
            ({{ projectConsent.projectConsent.length }})
            <!-- <a-button v-if="projectConsen.consentStatusName==='Accepted'"   :style="{ backgroundColor: projectConsen.color , color:'white' , height:'30px',border:'none' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button>
           <a-button v-else @click="goto('/consent/editconsent?id='+projectConsen.consentGuid+'&pId='+projectConsent.globalId)"  :style="{ backgroundColor: projectConsen.color , color:'black' , height:'30px',border:'none' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button> -->
          </span>
        </div>
        </template>
        <!-- <template slot="projectConsent" v-if="isNurse" slot-scope="projectConsent">
          <span style="float: left;" v-for="projectConsen,index in projectConsent.projectConsent" :key="index+'pCo'">
           <div v-if="isNurse">
            <a-button v-if="projectConsen.consentStatusName==='Accepted'"   :style="{ backgroundColor: projectConsen.color , color:'white' , height:'30px',border:'none' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button>
           <a-button v-else @click="goto('/consent/editconsent?id='+projectConsen.consentGuid+'&pId='+projectConsent.globalId)"  :style="{ backgroundColor: projectConsen.color , color:'black' , height:'30px',border:'none' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button>
          </div>
          <div v-if="isManager">
            <a-button v-if="projectConsen.consentStatusName==='Pending'"  @click="goto('/consent/consentApproval?id='+projectConsen.consentGuid+'&pId='+projectConsent.id+'&pCSId='+projectConsen.consentStatusGuid)" :style="{ backgroundColor: projectConsen.color , color:'black' , height:'30px',border:'none' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button>
           <a-button v-else :style="{ backgroundColor: 'white' , color:'black' , height:'30px','border-color':'#f1f1f1' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button>
          </div>
          </span>
        </template> -->
          <template slot="action" slot-scope="action">
            <a-dropdown v-if="!isManager">
              <a-button class="action-button" @click="preventDefault">
                Admin <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="goto(`/consent/${action.globalId}`)">Edit</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <a-popconfirm
                    title="Are you sure you want to delete this project ?"
                    ok-text="Yes"
                    cancel-text="No"
                    placement="topLeft"
                    @confirm="destroy(`${action.globalId}`)"
                    >
                  <span>Delete</span>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        <a-modal class="bg-grey"
        :visible="modalConsentVisible"
        :width="600"
        :footer="null"
        @cancel="visibleConsentModal(false)"
        >
        <div>
        <h2>Consents:</h2>
        <div  v-for="consent in pendingConsent" :key="consent.id" >
          <a-row>
          <a-col :lg="{span:15}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
          <div class="pt-3"><h3>{{ consent.name }}</h3></div>
          </a-col>
          <a-col :lg="{span:4}" :md="{span:6}" :sm="{span:7}" :xs="{span:6}">
          <div v-if="(consent.consentStatusResponseDTO !=null?consent.consentStatusResponseDTO.name:incomplete) === accepted" class="ant-col ant-col-2" ><a-button class="editButton"  >View</a-button></div>
          <div v-else class="ant-col ant-col-2" ><a-button class="editButton" @click="goto('/consent/editconsent?id='+consent.globalId+'&pId='+consent.projectGuid)" >View</a-button></div>
        </a-col>
        <a-col :lg="{span:3}" :md="{span:6}" :sm="{span:7}" :xs="{span:6}">
          <div v-if="isManager === true && (!isEmpty(consent.consentStatusResponseDTO)?consent.consentStatusResponseDTO.name:incomplete) ===pending" class="ant-col ant-col-2" ><a-button class="approvedButton" :style="{'background-color':consent.consentStatusResponseDTO.color}" >{{ !isEmpty(consent.consentStatusResponseDTO) ?consent.consentStatusResponseDTO.name:incomplete}}</a-button></div>
          <div v-else class="ant-col ant-col-2" ><a-button v-if="consent.consentStatusResponseDTO" class="approvedButton" :style="{'background-color':consent.consentStatusResponseDTO.color}" >{{ !isEmpty(consent.consentStatusResponseDTO) ?consent.consentStatusResponseDTO.name:incomplete}}</a-button><a-button v-else class="approvedButton" :style="{'background-color':'blue','color':'white'}" >{{ !isEmpty(consent.consentStatusResponseDTO) ?consent.consentStatusResponseDTO.name:incomplete}}</a-button></div>
        </a-col>
        </a-row>
        </div>
      </div>
        </a-modal>
        <a-modal class="bg-grey"
        :visible="modalProcessVisible"
        :width="600"
        :footer="null"
        @cancel="visibleProcessModal(false)"
        >
        <div>
        <h2>Process:</h2>
        <div  v-for="process in pendingProcess" :key="process.processId" >
          <a-row>
          <a-col :lg="{span:15}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
          <div class="pt-3"><h3>{{ process.processName }}</h3></div>
          </a-col>
          <!-- <a-col :lg="{span:4}" :md="{span:6}" :sm="{span:7}" :xs="{span:6}">
          <div v-if="(consent.consentStatusResponseDTO !=null?consent.consentStatusResponseDTO.name:incomplete) === accepted" class="ant-col ant-col-2" ><a-button class="editButton"  >View</a-button></div>
          <div v-else class="ant-col ant-col-2" ><a-button class="editButton" @click="goto('/consent/editconsent?id='+consent.globalId+'&pId='+consent.projectGuid)" >View</a-button></div>
        </a-col> -->
        <a-col :lg="{span:3}" :md="{span:6}" :sm="{span:7}" :xs="{span:6}">
          <div  class="ant-col ant-col-2" ><a-tooltip title="Click for Approval" placement="top"><a-button class="approvedButton" :style="{'background-color':process.statusColor}" @click="goto('/projects/approval/processApproval?processId='+process.processGuid)"  >{{ process.statusName}}</a-button></a-tooltip></div>
          
        </a-col>
        </a-row>
        </div>
      </div>
        </a-modal>

        <ErrorModal :message="message" :isShow="visibleConfirm" @close-modal="visibleConfirm = false"></ErrorModal>
      </div>
    </page-layout>
  </template>
  <script>
  import ProjectServices from '~/services/API/ProjectServices'
  import ProcessServices from '~/services/API/ProcessServices'
  import ProjectConsentServices from '~/services/API/ProjectConsentServices'
  import notifications from '~/mixins/notifications'
  import { preventDefault,isEmpty } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import  { CONSENT_STATUSES, USER_ROLES } from '~/services/Constant/index' 
  import { _getFormatMoment } from '~/services/Helpers/MomentHelpers'
  import ErrorModal from '~/components/common/ErrorModal.vue'
  
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout , ErrorModal},
    mixins: [routeHelpers, notifications],
    data() {
      return {
        roleUsers:USER_ROLES,
        pending:CONSENT_STATUSES.pending.name,
        accepted:CONSENT_STATUSES.accept.name,
        incomplete:CONSENT_STATUSES.incomplete.name,
        rejected: CONSENT_STATUSES.reject.name,
        modalConsentVisible:false,
        message:'please first accept the project approval',
        visibleConfirm:false, 
        datasource: [],
        userRole:'',
        userType:'',
        isNurse:false,
        isManager:false,
        isResearcher:false,
        isLabAttendant:false,
        isPrincipleInvestigator:false,
        modalProcessVisible:false,
        hoverColor:'blue',
        pendingConsent:[],
        pendingProcess:[],
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
        approved: CONSENT_STATUSES.approved.name,
        columnsManager: [
          {
            title: 'Project ID',
            key: 'id',
            scopedSlots: { customRender: 'projectId' },
          },
          {
            title: 'Project Name',
            key: 'description',
            scopedSlots: { customRender: 'projectName' },
          },
          {
            title:'Date',
            key: 'projectDate',
            scopedSlots : {customRender: 'projectDate' },
          },
          {
            title: 'Principle Investigator',
            key: 'projectInvestigator',
            scopedSlots: { customRender: 'investigator' },
          },
          {
            title: 'Project Status',
            key: 'projectStatus',
            scopedSlots: { customRender: 'projectStatus' },
          },
          {
            title: 'Consent Status',
            key: 'projectConsent',
            scopedSlots: { customRender: 'projectConsent' },
          },
          {
            title: 'Process Status',
            key: 'processStatus',
            scopedSlots: { customRender: 'processStatus' },
          },
          // {
          //   title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          //   key: 'action',
          //   scopedSlots: { customRender: 'action' },
          // },
        ],
        loading: true,
        fullName: [],
        userId: '',
      }
    },
    computed: {  
    },
    mounted() {
      this.getProjects()
    },
    methods: {
      isEmpty,
      preventDefault,
      _getFormatMoment,
      fetch() {
        ProjectServices.get()
          .then((response) => {
            this.datasource = response.data
          }).catch(this.error)
          .finally(() => (this.loading = false))
      },
      fetchAdminProject() {
        ProjectServices.getAdminProject()
          .then((response) => {
            if(this.isManager){
              this.datasource = response.data.filter(x=>x.projectStatus === this.rejected || x.processStatus === this.rejected || x.isAnyConsentRejected === true )
            }else {this.datasource = response.data}
          }).catch(this.error)
          .finally(() => (this.loading = false))
      },
      fetchProjectOtherUser() {
        ProjectServices.fetchProjectOtherUser()
          .then((response) => {
            this.datasource = response.data
          }).catch(this.error)
          .finally(() => (this.loading = false))
      },
      
      goToApproval(id)
      {
        this.goto('/projects/approval?projectId='+id)
      },
      goToApprovalProcess(id)
      {
        this.goto('/projects/newProcess?pId='+id)
      },
      fetchProjectBySearch(event) {
        const inpt = event.target.value
        if(inpt === '')
        {
          this.fetchAdminProject()
        }
        else{
        ProjectServices.getProjectBySearch(inpt)
          .then((response) => {
            this.datasource = response.data
          }).catch(this.error)
          .finally(() => (this.loading = false))
        }
      },
      destroy(id){
        this.loading = true
        ProjectServices.destroy(id).then((response)=>{
          this.success(response.data)
          this.getProjects()
        }).catch(this.error).finally(this.loading = false)
      },
      visibleConsentModal(show) {
      this.modalConsentVisible = show
    },
    visibleProcessModal(show) {
      this.modalProcessVisible = show
    },
    fetchConsentPending(id)
    {
      this.visibleConsentModal(true)
      ProjectConsentServices.getPendingConsents(id).then((response)=>{
        this.pendingConsent=response.data
      })
    },
    fetchAllConsentByProId(id,isPApr)
    {
      
      this.visibleConsentModal(true)
      ProjectConsentServices.getAllConsentsByProId(id).then((response)=>{
        this.pendingConsent=response.data
      })
    },
    fetchAllProcessByProId(id , isPApr)
    {
      
      this.visibleProcessModal(true)
      ProcessServices.getAllProcess(id).then((response)=>{
        this.pendingProcess=response.data
      })
      
    },
    getProjects(){
      
        this.userType=USER_ROLES.manager_type.role
        this.isManager=true
        this.fetchAdminProject()
    }
    },
  }

  
  </script>
  