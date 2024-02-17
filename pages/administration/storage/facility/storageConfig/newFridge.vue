<template>
    <PageLayout :create="false" title="Shelf">
      <template slot="headerMenus">   
      <a-button v-if="!approval && !view" type="primary" @click="shelfCreating(true)">Add New Shelf</a-button>
       </template>
      
      <div slot="content">
        <div class="bd-r-5">
        <a-form :form="formShelf" @submit="onSubmitShelf" v-if="isShelfCreating">
          <a-col :offset="23" ><a style="color:grey"><a-icon type="close" @click="shelfCreating(false)" :style="{fontSize: '20px'}" /></a></a-col>
            <a-row class="bg-grey pt-2">
              <a-col :span="12" class="ml-10">
                <a-form-item
                  label="Shelf Name "
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 18 }"
                  class="pt-3"
                >
                  <a-input
                    v-decorator="[
                      'name',
                      {
                        rules: [
                          {
                            required:true,
                            message: 'Please input your shelf name',
                          }
                        ],
                      },
                    ]"
                    style="background-color: white"
                    placeholder="Shelf Name"
                  />
                  <a-input type="hidden"
                    v-decorator="[
                        'fridgeId',
                        {
                            initialValue: fId,
                        },
                    ]"
                />
                <a-input type="hidden"
                    v-decorator="[
                        'id',
                        {
                            initialValue: id,
                        },
                    ]"
                />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="18">
                <div v-for="(rack, index) in racks" :key="index">
                  <div class="bg-grey pt-10 pb-10 mt-10 pl-2">
                    <p>{{ rack.name }}</p>
                  </div>
                </div>
              </a-col>
            </a-row>
            <a-row class="pt-2">
              <a-col :span="6" :offset="18">
                <a-form-item>
                  <FormActionButton :loading="shelfBtnLoading"
                    class="process-btn text-left"
                    type="primary"
                    :custom-text="shelfBtnTxt"
                  />
                </a-form-item>
              </a-col>
              </a-row>
              </a-form>
              <div class="ant-col ant-col-24 mt-15" v-if="shelfData.length===0">
                <a-empty >
                  <span > There is no <a>Shelf</a> </span>
                </a-empty>
              </div>
              <a-row>
                <div  >
                <a-tabs v-model="activeTab" class="h-tabs" >
                  <a-tab-pane v-for="shelf in shelfData" :key="shelf.id" >
                    <template #tab >
                    <span>
                      {{ shelf.name }}
                      <a-dropdown v-if="!approval && !view">
                        
                        <a-icon type="more" />
                        
                        <a-menu slot="overlay">
                          <a-menu-item key="1">
                            <a @click="editShelf(shelf.id)">Edit</a>
                          </a-menu-item>
                          <a-menu-item key="2">
                            <a @click="deleteShelf(shelf.id)">Delete</a>
                          </a-menu-item>
                          
                        </a-menu>
                      </a-dropdown>
                    </span>
                  </template>
                    <div class="tabCol">
                        <a-table 
                                :columns="approval ? columnsShelfApproval : columnsShelf"
                                :data-source="shelf.shelfRacksResponseDTO"      
                                class="rounded-table pt-10 "
                                :pagination="{
                                  defaultPageSize: 5,
                                  showSizeChanger: true,
                                  pageSizeOptions: ['5', '10', '15', '20', '25'],
                                }"
                              >
                              <template slot="action" slot-scope="action">
              <a-dropdown>
                <a-button class="action-button" style="height:30px" @click="preventDefault">
                  Admin <a-icon type="down" />
                </a-button>
                <a-menu slot="overlay">
                  <a-menu-item key="1">
                    <a @click="editRack(action.id)">Edit</a>
                  </a-menu-item>
                  <a-menu-item key="2">

                    <a @click="deleteRack(action.id)">Delete</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
          </a-table>
          <a-col :offset="19">
          <a-button v-if="!approval && !view" type="primary" @click="visibleModelRack(true,shelf.id)" class="wd-11 mt-10">Add New Rack</a-button>
        </a-col>
      </div>
                  </a-tab-pane>
                </a-tabs>
              </div>
            </a-row>
      </div>
      <a-row v-if="approval && !view">
            <a-col :offset="20" v-if="showFA === activeTab">
              <a-button type="primary" class="wd-13" @click="eSignature(approve)" :loading="btnLoading">Approve</a-button>
            </a-col>
            <a-col :offset="20" class="mt-10" v-if="showFA === activeTab">
              <a-button type="danger" class="wd-13" @click="reasonModal(reject, true)" :loading="btnLoading">Reject</a-button>
            </a-col>
        </a-row>
         <a-modal
          :visible="visibleRackModal"
          title="Add Rack"
          class="support-add-modal"
          :dialog-style="{ top: '20px' }"
          :loading="loading"
          :footer="null"
          :width="600"
          @cancel="visibleModelRack(false)"
        >
        <a-form :form="rackForm" @submit="onSubmitRack">
          <a-row>
            <a-form-item>
              <a-input
                type="hidden"
                v-decorator="[
                  'shelfId',
                  {
                    initialValue: shelfId,
                  },
                ]"
              />
              <a-input
              type="hidden"
                v-decorator="[
                  'id',
                  {
                    initialValue: ticketRack.id,
                  },
                ]"
              />
            </a-form-item>
            <a-col :span="24" class="bg-grey">
              <a-form-item
                label="New Rack"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 24 }"
                class="ml-10 mr-10"
              >
                <a-input
                  v-decorator="[
                    'name',
                    {
                      initialValue: ticketRack.name,
                      rules: [
                        {
                          required: true,
                          message: 'Please input your rack name',
                        },
                        {
                          message: 'Please enter a rack name',
                        },
                      ],
                    },
                  ]"
                  style="background-color: white"
                  placeholder="Rack Name"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24" class="bg-grey">
              <a-form-item
                label="No of Columns"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 24 }"
                class="ml-10 mr-10"
              >
                <a-input
                  v-decorator="[
                    'noOfCols',
                    {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: 'Please input No of Columns',
                        },
                      ],
                    },
                  ]"
                  style="background-color: white"
                  placeholder="No of Columns"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24" class="bg-grey">
              <a-form-item
                label="No of Rows"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 24 }"
                class="ml-10 mr-10"
              >
                <a-input
                  v-decorator="[
                    'noOfRows',
                    {
                      initialValue: ticketRack.name,
                      rules: [
                        {
                          required: true,
                          message: 'Please input No o Rows',
                        },
                      ],
                    },
                  ]"
                  style="background-color: white"
                  placeholder="No Of Rows"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4" :offset="20">
              <a-form-item>
                <FormActionButton :loading="rackBtnLoading" :custom-text="isAU" class="mt-40" />
                <!-- @click="showStep(false)" -->
              </a-form-item>
            </a-col>
            <a-col :span="4"></a-col>
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
        <a-modal
          :visible="visibleReason"
          title="Reject Reason"
          class="support-add-modal"
          :dialog-style="{ top: '20px' }"
          :loading="loading"
          :footer="null"
          :width="600"
          @cancel="reasonModal('',false)"
        >
        <a-form :form="form" @submit="onSubmitReason">
          <a-row>
            <a-col :span="24" class="bg-grey">
              <a-form-item
                label="Reason"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 24 }"
                class="ml-10 mr-10"
              >
                <a-input
                  v-decorator="[
                    'reason',
                    {
                     
                      rules: [
                        {
                          required: true,
                          message: 'Please input your reason',
                        },
                      ],
                    },
                  ]"
                  style="background-color: white"
                  placeholder="Reason"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4" :offset="20">
              <a-form-item>
                <FormActionButton :loading="loading" custom-text="Submit" class="mt-40" />
                <!-- @click="showStep(false)" -->
              </a-form-item>
            </a-col>
            <a-col :span="4"></a-col>
          </a-row>
        </a-form>
        </a-modal>
         <!-- End -->
        </div>
    </PageLayout>
  </template>
  <script>
  import PageLayout from '~/components/layout/PageLayout.vue'
  import { filterOption,preventDefault } from '~/services/Helpers'
  import ShelfServices from '~/services/API/ShelfServices'
  import RackServices from '~/services/API/RackServices'
  import routeHelpers from '~/mixins/route-helpers'
  import {CONSENT_STATUSES} from '~/services/Constant/index'
  import { isEmpty } from '~/services/Utilities'
  import Signature from '~/components/signature'
  export default {
    components: {
      PageLayout,Signature
    },
    mixins: [routeHelpers],
    data() {
      return {
        ticket: {
          type: Object,
          default: () => ({}),
        },
        ticketRack: {
          type: Object,
          default: () => ({}),
        },
        rackBtnLoading:false,
        btnLoading: false,
        pending: CONSENT_STATUSES.pending.name,
        approve: CONSENT_STATUSES.approved.name,
        reject: CONSENT_STATUSES.reject.name,
        shelfBtnLoading:false,
        isShelfCreating:false,
        visibleRackModal:false,
        isCreated: false,
        shelfBtnTxt:'Save Shelf',
        isCreatedRack:false,
        isCreatedShelf:false,
        visibleReason: false,
        show: false,
        isAU:'Add',
        showFA:0,
        rackName:'',
        visible:false,
        loading: false,
        form: this.$form.createForm(this, { name: 'shelfForm' }),
        formShelf: this.$form.createForm(this, { name: 'formShelf' }),
        rackForm: this.$form.createForm(this, { name: 'rackForm' }),
        dummyData: [],
        racks: [],
        visibleSignature : false,
        frigData:{},
        shelfData:[],
        dummyDataSource:[],
          columnsShelf: [
            {
              title: 'Rack Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'No of Columns',
              dataIndex: 'noOfCols',
              key: 'noOfCols',
            },
            {
              title: 'No of Rows',
              dataIndex: 'noOfRows',
              key: 'noOfRows',
            },
            {
              title: `Status`,
              key:  `status`,
              dataIndex: `status`
            },
            {
            title: 'Action',
            key: 'action',
            scopedSlots: {
              customRender: 'action',
            }
            }
          ],
          columnsShelfApproval: [
            {
              title: 'Rack Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'No of Columns',
              dataIndex: 'noOfCols',
              key: 'noOfCols',
            },
            {
              title: 'No of Rows',
              dataIndex: 'noOfRows',
              key: 'noOfRows',
            },
          ],
        fId:'',
        shelfId: '',
        approval: false,
        view: false,
        activeTab:0
      }
    },
    watch: {
      step(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.racks = newValue
        }
      },
    },
    mounted() {
      const id = this.$route.query.id
      const fId = this.$route.query.fId
      const requestType = this.$route.query.approval
      const viewOnly = this.$route.query.view
      console.log(viewOnly)
      if(viewOnly === 'true'){
        this.view = viewOnly
      }
      if(!isEmpty(requestType) && requestType === 'true'){
        this.hideButton(requestType)
      }
      this.fId = fId
      if (id !== undefined) {
        this.isCreated = true
        this.getShelfById(id)
      }
      this.fetchShelf()
    },
    methods: {
      filterOption,
      preventDefault,
      visibleModelRack(sho,shelfId) {
        if(sho === false)
        {
          this.isAU='Add'
          this.isCreatedRack = false
          this.rackForm.resetFields()
        }
        this.shelfId = shelfId
        this.visibleRackModal = sho
      },
      hideButton(type){
        this.approval = type

      },
      showRack(e) {
        this.show = e
      },
      onSubmitReason(e) {    
        e.preventDefault()
        this.form.validateFields((err, values) => {
            if (!err) {
              this.frigData = values
              this.visibleSignature = true
            }
        })
    },
    reasonModal(status, show) {
      if(show){
        this.visibleReason = show
        this.status = status
      } else { 
        this.visibleReason = show
        this.status = ''
      }
    },
    handleSignatureOk() {
      this.visibleSignature = false
      if(this.status === this.reject)
      {
      this.upsert(this.frigData)
      }
      else{
        this.accepted(this.status)
      }
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    handleOk() {
      this.handleSignatureCancel()
    },
    eSignature(stats)
    {
      this.status = stats
      this.visibleSignature = true
    },
    upsert(values){
      this.loading = true
              const formData = new FormData()
              formData.append('status',this.status)
              formData.append('fridgeId',this.fId)
              formData.append('reason',values.reason)
              ShelfServices.approval(formData).then((response)=>{
                // this.fetchShelf()
                this.goto('/administration/storage/facility/storageConfig')
                this.reasonModal('',false)
              }).catch(this.error).finally(this.loading = false)
    },
    accepted(status){
      this.loading = true
      const formData = new FormData()
      formData.append('status',status)
      formData.append('fridgeId',this.fId)
      ShelfServices.approval(formData).then((response)=>{
        // this.fetchShelf()
        this.goto('/administration/storage/facility/storageConfig')
      }).catch(this.error).finally(this.loading=false)
    },  
      onSubmitShelf(e) {    
        e.preventDefault()
        this.formShelf.validateFields((err, values) => {
            if (!err) {
              if(!this.isCreatedShelf)
              {
                values.status = this.pending
                ShelfServices.create(values).then((response) => {
                this.shelfCreating(false)
                this.loading = false
                this.shelfBtnLoading=false
                this.shelfId = response.data.id
                this.activeTab = response.data.id
                this.formShelf.resetFields()
                this.fetchShelf()
                this.isCreated = true
                })
              }
              else{
                ShelfServices.update(values).then((response) => {
                this.shelfCreating(false)
                this.loading = false
                this.shelfBtnLoading=false
                this.shelfId = response.data.id
                this.formShelf.resetFields()
                this.fetchShelf()
                this.isCreatedShelf = false
                this.shelfBtnTxt = 'Save Shelf'
                })
              }
            }
        })
    },  
      deleteRack(id)
      {
        RackServices.deleteRack(id).then((response)=>{
          this.fetchShelf()
        })
      },
      editRack(id)
      {
        this.visibleModelRack(true,0)
        RackServices.editRack(id).then((response)=>{
          this.isCreatedRack =true
          this.rackForm.setFieldsValue({
          id: response.data.id,
          name: response.data.name,
          noOfCols: response.data.noOfCols,
          noOfRows: response.data.noOfRows,
        });
          this.isAU='Update'
        })
      }
      ,
      editShelf(id)
      {
        this.isShelfCreating = true
        ShelfServices.getShelfById(id).then((response) => {
          this.formShelf.setFieldsValue({
            name: response.data.name,
            fridgeId: response.data.globalId,
            id: response.data.id
          });
        })
        this.isCreatedShelf = true
        this.shelfBtnTxt = 'Update Shelf'
      },
      deleteShelf(id)
      {
        ShelfServices.deleteShelf(id).then((response) => {
          this.activeTab=this.shelfData[0].id
          this.fetchShelf()
        })
      },
      onSubmitRack(e) {
        this.loading = true
        this.rackBtnLoading = true
        e.preventDefault()
        this.rackForm.validateFields((err, values) => {
            if (!err) {
              if(!this.isCreatedRack)
              {
                // console.log(values)
                values.status = this.pending
                RackServices.create(values).then((response) => {
                  this.fetchShelf()
                  this.visibleModelRack(false)
                  this.rackForm.resetFields()
                  this.rackBtnLoading = false
                  this.loading = false
                  
                })
              }
              else{
                RackServices.updateRack(values).then((response) => {
                  this.fetchShelf()
                  // this.getByProcessId(this.processId)
                  this.rackBtnLoading = false
                  this.loading = false
                  this.rackForm.resetFields()
                  this.isAU='Add'
                  this.isCreatedRack = false
                  this.visibleModelRack(false)
                })
              }
              }
            }
          )
          .catch(this.error)
      },
      getByShelfId(id) {
        RackServices.getByShelfId(id).then((response) => {
          this.racks = response.data
        })
      },
      getShelfById(id) {
        ShelfServices.getById(id).then((response) => {
          this.shelfId = response.data.id
          this.getByShelfId(response.data.id)
        })
      },
      fetchShelf(){
        ShelfServices.getAllShelf(this.fId).then((response)=>{
          this.shelfData=response.data
          if(response.data.length!==0)
          {
            this.showFA = response.data[response.data.length - 1].id
           
            if(this.activeTab===0){
              this.activeTab = response.data[0].id
            }
          }
        })
      },
      shelfCreating(val)
      {
        this.shelfBtnTxt = 'Save Shelf'
        this.isShelfCreating = val
      }, 
    },
  }
  </script>