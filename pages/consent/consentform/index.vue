<template>
    <page-layout
      :loading="false"
      title="Create New Form"
      class="specific container page-search-input-container"
      :create="false"
    >
      <div slot="content" >
        <a-form :form="form"  @submit="onSubmit" >
        <div class="bg-grey bd-r-5">
          <a-row class="Pt-10 ml-10 ">
            <a-row>
            <a-col :span="12">
              <a-form-item
                label="Study Name *:"
                :label-col="{ span: 24 }"
                :wrapper-col="{ span: 23 }"
              >
                <a-input 
                id="name"
                ref="consntNameText"
                  v-decorator="[
                    'name',
                    {
                      initialValue: entity.name,
                      rules: [
                        {
                          required: true,
                          message: 'Please input your study name',
                        },
                        {
                          message: 'Please enter a valid study name'
                        }
                      ],
                    },
                  ]"
                style="background-color: white;"
                placeholder="Study Name"
                :disabled="isReadOnly"
                @blur="chkExistConsent"

                /><div v-if="isExist" class="txt-red">Consent Already Exist</div> </a-form-item>
                
              </a-col>
            <a-col :span="12">
              <a-form-item
                label="Project Description *:"
                :label-col="{ span: 24 }"
                :wrapper-col="{ span: 23 }"
              >
                <a-input 
                id="description"
                  v-decorator="[
                    'description',
                    {
                      initialValue: entity.description,
                      rules: [
                        {
                          required: true,
                          message: 'Please input your project description',
                        },
                        {
                          message: 'Please enter a valid description'
                        }
                      ],
                    },
                  ]"
                style="background-color: white;"
                  placeholder="Project Description"
                  :disabled="isReadOnly"
                /> </a-form-item
            >
          </a-col>
            </a-row>
          </a-row>
    </div>
    <div class="ant-col ant-col-24"  >
      <div v-for="(conset,index) in consentData.consentQuestion" :key="conset.id">
      <div class="ant-col ant-col-24 mt-25 ml-15 " >
           <h3 class="pt-10"><b>{{ index + 1 }}. {{ conset.name }}</b></h3>
        </div>
        <div class="ant-col ant-col-24 mt-20 bg-grey mg-t-10 plr-10 pt-10 pb-10 ml-m3" >
            <p>{{conset.description}}
            </p>
            <div class="ant-col ant-col-6">
              <h3 class="pt-10"><b>Risks:</b></h3>
              <h4 v-for="ris in conset.risk" :key="ris.id">{{ ris.name }}</h4>
            </div>
            <div class="ant-col ant-col-6">
              <h3 class="pt-10"><b>Anesthetics:</b></h3>
              <h4 v-for="ans in conset.anesthetic" :key="ans.id">{{ ans.name }}</h4>
            </div>
        </div>
        </div>
      </div>
      <div class="topClass">
        <a-row>
          <a-col :lg="{offset:20,span:2}" :xl="{offset:20,span:2}" :sm="{offset:14,span:2}" :md="{offset:17,span:2}" :xs="{offset:8,span:2}" :offset="20" :span="2">
            <a-form-item class="wd-11">
            <FormActionButton :loading="btnLoading" class="topClass wd-11 consent-button"
            custom-text="Add Question" 
          />
        </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row class="topClass">
          <a-col :lg="{offset:20,span:2}" :xl="{offset:20,span:2}" :sm="{offset:14,span:2}" :md="{offset:17,span:2}" :xs="{offset:8,span:2}" :offset="20" :span="2">
            <a-button type="primary"  class="wd-11" v-if="!isEmpty(consentData)" @click="goto('/consent')" >Preview</a-button>
          </a-col>
        </a-row> -->
        <a-row>
          <a-col :lg="{offset:20,span:2}" :xl="{offset:20,span:2}" :sm="{offset:14,span:2}" :md="{offset:17,span:2}" :xs="{offset:8,span:2}" :offset="20" :span="2" class="topClass">
            <a-button 
            v-if="!isEmpty(consentData)" 
            type="primary" 
            class="wd-11" 
            @click="closeConfirmModal(true)">
            Export
          </a-button>
          </a-col>
          </a-row>
      </div>
      <div>
  </div>
        </a-form>

      <a-modal 
      :visible="visibleSignature"
      :footer="null"
      class="error-model"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
    <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>

    <a-modal
    :visible="visibleConfirm"
    :footer="null"
    centered
    @cancel="closeConfirmModal(false)"
    >
    <center> <h2 class="mt-5">How would you like to export the form?</h2>
    <a-button :loading="btnLoading" class="ant-btn ant-btn-primary error-ok-btn mt-5" type="primary" @click="eSignature()">Send Consent</a-button>
    <a-button class="ant-btn ant-btn-primary error-ok-btn mt-5" type="primary" @click="exporting()">Download</a-button></center>
    </a-modal>
</div>
    </page-layout>
  </template>
  <script>
  import ConsentService from '~/services/API/ConsentService'
  import notifications from '~/mixins/notifications'
  import { preventDefault,isEmpty } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import  { CONSENT_STATUSES } from '~/services/Constant/index'
  import Signature from '~/components/signature'
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout,Signature },
    mixins: [routeHelpers, notifications],
    props:{
      
    },
    data() {
      return {
        entity: { 
        type: Object,
         default: () => ({}) 
        },
        isReadOnly:false,
        isExist:false,
        btnLoading:false,
        visibleConfirm:false,
        visible:true,
        visibleSignature : false,
        pending:CONSENT_STATUSES.pending.name,
        loading: true,
        fullName: [],
        form: this.$form.createForm(this, {
          name: 'consentFormCreate',
        }),
        projectId:'00000000-0000-0000-0000-000000000000',
        consentData:'',
        constId:'',
      
      }
    },
    computed: {
      // ...mapGetters(['getUser']),
     
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {
      // this.fetch()
      this.constId = this.$route.query.constId;
      if(this.constId!=='00000000-0000-0000-0000-000000000000')
      {
      this.fetchByID(this.constId)
      }
      this.projectId = this.$route.query.id;
    },
    methods: {
      isEmpty,
      preventDefault,
      upsert(values) {
        const formData = new FormData()

          for (const key in values) {
            formData.append(key, values[key])
          }
          formData.append('projectGUID',this.projectId)
          formData.append('consentGUID',this.constId)
        return this.create(formData)
      },
      onSubmit(e) {
        this.btnLoading = true
        this.loading = true
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.upsert(values)
          } else {
            this.loading = false
            this.btnLoading = false
          }
        })
        // this.loading = false
      },
      create(values) {
        ConsentService
          .create(values)
          .then((response) => {
            this.success(response.message)
            this.btnLoading = false
            this.goto('/consent/consentform/question?pId='+this.projectId+'&constId='+ response.data.globalId)
          })
          .catch(this.error)
          .finally(() => {
            this.btnLoading = false
            this.loading = false
          })
      },
      fetchByID(id){
        ConsentService.getById(id).then((response)=>{
            this.consentData = response.data
            this.entity.name = response.data.consentName
            this.isReadOnly = true
            this.entity.description = response.data.consentDescription
          })
          .finally(() => (
            this.loading = false
          ))
      },
      submitConsent(){
        this.isReadOnly = false
        this.btnLoading=true
        this.closeConfirmModal(false)
        ConsentService.submitConsentForm(this.constId,this.pending).then((response)=>{
          this.success(response.message)
          this.btnLoading=false
          this.goto('/projects/newProcess?pId='+this.projectId)
        })
        .finally(()=>{
          this.loading = false
        })
      },

      handleSignatureOk() {
      this.visibleSignature = false
      this.submitConsent()
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    handleOk() {
      this.handleSignatureCancel()
    },

    eSignature()
    {
      this.visibleSignature = true
    },

      fetch() {
        // alert('hello')
        ConsentService.get()
          .then((response) => {
            this.datasource = response.data
          })
          .finally(() => (this.loading = false))
      },
      exporting() {
        // alert('hello')
        this.closeConfirmModal(false)
        ConsentService.exports(this.constId,this.pending)
          .then(response => {
          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'exampleExport.pdf');
          document.body.appendChild(link);
          link.click();
          this.goto('/projects')
        })
          .finally(() => (this.loading = false))
      },
      closeConfirmModal(action)
      {
        this.visibleConfirm = action
      },
      chkExistConsent(event)
      {
        this.isExist=false
        const name= event.target.value
        ConsentService.checkExistConsent(name).then((response)=>{
          if(response.data.name !== "")
          {
            this.isExist=true
            this.$refs.consntNameText.focus();
          }
        })
      }
    },
  }
  </script>
  
  