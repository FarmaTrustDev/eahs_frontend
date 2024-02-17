<template>
    <div>
        <a-row> 
        <a-col :lg="{span:20}" :xl="{span:20}" :sm="{span:20}" :md="{span:20}" :xs="{span:20}">
          <a-form-item class="txBoxStyWhite"
            label="Add Question *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
          <div class="bg-grey ant-col ant-col-23 h-50" >
            <a-input 
              v-decorator="[
                'questionName',
                {
                  initialValue: entity.questionName,
                  rules: [
                    {
                      required: true,
                      message: 'Please enter a question',
                    }
                  ],
                },
              ]"
              class="ant-col ant-col-23"
              placeholder="Question"
            /> </div></a-form-item></a-col>
        </a-row>
        <a-row>
        <a-col :span="20">
          <a-form-item class="txAreaStyWhite mtm-20" 
            label="Add Question Description *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
          <div class="bg-grey ant-col ant-col-23" >
            <a-textarea
              v-decorator="[
                'questionDescription',
                {
                  initialValue: entity.questionDescription,
                  rules: [
                    {
                      required: true,
                      message: 'Please enter question description',
                    }
                  ],
                },
              ]"
              class="ant-col ant-col-23"
              placeholder="Question Description"
            /> </div></a-form-item
        ></a-col>
        </a-row>
        <a-row>
        <a-col :span="20" >
          <a-form-item class="mr-bt-m5 mtm-20"
            label=" Select Potential Risks *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
          </a-form-item>
          <div class="bg-grey ant-col ant-col-21 pt-10" >
          <a-form-item v-for="p_risk in potentialRisk" :key="p_risk.riskId" class="mb-1 ml-15" >
          <a-switch 
            v-decorator="[
              'risk'+p_risk.riskId,
              {
                rules: [],
              },
            ]"
            data-rowId="2"
            size="large"
            :checked="risks.includes(p_risk.riskId)"
            class="toggle_record"
            checked-children="Yes"
            un-checked-children="No"
            @change="(value) => handleCheck(value, p_risk.riskId,'risk')"
          />
          <span class="ml-5">{{ p_risk.riskName }}</span>
        </a-form-item>
      </div>
      <div v-if="isImptyRisk">
      <span class="ant-col ant-col-20 sel-validation" >Please select potential risk</span>
      </div>
        </a-col>
        </a-row>
        <a-row>
        <a-col :span="20">
          
          <a-form-item class="mr-bt-m5 mt-10"
            label=" Select Anesthetic *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
          </a-form-item>
          <div class="bg-grey ant-col ant-col-21 pt-10"  >
          <a-form-item v-for="anest in anesthtics" :key="anest.anestheticId" class="mb-1 ml-15">
            <a-switch 
            v-decorator="[
              'anst'+anest.anestheticId,
              {
                rules: [],
              },
            ]"
            data-rowId="2"
            size="large"
            class="toggle_record"
            :checked="anesth.includes(anest.anestheticId)"
            checked-children="Yes"
            un-checked-children="No"
            @change="(value) => handleCheck(value, anest.anestheticId,'anesthetic')"
          /><span class="ml-5">{{ anest.anestheticName }}</span>
        </a-form-item>
        </div>
        <div v-if="isImptyAnsth">
        <span class="ant-col ant-col-20 sel-validation" >Please select anesthetic</span>
        </div>
        </a-col>
        </a-row>
        <a-row  class="mt-15">
        <a-col :span="4" >
            <h3 style="margin-top: 5px;">Upload Question Document</h3>
        </a-col>
        <a-col :span="4">
            <!-- <a-button type="primary" class="hgtBtn"  @click="showModal(true)">Upload Document</a-button> -->
            <Upload
            :default-file-list="entity.questionDocumentImage"
            :extensions="allowedExtensions"
            @handleChange="handleChangeImage"
          />
            <!-- <a-button  class="hgtBtn" style="background-color: #3869d1;color:white"> <a-icon type="upload"  /> Upload Document </a-button> -->
            
        </a-col>
        </a-row>
      <div>
  </div>

    </div>
  </template>
  
  <script>
  import { _disabledFutureDate } from '~/services/Helpers/MomentHelpers'
  import { filterOption,isEmpty } from '~/services/Helpers'
  import AnestheticServices from '~/services/API/AnestheticServices'
  import RiskServices from '~/services/API/RiskServices'
  import nullHelper from '~/mixins/null-helpers'
  import Upload from '~/components/upload/profile'
  import { DOCUMENT_UPLOAD_EXTENSIONS } from '~/services/Constant'
  export default {
    components: { Upload },
    mixins: [nullHelper],
    props: {
      anesth: {
      type: Array,
      required: true
    },
    risks: {
      type: Array,
      required: true
    },
      isCreated: {
        type: Boolean,
        default: false,
      },
      isImptyRisk:{
        type:Boolean,
        default: false,
      },
      isImptyAnsth:{
        type:Boolean,
        default: false,
      },
      ticket: { 
        type: Object,
         default: () => ({}) 
        },
        partnerevent: { 
        type: Object,
         default: () => ({}) 
        },
        
      entity: {
        type: Object,
        default: () => ({}),
      },
      form: {
        type: Object,
        default: () => ({}),
      },
      
    },
    data() {
      
      return {
        visibleInv: false,
        visiblePar: false,
        entityId: null,
        loading: false,
        partners:[],
        investigators:[],
        countries: [],
        roles: [],
        fileList:[],
        fetchCountry: true,
        fetchRole: true,
        formLayout: 'vertical',
        anesthtics:[],
        potentialRisk:[],
        allowedExtensions:DOCUMENT_UPLOAD_EXTENSIONS
      }
    },
    computed: {
      
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    watch:{
      ticket(newValue, oldValue)
      {
        this.newValue = oldValue
      }
    },
    mounted() {
      this.fetchAllAnesthetics()
      this.fetchAllRisks()
    },
    methods: {
      fetchAllAnesthetics(params = {}) {
        AnestheticServices.get(params).then((response) => {
            this.anesthtics = response.data
          if(!isEmpty(params)){
            this.form.setFieldsValue({countryId:this.countries[0].id})
          }
        })
      },
      fetchAllRisks(params = {}) {
        RiskServices.get(params).then((response) => {
            this.potentialRisk = response.data
          if(!isEmpty(params)){
            this.form.setFieldsValue({countryId:this.countries[0].id})
          }
        })
      },
      
      handleCheck(value, rowId,isAorR) {
        this.handleChange(value,rowId,isAorR)
      },
      handleChange(info,id,AorR) {
        this.$emit('handleChange', info,id,AorR)
      },
      handleChangeImage(info) {
      this.fileList = info
      this.$emit('handleChangeImage', this.fileList)
    },
      // fetch(id) {
      //   this.loading = true
      //   this.apiService
      //     .getById(id)
      //     .then((response) => {
      //       this.userData = response.data
      //       this.fetchPartners({ Ids: [this.userData.countryId] })
      //     })
      //     .finally(() => (this.loading = false))
      // },    
      filterOption,
      disabledDate: _disabledFutureDate,
    //   onSubmitInvestigator(e) {
    //   this.loading = true
    //   e.preventDefault()
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       if (this.isCreated) {
    //         this.update(values)
    //       } else {
    //         this.create(values)
    //       }
    //     } else {
    //       this.loading = false
    //     }
    //   })
    // },
    // onSubmitPartner(e) {
    //   this.loading = true
    //   e.preventDefault()
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       if (this.isCreated) {
    //         this.update(values)
    //       } else {
    //         this.create(values)
    //       }
    //     } else {
    //       this.loading = false
    //     }
    //   })
    // }
    
    },
  }
  </script>
  <style>
  .required-label {
    display: inline-block;
    color: red;
    margin-right: 4px;
  }

  .ant-form-item-explain {
    color: red;
  }
</style>
  