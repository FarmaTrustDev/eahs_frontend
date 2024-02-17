<template>
      <div slot="content">
        <a-row class="mt-10">
                <a-col :span="6"><h2 class="heading">Patients</h2></a-col>
                <a-col :span="3"></a-col>
                <a-col :span="7" :offset="4">
                    <a-input
                        ref="userNameInput"
                        class="page-search-input"
                        style="width:98%"
                        placeholder="Search Patient"
                        @keyup="search"
                        >
                    <a-icon slot="prefix" type="search" />
                    </a-input>
                </a-col>
                <!-- <a-col :span="4">
                    <a-button type="primary" style="width:98%" @click="showModal(true)">Add New Patient</a-button>
                </a-col> -->
                <a-col :span="4">
                    <a-button type="primary" style="width:98%" @click="isConsentFormCreated(entityId)">Assign Patient</a-button>
                </a-col>
                
            </a-row>
            <a-card :bordered="false" class="default-border-radius mt-10">
        <a-table
          :columns="columns"
          :data-source="datasource"
          :loading="loading"
          class="rounded-table pt-10 users-list"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
        >
        <span slot="dateOfBirth" slot-scope="value">
          {{ moment(value).format('MM/DD/YYYY') }}
        </span>
        <a slot="patientName" slot-scope="patient" @click="getPatientConsentStatus(patient.id)">
          {{ patient.patientName }}
        </a>
        <span slot="status" slot-scope="status">
          {{ status }}
        </span>
        <span slot="consentDate" slot-scope="consentDate">
          {{ consentDate.consentStatusName }}
          
        </span>
        </a-table>
        </a-card>
        <a-modal
        :visible="modalVisible"
        :loading="modalLoading"
        :width="600"
        :footer="null"
        @cancel="visibleModal()"
        >
        <h2>Participant in:</h2>
        <div v-for="consentData in projects" :key="consentData">
          <div><h3 class="pl-2">{{ consentData }}</h3></div>
        </div>
        <h2>Active Documents:</h2>
        <a-table
        :columns="column"
        :data-source="consent"
        class="rounded-table pt-10 users-list"
        :show-header="false"
        :pagination="false"
        >
        <template slot="consentName" slot-scope="consentData">
          <a @click="goToPage(consentData)">{{ consentData.consentName }}</a>
        </template>
        <template slot="consentStatusName" slot-scope="consentData">
                <span v-if="consentData.consentStatusName === pending" class="display-flex space-even flex-end">
                  <a-button  class="btn-primary" @click="ResendEmail(consentData.projectConsentId)"> Resend</a-button>
                  <h3> {{ consentData.consentStatus }}</h3>
                </span>
              <span v-else>
                <h3>{{ consentData.consentStatusName +' on ' + _getFormatMoment(consentData.consentedDate).format("DD/MM/YYYY") }}</h3>
              </span>
        </template>
          </a-table>
        <!-- <div v-for="consentData,index in consent" :key="index" class="consentClass mt-3 pt-10">
          <a-row>
            <a-col :span="12">
              <a class="float-left pl-2" @click="goToPage(consentData)">{{ consentData.consentName }}</a>
            </a-col>
            <a-col :span="12">
              <span class="display-flex float-right pr-2">
                <a-button v-if="consentData.consentStatusName === pending" class="btn-primary mr-6 mt-m7" @click="ResendEmail()"> Resend</a-button>
                <h3> {{ consentData.consentStatus }}</h3>
              </span>
            </a-col>
          </a-row>
        </div> -->
        </a-modal>
        <a-modal
          :footer="null"
          :width="750"
          title="Add New Patient"
          :destroy-on-close="true"
          :visible="visible"
          :dialog-style="{ top: '20px' }"
          :loading="loading"
          @cancel="showModal(false)"
          @ok="showModal(false)"
        >
      <a-form :form="form" class="support-add-modal" @submit="onSubmit">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item>
              <a-input
              v-decorator="[
                'id',
                {
                  initialValue: entityPatient.id
                }
              ]"
              type="hidden"
              />
            </a-form-item>
            <a-form-item label="Patient Name: *">
              <a-input
                v-decorator="[
                  'patientName',
                  {
                    initialValue : entityPatient.patientName,
                    rules: [
                      {
                        required: true,
                        message: 'Required',
                      },
                    ],
                  },
                ]"
              />

            </a-form-item>
          </a-col>
          <a-col :span="12" class="mt-2">
            <a-form-item
                label="Date of Birth"
            >
            <a-date-picker
                v-decorator="[ 
                'dateOfBirth',
                {
                    initialValue : entityPatient.dateOfBirth,
                    rules: [
                    {
                        required: true,
                        message: 'Please select your Date of Birth!',
                    },
                    ],
                },
                ]"
                :disabled-date="disabledDate"
                style="width: 100%"
                size="large"
            >
            </a-date-picker>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <!-- <a-col :span="12">
            
            <a-form-item label="Medical number: *">
              <a-input
                v-decorator="[
                  'medicalNo',
                  {
                    initialValue : entityPatient.medicalNo,
                    rules: [
                      {
                        required: true,
                        message: 'Required',
                      },
                    ],
                  },
                ]"
               
              />

            </a-form-item>
          </a-col> -->
          <a-col :span="12">
            
            <a-form-item label="Telephone no: *">
              <a-input
                v-decorator="[
                  'phoneNo',
                  {
                    initialValue: entityPatient.phoneNo,
                    rules: [
                      {
                        required: true,
                        message: 'Required',
                      },
                    ],
                  },
                ]"
                
              />

            </a-form-item>
          </a-col>
          <a-col :span="12">
            
            <a-form-item label="Email address: *">
              <a-input
                v-decorator="[
                  'email',
                  {
                   initialValue : entityPatient.email, 
                    rules: [
                      {
                        required: true,
                        message: 'Required',
                      },
                    ],
                  },
                ]"
                :disabled="disable"
                
              />
  
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            
            <a-form-item label="Additional notes">
              <a-input
                v-decorator="[
                  'aditionalNotes',
                  {
                    initialValue: entityPatient.aditionalNotes,
                    rules: [
                      {
                        
                        message: 'Required',
                      },
                    ],
                  },
                ]"
               
              />

            </a-form-item>
          </a-col>
          <a-col :span="12">
          
          <a-form-item
            label="Nationality *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-select
              v-decorator="[
                'country',
                {
                  initialValue: entityPatient.country,
                  rules: [
                    {
                      required: true,
                      message: 'Please select your Nationality',
                    },
                  ],
                },
              ]"
              :show-search="true" 
              placeholder="Country"
              style="width: 100%"
              size="large"
              class="default-select"
            >
              <a-select-option v-for="country in countries" :key="country.name">
                {{ country.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        </a-row>
        <a-row>
        <a-col :span="10" class="mt-6">
          <p>Is donor?</p>
          </a-col>
          <a-col :span="2" class="mt-6">
          <a-form-item
          >
            <a-switch
                                v-decorator="[
                                'isDonor',
                                {
                                  initialValue: entityPatient.isDonor,
                                  rules: [],
                                  valuePropName: 'checked',
                                },
                                ]"
                                data-rowId="2"
                                size="large"
                                class="toggle_record"
                                checked-children="Yes"
                                un-checked-children="No"
                            />
          </a-form-item>
        </a-col>
        </a-row>
        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :loading="loading" :is-created="isCreated" />
          </a-col>
        </a-row>
        <div>
        <a-table
          :columns="tblColumns"
          :data-source="datasourcePatient"
          :loading="loading"
          class="rounded-table pt-10 users-list"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
        >
        <span slot="dateOfBirth" slot-scope="value">
          {{ moment(value).format('MM/DD/YYYY') }}
        </span>
          <template slot="action" slot-scope="action">
            <a-dropdown>
              <a-button class="action-button">
                Admin <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="getById(action.id)">Edit</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <span @click="deletePatient(action.id)">Delete</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
      </a-form>
    </a-modal>
    <a-modal
    :visible="visibleConfirm"
    width="800px"
    centered
    @cancel="showConsentWarning(false)"
    >
    <h1 class="mt-5">There is no consent form to {{this.projectName}} . Please create a new Consent form or select any from the document library. If you have assigned then get them approve from manager.</h1>
    <template slot="footer">
    <a-button class="ant-btn ant-btn-primary  mt-5 wd-10" type="primary" @click="goto(`/consent/consentlist?id=${entityId}`)">Ok</a-button>
    <a-button class="ant-btn ant-btn-primary  mt-5 wd-10" type="primary" @click="showConsentWarning(false)">Cancel</a-button>
    </template>
  </a-modal>
      </div>
  </template>
  <script>
  import moment from 'moment'
  import PatientServices from '~/services/API/PatientServices'
  import notifications from '~/mixins/notifications'
  import { preventDefault,isEmpty } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import { _disabledFutureDate,_getFormatMoment } from '~/services/Helpers/MomentHelpers'
  import nullHelper from '~/mixins/null-helpers'
  import CountryServices from '~/services/API/CountryServices'
  import {CONSENT_STATUSES} from '~/services/Constant/index.js'
  // import UserServices from '~/services/API/UserServices'
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
   
    mixins: [routeHelpers, notifications,nullHelper],
    props:{
      projectName: { type: String, required: true },
    },
    data() {
      return {
        datasource: [],
        visibleConfirm: false,
        dummyDataSource:[
          {
            patientId:'123-456',
            patientName:'Cancer Treatment',
            dateOfBirth:'2023-03-01',
            consentDate:'2023-03-01',
            projectInvestigator:'McGrath',
          },
          {
            patientId:'785-456',
            patientName:'Cell Treatment',
            dateOfBirth:'2023-03-01',
            consentDate:'2023-03-01',
            projectInvestigator:'McGill',
          },
        ],
        column:[
        {
            // title: 'Patient ID',
            key: 'consentName',
            scopedSlots: {customRender : 'consentName'},
          },
          {
            // title: 'Patient Name',
            key: 'consentStatusName',
            scopedSlots:{customRender: 'consentStatusName'},
          },
        ],
        columns: [
          {
            title: 'Patient ID',
            key: 'id',
            dataIndex: 'medicalNo',
          },
          {
            title: 'Patient Name',
            key: 'patientName',
            scopedSlots:{customRender: 'patientName'},
          },
          {
            title:'Date of Birth',
            dataIndex: 'dateOfBirth',
            scopedSlots:{customRender:'dateOfBirth'},
          },
          {
            title:'Date of Consent',
            key: 'consentedDate',
            scopedSlots: {customRender:'consentDate'},
          },
          {
            title: 'Status',
            dataIndex: 'consentStatus',
            scopedSlots: {customRender:'status'},
          }
        ],
        tblColumns:[
          {
            title: 'Patient Name',
            key: 'patientName',
            dataIndex: 'patientName',
          },
          {
            title: 'Patient Email',
            key: 'email',
            dataIndex: 'email'
          },
          {
            title: 'Patient Phone',
            key: 'phoneNo',
            dataIndex : 'phoneNo',
          },
          {
            title:'Date of Birth',
            dataIndex: 'dateOfBirth',
            scopedSlots:{customRender:'dateOfBirth'}
          },
          {
            title: 'action',
            key: 'action',
            scopedSlots: { customRender: 'action' },
          }
            ],
        datasourcePatient:[],
        userDeleteModal: false,
        loading: false,
        isCreated: false,
        countries:[],
        fullName: [],
        visible:false,
        apiService: PatientServices,
        userId: '',
        gotoLink: '/consent/patient',
        modalVisible:false,
        modalLoading:false,
        consent:[],
        projects:[],
        projectId:'00000000-0000-0000-0000-000000000000',
        patientId:0,
        entityPatient: {
              type: Object,
              default: () => ({}),
            },
        disable: false,
        form: this.$form.createForm(this, {
            name: 'login',
            entityId: null,
            }),
        moment,
        pending: CONSENT_STATUSES.pending.name,
        accepted: CONSENT_STATUSES.accept.name,
        isConsentCreated: false
      }
    },
    computed: {
      // ...mapGetters(['getUser']),
      user() {
        return this.$store.getters.getUser
      },
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {
      this.fetch()
      this.checkCreated()
      this.getAllPatient()
      this.getAllCountries()
    },
    methods: {
      disabledDate: _disabledFutureDate,
      preventDefault,
      _getFormatMoment,
      deletePatient(id){
      this.loading = true
      const formData =new FormData()
      formData.append('patientId',id)
      this.apiService.destroy(formData).then((response)=>{
        this.success(response.message)
        this.getAllPatient()
        this.fetch()
        this.loading = false
      })
    },
    isConsentFormCreated(entityId){
      if(this.isConsentCreated){
        this.goto('/consent/assignPatient?projectId='+ entityId)
      }
      else{
        this.showConsentWarning(true)
      }
    },  
    showConsentWarning(e) {
      this.visibleConfirm = e
    },
      getById(id){
        this.apiService.getById(id).then((response)=>{
          this.entityPatient = response.data
          this.isCreated = true
          this.disable = true
        })
      },getAllPatient(){
      this.loading = true
      this.apiService.get().then((response)=>{
        this.datasourcePatient = response.data
        this.loading = false
      })
    },
      checkCreated() {
        const entityId = this.$route.params.id
        this.entityId = entityId
        if (this.isGuid(entityId)) {
          this.entityId = entityId
          this.fetch(entityId)
          this.checkConsent(entityId)
        }
      },
      showModal(show) {
      this.visible = show
    },
    checkConsent(id){
      this.loading = true
      PatientServices.checkConsentCreated(id).then((response)=>{
        this.isConsentCreated = response.data
      }).catch(this.error).finally(this.loading = false)
    },
    goToPage(data)
    {
      const entityId = this.$route.params.id
      if(data.consentStatusName === this.accepted)
      {
        this.goto(`/consent/consentConfirmation/consentForm?cId=${data.consentId}&id=${entityId}&pId=${this.patientId}`)
      }
    },
    userDeleteMethod() {
    this.deleteUser(this.userId)
    this.userDeleteModal = false
    },
    userDelete(e, record) {
    this.userId = record
    this.userDeleteModal = e
    },

    ResendEmail(projectConsentId)
    {
      this.loading = true
      // const Id = this.$route.params.id
      const formData = new FormData()
      formData.append('projectConsentId',projectConsentId)
      formData.append('patientId',this.patientId)
      formData.append('projectConsentStatus',this.pending)
      PatientServices.projectConsentPatientAssignment(formData)
      .then((response)=>{
        this.success(response.data.result)
      }).catch(this.error).finally(this.loading = false)
    },

    fetch() {
      const Id = this.$route.params.id
      this.projectId = Id
      PatientServices.getWithStatus(this.projectId)
        .then((response) => {
        this.datasource = response.data
        })
        .finally(() => (this.loading = false))
    },
    getAllCountries()
    {
      CountryServices.getAllCountries().then((response)=>{
        this.countries= response.data
      })
    },
    getPatientConsentStatus(id)
    {
      const projectId = this.$route.params.id
      this.projectId = projectId
      this.modalLoading = true
      this.modalVisible = true
      this.patientId = id
      PatientServices.getConsentStatusList(id, this.projectId).then((response)=>{
        this.consent = response.data
        this.projects = this.distinctNames(this.consent)
        
      }).finally(
        this.modalLoading = false
      )
    },
    distinctNames(consent){
      const uniqueNames = new Set();
      consent.forEach((item) => uniqueNames.add(item.projectName));
      return Array.from(uniqueNames);
    },
    visibleModal()
    {
      this.modalVisible = false
    },
    GetConsentDate(date)
    {
      return !isEmpty(date) ? moment(date).format('DD/MM/YYYY hh:mm') : ''
    },
    onSubmit(e) {
        this.loading = true
        e.preventDefault()
        this.form.validateFields((err, values) => {
        if (!err) {
            this.upsert(values)
        } else {
            this.loading = false
        }
        })
    },
    upsert(values) {
      if(this.isCreated){
        return this.update(values)
      } else{
        return this.create(values)
      }
      },
    update(values) {
      this.loading = true
        this.btnLoading = true
        this.apiService
          .update(values)
          .then((response) => {
            this.success(response.message)
            this.isCreated = false
            this.getAllPatient()
            this.fetch()
            this.loading = false
          })
          .catch(this.error)
          .finally(() => {
            this.loading = false
          })
      },
      create(values) {
        this.loading = true
          this.apiService
          .create(values)
          .then((response) => {
            this.success(!isEmpty(response.data.response) ? response.data.response : response.message)
            this.visible=false
            this.getAllPatient()
            this.fetch()
          })
          .catch(this.error)
          .finally(() => {
            this.loading = false
          })
      },
      search(event){
        this.loading = true
        const projectId = this.$route.params.id
        if(!isEmpty(event.target.value)){
          this.apiService.searchWithStatus(event.target.value,projectId).then((response)=>{
            this.datasource = response.data
          }).catch(this.error).finally(this.loading = false)
        }else{this.fetch()}
      }
},
  }
  </script>
  