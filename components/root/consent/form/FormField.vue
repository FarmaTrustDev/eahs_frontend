<template>
    <div class="ml-35"> 
      <a-row>
        <a-row>
        <a-col :span="12">
          <a-form-item
            label="Project Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input ref="projNam"
              v-decorator="[
                'name',
                {
                  initialValue: entity.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input your project name',
                    },
                  ],
                },
              ]"
              placeholder="Project Name"
              @blur="isProjectExist"
            /> <div v-if="isExist" class="txt-red">Project Already Exist</div></a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item
            label="Project Description *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input 
              v-decorator="[
                'description',
                {
                  initialValue: entity.description,
                  rules: [
                    {
                      required: true,
                      message: 'Please input your project description',
                    },
                  ],
                },
              ]"
              placeholder="Project Description"
            /></a-form-item
        ></a-col>
        </a-row>
        <a-row>
        <a-col :span="12">
          
          <a-form-item
            label="Principle Investigator *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
          <a-input 
          v-decorator="[
                  'investigatorIds',
                  {
                    initialValue: investigatorIds,
                    rules: [
                        {
                        required: investigatorRequired,
                        message: 'Please select your investigator',
                        },
                    ],
                    },
                ]"

          type="hidden"
          />
          
          <!-- :required="investigatorRequired" -->
          <a-input
                :value="selectedInvestigator"
                placeholder="Principle Investigator"
                size="large"
                required="true"
                style="max-width: 100%"
                @click="investigatorModal(true)"
                /> 
                <span v-if="investigatorRequired" class="color-red">Please select your investigator</span>
                <!-- :value="selectedInvestigator" -->
            <!-- <a-select
              v-decorator="[
                'investigatorIds',
                {
                  initialValue: investigatorIds,
                  rules: [
                    {
                      required: true,
                      message: 'Please select your project investigator',
                    },
                  ],
                },
              ]"
              :get-popup-container="trigger => trigger.parentNode"
              mode="multiple"
              :show-search="true"
              :filter-option="filterOption"
              :defaultValue="selectedInvestigator"
              placeholder="Principal Investigator"
              style="width: 100%"
              size="large"
              @click="investigatorModal(true)"
            >
              <a-select-option v-for="investigator in investigators" :key="investigator.investigatorId">
                {{ investigator.name }}
              </a-select-option>
            </a-select> -->
         
          </a-form-item>
          
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="Date *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
          <a-date-picker
            v-decorator="[
              'projectDate',
              {
                initialValue: entity.projectDate,
                rules: [
                  {
                    required: true,
                    message: 'Required',
                  },
                ],
              },
            ]"
            placeholder="DD/MM/YYYY"
            :disabled-date="disabledDate"
            format="DD/MM/YYYY"
            style="width: 100%"
            size="large"
          >
          </a-date-picker>
          </a-form-item>
        </a-col>
      </a-row>
        <a-col :span="12">
          
          <a-form-item
            label="Partners *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-select 
              v-decorator="[
                'partnerId',
                {
                  initialValue: entity.partnerId,
                  rules: [
                    {
                      required: true,
                      message: 'Please select your partner',
                    },
                  ],
                },
              ]"
              :get-popup-container="trigger => trigger.parentNode"
              mode="multiple"
              :show-search="true"
              :filter-option="filterOption"
              placeholder="Partner"
              style="width: 100%"
              size="large"
              class="default-select"
              :default-active-first-option="false"
            >
              <a-select-option v-for="partner in partners" :key="partner.id">
                {{ partner.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        
      </a-row>

      <div>
    <a-modal
      :footer="null"
      :width="750"
      title="Add Investigator"
      :destroy-on-close="true"
      :visible="visibleInv"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModal(false)"
      @ok="showModal(false)"
    >
      <a-form :form="formInvest" class="support-add-modal" @submit.prevent="onSubmitInvestigator">
        <a-form-item>
            <a-input
              v-decorator="[
                'investigatorId',
                {
                  initialValue: ticket.investigatorId,
                },
              ]"
              type="hidden"
            /> 
          </a-form-item>
        <a-row :gutter="20">
          <a-col :span="12">
          <a-form-item
            label="Investigator Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'investigatorName',
                {
                  initialValue: ticket.investigatorName,
                  rules: [
                    {
                      required: true,
                      message: 'Please input investigator name',
                    },
                    {
                      message: 'Please enter a valid name'
                    }
                  ],
                },
              ]"
              placeholder="Investigator Name"
            /> 
            </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item
            label="Description *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 23 }"
          >
            <a-input
              v-decorator="[
                'investigatorDescription',
                {
                  initialValue: ticket.investigatorDescription,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Description',
                    },
                    {
                      message: 'Please enter a valid Description'
                    }
                  ],
                },
              ]"
              
            />
          </a-form-item>
        </a-col>
          
        </a-row>
       

        <a-row class="">
          <a-col :span="2" :offset="21">
            <FormActionButton :is-created="isCreated" custom-text="Create" :loading="loading" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
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
          <template slot="action" slot-scope="action">
            <a-dropdown>
              <a-button class="action-button" @click="preventDefault">
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="fetchInvestigatorById(action.investigatorId)">{{
                    translation.Edit_1_450
                  }}</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <!-- <a-popconfirm
                    :title="translation.Areyou_4_484"
                    :ok-text="translation.yes_1_654"
                    :cancel-text="translation.no_1_656"
                    placement="topLeft"
                    @confirm="deleteUser(`${action.globalId}`)"
                  >
                  </a-popconfirm> -->
                  <span>{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
    <a-modal
      :footer="null"
      :width="750"
      title="Add Partner"
      :destroy-on-close="true"
      :visible="visiblePar"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModal1(false)"
      @ok="showModal1(false)"
    >
      <a-form :form="formPart" class="support-add-modal" @submit.prevent="onSubmitPartner">
        <a-form-item>
          <a-input v-decorator="[
                'partnerId',
                {
                  initialValue: partnerevent.partnerId,
                },
              ]"  type="hidden" />
        </a-form-item>
        <a-row :gutter="20">
          
        <a-col :span="12">
          <a-form-item
            label="Partner Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'partnerName',
                {
                  initialValue: partnerevent.partnerName,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Name',
                    },
                    {
                      message: 'Please enter a valid Name'
                    }
                  ],
                },
              ]"
              
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="Description *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 23 }"
          >
            <a-input
              v-decorator="[
                'partnerDescription',
                {
                  initialValue: partnerevent.partnerDescription,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Description',
                    },
                    {
                      message: 'Please enter a valid Description'
                    }
                  ],
                },
              ]"
              
            />
          </a-form-item>
        </a-col>
          
        </a-row>
       

        <a-row class="">
          <a-col :span="2" :offset="21">
            <FormActionButton  :loading="loading"  custom-text="Create" :is-created="isCreatedPartner" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        
        <a-table
          :columns="columnsPartner"
          :data-source="datasourcePartner"
          :loading="loading"
          class="rounded-table pt-10 users-list"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
        >
        
          <template slot="action" slot-scope="action">
            <a-dropdown>
              <a-button class="action-button" @click="preventDefault">
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="fetchPartnerById(action.partnerId)">{{
                    translation.Edit_1_450
                  }}</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <!-- <a-popconfirm
                    :title="translation.Areyou_4_484"
                    :ok-text="translation.yes_1_654"
                    :cancel-text="translation.no_1_656"
                    placement="topLeft"
                    @confirm="deleteUser(`${action.globalId}`)"
                  >
                  </a-popconfirm> -->
                  <span>{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal >
    <a-modal 
        :visible="showInvestigator"
        title="Select Principle Investigator"
        @cancel="investigatorModal(false)"
        >
        <a-table 
        :columns="columnsInvestigator"
        :data-source="investigators"
        :row-key="(record)=> record.id"
        class="rounded-table"
        :width="750"
        :loading="loading"
        :show-header="false"
        :custom-row="getInvestigatorId"
        >
        </a-table>
        </a-modal>
  </div>

    </div>
  </template>
  
  <script>
  import { _disabledFutureDate } from '~/services/Helpers/MomentHelpers'
  import {  filterOption,preventDefault } from '~/services/Helpers'
  import PartnerServices from '~/services/API/PartnerServices'
  import InvestigatorServices from '~/services/API/InvestigatorServices'
  import OrganizationServices from '~/services/API/OrganizationServices'
  import nullHelper from '~/mixins/null-helpers'
  import ProjectServices from '~/services/API/ProjectServices'
  import { isEmpty } from '~/services/Utilities'
  export default {
    mixins: [nullHelper],
    props: {
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
        selectedInvestigator: '',
        selectInvestigators :[],
        investigatorId: [],
        investigatorIds: 0,
        showInvestigator: false,
        investigatorRequired: false,
        isExist:false,
        ticket: { 
        type: Object,
         default: () => ({}) 
        },
        partnerevent: { 
        type: Object,
         default: () => ({}) 
        },
        isCreatedPartner:false,
        isCreated:false
        ,
        datasource: [],
        columns: [
          {
            title: 'Investigator Name',
            dataIndex: 'name',
            key: 'investigatorName',
          },
          {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
          },
          // {
          //   title:'Description',
          //   dataIndex: 'description',
          //   key: 'description',
          // },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        columnsInvestigator : [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
          },
          // {
          //   title: 'Description',
          //   dataIndex: 'description',
          //   key: 'description'
          // },
          {
            title: 'Country',
            dataIndex: 'country',
            key: 'country'
          }
        ],
        datasourcePartner: [],
        columnsPartner: [
          {
            title:'Partner Name',
            dataIndex: 'partnerName',
            key: 'partnerName',
          },
          {
            title:'Description',
            dataIndex: 'description',
            key: 'description',
          }
          ,
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        visibleInv: false,
        
        visiblePar: false,
        entityId: null,
        loading: false,
        partners:[],
        investigators:[],
        formLayout: 'vertical',
        formInvest: this.$form.createForm(this, {
          name: 'investCreate',
        }),
        formPart:this.$form.createForm(this, {
          name: 'partCreate',
        }),
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
      },
      entity(newValue, oldValue){
        if(newValue!== oldValue){
          this.setTextInInvestigator(this.entity.investigators)
        }
      }
    },
    mounted() {
      this.fetchPartners()
      this.fetchInvestigator()
      this.fetchAllInvestigator()
      this.fetchAllPartnerList()
      if(!isEmpty(this.entity)){
        this.setTextInInvestigator(this.entity.investigators)
      }
    },
    
    methods: {
      filterOption,
      preventDefault,
      showModal(show) {
      this.visibleInv = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    investigatorModal(e){
      this.showInvestigator = e
    },
    
    // filterOption(input, option) {
    //   // Implement custom filtering logic here
    //   // Return true if the option should be displayed, false otherwise

    //   const optionLabel = option.componentOptions.children[0].text.toLowerCase();
    //   return optionLabel.includes(input.toLowerCase());
    // },
    showModal1(show) {
      this.visiblePar = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    getInvestigatorId(record){
      return {
        on: {
          click: (event) => {
            
            if(this.investigatorId.includes(record.investigatorId)){
              const ind = this.investigatorId.findIndex(id => id === record.investigatorId)
              this.investigatorId.splice(ind,1)
              this.investigatorIds = JSON.stringify(this.investigatorId)
              console.log(this.investigatorIds , 'select wala')
            } 
            else{
              console.log(record)
              this.investigatorId.push(record.investigatorId)
              this.investigatorIds = JSON.stringify(this.investigatorId)
              console.log(this.investigatorIds)
            }
            const ifAlreadyExist = this.selectInvestigators.includes(record.name)
            if(!ifAlreadyExist){
              this.selectInvestigators.push(record.name)
              this.selectedInvestigator = JSON.stringify(this.selectInvestigators).replace('[','').replace(']','')
              this.investigatorRequired = false
            }
            else{
              const ind = this.selectInvestigators.findIndex(name => name === record.name)
              this.selectInvestigators.splice(ind,1)
              this.selectedInvestigator = JSON.stringify(this.selectInvestigators).replace('[','').replace(']','')
              if(isEmpty(this.selectedInvestigator)){
                this.investigatorRequired = true
              }
            }
            
            // this.fetchPatient(record.globalId)
            // this.projectTxtDisabled = true
            this.investigatorModal(false)
          },
        },
      }
    },
    isInvestigatorRequired(e){
      this.investigatorRequired = e
    },
      setTextInInvestigator(investigators){
        const investigatorNames = investigators.map(investigator => investigator.investigatorName)
        this.selectedInvestigator = JSON.stringify(investigatorNames).replace('[','').replace(']','')
        this.selectInvestigators = investigatorNames
        this.investigatorId = investigators.map(investigator => investigator.investigatorId)
        this.investigatorIds = JSON.stringify(this.investigatorId).replace('[','').replace(']','')
      },
      handleChange(info) {
        this.fileList = info
        this.$emit('handleChange', this.fileList)
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
      
      disabledDate: _disabledFutureDate,
      fetchPartners() {
        OrganizationServices.getAll().then((response) => {
          this.partners = response.data
          this.datasourcePartner = response.data
        })
      },
      fetchInvestigator(params = {}) {
        InvestigatorServices.get(params).then((response) => {
          this.investigators = response.data.data
        })
      },
      fetchAllInvestigator(params = {}) {
        InvestigatorServices.get(params).then((response) => {
          this.datasource = response.data.data
        })
      },
      fetchAllPartnerList() {
        OrganizationServices.getPartners().then((response) => {
          this.datasourcePartner = response.data.data
        })
      },
      fetchInvestigatorById(id){
        InvestigatorServices.getById(id).then((response) => {
            this.ticket = response.data
            this.isCreated = true
        })
      },
      fetchPartnerById(id){
        PartnerServices.getById(id).then((response) => {
            this.partnerevent = response.data
            this.isCreatedPartner = true
        })
      },
      isProjectExist(event)
      {
        this.isExist = false
        const projName=event.target.value
        ProjectServices.isProjectExist(projName).then((response)=>{
          if(response.data.name !== "")
          {
            this.isExist=true
            this.$refs.projNam.focus();
          }
        })
      },
    onSubmitPartner(e) {
      this.loading = true
      e.preventDefault()
      this.formPart.validateFields((err, values) => {
        if (!err) {
          if(this.isCreatedPartner)
          {
            PartnerServices.update(values.partnerId , values).then((response)=>{
              this.fetchPartners()
              this.visiblePar=false
              this.loading = false
            })
          }
          else{
          PartnerServices.create(values).then((response)=>{
            this.visiblePar=false
            this.loading = false
            this.fetchPartners()
          })
        }
        } 
      })
    }
    },
  }
  </script>
