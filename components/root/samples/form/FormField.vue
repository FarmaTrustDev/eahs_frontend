<template>

    <div>
        <a-row>
        <a-col :span="24" :xs="24" :md="24" :sm="24" :lg="24" :xl="24">
         
            <a-row>
              <!-- left side tabs -->
              <a-col :span="1"></a-col>
              <a-col :span="5">
                <div class="patient-details-page">
                
                      <a-card :bordered="false" class="qr-section default-card">
                        <figure class="m-0">
                          <img
                            class="img-fluid"
                            :src="getAbsolutePath('/patient/1/qr/637847204805634018.png')"
                            alt="Christina Braun"
                          />

                          <figcaption>Jacob Oram</figcaption>
                        </figure>
                      </a-card>
                </div>
                 

              </a-col>
              <!-- #end left side tabs -->
              
              <a-col :span="6"></a-col>
              <a-col :span="12">
                <a-row>
                <a-col :span="17">
                <p>Is there an advance notification for sample?</p>
                </a-col>
                <a-col :span="2">
                <a-form-item>
                        <a-switch
                            v-decorator="[
                            'isNotificationAdvanced',
                            {
                                rules: [],
                                valuePropName: 'checked',
                            },
                            ]"
                            data-rowId="2"
                            size="large"
                            class="toggle_record"
                            checked-children="Yes"
                            un-checked-children="No"
                        /><span class="ml-5"></span>
                </a-form-item>
            </a-col>
                </a-row>
                <a-row>
                    <a-col :span="22">
                <a-form-item
                    label="Custodian Name *:"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 22 }"
                >
                <div class="ant-card " style="border-radius: 0%;">
                    <div class="ant-card-body bg-grey">
                    <a-input
                    v-decorator="[
                        'custodianId',
                        {
                        initialValue: entity.questionName,
                        rules: [
                            {
                            required: true,
                            message: 'Please input your Name',
                            },
                            {
                            message: 'Please enter a valid name'
                            }
                        ],
                        },
                    ]"
                    style="height:30px;border-radius: 0%;background-color: white;border: 1px solid rgba(0, 0, 0, 0.1);"
                    placeholder="Your Name"
                    /> </div></div></a-form-item
                    ></a-col>
                </a-row>
                <a-row>
                    <a-col :span="17">
                    <p>Confirm data captured is accurate?</p>
                    </a-col>
                    <a-col :span="2">
                    <a-form-item>
                            <a-switch
                                v-decorator="[
                                'isConfirmed',
                                {
                                    rules: [],
                                    valuePropName: 'checked',
                                },
                                ]"
                                data-rowId="2"
                                size="large"
                                class="toggle_record"
                                checked-children="Yes"
                                un-checked-children="No"
                            /><span class="ml-5"></span>
                    </a-form-item>
                    </a-col>
                </a-row>
                <!-- <a-row>
                  <a-col :span="6"><a-button style="background-color: #b3f2c6;" class="wd-12 ht" >Inbound </a-button></a-col>
                  <a-col :span="6" :offset="1" ><a-button style="background-color: #cfeefa;" class="wd-12 ht" @click="goto('/inbound/samples/qualityAssurance')">Process</a-button></a-col>
                  <a-col :span="6"  :offset="1"><a-button  style="background-color: lightgray" class="wd-12 ht">Store</a-button></a-col>
                </a-row> -->
                </a-col>
            </a-row>
            
            <a-row :span="24" >
                    <div class="h-tabs" >
                        <a-tabs type="card" @change="handleTabChange">
                        <a-tab-pane key="1" tab="Barcode">
                            
                            <Barcode></Barcode>
                            <br>
                            <a-col :offset="20" :span="2">
                            <a-button type="primary"  class="float-right wd-12" @click="goto('/inbound/samples/form')">Next</a-button>
                          </a-col>
                          </a-tab-pane>
                        
                        <a-tab-pane key="2" tab="QR Code">
                            <Qrcode></Qrcode>
                            <br>
                            <a-col :offset="20" :span="2">
                            <a-button type="primary" class="float-right wd-12" @click="goto('/inbound/samples/form')">Next</a-button>
                          </a-col>  
                          </a-tab-pane>
                        
                        
                        <a-tab-pane key="3" tab="Manual" >
                            <!-- <SampleRegister /> -->
                          <!-- <Manual></Manual>
                              <br>
                              <a-col :offset="20" :span="2">
                              <a-button type="primary" class="float-right wd-12" >Next</a-button>
                              </a-col> -->
                      </a-tab-pane >
                            
                        </a-tabs>
                    </div>
            </a-row>
        </a-col>
      </a-row>
      <div>
  </div>
    </div>
  </template>
  <script>
  import UserServices from '~/services/API/UserServices'
  import { _disabledFutureDate } from '~/services/Helpers/MomentHelpers'
  import { filterOption } from '~/services/Helpers'
  // import SampleRegister from '~/components/root/samples/sampleRegister'
  import RoleServices from '~/services/API/RoleServices'
  import { getAbsolutePath } from '~/services/Helpers/'
  import routeHelpers from '~/mixins/route-helpers'
  import MapServices from '~/services/API/MapServices'
  import nullHelper from '~/mixins/null-helpers'
  import OrganizationTypeServices from '~/services/API/OrganizationTypeServices'
  import OrganizationServices from '~/services/API/OrganizationServices'
  import Barcode from '~/components/root/samples/barcode'
  import Qrcode from '~/components/root/samples/qrcode'
  // import Manual from '~/components/root/samples/manual'
  
  
  export default {
    components: { Barcode , Qrcode 
      // SampleRegister
      // ,Manual
    },
    mixins: [nullHelper ,routeHelpers],
    props: {
      isCreated: {
        type: Boolean,
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
      }
    },
    data() {
      
      return {
        visibleInv: false,
        visiblePar: false,
        entityId: null,
        userRoleId: 0,
        loading: false,
        partners:[],
        investigators:[],
        countries: [],
        roles: [],
        fetchCountry: true,
        fetchRole: true,
        formLayout: 'vertical',
        apiService: UserServices,
        
      }
    },
    computed: {
      
      translation() {
        return this.$store.getters.getTranslation
      },
      users() {
        return this.$store.getters.getUser
      },
    },
    watch:{
      roles(newRoles, oldRoles)
      {
        if(newRoles !== oldRoles)
        {
          this.roles = newRoles
        }
      },
      ticket(newValue, oldValue)
      {
        this.newValue = oldValue
      }
      ,
      entity(newValue, oldValue)
      {
        if(newValue !== oldValue)
        {
          this.getRolebyId(newValue.organizationTypeId)
          this.getOrganizationByAlias(newValue.organizationTypeAlias)
        }
      }
    },
    mounted() {
      this.getRoles()
      this.getOrganizationsType()
      
    },
    updated() {
      if (this.isCreated && this.fetchCountry) {
        if (this.isGuid(this.$route.params.id)) {
          this.fetch(this.$route.params.id)
          this.fetchCountry = false
        }
      }
      if (this.isCreated && this.fetchRole) {
        this.fetchRole = false
        this.getRoles()
      }
    },
    methods: {
      handleTabChange(key){
        switch (key) {
        case "3":
        this.goto('/inbound/samples/sampleRegister') // Replace "/page1" with your desired route
          break;
      }
    },
      getAbsolutePath,
      handleChange(info) {
        this.fileList = info
        this.$emit('handleChange', this.fileList)
      },
      getOrganizationsType()
      {
        OrganizationTypeServices.GetAllTypes()
        .then((response)=>{
          this.organizationTypes = response.data
        })
      },
      fetch(id) {
        this.loading = true
        this.apiService
          .getById(id)
          .then((response) => {
            this.userData = response.data
            this.fetchPartners({ Ids: [this.userData.countryId] })
          })
          .finally(() => (this.loading = false))
      },    
      filterOption,
      disabledDate: _disabledFutureDate,
      
      
      fetchRoles(params = {}) {
        RoleServices.get(params).then((response) => {
          this.roles = response.data
        })
      },
      getCountries() {
        if (this.entity.countryId!==undefined && this.isCreated) {
          this.fetchPartners({ Ids: [this.entity.countryId] })
        } else {
          this.fetchPartners()
        }
      },
      getRoles() {
        if (this.isCreated && this.users.name !== 'Super Admin') {
            this.fetchRoles({ Ids: [this.entity.roleId] })
        } else {
          this.fetchRoles()
        }
      },
      searchCountries(name, b) {
        this.fetchPartners({ name })
      },
      searchRoles(name, b) {
        this.fetchRoles({ name })
      },
      fetchCountryByPostCode(e) {
        MapServices.fetchCountryByPostCode(e.target.value).then((response) => {
          let name = ''
          this.form.setFieldsValue({
            city: response.result.cityName,
            County: response.result.countyName,
            location: response.result.location
          })
          name= response.result.countryName
          this.searchCountries(name,'b')
        })
      },
      getRolebyId(Id)
      {
        RoleServices.getRolesById(Id).then((response)=>{
          this.roles = response.data
        })
      },
      getOrganizationByAlias(e)
      {
            OrganizationServices.get({ organizationTypeAlias: e })
          .then((response) => {
          this.organization = response.data
          })
      },
      onSubmitInvestigator(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
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
    onSubmitPartner(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
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
    }
    ,
      onChange(e)
      {
        
        const id = e.id
        this.getRolebyId(id);
        this.getOrganizationByAlias(e.alias)
      }
    },
  }
  </script>
  <style>
  .barcode {
    background-color: #383bda;
    padding: 7% 14%;
    border-radius: 22px;
    color: white;
    font-size: 1.6rem;
    cursor: pointer;
    padding-right: 23%;
    position: absolute;
    margin: -7px;
    height:70px;
    width:210px
  }
  .wd-12{
    width: 120px;
  }
  .ht{
    height:30px;
  }
  .cardHt{
    height:200px;
  }
</style>