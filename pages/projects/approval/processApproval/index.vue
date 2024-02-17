<template>
    <page-layout
      :loading="loading"
      title="Process Approval"
      class="specific container page-search-input-container"
      :create="false"
      :back="false"
    >
      <div slot="content" class="mtm-70" >
        <div class="ant-col ant-col-24 mt-40 ml-15 " >
           <h2 class="pt-10"><b>{{ processData.name }}</b></h2>
        </div>
        <div v-for="(step , index) in processData.stepResponseDTO" :key="step.id">
        <!-- <div class="ant-col ant-col-24 mt-25 ml-15 " >
           <h3 class="pt-10"><b>{{ index + 1 }}. {{ step.name }}</b></h3>
        </div> -->
        <div class="ant-col ant-col-18 mt-20 bg-white mg-t-10 plr-10 pt-10 pb-10" >
            <h3 class="pt-10"><b>{{ index + 1 }}. {{ step.name }}</b></h3>
        </div>
        <div class="ant-col ant-col-2 ml-25">
          <a-switch
          
          class="mt-15 toggle_record"
          checked-children="Yes"
          un-checked-children="No"
          :value="index"
          />
          <!-- <a-switch
          :hidden="true"
          :v-model="selectedOptions[index]" 
          :value="index"
          /> -->
        </div>
        <!-- <div class="ant-col ant-col-24 mt-10">
            <a-upload  class="ant-col ant-col-12 uploadMed ml-20 " ><a-button class="uploadMed" >Upload Media</a-button></a-upload>
            <a-button class="ant-col ant-col-12 uploadMed ml-20" >Edit Text</a-button>
        </div> -->
      </div>
        <div class="ant-col ant-col-24 mt-25 ml-15 " >
           <h3 class="pt-10"><b>e-Signature</b></h3>
        </div>
        <div class="ant-col ant-col-24 mt-25 ml-15 " >
           <h3 class="pt-10"><b>Date:</b></h3>
        </div>
        <div class="ant-col ant-col-24 mt-15">
        <a-row>
            <a-col :offset="16">
              <a-button type="primary" class="wd-13 ml-20" :loading="btnLoading" >Accept</a-button>
            </a-col>
            <a-col :offset="16" class="mt-10">
              <a-button type="danger" class="wd-13 ml-20" :loading="btnLoading" >Reject</a-button>
            </a-col>
        </a-row>
        </div>
      </div>
    </page-layout>
</template>
<script>
import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import PageLayout from '~/components/layout/PageLayout'
import {CONSENT_STATUSES} from '~/services/Constant/index'
import ProcessServices from '~/services/API/ProcessServices'
export default{
  components: { PageLayout },
  mixins: [routeHelpers, notifications],
  data() {
    return {
      processData:[],
      count:0,
      btnLoading:false,
      loading:false,
      accept: CONSENT_STATUSES.accept.name,
      reject: CONSENT_STATUSES.reject.name,
    }
  },
  computed: {
  },
  mounted() {
    this.processId = this.$route.query.processId;
    this.fetchProcess(this.processId)
  },
  methods: {
    preventDefault,
    fetchProcess(id)
    {
        ProcessServices.getById(id).then((response)=>{
            this.processData = response.data
        })
    },
//     fetchByID(id){
//       const projectCPId = this.$route.query.projectCPId
//       this.loading = true
//       GeneralAuthServices.getById(id,projectCPId).then((response)=>{
//           if(response.response === "Session Expired")
//           {
//             this.goto(`/consent/consentConfirmation/thankYou?response=${response.response}`)
//           }
//           this.consentName = response.consentName
//           this.question = response.consentQuestion
//           this.selectedOptions = Array(this.question.length).fill(false)
//         })
//         this.loading= false
//     },
//     getOptionsStatus() {
//       const optionsStatus = [];
//       this.selectedOptions.forEach((value, index) => {
//         const option = { id: this.question[index].id, status: value };
//         optionsStatus.push(option);
//       });
//   return JSON.parse(JSON.stringify(optionsStatus));
//     },
//     patientConsentStatus(response)
//     {
//         this.btnLoading=true
//         const formData =  new FormData()
//         const patientId = this.$route.query.pId
//         const projectId = this.$route.query.id
//         const projectCPId = this.$route.query.projectCPId
//         formData.append('projectId',projectId)
//         formData.append('patientId',patientId)
//         formData.append('projectCPId',projectCPId)
//         formData.append('patientQuestionStatus', JSON.stringify(this.getOptionsStatus()))
//         formData.append('ProjectConsentStatus', response)
//         GeneralAuthServices.patientProjectConsentStatus(formData).then((response)=>{
//             this.goto(`/patient/consent`)
//         }) .catch(this.error).finally(this.btnLoading = false);
//     }
  },
}
</script>