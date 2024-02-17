<template>
    <div>
      <a-row>
        <a-col :offset="22">
          <a-button type="primary" class="mr-10 btn-back" @click="goBack()">Back</a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="23">
          <a-form-item
            label="Template Ttile:*"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 23 }"
          >
            <a-input
             v-model="entity.title"
              placeholder="Template Ttile"
              :disabled="true"
            /> </a-form-item
        ></a-col>
        <a-col :span="23">
          <a-form-item
            label="Description:*"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 23 }"
          >
            <a-input
              v-model="entity.description"
              :disabled="true"
              placeholder="Description"
            /> 
          </a-form-item>
        </a-col>
        <a-col :span="24">
            <div v-for="label in entity.labelsResponseDTO" :key="label.id">
                <div class="ant-col ant-col-11 mt-10 mb-10 consentClass">
            <a-row>
              <a-col :lg="{span:4}" :md="{span:2}" :sm="{span:2}" :xs="{span:2}">
                <div  class="ml-10" >
                  <a-switch class="mt4 toggle_record"   
                        v-decorator="[
                        label.key,
                        {
                            initialValue: label.checked,
                            valuePropName: 'checked',
                        },
                        ]"
                        data-rowId="1"
                        size="large"
                        checked-children="Yes"
                        un-checked-children="No"
                        default-checked
                        :disabled="true"
                       
                    />
                </div>
              </a-col>
              <a-col :lg="{span:15}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
                <div class="pt-3"><h3>{{ label.value }}</h3></div>
              </a-col>
            </a-row>
          </div>
         </div>
        </a-col>
       </a-row>
       <a-row class="mt-10" v-if="!viewOnly">
            <a-col :offset="20">
              <a-button type="primary" class="wd-13" @click="eSignature(approve)" :loading="btnLoading">Approve</a-button>
            </a-col>
            <a-col :offset="20" class="mt-10">
              <a-button type="danger" class="wd-13" @click="reasonModal(reject, true)" :loading="btnLoading">Reject</a-button>
            </a-col>
        </a-row>
        <a-modal
          :visible="visibleReason"
          title="Reject Reason"
          class="support-add-modal"
          :dialog-style="{ top: '20px' }"
          :loading="loading"
          :footer="null"
          :width="600"
          @cancel="reasonModal('',false)"
        >
        <a-form :form="form" @submit="onSubmitReason">
          <a-row>
            <a-col :span="24" class="bg-grey">
              <a-form-item
                label="Reason"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 24 }"
                class="ml-10 mr-10"
              >
                <a-input
                  v-decorator="[
                    'reason',
                    {
                     
                      rules: [
                        {
                          required: true,
                          message: 'Please input your reason',
                        },
                      ],
                    },
                  ]"
                  style="background-color: white"
                  placeholder="Reason"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4" :offset="20">
              <a-form-item>
                <FormActionButton :loading="loading" custom-text="Submit" class="mt-40" />
                <!-- @click="showStep(false)" -->
              </a-form-item>
            </a-col>
            <a-col :span="4"></a-col>
          </a-row>
        </a-form>
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
  </template>
  
  <script>
  import TemplateServices from '~/services/API/TemplateServices'
  import { CONSENT_STATUSES } from '~/services/Constant'
  import routeHelpers from '~/mixins/route-helpers'
  import Signature from '~/components/signature'
  export default {
    components: { Signature},
    mixins: [routeHelpers],
    data() {
      return {
        entity:[],
        visibleReason: false,
        pending: CONSENT_STATUSES.pending.name,
        approve: CONSENT_STATUSES.approved.name,
        reject: CONSENT_STATUSES.reject.name,
        loading: false,
        btnLoading: false,
        visibleSignature : false,
        tempData:{},
        form: this.$form.createForm(this, { name: 'form' }),
        templateId: 0,
        status: '',
        viewOnly: false
      }
    },
    mounted() {
      // this.getCountries()
      const id = this.$route.query.id
      const view = this.$route.query.view
      this.viewOnly = view
      this.templateId = id
      this.getById(id)
    },
   
    computed:{
    //   translation() {
    //     return this.$store.getters.getTranslation
    //   },
    },
    methods: {
    onSubmitReason(e) {    
        e.preventDefault()
        this.form.validateFields((err, values) => {
            if (!err) {
              this.tempData = values
              this.visibleSignature = true
            }
        })
    },
    reasonModal(status, show) {
      if(show){
        this.visibleReason = show
        this.status = status
      } else { 
        this.visibleReason = show
        this.status = ''
      }
    },
    upsert(values)
    {
      this.loading = true
              const formData = new FormData()
              formData.append('status',this.status)
              formData.append('globalId',this.templateId)
              formData.append('reason',values.reason)
              TemplateServices.approval(formData).then((response)=>{
                // this.fetchShelf()
                this.goto('/administration/labels/tabs')
                this.reasonModal('','',false)
              }).catch(this.error).finally(this.loading = false)
    },
    eSignature(stats)
    {
      this.status = stats
      this.visibleSignature = true
    },
    
    accepted(status){
      this.loading = true
      const formData = new FormData()
      formData.append('status',status)
      formData.append('globalId',this.templateId)
      TemplateServices.approval(formData).then((response)=>{
        // this.fetchShelf()
        this.goto('/administration/labels?view=true')
      }).catch(this.error).finally(this.loading=false)
    },  
      getById(id){
        TemplateServices.getById(id).then((response)=>{
            this.entity = response.data
        })
      }, 
      handleOk() {
      this.handleSignatureCancel()
      },
      handleSignatureOk() {
      this.visibleSignature = false
      if(this.status === this.reject){
        this.upsert(this.tempData)
      }
      else{
        this.accepted(this.status)
      }
      },
      handleSignatureCancel(){
        this.visibleSignature = false
        this.loading = false
      },

    },
  }
  </script>
  