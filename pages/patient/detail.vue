<template>
<!-- <page-layout
:loading="false"
      class="specific container page-search-input-container"
      :create="false"
      :back="false"
> -->
    <div>
      <a-row>
              <a-col :span="15">

              </a-col>
              <a-col :span="5">
                <a-input
                          ref="userNameInput"
                          class="page-search-input wd-100"
                          placeholder="Search Patient"
                          @keyup="searchPatient"
                          >
                      <a-icon slot="prefix" type="search" />
                      </a-input>
              </a-col>
              <a-col :span="4">
                
              <a-button type="primary" class="wd-40" @click="showModal(true)">Add New Patient</a-button>
              </a-col>
            </a-row>
        <!-- <a-table
        :columns="columnsPatient"
        :data-source="datasource"
        :loading="loading"
        :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
          class="rounded-table"
        >
              <template slot="dateOfBirth" slot-scope="text, record">
                {{ _getFormatMoment(record.dateOfBirth).format("DD/MM/YYYY") }}
              </template>
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
        </a-table> -->
        <div slot="content">
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
        <template slot="donorName" slot-scope="text,record">
          <div class="ant-col ant-col-8">
            <a-avatar :src="getImageUrl(removeQuotes(record.donorImage))" :size="80" />
          </div>
          <div class="ant-col ant-col-12 mt-10">
            <span >
                {{ record.patientName }}
            </span><br>
            <span>
                {{ record.age }}
            </span><br>
            <span>
                {{ record.countryName }}
            </span>
          </div>
        </template>  
        <template slot="type" slot-scope="text,record">
          <span v-for="recQuan,index in record.sample" :key="index">
              {{ recQuan.typeOfSample}} <br>
          </span>  
          <!-- {{ record }}<br> -->
        </template>
        <template slot="quantity" slot-scope="text,record">
          <span v-for="recQuan in record.sample" :key="recQuan.id">
              {{ recQuan.quantity }} vials<br>
          </span>
          <!-- {{record}} -->
        </template>  
        <template slot="sample" slot-scope="text,record">
          <span v-for="recSample in record.sample" :key="recSample.id">
              {{ recSample.sampleId }}<br>
          </span>
        </template>  
      <template slot="study" slot-scope="text,record">
          <span v-for="rec,index in getUniqueStudies(record.study)" :key="index">
              {{ rec.studyName }}<br>
          </span>
        </template>  
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
          <a-form-item label="Patient Name: *">
            <a-input
              v-decorator="[
                'patientName',
                {
                  initialValue: entityPatient.patientName,
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
        <a-col :span="12" >
          <a-form-item
              label="Date of Birth"
          >
          <a-date-picker
              v-decorator="[
              'dateOfBirth',
              {
                initialValue: entityPatient.dateOfBirth,
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
                initialValue: entityPatient.countryName,
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
                  initialValue: entityPatient.email,
                  rules: [
                    {
                      required: true,
                      message: 'Required',
                    },
                  ],
                },
              ]"
              :disabled="isCreated"
            />

          </a-form-item>
        </a-col>
        <a-col :span="12" >
          
          <a-form-item label="Additional notes" >
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
      <a-row>
        <a-col :span="24">
        <a-form-item>
          <a-input
          v-decorator="[
           'id',
           {
            initialValue: entityPatient.id,
            rules:[]
           }
          ]"
          hidden
          />
          </a-form-item>
          <a-form-item v-if="isCreated">
            <a-row>
    <div v-for="study in groupStudiesByStudyName(entityPatient.study)" :key="study.id">
      <a-col class="ant-col ant-col-8 mt-20 bg-grey mg-t-10  pt-10 pb-10">
        {{ study.studyName }}
      </a-col>
      <a-col class="ant-col ant-col-3 pl-2 pt-10 pb-10">
        <a-switch
          class="mt-15 toggle_record"
          checked-children="Yes"
          un-checked-children="No"
          :checked="checkedList.includes(study.id)"
          @change="(value)=> handleSwitchChange(value,study.id, study.studyName)"
          />
      </a-col>
    </div>
  </a-row>
          </a-form-item>
        <a-form-item
          label="Project *:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 24 }"
          v-if="!isCreated"
        >
        
        <a-input
              v-decorator="[
                'projectId',
                {
                    initialValue: projectId,
                    rules: [
                        {
                        required: projectRequired,
                        message: 'Please select your project',
                        },
                    ],
                    },
                
              ]"
              type="hidden"
              />
              <a-input        
                :value="selectedProject"
                placeholder="Project"
                size="large"
                style="max-width: 100%"
                @click="cancelSelectProjectModel(true)"
                />
                <span v-if="isNotSelected" class="color-red">Please select your project</span>
          <!-- <a-select
            v-decorator="[
              'projectId',
              {
                rules: [
                  {
                    required: !isCreated,
                    message: 'Please select your project',
                  },
                ],
              },
            ]"
            :show-search="true"
            placeholder="Project"
            style="width: 100%"
            size="large"
            class="default-select"
            :disabled="isCreated"
          >
            <a-select-option v-for="project in projects" :key="project.globalId">
              {{ project.name }}
            </a-select-option>
          </a-select> -->
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item class="ml-6 mt-5">
          <upload
          :defaultFileList="entityPatient.profileImageUrl"
          :extensions="allowedExtensions"
          @handleChange="handleChange"
          />
        </a-form-item>
      </a-col>
      </a-row>
      <!-- <a-row>
      <a-col :span="10">
        <p>Is donor?</p>
        </a-col>
        <a-col :span="2">
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
      </a-row> -->
      <a-row class="">
        <a-col class="text-right">
          <FormActionButton :loading="loading" :is-created="isCreated" />
        </a-col>
      </a-row>
      <div>
      
    </div>
    </a-form>
  </a-modal>
  <a-modal 
        :visible="visibleSelectProjectModel"
        title="Select Project"
        
        @cancel="cancelSelectProjectModel(false)"
        >
        <a-table 
        :columns="columnsProject"
        :data-source="projects"
        :row-key="(record)=> record.id"
        class="rounded-table"
        :width="750"
        :loading="loading"
        :show-header="false"
        :custom-row="getProjectId"
        >
        <template slot="partners" slot-scope="partners">
          <span v-for="partner in partners.partners" :key="partner.partnerId">{{ partner.partnerName }}</span>
        </template>
        <template slot="investigators" slot-scope="investigators">
          <span v-for="investigator in investigators.investigators" :key="investigator.investigatorId">{{ investigator.investigatorName }}</span>
        </template>
        </a-table>
          <!-- <a-radio-group v-model="value" v-for="project in projects" :key="project.id">
            <a-radio :style="radioStyle" :value="project.id">{{ project.description }}</a-radio>  
                </a-radio-group> -->
        </a-modal>
        <ErrorModal :message="message" :isShow="isVerified" @close-modal="isVerified = false"></ErrorModal>
    </div>
<!-- </page-layout> -->
</template>
<script>
//   import PageLayout from '~/components/layout/PageLayout'
import PatientServices from '~/services/API/PatientServices'
import { _getFormatMoment,_disabledFutureDate } from '~/services/Helpers/MomentHelpers'
import { preventDefault } from '~/services/Helpers'
import CountryServices from '~/services/API/CountryServices'
  import notifications from '~/mixins/notifications'
  import ProjectServices from '~/services/API/ProjectServices'
  import upload from '~/components/upload/userUpload'
    import { PICTURE_UPLOAD_EXTENSIONS } from '~/services/Constant'
    import { isEmpty } from '~/services/Helpers'
    import imagesHelper from '~/mixins/images-helper'
    import ErrorModal from '~/components/common/ErrorModal.vue'
    import { CONSENT_STATUSES } from '~/services/Constant'
  export default{
    components: { upload,ErrorModal },
    mixins: [ notifications,imagesHelper],
    data(){
        return {
            loading:false,
            message:'',
            isVerified: false,
            datasource:[],
            countries:[],
            isNotSelected: false,
            entityPatient: [],
            checkedList:[],
            defaultFileList:[],
            isCreated:false,
            visible:false,
            accepted : CONSENT_STATUSES.accept.name,
            projects:[],
            projectRequired: true,
            allowedExtensions: PICTURE_UPLOAD_EXTENSIONS,
            projectId: 0,
            selectedProject: '',
            fileList:[],
            isChecked:false,
            studyId:[],
            columns: [
          {
            title: 'Patient Details',
            key: 'donorName',
            scopedSlots: { customRender: 'donorName' },
          },
          {
            title: 'Sample ID',
            scopedSlots: { customRender: 'sample' },
            key: 'sample',
          },
          {
            title:'Type of Sample',
            key: 'type',
            scopedSlots: {customRender : 'type'},
          },
          {
            title: 'Quantity',
            dataIndex: 'quantity',
            scopedSlots: {customRender : 'quantity'},
          },
          {
            title: 'Studies/Experiment',
            key: 'study',
            scopedSlots: { customRender: 'study' },
          },
          {
            title: 'Action',
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
            visibleSelectProjectModel: false,
            columnsPatient : [
            {
                title: 'Name',
                dataIndex: 'patientName',
                key: 'patientName',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Phone',
                dataIndex: 'phoneNo',
                key: 'phoneNo',
            },
            {
                title: 'Nationality',
                dataIndex: 'countryName',
                key: 'countryName',
            },
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: 'DOB',
                dataIndex: 'dob',
                scopedSlots:{
                      customRender: 'dateOfBirth'
                    }
            },
            {
              title: 'Action',
              key: 'action',
              scopedSlots :{customRender: 'action'}
            },
            ],
            columnsProject: [
          {
            title: 'Project Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Partners',
            key: 'partners',
            scopedSlots: {customRender: 'partners'},
          },
          {
            title: 'Investigators',
            key: 'investigators',
            scopedSlots: {customRender: 'investigators'},
          },
        ],
            form: this.$form.createForm(this, {
            name: 'patientForm',
            entityId: null,
            }),
        }
    },
    mounted() {
      this.getPatients()
      this.getAllCountries()
      this.fetchProject()
    },
    methods: {
      isEmpty,
      _getFormatMoment,
      disabledDate: _disabledFutureDate,
        getById(id){
          PatientServices.getPendingProjects(false,id).then((response)=>{
          this.entityPatient = response.data
          if(response.data.study != null){
            this.checkedList = response.data.study.map(item => item.id);
            console.log(this.checkedList)
          }
          this.isCreated = true
          this.showModal(true)
        })
      },
      removeQuotes(img){
        if(!isEmpty(img)){
          return img.replace(/"/g, '')
        }
      },
      handleSwitchChange(value,id,name){
        const status = this.getStudyStatus(name)
        if(!status){
          this.studyId.push(id)
          const isExist = this.checkedList.includes(id)
          if(isExist)
          {
            this.checkedList.splice(this.checkedList.indexOf(id),1)
          } else if(value === true) { this.checkedList.push(id)}
        }
      },  
      getStudyStatus(studyName) {
      const study = this.entityPatient.study.some(s => s.studyName === studyName && s.status === this.accepted || s.studyName === studyName && s.isExistInSample === true);
      this.message = `Cannot deallocate patient has accepted ${studyName} consent OR allocated to sample`
      this.isVerified = study
      return study ;
    },
      getPatients()
      {
        // calling donor function because of having same table just difference is of bit isDonor
        this.loading = true
        PatientServices.getDonors(false).then((response)=>{
          this.datasource = response.data
          this.loading = false
        }).finally(this.loading = false)
      },
      getUniqueStudies(studies) {
      const uniqueMap = new Map();
      studies.forEach((study) => {
        uniqueMap.set(study.id, study);
      });
      return Array.from(uniqueMap.values());
    },
    handleChange(file){
      // this.fileList = []
        this.fileList = file
      },
      groupStudiesByStudyName(studies) {
        const uniqueMap = new Map();
      studies.forEach((study) => {
        uniqueMap.set(study.studyName, study);
      });
      return Array.from(uniqueMap.values());
    },
      onSubmit(e) {
          // this.loading = true
          e.preventDefault()
          this.form.validateFields((err, values) => {
            if(!err){
              if(!this.isCreated){
                if(isEmpty(values.projectId)){
                      this.isNotSelected = true
                      return false
                    }
                this.loading = true
                const formData = new FormData()
                for (const key in values) {
                  formData.append(key, values[key])
                }
                  this.fileList.forEach((files) => {
                    formData.append('profileImageUrl', files.originFileObj)
                    console.log(files)
                  })
                  formData.set('id',0)
                  formData.set('dateOfBirth', new Date(values.dateOfBirth).toISOString())
                PatientServices
                  .create(formData)
                  .then((response) => {
                    this.success(response.data.result.response)
                    // this.success("Please check email for password creation")
                  })
                  .catch((error)=>{
                      if (error.response && error.response.data && error.response.data.message) {
                        const result = error.response.data.message.match(/\((.*)\)/)
                        this.error(result?.[1]);
                      }
                    })
                  .finally(() => {
                    this.loading = false
                    this.getPatients()
                    this.fileList = []
                    this.showModal(false)
                  })
              } else {
                this.loading = true
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
                    formData.append('projectIds', this.studyId);

                    // Append file
                    if (this.fileList.length > 0) {
                      formData.append('profileImageUrl', this.fileList[0].originFileObj);
                    }
              PatientServices.update(formData)
                .then((response) => {
                  this.success(response.message)
                  this.isCreated = false
                  this.getPatients()
                  this.fileList = []
                  this.showModal(false)
                })
                .finally(() => {
                  this.loading = false
                })
              }
            }
           
          })
      },
      showModal(e){
        this.visible=e
        if(e){
          this.selectedProject = ''
        }
        if(!e){
          this.isCreated = false
          this.entityPatient = []
          this.form.resetFields()
        }
      },
      preventDefault,
      getAllCountries()
      {
        CountryServices.getAllCountries().then((response)=>{
          this.countries= response.data
        })
      },
      cancelSelectProjectModel(e){
        this.visibleSelectProjectModel = e
      },
      getProjectId(record){
      return {
        on: {
          click: (event) => {
            this.projectId = record.globalId
            this.selectedProject = record.name
            this.projectRequired = false
            // this.fetchPatient(record.globalId)
            this.isNotSelected = false
            this.projectTxtDisabled = true
            this.cancelSelectProjectModel(false)
          },
        },
      }
    },
      searchPatient(event) {
        const keyword = event.target.value
      this.fetchPatient({
        name: keyword,
        email: keyword,
        active: true,
        isDonor: false
      })
    },
    deletePatient(id){
            this.loading = true
            const formData =new FormData()
            formData.append('patientId',id)
            PatientServices.destroy(formData).then((response)=>{
              this.success(response.message)
              this.loading = false
              this.getPatients()
            })
          },
    fetchPatient(params = {}) {
      this.loading = true
      PatientServices.searchPatient(params).then((response) => {
        this.datasource = response.data
      })
      this.loading = false
    },
    fetchProject(){
        ProjectServices.getWithOrgId().then((response)=>{
          this.projects = response.data
        })
      },
    },
  }
</script>
<style scoped>
.ant-tooltip .ant-tooltip-placement-top{
  display: none;
}
</style>