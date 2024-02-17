<template>
    <PageLayout
      :sub-title="userRole"
      class="specific container page-search-input-container"
      :create="false"
    >
    <template slot="headerMenus">
       
       <a-input
         ref="userNameInput"
         class="page-search-input"
         placeholder="Search Patient"
         @keyup="search"
       >
         <a-icon slot="prefix" type="search" />
       </a-input>
       <a-button type="primary" @click="showModal(true)">Add New Patient</a-button>
     </template>
     <template slot="content">
        <a-table
        :columns="columns"
        class="rounded-table"
        :data-source="datasource"
        :loading="tableLoading"
        >
        <div slot="dateOfBirth" slot-scope="value">
          {{ moment(value).format('MM/DD/YYYY') }}

        </div>
        <div slot="status" slot-scope="value,row">
            <a @click="assignPatientToConsent(row.id)">Send Link</a>
        </div>
        </a-table>
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
          
          <a-form-item
            label="Nationality *:"
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
              :get-popup-container="trigger => trigger.parentNode"
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
        <a-row :gutter="20">
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
        </a-row>
        <a-row :gutter="20">
        <a-col :span="10" class="mt-2">
          <p>Is donor?</p>
          </a-col>
          <a-col :span="2" class="mt-2">
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
        <a-row>
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
    :footer="null"
    width="800px"
    centered
    @cancel="closeConfirmModal(false)"
    >
    <center> <h1 class="mt-5">{{ responseMessage.result }}</h1>
    <a-button class="ant-btn ant-btn-primary  mt-5 wd-10" type="primary" @click="goto('/projects')"> Go To Dashboard</a-button>
    <a-button class="ant-btn ant-btn-primary  mt-5 wd-180" type="primary" @click="closeConfirmModal(false)">Go Back</a-button></center>
    </a-modal>
    </template>
    </PageLayout>
</template>
<script>
    import moment from 'moment'
    import PageLayout from '~/components/layout/PageLayout'
    import routeHelpers from '~/mixins/route-helpers'
    import PatientServices from '~/services/API/PatientServices'
    import nullHelper from '~/mixins/null-helpers'
    import { _disabledFutureDate } from '~/services/Helpers/MomentHelpers'
    import notifications from '~/mixins/notifications'
    import CountryServices from '~/services/API/CountryServices'
    import {isEmpty} from '~/services/Helpers'
    import  { CONSENT_STATUSES,USER_ROLES } from '~/services/Constant/index'
export default{
    components:{PageLayout},
    mixins:[routeHelpers, nullHelper,notifications],
    data(){
        return {
            datasource: [],
            countries:[],
            datasourcePatient:[],
            moment,
            pending: CONSENT_STATUSES.pending.name ,
            tableLoading:false,
            visibleConfirm:false,
            disable: false,
            isDonor: false,
            columns: [
          {
            title: 'Patient ID',
            key: 'patientId',
            dataIndex: 'medicalNo',
          },
          {
            title: 'Patient Name',
            key: 'patientName',
            dataIndex: 'patientName',
          },
          {
            title:'Date of Birth',
            dataIndex: 'dateOfBirth',
            scopedSlots:{customRender:'dateOfBirth'}
          },
          {
            title: 'Status',
            dataIndex: 'aditionalNotes',
            scopedSlots: { customRender: 'status' },
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
            form: this.$form.createForm(this, {
            name: 'login',
            entityId: null,
            }),
            visible:false,
            loading:false,
            apiService: PatientServices,
            projectId:'00000000-0000-0000-0000-000000000000',
            entityPatient: {
              type: Object,
              default: () => ({}),
            },
            isCreated: false,
            responseMessage : '',
            userRole:''
        }
    },
    mounted() {
        this.fetch()
        this.getAllPatient()
        this.getAllCountries()
        const data = JSON.parse(localStorage.getItem('vuex'))
        this.userRoleType =data.auth.user.roleName
        if(this.userRoleType === USER_ROLES.admin_type.name)
        {
          this.userRole = USER_ROLES.admin_type.role
        }
    },
    methods:{
      disabledDate: _disabledFutureDate,
      getById(id){
        this.apiService.getById(id).then((response)=>{
          this.entityPatient = response.data
          this.isCreated = true
          this.disable = true
        })
      },
    fetch() {
      this.tableLoading = true
      const projectId = this.$route.query.projectId
      this.projectId = projectId
      PatientServices.getWithoutConsent(this.projectId)
        .then((response) => {
        this.datasource = response.data
        
        })
        .finally(() => (this.tableLoading = false))
    },
    getAllCountries()
    {
      CountryServices.getAllCountries().then((response)=>{
        this.countries= response.data
      })
    },
    getAllPatient(){
      this.loading = true
      this.apiService.get().then((response)=>{
        this.datasourcePatient = response.data
        this.loading = false
      })
    },
    showModal(show) {
      this.visible = show
      this.isCreated = false
      this.disable = false
    },
    deletePatient(id){
      this.loading = true
      const formData =new FormData()
      formData.append('patientId',id)
      this.apiService.destroy(formData).then((response)=>{
        this.success(response.message)
        this.getAllPatient()
        this.loading = false
      })
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
        const formData = new FormData();
                    // Append regular fields
                    formData.append('Id', values.id);
                    formData.append('patientName', values.patientName);
                    if(this.entityPatient.dateOfBirth !== values.dateOfBirth){
                      formData.append('dateOfBirth', (values.dateOfBirth).toISOString());
                    } else {formData.append('dateOfBirth', values.dateOfBirth);}
                    formData.append('phoneNo', values.phoneNo);
                    formData.append('country', values.country);
                    formData.append('email', values.email);
                    formData.append('additionalNotes', values.additionalNotes);
        this.apiService
          .update(formData)
          .then((response) => {
            this.success(response.data)
            this.entityPatient = []
            this.form.resetFields()
            this.isCreated = false
            this.getAllPatient()
            this.loading = false
          })
          .catch(this.error)
          .finally(() => {
            this.loading = false
          })
      },
      create(values) {
        // values.projectId = this.projectId
        this.isDonor = values.isDonor === undefined ? false : values.isDonor
        const formData = new FormData()
          for (const key in values) {
            formData.append(key, values[key])
          }
          formData.append("projectId", this.projectId)
          formData.set("id",0)
          formData.set("isDonor",this.isDonor)
          formData.set("dateOfBirth",(values.dateOfBirth).toISOString())
        this.loading = true
          this.apiService
          .create(formData)
          .then((response) => {
            if(!isEmpty(response.data.response)){
              this.success(response.data.response)
            } 
            else{this.success(response.message)}
            this.visible=false
            this.getAllPatient()
            this.fetch()
          })
          .catch((error)=>{
                      if (error.response && error.response.data && error.response.data.message) {
                        const result = error.response.data.message.match(/\((.*)\)/)
                        this.error(result?.[1]);
                      }
                    })
          .finally(() => {
            this.loading = false
          })
      },
      closeModal(value) {
      this.showModal(value)
      this.fetch()
    },
    assignPatientToConsent(id){
      const projectId = this.$route.query.projectId
          const formData = new FormData()
          formData.append('projectId',projectId)
          formData.append('patientId',id)
          formData.append('projectConsentStatus',this.pending)
          PatientServices.projectPatientAssignment(formData)
          .then((response)=>{
            this.visibleConfirm = true
            this.responseMessage = response.data
          }) 
    },
    closeConfirmModal(action){
      this.fetch()
      this.visibleConfirm = action
    },
    search(event){
      const keyword = event.target.value
      this.searchPatient({
        patientName: keyword,
        medicalNo : keyword,
        projectGuid: this.$route.query.projectId
      })
    },
    searchPatient(params={}){
        this.loading = true
        if(!isEmpty(params.patientName)){
          this.apiService.search(params).then((response)=>{
            this.datasource = response.data
          }).catch(this.error).finally(this.loading = false)
        }else{this.fetch()}
      }
    }
}
</script>