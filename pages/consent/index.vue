<template>
  <page-layout
    :loading="false"
    title="Projects"
    :sub-title=userType
    class="specific container page-search-input-container"
    :create="false"
    :back="false"
  >
    <template slot="headerMenus">

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
          <a @click="goto(`/consent/patient/${projectId.globalId}`)">{{
                  projectId.projectId
                }}</a>
        </span>
      </template>
      <template slot="projectName" slot-scope="projectName">
        <span>
          <a @click="goto(`/consent/patient/${projectName.globalId}`)">{{
                  projectName.description
                }}</a>
        </span>
      </template>
      <template slot="investigator" slot-scope="investigator">
      
        <span v-for="ivestigator,index in investigator.investigators" :key="index+'inv'">
          {{ivestigator.investigatorName + " "}}
        </span>
      </template>
      <template slot="createNewConsent" slot-scope="createNewConsent">
        <span>
          <a-icon type="plus-circle" 
          :style="{color:'blue',fontSize: '20px'}" 
          @click="goto('/consent/consentlist?id='+createNewConsent.globalId)" 
          />
          <!-- <a-button type="primary" class="wd-11" @click="goto('/consent/consentlist?id='+createNewConsent.globalId)">Create Consent</a-button> -->
        </span>
      </template>
      
      <template slot="projectConsent"  slot-scope="projectConsent">
      <div  v-if="isAdmin">
        <span @click="fetchAllConsentByProId(projectConsent.globalId)">
          ({{ projectConsent.projectConsent.length }}) 
         <!-- <a-button v-if="projectConsen.consentStatusName==='Pending'"  @click="goto('/consent/consentApproval?id='+projectConsen.consentGuid+'&pId='+projectConsent.id+'&pCSId='+projectConsen.consentStatusGuid)" :style="{ backgroundColor: projectConsen.color , color:'black' , height:'30px',border:'none' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button>
         <a-button v-else :style="{ backgroundColor: 'white' , color:'black' , height:'30px','border-color':'#f1f1f1' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button> -->
        </span>
      </div>
      <div v-if="isNurse || isResearcher || isLabAttendant">
        <span @click="fetchAllConsentByProId(projectConsent.globalId)"  >
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
        <div v-if="isAdmin">
          <a-button v-if="projectConsen.consentStatusName==='Pending'"  @click="goto('/consent/consentApproval?id='+projectConsen.consentGuid+'&pId='+projectConsent.id+'&pCSId='+projectConsen.consentStatusGuid)" :style="{ backgroundColor: projectConsen.color , color:'black' , height:'30px',border:'none' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button>
         <a-button v-else :style="{ backgroundColor: 'white' , color:'black' , height:'30px','border-color':'#f1f1f1' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button>
        </div>
        </span>
      </template> -->
        <template slot="action" slot-scope="action">
          <a-dropdown>
            <a-button class="action-button" @click="preventDefault">
              Admin <a-icon type="down" />
            </a-button>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a @click="goto(`/consent/${action.globalId}`)">Edit</a>
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
                <span>Delete</span>
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
      <a-modal class="bg-grey"
      :visible="modalConsentVisible"
      :loading="modalLoading"
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
        <div 
        v-if="(!isEmpty(consent.consentStatusResponseDTO)?consent.consentStatusResponseDTO.name:'Incomplete') ==='Accepted'"
        class="ant-col ant-col-2" 
        >
        <a-button class="editButton" >Edit</a-button></div>
        <div 
        v-else
        class="ant-col ant-col-2" 
        ><a-button class="editButton" @click="goto('/consent/editconsent?id='+consent.globalId+'&pId='+consent.projectGuid)" >Edit</a-button></div>
      </a-col>
      <a-col :lg="{span:3}" :md="{span:6}" :sm="{span:7}" :xs="{span:6}">
        <div 
        v-if="isAdmin === true && (!isEmpty(consent.consentStatusResponseDTO)?consent.consentStatusResponseDTO.name:'Incomplete') ==='Pending'"
        class="ant-col ant-col-2" 
        ><a-button 
        class="approvedButton" 
        :style="{'background-color':consent.consentStatusResponseDTO.color}" 
        @click="goto('/consent/consentApproval?id='+consent.globalId+'&pId='+consent.projectId+'&pCSId='+consent.consentStatusResponseDTO.consentStatusGlobalId)" 
        >{{ !isEmpty(consent.consentStatusResponseDTO) ?consent.consentStatusResponseDTO.name:"Incomplete"}}</a-button></div>
        <div 
        v-else
        class="ant-col ant-col-2" 
        ><a-button 
        v-if="consent.consentStatusResponseDTO" 
        class="approvedButton" 
        :style="{'background-color':consent.consentStatusResponseDTO.color}" 
        >
        {{ !isEmpty(consent.consentStatusResponseDTO) ?consent.consentStatusResponseDTO.name:"Incomplete"}}</a-button>
        <a-button 
        v-else 
        class="approvedButton" 
        :style="{'background-color':'blue','color':'white'}" >{{ !isEmpty(consent.consentStatusResponseDTO) ?consent.consentStatusResponseDTO.name:"Incomplete"}}</a-button></div>
      </a-col>
      </a-row>
      </div>
    </div>
      </a-modal>
    </div>
  </page-layout>
</template>
<script>
import ProjectServices from '~/services/API/ProjectServices'
import ProjectConsentServices from '~/services/API/ProjectConsentServices'
import notifications from '~/mixins/notifications'
import { preventDefault,isEmpty } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import PageLayout from '~/components/layout/PageLayout'

// import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { PageLayout },
  mixins: [routeHelpers, notifications],
  data() {
    return {
      modalConsentVisible:false,
      datasource: [],
      userRole:'',
      userType:'',
      modalLoading: false,
      isNurse:false,
      isAdmin:false,
      isResearcher:false,
      isLabAttendant:false,
      pendingConsent:[],
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
          key: 'description',
          scopedSlots: { customRender: 'projectName' },
        },
        {
          title:'Date',
          dataIndex: 'projectDate',
          key: 'projectDate',
        },
        {
          title: 'Principle Investigator',
          key: 'projectInvestigator',
          scopedSlots: { customRender: 'investigator' },
        },
        {
          title: 'Consent Status',
          key: 'projectConsent',
          scopedSlots: { customRender: 'projectConsent' },
        },
        {
          title: 'Create Consent',
          key: 'createNewConsent',
          scopedSlots: { customRender: 'createNewConsent' },
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
  },
  mounted() {
    
    const data = JSON.parse(localStorage.getItem('vuex'))
    this.userRole =data.auth.user.roleName
    if(this.userRole==='ADMIN_TYPE')
    {
      this.userType='Admin'
      this.isAdmin=true
      this.fetchAdminProject()
    }
    if(this.userRole==='NURSE_TYPE')
    {
      this.userType='Nurse'
      this.isNurse=true
      this.fetch()
    }
    if(this.userRole==='RESEARCHER_TYPE')
    {
      this.userType='Researcher'
      this.isResearcher=true
      this.fetch()
    }
    if(this.userRole==='LAB_ATTENDANT_TYPE')
    {
      this.userType='Lab Attendant'
      this.isLabAttendant=true
      this.fetch()
    }

  },
  methods: {
    isEmpty,
    preventDefault,
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
          this.datasource = response.data
        }).catch(this.error)
        .finally(() => (this.loading = false))
    },
    visibleConsentModal(show) {
    this.modalConsentVisible = show
  },
  fetchConsentPending(id)
  {
    this.visibleConsentModal(true)
    ProjectConsentServices.getPendingConsents(id).then((response)=>{
      this.pendingConsent=response.data
    })
  },
  fetchAllConsentByProId(id)
  {
    this.visibleConsentModal(true)
    ProjectConsentServices.getAllConsentsByProId(id).then((response)=>{
      this.pendingConsent=response.data
    })
  }
  },
}
</script>
