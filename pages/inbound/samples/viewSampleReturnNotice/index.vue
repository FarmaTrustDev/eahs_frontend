<template>
    <page-layout
      :loading="false"
      title="Sample Return Notice"
      class="specific container page-search-input-container"
      :create="false"
      :back="false"
    >
      
      <div slot="content">
        <div class="ant-col ant-col-20 bg-grey" >
            <h4 class="mlo-10 mt-t-20">Dear {{ this.name }},</h4>
            <h4 class="mlo-10 mt-t-50">We are returning sample ({{ this.sampleNumber }}) to you for the following reason ({{ this.reason }}).Please see shipping documents attached.</h4>
            <h4 class="mlo-10 mt-t-50">Best wishes,</h4>
            <h4 class="mlo-10">{{this.authorizePerson}}</h4>
            <h4 class="mlo-10">{{ this.authorizeEmail }}</h4>
        </div>
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
    middleware: "no-auth",
    layout:"noAuth",
    data() {
      return {
        name:'',
        sampleNumber: '',
        reason: '',
        authorizePerson: '',
        authorizeEmail: '',
        isShow:false,
        reasons:[
            {id:1,name:'Damaged in shipment'},
            {id:2,name:'Mishandling of site'},
            {id:3,name:'Experied Product'}
        ],
        visible:false,
        orgEmail:'',
        orgId:0,
        formCourier: this.$form.createForm(this, {
          name: 'courierCreate',
        }),
        
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
        console.log(values)
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
    getSampleReturn()
    {
      SampleReturnServices.srgetById(this.sampleReturnId).then((Response)=>{
        this.reason=Response.data.reasonName
        this.sampleNumber = Response.data.puid
        const data = JSON.parse(localStorage.getItem('vuex'))
        console.log(data.auth.user, 'adta')
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