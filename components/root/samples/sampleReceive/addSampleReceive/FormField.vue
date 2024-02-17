<template>
    <div class="ant-card">
      <div class="ant-card-body  bg-grey"> 
        <!-- <a-input
        v-decorator="[
                'sampleGuid',
                {
                    initialValue: entity.sampleGuid,
                    rules: [
                        {
                        required: projectRequired,
                        message: 'Please select your Project',
                        },
                    ],
                    },
              ]"
              type="hidden"
        /> -->
        <a-row>
                  
                  <a-col :span="12">
                    <a-form-item 
                    label="Sample Name *:"
                    class="selChange"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
                    >
                      <a-input
                        v-decorator="[
                          'name',
                          {
                            initialValue: entity.name,
                            rules:[
                              {
                                required: true,
                                message: 'Please enter name'
                              },
                            ],
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                <a-form-item class="selChange"
                label="Invoice No *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            <a-input 
                v-decorator="[
                'invoiceNo',
                {
                    initialValue: entity.invoiceNo,
                    rules: [
                    {
                        required: true,
                        message: 'Required Package Level',
                    },
                    ],
                },
                ]"
                min="0" 
                type="number"
                placeholder="Invoice No"
                style="width: 100%"
                size="large"
            >
            </a-input>
            </a-form-item>
            </a-col> 
                </a-row>
                <a-row>
        <!-- <a-col :span="4">  -->
          <!-- <a-button v-if="isChecked" type="link" class="md-10" @click="showModalCastodian(true)">Add Custodian</a-button> -->
        <!-- </a-col> -->
       
      </a-row>
        
        <!-- <a-row>
            <a-col :offset="18"><a-button type="link" class="md-10" @click="showModalProject(true)">Add Project</a-button></a-col>
        </a-row> -->
        <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                    label="Date Received *:"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
                    
                >
          <a-date-picker
            v-decorator="[
              'receivingDate',
              {
                initialValue: entity.receivingDate,
                rules: [
                  {
                    required: true,
                    message: 'Required',
                  },
                ],
              },
            ]"
            placeholder="DD/MM/YYYY"
            format="DD/MM/YYYY"
            style="width: 100%"
            size="large"
          >
          </a-date-picker>
          </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item class="selChange"
                    label="Expiry Date *:"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
                >
          <a-date-picker 
            v-decorator="[
              'expiryDate',
              {
                initialValue: entity.expiryDate,
                rules: [
                  {
                    required: true,
                    message: 'Required',
                  },
                ],
              },
            ]"
            placeholder="DD/MM/YYYY"
            :disabled-date="disablePreviousDate"
            format="DD/MM/YYYY"
            style="width: 100%"
            size="large"
          >
          </a-date-picker>
          </a-form-item>
            </a-col>
        </a-row>
        
        
       
        
       
       
        
        
        
        
        <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Total Quantity *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'quantityReceived',
                {
                    initialValue: entity.quantityReceived,
                    rules: [
                    {
                        required: true,
                        message: 'Required Stated Total Quantity',
                    },
                    ],
                },
                ]"
                min="0" 
                type="number"
                placeholder="Total Quantity"
                style="width: 100%"
                size="large"
            >
            </a-input>
            </a-form-item>
            </a-col>
            
        
          <a-col :span="12">
                <a-form-item class="selChange"
                label="Donor *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <!-- <a-select 
                v-decorator="[
                    'patientId',
                    {
                    initialValue: entity.patientId,
                    rules: [
                        {
                        required: true,
                        message: 'Please select your patient',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Patient"
                style="width: 100%"
                size="large"
                class="default-select"
                >
                <a-select-option v-for="patient in patients" :key="patient.id">
                  {{ patient.patientName }}
                </a-select-option>
                </a-select> -->
                <a-input 
                v-model="patientId"
                v-decorator="[
                  'patientId',
                  {
                    initialValue: patientId,
                    rules: [
                        {
                        required: patientRequired,
                        message: 'Please select your donor',
                        },
                    ],
                    },
                ]"
                type="hidden"
                />
                <a-input
                :value="selectedPatient"
                placeholder="Donor"
                size="large"
                style="max-width: 100%"
                @click="cancelSelectPatientModel(true)"
                />
                <span v-if="patientRequired" class="color-red">Please select donor</span>
            </a-form-item>
          </a-col>
           
        </a-row>
        
          
        
       
      </div>
      <div>

<a-modal 
        :visible="visibleSelectPatientModel"
        title="Select Donor"
        :dialog-style="{ top: '20px' }"
        @cancel="cancelSelectPatientModel(false)"
        >
        <a-table 
        :columns="columnsPatient"
        :data-source="patients"
        :row-key="(record)=> record.id"
        class="rounded-table"
        :width="750"
        :loading="loading"
        :show-header="false"
        :custom-row="getPatientId"
        :pagination="{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20', '30'],
          }"
        >
        <template slot="isDonor" >
          <span >Donor</span>
        </template>
        <template slot="consentStatus" slot-scope="consentStatus">
          <center><div class="consent-btn" :style="{'background-color' : consentStatus.color}">
            {{ consentStatus.consentStatus }}
          </div></center>
        </template>
        </a-table>
          <!-- <a-radio-group v-model="value" v-for="project in projects" :key="project.id">
            <a-radio :style="radioStyle" :value="project.id">{{ project.description }}</a-radio>  
                </a-radio-group> -->
        </a-modal>
<!-- Patient Select Model End -->

<ErrorModal :message="message" :isShow="visibleConfirm" @close-modal="visibleConfirm = false"></ErrorModal>
</div>

    </div>
  </template>
  
  <script>
  import UserServices from '~/services/API/UserServices'
  import { _disabledFutureDate, _disabledPreviousDate } from '~/services/Helpers/MomentHelpers'
  import { filterOption,isEmpty, preventDefault } from '~/services/Helpers'
  import nullHelper from '~/mixins/null-helpers'
  import PatientServices from '~/services/API/PatientServices'
  import notifications from '~/mixins/notifications'
  import ErrorModal from '~/components/common/ErrorModal.vue'

  export default {
    components: { ErrorModal },
    mixins: [nullHelper,notifications],
    props: {
      ticket: { 
        type: Object,
         default: () => ({}) 
        },
        partnerevent: { 
        type: Object,
         default: () => ({}) 
        },
      entityProject: {
        type: Object,
        default: () => ({}),
      },
      entity: {
        type: Object,
        default: () => ({}),
      },
      projectRequired:{type: Boolean, default: false},
      patientRequired:{type: Boolean, default: false},
      custodianRequired:{type: Boolean, default: false},
      manufacturerRequired: {type: Boolean, default: false},
      researcherRequired:{type: Boolean, default: false},
      form: {
        type: Object,
        default: () => ({}),
      }
    },
    data() {
      
      return {
        isCreated: false,
        visibleSelectPatientModel: false,
        datasourceCastodian: [],
        custTblloading: false,
        projectId: 0,
        visibleSelectProjectModel: false,
        visibleConfirm: false,
        message: '',
       
        isChecked:false,
        
        
        columnsPatient : [
        {
            title: 'Patient PUID',
            key: 'puid',
            dataIndex: 'puid',
          },  
        {
            title: 'Patient Name',
            key: 'patientName',
            dataIndex: 'patientName'
          },
          {
            title: 'IsDonor',
            key: 'isDonor',
            scopedSlots:{customRender:'isDonor'}
          }
          
        ],
        
        custBtnLoading: false,
        visibleCastodian: false,
        visibleProject: false,
        visibleProtocol: false,
        visibleManufacturer: false,
        visibleType: false,
        visibleUnit: false,
        visibleProductClass: false,
        visibleTransportVassel: false,
        visibleWorkStation: false,
        visiblePar: false,
        visibleClient: false,
        visibleLocation: false,
        visibleResearcher: false,
        visibleCourier:false,
        entityId: null,
        userRoleId: 0,
        loading: false,
        partners:[],
        investigators:[],
        countries: [],
        roles: [],
        custodians: [],
        projects: [],
        clients: [],
        protocols: [],
        types:[],
        manufacturers:[],
        units:[],
        researchers:[],
        productClasses:[],
        transportVessels:[],
        workStations:[],
        patientId: 0,
        patients:[],
        locations:[],
        couriers:[],
        organization:[],
        fridgeTypes:[],
        fetchCountry: true,
        fetchRole: true,
        formLayout: 'vertical',
        isShow: false,
        apiService: UserServices,
        selectedProject: null,
        selectedPatient: null,
        selectedCustodian : null,
        custodianId: 0,
        visibleSelectCustodianModel: false,
        manufacturerId : 0,
        selectedManf : '',
        visibleSelectManfModel : false,
        researcherId : 0,
        selectedResearcher : '',
        visibleResearcherModel : false,
        
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
          // this.getRolebyId(newValue.organizationTypeId)
          // this.getOrganizationByAlias(newValue.organizationTypeAlias)
          this.selectedPatient = newValue.patientName
          this.patientId = newValue.patientId
          if(!isEmpty(newValue.dateReceived))
          this.isChecked = true
          this.getPatient(newValue.projectGuid)
        }
      }
    },
    mounted() {
      // this.isCheck()
      // this.getRoles()
      
      
       this.fetchPatient()
      // this.getPatient()
      // this.fetchLocation()
      
    },
    methods: {
      preventDefault,
      isReceived(e){
        this.isChecked = e
      },
      isCheck(){
        if(!isEmpty(this.entity)){
          if(!isEmpty(this.entity.dateReceived)){
            this.isReceived(true)
          }
        }
      },
      getUniqueLocation(studies) {
      const uniqueMap = new Map();
      studies.forEach((study) => {
        uniqueMap.set(study.id, study);
      })
      return Array.from(uniqueMap.values());
    },
       
      
       
        
        
        showModal1(show) {
          this.visiblePar = show
          this.isCreated = false
        },
       
      handleChange(info) {
        this.fileList = info
        this.$emit('handleChange', this.fileList)
      },
     
      
      filterOption,
      disableFutureDate: _disabledFutureDate,
      disablePreviousDate: _disabledPreviousDate,
     
      fetchPatient(){
        PatientServices.get().then((response)=>{
          this.patients = response.data
        })
      },
      getPatient(){
          PatientServices.getWithoutRejectedConsent(this.entity.projectGuid).then((response)=>{
          this.patients = response.data.result
        })
      },
     
      
     
    
    cancelSelectPatientModel(e){
      this.visibleSelectPatientModel = e
    },
    getPatientId(record){
      return {
        on: {
          click: (event) => {
            console.log(record)
            this.patientId = record.id
            this.selectedPatient = record.patientName
            // this.patientRequired = false
            this.$emit('patRequired',false,record.id)
            this.cancelSelectPatientModel(false)
          },
        },
      }
      
    },
   
    getManfId(record){
      return {
        on: {
          click: (event) => {
            debugger
            this.manufacturerId = record.id
            this.selectedManf = record.name
            this.$emit('manufRequired',false,record.id)
            this.cancelSelectManfModel(false)
          },
        },
      }
    },

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
  .md-10{
    width:160px;
    height:25px;
    text-justify: auto;
  }
  .he{
    height: 30px;
  }
</style>
  