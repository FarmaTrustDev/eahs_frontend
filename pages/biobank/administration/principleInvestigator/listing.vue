<template>
  <page-layout
  :create="false"
  title="Principle Investigator"
  >
  <a-button slot="headerMenus" type="primary" class="wd-40" @click="visibleModal(true)">Add New Investigator</a-button>
        <div slot="content">
          <a-row>
              <!-- <a-col :span="15">

              </a-col> -->
              <!-- <a-col :span="4"> -->
                <!-- <a-input
                          ref="userNameInput"
                          class="page-search-input wd-100"
                          placeholder="Search Donor"
                          @keyup="searchDonor"
                          >
                      <a-icon slot="prefix" type="search" />
                      </a-input> -->
              <!-- </a-col> -->
              <!-- <a-col :span="5"> -->
                
              
              <!-- </a-col> -->
            </a-row>
            <a-table
            :columns="columns"
            :data-source="investigators"
            :loading="loading"
            :pagination="{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '30', '50', '100'],
              }"
              class="rounded-table"
            >
                <template slot="action" slot-scope="action">
                <a-dropdown>
                  <a-button class="action-button">
                    Admin <a-icon type="down" />
                  </a-button>
                  <a-menu slot="overlay">
                    <a-menu-item key="1">
                      <a @click="getById(action.investigatorId)">Edit</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a-popconfirm
                    title="Are you sure you want to delete this investigator ?"
                    ok-text="Yes"
                    cancel-text="No"
                    placement="topLeft"
                    @confirm="deleteInvestigator(action.investigatorId)"
                    >
                    <span>Delete</span>
                  </a-popconfirm>
                      <!-- <span @click="deletePatient(action.id)">Delete</span> -->
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </template>
            </a-table>
            <a-modal
          :footer="null"
          :width="750"
          title="Add Investigator"
          :destroy-on-close="true"
          :visible="visibleInv"
          :dialog-style="{ top: '20px' }"
          :loading="loading"
          @cancel="visibleModal(false)"
          @ok="visibleModal(false)"
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
           <a-row :gutter="20">
            <a-col :span="12">
        
        <a-form-item
          label="Nationality *:"
        >
          <a-select
            v-decorator="[
              'country',
              {
                initialValue: ticket.country,
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
      <a-col :span="12">
          
          <a-form-item label="Email address: *">
            <a-input
              v-decorator="[
                'email',
                {
                  initialValue: ticket.email,
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
           </a-row>
        
            <a-row class="">
              <a-col :span="2" :offset="21">
                <FormActionButton :is-created="isCreated" custom-text="Create" :loading="loading" />
              </a-col>
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
      </page-layout>
    </template>
    <script>
    import PageLayout from '~/components/layout/PageLayout'
    import { preventDefault } from '~/services/Helpers'
    import notifications from '~/mixins/notifications'
    import InvestigatorServices from '~/services/API/InvestigatorServices'
    import CountryServices from '~/services/API/CountryServices'
    import Signature from '~/components/signature'
      export default{
        components: { PageLayout ,Signature},
        mixins: [ notifications],
        data(){
            return {
                loading:false,
                isCreated:false,
                visibleInv:false,
                investData:{},
                visibleSignature : false,
                ticket: { 
                type: Object,
                default: () => ({}) 
                },
                countries:[],
                columns: [
                  {
                    title: 'Investigator Name',
                    dataIndex: 'name',
                    key: 'investigatorName',
                  },
                  {
                    title:'Description',
                    dataIndex: 'description',
                    key: 'description',
                  },
                  {
                    title: 'Email',
                    dataIndex : 'email',
                    key: 'email',
                  },
                  {
                    title: 'Username',
                    dataIndex : 'username',
                    key: 'username',
                  },
                  {
                    title: 'Country',
                    dataIndex : 'country',
                    scipedSlots:{customRender: 'country'},
                  },
                    
                  {
                    title: `Action`,
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                  },
                ],
                investigators:[],
                formLayout: 'vertical',
                formInvest: this.$form.createForm(this, {
                  name: 'investCreate',
                }),
            }
        },
        mounted() {
          this.fetchAllInvestigator()
        },
        methods: {
          preventDefault,
          fetchAllInvestigator(params = {}) {
        InvestigatorServices.get(params).then((response) => {
          this.investigators = response.data.data
        })
      },
      getAllCountries()
        {
          CountryServices.getAllCountries().then((response)=>{
            this.countries= response.data
          })
        },
      onSubmitInvestigator(e) {

            e.preventDefault()
            this.formInvest.validateFields((err, values) => {
              if (!err) {
               this.investData = values
               this.visibleSignature = true
            } 
          })
          },

          handleSignatureOk() {
            this.visibleSignature = false
            this.upsert(this.investData)
          },
          handleSignatureCancel(){
            this.visibleSignature = false
            this.loading = false
          },
          handleOk() {
            this.handleSignatureCancel()
          },

          upsert(values){
            if(this.isCreated)
                {
                  this.loading = true
                  InvestigatorServices.update(values.investigatorId , values).then((response)=>{
                    this.visibleModal(false)
                    this.fetchAllInvestigator()
                  }).catch(this.error).finally(this.loading = false)
                }
                else{
                  this.loading = true
                InvestigatorServices.create(values).then((response)=>{
                  this.fetchAllInvestigator()
                  this.visibleModal(false)
                }).catch(this.error).finally(this.loading = false)
              }
          },
          deleteInvestigator(id){
            this.loading = true
            InvestigatorServices.destroy(id).then((response)=>{
              // this.success(this,{message: response.message})
              this.fetchAllInvestigator()
            }).catch(this.error).finally(this.loading = false)
          },
          visibleModal(e){
            this.visibleInv = e
            if(e){
              this.getAllCountries()
            }
            else{
              this.ticket = []
              this.isCreated = false
            }
          },
          getById(id){
            InvestigatorServices.getById(id).then((response) => {
                this.ticket = response.data
                this.isCreated = true
                this.visibleModal(true)
            })
          },
        },
      }
    </script>