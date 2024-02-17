<template>
    <page-layout
      :loading="false"
      title="Send Notice"
      class="specific container page-search-input-container"
      :create="false"
    > 
      
      <div slot="content">
        <div class="ant-col ant-col-24 bg-grey" >
            <h4 class="mlo-10 mt-t-20">Dear {{ name }},</h4>
            <h4 class="mlo-10 mt-t-50">We are returning sample ({{ sampleNumber }}) to you for the following reason ({{ reason }}).Please see shipping documents attached.</h4>
            <h4 class="mlo-10 mt-t-50">Best wishes,</h4>
            <h4 class="mlo-10">{{authorizePerson}}</h4>
            <h4 class="mlo-10">{{ authorizeEmail }}</h4>
        </div>

        <a-col :lg="{offset:20,span:4}" :xl="{offset:20,span:4}" :sm="{offset:8,span:6}" :md="{offset:10,span:4}" :xs="{offset:8,span:4}">
            <!-- <a-button type="primary" class="ht mt-t-20" @click="onBookCourier(true)"  >Upload Document</a-button> -->
            <a-upload
            name="file"
            :before-upload="beforeUpload"
            :remove="handleRemove"
            :file-list="fileList"
            >
            <!-- action="https://www.mocky.io/v2/5cc8019d300000980a055e76" -->
            <!-- :headers="headers" -->
            <a-button  class="ht mt-t-20 ml-30" style="background-color: #3869d1;color:white">  Upload Document </a-button>
            </a-upload>
        </a-col>
        <a-col :span="4" :offset="20">
            <a-button type="primary" class="ht mt-t-20 ml-30" @click="sendNotice()">Send Notice</a-button>
        </a-col>
      </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import SampleReturnServices from '~/services/API/SampleReturnServices'
  import OrganizationServices from '~/services/API/OrganizationServices'
  import ShipmentServices from '~/services/API/ShipmentServices'
  import { DOCUMENT_UPLOAD_EXTENSIONS } from '~/services/Constant'
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout},
    mixins: [routeHelpers, notifications],
    props:{
        entity: {
        type: Object,
        default: () => ({}),
      },
      events: {
        type: Object,
        default: () => ({}),
      }
    },
    data() {
      return {
        name:'',
        sampleNumber: '',
        reason: '',
        authorizePerson: '',
        authorizeEmail: '',
        isShow:false,
        reasons:[],
        visible:false,
        orgEmail:'',
        orgId:0,
        formCourier: this.$form.createForm(this, {
          name: 'courierCreate',
        }),
        allowedExtension: DOCUMENT_UPLOAD_EXTENSIONS,
        fileList: []
      }
    },
    computed: {
     
    },
    mounted() {
      this.sampleReturnId = this.$route.query.id;
      this.orgId = this.$route.query.oId;
      this.getSampleReturn()
      this.getOrganization(this.orgId)
    },
    methods: {
      preventDefault,
      showModal(show) {
      this.visible = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    onSubmitCourier(e) {
      this.loading = true
      e.preventDefault()
      this.formCourier.validateFields((err, values) => {
        if (!err) {
          if (this.isCreated) {
            this.update(values)
          } else {
            this.create(values)
          }
        } else {
          this.loading = false
        }
      })
    },
    beforeUpload(info)
    {
      const strName = info.name
      const ext = strName.split('.').pop()
      const isAllowedExtension = this.allowedExtension.includes('.' + ext)
      // extension upload the file @todo work in progess
      if (!isAllowedExtension) {
        this.$message.error('Please upload docx or pdf file')
        this.fileList = []
        return true
      }
      else{
        if(this.fileList.length !== 0){
          this.fileList = []
        }
        this.fileList = [info];
        console.log(this.fileList)
      }
    },
    handleRemove() {
      this.fileList = [];
    },
    getSampleReturn()
    {
      SampleReturnServices.srgetById(this.sampleReturnId).then((Response)=>{
        this.reason=Response.data.reasonName
        this.sampleNumber = Response.data.puid
        const data = JSON.parse(localStorage.getItem('vuex'))
        this.authorizePerson=data.auth.user.name
        this.authorizeEmail=data.auth.user.email
      })
    },
    getOrganization(id)
    {
      OrganizationServices.getById(id).then((response)=>{
        this.name = response.data.name
        this.orgEmail=response.data.email
      })
    }
    ,
    onBookCourier(show){
      this.isShow = show
    },
    sendNotice()
    {
      ShipmentServices.sendEmail('hassan@microsysx.com',this.sampleReturnId,this.orgId).then((response)=>{
      }).catch(this.error)
      const formData = new FormData()
      formData.append('sampleReturnId',this.sampleReturnId)
      formData.append('file',this.fileList)
      SampleReturnServices.upload(formData).then((response)=>{
        this.goto('/task')
      }).catch(this.error)
      
    }
    },
  }
  </script>
  <style>
  .mg-50{
    margin-left: 50px;
  }
  .txtFt{
  padding-top: 8px;font-weight: 200;
}
.txtTp{
  padding-top: 8px;
}
.mlo-10{
  margin-left: 30px;
  font-weight: 200;
}
.mg-t-20{
  margin-top: 20px;
}
.mt-300{
  margin-top: 300px;
}
.mt-t-20{
    margin-top: 20px;
}
.mt-t-50{
    margin-top: 50px;
}
.ht{
    height: 35px;
    width:160px
}
</style>