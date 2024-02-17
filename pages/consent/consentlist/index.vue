<template >
    <page-layout
      :loading="loading"
      title="Document Library"
      class="specific container page-search-input-container"
      :create="false"
      :back="true" 
    >
      <template slot="headerMenus">
        <a-input 
          ref="userNameInput" 
          class="page-search-input " 
          style="margin-right: 455px;width:280px;height: 40px;border-radius: 20px;"
          placeholder="search document"
          @keyup="fetchBySearch"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
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
          <a-col :lg="{span:2}" :md="{span:2}" :sm="{span:2}" :xs="{span:2}">
            <div  class="ml-10" >
              <a-switch 
              v-if="!isProject"  
                    v-decorator="[
                    'con'+consent.id,
                    {
                        rules: [],
                        valuePropName: 'checked',
                    },
                    ]"
                    class="mt4 toggle_record"   
                    data-rowId="2"
                    size="large"
                    :checked="consentList.includes(consent.id)"
                    checked-children="Yes"
                    un-checked-children="No"
                    @change="(value) => handleCheck(value, consent.id,consent.consentApprovalStatus)"
                />
            </div>
          </a-col>
          <a-col :lg="{span:15}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
          <div class="pt-3"><h3>{{ consent.name }}</h3></div>
          </a-col>
          <a-col :lg="{span:3}" :md="{span:6}" :sm="{span:7}" :xs="{span:6}">
          <div class="ant-col ant-col-3"><a-button class="editButton" @click="goto('/consent/editconsent?id='+consent.globalId+'&pId='+consent.projectGuid+'&isAssign='+isAssigneToPatient)">View</a-button></div>
        </a-col>
        <a-col :lg="{span:3}" :md="{span:6}" :sm="{span:7}" :xs="{span:6}">
          <div class="ant-col ant-col-2"><a-button class="approvedButton" >{{ !isEmpty(consent.consentApprovalStatus) ?consent.consentApprovalStatus:incomplete}}</a-button></div>
        </a-col>
        </a-row>
        </div>
        <div v-if="!isProject" class="ant-col ant-col-24 mt-15">
        <a-row>
            <a-col :lg="{offset:15}" :xl="{offset:16}" :sm="{offset:10}" :md="{offset:12}" :xs="{offset:8}" >
              <a-button 
              v-if="!isConsent" 
              type="primary" 
              class="wd-13 ml-20" 
              @click="addProject()">Add to Project</a-button>
            </a-col>
            <a-col :lg="{offset:15}" :xl="{offset:16}" :sm="{offset:10}" :md="{offset:12}" :xs="{offset:8}" class="mt-10">
              <a-button 
              type="primary" 
              class="wd-13 ml-20" @click="createNewForm(projectId,constId)"
              >Create New Form</a-button>
            </a-col>
        </a-row>
      </div>
      <div>
    
  </div>
  <!-- <a-modal
    :visible="visibleConfirm"
    :footer="null"
    class="error-model"
    centered
    @cancel="closeConfirmModal(false)"
    >
    <center>
      <p class="cross-img">
          <span class="inner-mark">
            <span class="line-left line"></span>
            <span class="line-right line"></span>
          </span>
        </p> 
      <h3 class="mt-5">Please Select Consent Form</h3>
        <a-button class="ant-btn ant-btn-primary error-ok-btn mt-5" type="primary" @click="closeConfirmModal(false)">Ok</a-button>
    </center>
    </a-modal> -->

    <a-modal 
      :visible="visibleSignature"
      :footer="null"
      class="error-model"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
    <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>

    <ErrorModal :message="message" :isShow="visibleConfirm" @close-modal="visibleConfirm = false"></ErrorModal>

    <ErrorModal :message="messageAssign"  :isShow="showErrorModal" @close-modal="showErrorModal = false"></ErrorModal>
    <ErrorModal :message="messageIncompleteStatus"  :isShow="incompStatus" @close-modal="incompStatus = false"></ErrorModal>
    </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { preventDefault,isEmpty } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import ConsentService from '~/services/API/ConsentService'
  import ProjectConsentService from '~/services/API/ProjectConsentServices'
  import  { CONSENT_STATUSES } from '~/services/Constant/index' 
  import ErrorModal from '~/components/common/ErrorModal.vue'
  import Signature from '~/components/signature'
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout, ErrorModal ,Signature},
    mixins: [routeHelpers, notifications],
    props:{
      entity: { 
        type: Object,
         default: () => ({}) 
        }
    },
    data() {
      return {
        incomplete:CONSENT_STATUSES.incomplete.name,
        isProject:false,
        isAssigneToPatient:false,
        isCreateCheck:false,
        visibleConfirm:false,
        visibleSignature : false,
        message:"If you don't want to create a new consent form, please select at least one from the given list.",
        messageAssign:"These Project Consent has been sent to patient it can not be changed",
        messageIncompleteStatus:'This consent is incomplete, please first complete this if you want to add.',
        isConsent:false,
        consentIds:[],
        isDefExist:false,
        consentDummyData:[],
        loading: true,
        fullName: [],
        showErrorModal:false,
        isExist:false,
        incompStatus:false,
        projectConsentListDat:[],
        projectId:'00000000-0000-0000-0000-000000000000',
        constId:'00000000-0000-0000-0000-000000000000',
        consentList:[]
      }
    },
    computed: {
      // ...mapGetters(['getUser']),
      
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {
      this.projectId = this.$route.query.id;
      if(this.projectId === undefined)
      {
        this.isProject=true
      }
      this.fetch() 
      
    },
    methods: {
      preventDefault,
      isEmpty,
      fetch() {
        
        ConsentService.getConsentWithProjectStatus(this.projectId)
          .then((response) => {
            this.consentDummyData = response.data
            if(this.consentDummyData.length === 0)
            {
              this.isConsent=true
            }
            else{
              this.isAssigneToPatient = this.consentDummyData[0].isAssigneToPatient
            }
            this.GetProjectConsent()
          })
          .finally(() => (this.loading = false))
      },
      fetchBySearch(event) {
        const name= event.target.value
        if(name ==='')
        {
          this.isConsent=false
          this.fetch()
        }
        else{
        ConsentService.getBySearch(name,this.projectId)
          .then((response) => {
            this.consentDummyData = response.data
            if(this.consentDummyData.length === 0)
            {
              this.isConsent=true
            }
          })
          .finally(() => (this.loading = false))
      }},
      createNewForm(projId,consId)
      {
        if(this.isAssigneToPatient !== true)
        {
              const data = JSON.parse(JSON.stringify({ consentId: this.consentList,projectGUId:this.projectId }))
              if(this.isExist === true)
              {
                
                ProjectConsentService.update(data)
                .then((response) => {
                  // this.callMethod()
                  this.success(response.message)
                  this.goto('/consent/consentform?id='+projId+'&constId='+consId)
                })
                .catch(this.error)
              }
              else if(this.consentList.length!==0){
               
                  ProjectConsentService.create(data)
                      .then((response) => {
                        this.success(response.message)
                        this.goto('/consent/consentform?id='+projId+'&constId='+consId)
                      })
                      .catch(this.error)
                }
                else{
                  
                  this.goto('/consent/consentform?id='+projId+'&constId='+consId)
                }
            }
            else{
              this.showErrorModal=this.isAssigneToPatient
            }
      },
      handleCheck(isCheck,id,status)
      {
        if(status===null)
        {
          this.incompStatus=true
        }
        else{
        this.isCreateCheck=true
        this.pushListArray(isCheck,id)
        }
      }
      ,

    handleSignatureOk() {
      this.visibleSignature = false
      this.Create()
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    handleOk() {
      this.handleSignatureCancel()
    },
      pushListArray(valu, rowId) {
        const a=this.consentList.includes(rowId)
        if(a === false)
        {
          if(valu === true)
          {
            this.consentList.push(rowId)
          }
        }
        else if(valu === false){
          
          this.consentList.splice(this.consentList.indexOf(rowId),1)
        }
        // const set1 = new Set(this.consentList);
        // const set2 = new Set(this.projectConsentListDat);
        // const difference = new Set([...set1,...set2].filter(item => !(set1.has(item) && set2.has(item))))
        // if([...difference].length > 0)
        // {
        //   this.isDefExist = true
        // }
        // else{
        //   this.isDefExist = false
        // }
        // console.log( this.projectConsentListDat.filter((element) => !this.consentList.includes(element)));
    },

    addProject()
    {
      this.visibleSignature = true
    },

    Create()
    {
      if(this.isAssigneToPatient !== true)
      {
          const data = JSON.parse(JSON.stringify({ consentId: this.consentList,projectGUId:this.projectId }))
          if(data.consentId.length===0)
          {
            this.visibleConfirm=true
          }
          else if(this.isExist === true)
          {
            this.Update(data)
          }
          else{
          ProjectConsentService.create(data)
              .then((response) => {
                // this.success(response.message)
                this.goto('/projects')
              })
              .catch(this.error)
            }
      }  
      else
      {
      
        this.showErrorModal = this.isAssigneToPatient
      }
    },
    GetProjectConsent()
    {
      ProjectConsentService.gAPCIdsByPID(this.projectId).then((response)=>{
        this.projectConsentListDat = response.data.result
        this.consentList=response.data.result.slice()
        if(this.consentList.length !== 0)
        {
          this.isExist=true
        }
      })
    },
    Update(value)
    {
      ProjectConsentService.update(value)
          .then((response) => {
            // this.callMethod()
            this.success(response.message)
            this.goto('/projects')
          })
          .catch(this.error)
    },
    // callMethod() {
    //   this.$root.$emit('updateConsent')
    // },
    // closeConfirmModal(action)
    // {
    //   this.visibleConfirm = action
    // }
    },
  }
  </script>
  