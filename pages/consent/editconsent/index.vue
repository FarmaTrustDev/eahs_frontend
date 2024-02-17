<template>
    <page-layout
      :loading="false"
      title="Consent Form Details"
      class="specific container page-search-input-container"
      :create="false"
    >
      <div slot="content" class="mtminus-4">
        <a-row>
        <a-col class="ant-col ant-col-24 mt-40 ml-15 " >
           <h2 class="pt-10"><b>{{ consentName }}</b></h2>
        </a-col>
        </a-row>
        <div v-for="(quest,index) in question" :key="quest.id">
          <a-row>
        <a-col class="ant-col ant-col-24 mt-25 ml-15 " >
           <h3 class="pt-10"><b>{{ index + 1 }}. {{ quest.name }}</b></h3>
        </a-col>
        <a-col class="ant-col ant-col-18 mt-20 bg-grey mg-t-10 plr-10 pt-10 pb-10" >
            <p>{{ quest.description }}</p>
        </a-col>
        <a-col v-if="status !== approved " class="ant-col ant-col-2" >
          <div v-if="isAssigned==='false'">
            <a-button v-if="logedUser!==users.manager_type.name" class="removBackCol ml-50 " style="margin-top: 20px;" @click="deleteQuestion(quest.globalId)" >Remove
            </a-button>
          </div>
      </a-col>
        <a-col v-if="status !== approved" class="ant-col ant-col-24 mt-10" >
          <!-- <a-upload class="ant-col ant-col-12 uploadMed ml-20" :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
            <a-button class="uploadMed" >Upload Media</a-button>
          </a-upload> -->
          <div v-if="isAssigned==='false'"><a-button class="ant-col ant-col-12 uploadMed ml-20" v-if="logedUser!==users.manager_type.name" @click="goto('/consent/consentform/question?constId='+constId+'&questGId='+quest.globalId+'&pId='+pId)" >Edit Text</a-button></div>
        </a-col>
      </a-row>
      </div>
      <a-row>
      <a-col class="ant-col ant-col-24 mt-25 ml-15 " >
           <h3 class="pt-10"><b>e-Signature</b></h3>
      </a-col>
    </a-row>
    <a-row>
        <a-col class="ant-col ant-col-24 mt-25 ml-15 " >
           <h3 class="pt-10"><b>Date:</b></h3>
        </a-col>
      </a-row> 
        <a-row v-if="isAssigned==='false'">
          <div>
            <a-col v-if="status !== approved" :offset="14" >
              <a-button v-if="logedUser !== users.manager_type.name" type="primary" class="wd-13 ml-20" @click="goto('/consent/consentform/question?id=00000000-0000-0000-0000-000000000000&constId='+constId+'&isEdit=true&pId='+pId)">Add Question</a-button>
            </a-col>
            <a-col v-if="status !== approved" :offset="14" class="mt-10">
              <a-button v-if="logedUser!==users.manager_type.name" type="primary" class="wd-13 ml-20"  @click="sendEmailApproval()">Send For Review</a-button>
            </a-col>
          </div>
        </a-row>
      </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import ConsentService from '~/services/API/ConsentService'
  import ConsentQuestionServices from '~/services/API/ConsentQuestionServices'
  import  { CONSENT_STATUSES,USER_ROLES } from '~/services/Constant/index' 
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout },
    mixins: [routeHelpers, notifications],
    data() {
      return {
        consentName:'',
        question:[],
        fileList:[],
        image:new Array(5),
        count:0,
        status:'',
        isAssigned:'false',
        users:USER_ROLES,
        pending:CONSENT_STATUSES.pending.name,
        approved:CONSENT_STATUSES.approved.name,
        incomplete:CONSENT_STATUSES.incomplete.name,
        logedUser:'',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    },
    computed: {
     
    },
    mounted() {
      const data = JSON.parse(localStorage.getItem('vuex'))
      this.logedUser =data.auth.user.roleName
      this.constId = this.$route.query.id;
      this.pId = this.$route.query.pId;
      this.fetchByID(this.constId)

    },
    methods: {
      preventDefault,
      fetchByID(id){
        ConsentService.getById(id).then((response)=>{
            // this.status = response.data.consentStatusResponseDTO!==null?response.data.consentStatusResponseDTO.name:this.incomplete
            this.status = response.data.consentApprovalStatus
            this.consentName = response.data.consentName
            this.question = response.data.consentQuestion
            this.isAssigned = this.$route.query.isAssign;
           
          })
          .finally(() => (
            this.loading = false
          ))
      },
      deleteQuestion(id)
      {
        ConsentQuestionServices.destroy(id).then((response)=>{
            this.goto('/consent/editconsent?id='+this.constId)
            this.fetchByID(this.constId)
          })
          .finally(() => (
            this.loading = false
          ))

      },
      handleChange() {
        // 
      },  
      handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      // ConsentQuestionServices.uploadDocument(this.fileList).then((response)=>{
        
      // })
      console.log(this.fileList)
      return false;
    },
      sendEmailApproval()
      {
        ConsentService.sendEmailConsentApproval(this.constId,this.pId,this.pending).then((response)=>{
          this.goto('/projects')
          })
          .finally(() => (
            this.loading = false
          ))

      }
    },
  }
  </script>
<style scoped>
  .ant-tooltip-inner{
    display: none !important; 
  }
.ant-tooltip-placement-top, .ant-tooltip-placement-topLeft, .ant-tooltip-placement-topRight {
    padding-bottom: 8px;
    display: none !important;
}
.ant-tooltip .ant-tooltip-placement-top {
        display:none !important;
      }
    .no-tooltip .ant-tooltip-inner {
        display: none !important;
        position: relative;
    }
</style>