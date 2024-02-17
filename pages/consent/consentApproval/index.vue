<template>
    <page-layout
      :loading="loading"
      :title="projectName"
      class="specific container page-search-input-container"
      :create="false"
      :back="false"
    >
      <div slot="content" class="mtm-70">
        <div class="ant-col ant-col-24 mt-40 ml-15 " >
           <h2 class="pt-10"><b>{{ consentName }}</b></h2>
        </div >
        <div v-for="(quest,index) in question" :key="quest.id">
          
        <div class="ant-col ant-col-24 mt-25 ml-15 " >
           <h3 class="pt-10"><b>{{ index + 1 }}. {{ quest.name }}</b></h3>
        </div>
        <div class="ant-col ant-col-18 mt-20 bg-grey mg-t-10 plr-10 pt-10 pb-10" >
            <p>{{ quest.description }}</p>
        </div> 
      </div>
      <div class="ant-col ant-col-24 mt-25 ml-15 " >
           <h3 class="pt-10"><b>e-Signature</b></h3>
      </div>
        <div class="ant-col ant-col-24 mt-25 ml-15 " >
           <h3 class="pt-10"><b>Date: </b>{{ moment(consentDate).format('MM/DD/YYYY') }}</h3>
        </div>
        <a-col v-if="isConsent==='Pending'" :span="10"><span class="ml-15">This is for Consent Approval</span>
          <a-switch  
          v-decorator="[
            'isBaseConsent',
                    {
                      rules: [],
                        valuePropName: 'checked',
                    },
                  ]"
                    class="mt4 ml-15 toggle_record" 
                    data-rowId="2"
                    size="large"
                    checked-children="Yes"
                    un-checked-children="No"
                    @change="(value) => handleCheckC(value)"
                /></a-col>
                  <a-col v-if="consentApproval" :span="10">
                    <span class="ml-15">This is for Project Consent Approval</span>
                    <a-switch 
                    v-decorator="[
                      'isProjectConsent',
                      {
                        rules: [],
                        valuePropName: 'checked',
                      },
                    ]"
                    class="mt4 ml-15 toggle_record"   
                    data-rowId="2"
                    size="large"
                    checked-children="Yes"
                    un-checked-children="No"
                    @change="(value) => handleCheckPC(value)"
                /></a-col>
        <div class="ant-col ant-col-24 mt-15">
        <a-row>
            <a-col :offset="14" class="mt-10" >
              <a-button type="primary" class="wd-13 ml-20" :btn-loading="btnLoading" @click="eSignature()">Submit</a-button>
            </a-col>
            <!-- <a-col :offset="14" class="mt-10">
              <a-button type="primary" class="wd-13 ml-20" :btnLoading="btnLoading" @click="SubmitApproval('Rejected')">Reject</a-button>
            </a-col> -->
        </a-row>
      </div>
      <a-modal
      :visible="visibleConfirm"
      :footer="null"
      centered
      @cancel="closeConfirmModal(false)"
      >
      <center> <h2 class="mt-5">Submitted Successfully</h2>
      </center>
      </a-modal>
      <a-modal 
      :visible="visibleSignature"
      :footer="null"
      class="error-model"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
    <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>
      </div>
    </page-layout>
  </template>
  <script>
  import moment from 'moment'
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import ConsentService from '~/services/API/ConsentService'
  import  { CONSENT_STATUSES } from '~/services/Constant/index'
  import  {  USER_ROLES } from '~/services/Constant/index'
  import Signature from '~/components/signature' 
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout,Signature },
    mixins: [routeHelpers, notifications],
    // middleware: "no-auth",
    // layout:"noAuth",
    data() {
      return {
        moment,
        visibleConfirm:false,
        approve: CONSENT_STATUSES.approved.name,
        reject: CONSENT_STATUSES.reject.name,
        consentApproval:false,
        projectName:'',
        consentDate:'',
        visibleSignature : false,
        consentName:'123-456.ConsentForm_Template_2022',
        question:[],
        image:new Array(5),
        count:0,
        btnLoading:false,
        loading:false,
        isExist:false,
        pcSId:0,
        isConsent:'',
        isConsentSel:true,
        isProConsentSel:true,
        consentSta:'Rejected',
        proConsentSta:'Rejected'
      }
    },
    computed: {
     
    },
    mounted() {
      this.constId = this.$route.query.id;
      this.pcSId = this.$route.query.pCSId;
      this.pId = this.$route.query.pId;
      this.fetchByID(this.constId,this.pcSId)
    },
    methods: {
      preventDefault,
      fetchByID(id,psId){
        ConsentService.getByIdS(id,psId,this.pId).then((response)=>{
          if(response.data.isSend===true)
          {
            this.goto('/consent/consentConfirmation/thankYou?response=You have already Responsed.')
          }
          else{
            this.consentName = response.data.consentName
            this.projectName = response.data.projectName
            this.question = response.data.consentQuestion
            this.isConsent = response.data.consentApprovalStatus
            this.consentDate = response.data.consentDate
            if(this.isConsent !== 'Pending')
            {
              this.consentApproval = true
              this.consentSta = 'Submitted'
              this.isConsentSel = false
            }
          }
          })
          .finally(() => (
            this.loading = false
          )).catch(this.error)
      },

      eSignature()
      {
        this.visibleSignature = true
      },
      handleSignatureOk() {
      this.visibleSignature = false
      this.SubmitApproval()
      },
      handleSignatureCancel(){
        this.visibleSignature = false
        this.loading = false
      },
      handleOk() {
      this.handleSignatureCancel()
    },

      SubmitApproval()
      {
        const formData=new FormData()
        formData.append('consentGuid', this.constId)
        formData.append('projectId', this.pId)
        formData.append('isConsent', this.isConsentSel)
        formData.append('isProConsent', this.isProConsentSel)
        formData.append('consentStatus', this.consentSta)
        formData.append('projectConsentStatus', this.proConsentSta)
        ConsentService.submitConsentApproval(formData).then((response)=>{
          // this.callMethod()
           this.visibleConfirm=true
           this.loading=true
           this.btnLoading=true
           const data = JSON.parse(localStorage.getItem('vuex'))
            const userRole =data.auth.user.roleName
            if(userRole===USER_ROLES.manager_type.name)
            {
              this.goto('/projects/tabs')
            }  else {
                this.goto('/projects')
            }
          })
      },
      handleCheckC(val){
        this.isConsentSel=val
        if(this.isConsentSel===true)
        {
          this.consentApproval = true
          this.consentSta = this.approve
        }
        else{
          this.consentApproval = false
          this.consentSta = this.reject
        }
      },
    //   callMethod() {
    //   this.$root.$emit('updateConsent')
    // },
      handleCheckPC(val){
        this.isProConsentSel=val
        if(this.isProConsentSel===true)
        {
          this.proConsentSta = this.approve
        }
        else{
          this.proConsentSta = this.reject
        }
      },
      closeConfirmModal(action)
    {
      this.visibleConfirm = action
    }
    },
  }
  </script>
  