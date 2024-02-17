<template>
    <a-card :loading="loading" :bordered="null" class="plain-header-border">
      <template v-if="isConfirmReason" slot="title">
        <div><h2><b>Sample Return</b></h2></div>
      </template>
      <template slot="extra" v-if="isConfirmReason">
        <a-button type="primary" class="mr-10 btn-back" @click="goBack()">Back</a-button>
      </template>
      <div >
        <a-form :form="form" class="support-add-modal" @submit.prevent="onSubmit">
        <a-row v-if="isConfirmReason">
        <a-col :span="12">
            
          <a-button type="link" class="ml-150 wd-11" @click="showModalReason(true)">Add Reason</a-button>
                <a-form-item  class="selChangeSelect" 
                label="Reason for return"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12}">
                <a-select 
                v-decorator="[
                    'reasonId',
                    {
                    initialValue: entity.reasonId,
                    rules: [
                        {
                        required: true,
                        message: 'Select reason for return',
                        },
                    ],
                    },
                    
                ]"
                class="brd-sty"
                :show-search="true"
                :filter-option="filterOption"
                @change="(e) => handleReasonChange(e)"
                placeholder="Select reason for return"
                >
                <a-select-option v-for="reason in reasons" :key="reason.id">
                    {{ reason.name }}
                </a-select-option>
                </a-select>
            </a-form-item>
            
        </a-col>
        </a-row>
            <a-row>
              <a-col  :span="4" :offset="4">
            <a-button  type="primary" v-if="isBookCourier"  class="wd-11" @click="onBookCourier(true)"  >Book Courier</a-button>
        </a-col>
            </a-row>
        <!-- <a-row>
        <a-col :offset="1" :span="3"    >
            <h3 style="margin-top: 5px;">Authorization</h3>
        </a-col>
        <a-col :offset="1" :span="4">
            <a-button type="primary" class="wd-11" @click="showModal(true)">Enter Detail</a-button>
        </a-col>
        <div v-if="isImptyAuth">
      <span class="ant-col ant-col-20 sel-validation" >Please enter the authorization detail.</span>
      </div>
        </a-row> -->
       <div
       class="mg-t-20" 
       >
        <a-col v-if="isConfirmData" ><h2><b>Please confirm the data entered is correct.</b></h2></a-col>
            <a-row v-if="isConfirmData">
                <a-col :md="12" >
                   <a-card :offset="2" class="bg-grey">
                       <a-row :span="24" >
                        <a-col :span="12" ><h3 class="txtFt">Invoice Number</h3></a-col>
                        <a-col :span="10"><h3 class="txtTp">{{ sampleDummyData.invoiceNo }}</h3></a-col>
                       </a-row>
                       <a-row :span="24" >
                        <a-col :span="12" ><h3 class="txtFt">Waybill Number</h3></a-col>
                        <a-col :span="10"><h3 class="txtTp">{{ sampleDummyData.wayBillingNo }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" ><h3 class="txtFt">Date Received</h3></a-col>
                        <a-col :span="10"><h3 class="txtTp">{{  _getFormatMoment(sampleDummyData.dateReceived).format("DD/MM/YYYY")  }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" ><h3 class="txtFt">Courier Email</h3></a-col>
                        <a-col :span="10"><h3 class="txtTp">{{ sampleDummyData.courierEmail }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" ><h3 class="txtFt">Courier Contact</h3></a-col>
                        <a-col :span="10"><h3 class="txtTp">{{ sampleDummyData.courierContact }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" ><h3 class="txtFt">Sample Description</h3></a-col>
                        <a-col :span="10"><h3 class="txtTp">{{ sampleDummyData.description }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" ><h3 class="txtFt">Quantity Received</h3></a-col>
                        <a-col :span="10"><h3 class="txtTp">{{ sampleDummyData.totalQuantity }}</h3></a-col>
                       </a-row>
                       <a-row>
                        <a-col :span="12" ><h3 class="txtFt">Return Quantity</h3></a-col>
                        <a-col :span="10">
                                <span v-if="isEdit" class="display-flex">
                              <a-input  
                              v-model="sampleDummyData.returnQuantity" 
                              :value="sampleDummyData.returnQuantity" 
                              />
                                <a-icon type="check" class="mt-6 ml-2" @click="getTotal(sampleDummyData.returnQuantity)" /></span>
                                <h3 
                                v-else
                                class="txtClas3" 
                                >
                                    {{ sampleDummyData.returnQuantity }}
                                    <a-icon type="edit" @click="changePrice" />
                                  </h3>
                    
                        </a-col
                  >
                        </a-row>
                   </a-card>
                </a-col>
                <a-col :md="11" :offset="1" >
                    <a-card class="bg-grey">
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Researcher Name</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.reasearcherName }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Study Name</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.projectName }}</h3></a-col>
                       </a-row>
                       <!-- <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Project Name</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.projectId }}</h3></a-col>
                       </a-row> -->
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">#ARN</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.lotNo }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Protocol</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.protocolName }}</h3></a-col>
                       </a-row>
                       <!-- <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Protocol ID</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.protocolId }}</h3></a-col>
                       </a-row> -->
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Location</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.locationName }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Client</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.clientName }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt"></h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp"></h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt"></h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp"></h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt"></h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp"></h3></a-col>
                       </a-row>
                       <!-- <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Client ID</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.organizationId }}</h3></a-col>
                       </a-row> -->
                   </a-card>
                </a-col>
                <a-col :offset="21" :span="3">
                  <a-button type="primary" class="wd-11 mt-4 ml-4" @click="confirmData(true)">Confirm</a-button>
                </a-col>
            </a-row>
            <a-row>
              <a-col :span="24" v-if="isConfirm">
                <ShipmentLogistic  @handleFile="handleFile" @hideReturn="showReturn" :dummyDataSourceReturn="dataSourceReturnSample" :organization="organization" />
              </a-col>
            </a-row>
            <a-col :offset="21" :span="3">
            <FormActionButton type="primary " v-if="isConfirm" custom-text="Submit" class="wd-11"  />
        </a-col>
        </div>


      </a-form>
        <div>
          
        </div>
    <a-modal
      :footer="null"
      :width="450"
      title="Enter Staff Detail"
      :destroy-on-close="true"
      :visible="visible"
      :dialog-style="{ top: '200px' }"
      :loading="loading"
      @cancel="showModal(false)"
      @ok="showModal(false)"
    >
      <a-form :form="formCourier" class="support-add-modal" @submit.prevent="onSubmitCourier">
        <div class="bg-grey pl-10">
        <a-row :gutter="20" >
          
        <a-col :span="24" >
          <a-form-item class="selChange"
            label="Name"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: events.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Name',
                    },
                  ],
                },
              ]"
              style="width: 100%"
            size="large"
            placeholder="Name"
            />
          </a-form-item>

        </a-col>
        </a-row>
        <a-row>
        <a-col :span="24" >
          <a-form-item class="selChange"
            label="E-mail"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'email',
                {
                  initialValue: events.email,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Email',
                    },
                  ],
                },
              ]"
              placeholder="example@exapmle.com"
            />
          </a-form-item>
        </a-col>
          
        </a-row>
        
        <a-row :gutter="20">
          <a-col :span="24">
            <a-form-item class="selChange"
              label="Role"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 12 }"
            >
            <a-select
            v-decorator="[
              'roleId',
              {
                initialValue: events.roleId,
                rules: [
                  {
                    required: true,
                    message: 'Please select your role',
                  },
                ],
              },
            ]"
            :show-search="true"
            :filter-option="filterOption"
            placeholder="Please select your role"
            style="width: 100%"
            size="large"
            class="default-select"
          >
            <a-select-option v-for="role in roles" :key="role.id">
              {{ role.name }}
            </a-select-option>
          </a-select>
            </a-form-item>
            <!-- <a-button type="link" class="roleClas"  @click="showModalRole(true)">Add Role</a-button> -->
          </a-col>
          </a-row>
          <a-row :gutter="20">
          
          <a-col :span="24">
            <a-form-item class="selChange"
              label="Date"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-input 
                v-decorator="[
                  'partnerName',
                  {
                    initialValue: events.partnerName,
                    rules: [
                      {
                        required: true,
                        message: 'Please input Name',
                      },
                    ],
                  },
                ]"
              type="date"
                placeholder="Select Date"
              />
            </a-form-item>
  
          </a-col>
          </a-row>
          <a-row :gutter="20">
          
          <a-col :span="24">
            <a-form-item class="selChange"
              label="Phone Number"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-input
                v-decorator="[
                  'phoneNumber',
                  {
                    initialValue: events.phoneNumber,
                    rules: [
                      {
                        required: true,
                        message: 'Please input Name',
                      },
                    ],
                  },
                ]"
                placeholder="+44000000000000"
              />
            </a-form-item>
  
          </a-col>
          </a-row>
        </div>
        <a-row >
          <a-col :span="2" :offset="8" class="mg-t-20" >
            <FormActionButton  custom-text="Authorize" :is-created="isCreated"  :loading="loading" />
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <!-- Add Reason -->
    <a-modal
      :footer="null"
      :width="750"
      title="Reason"
      :destroy-on-close="true"
      :visible="visibleReason"
      :dialog-style="{ top: '200px' }"
      :loading="loading"
      @cancel="showModalReason(false)"
      @ok="showModalReason(false)"
    >
      <a-form :form="formReason" class="support-add-modal" @submit.prevent="onSubmitReason">
        <a-form-item>
          <a-input 
              v-decorator="[
                'reasonId',
                {
                  initialValue: ticket.id,
                },
              ]"
          type="hidden"
            /> 
        </a-form-item>
        <div class="">
          <a-row :gutter="20">
          <a-col :span="12">
          <a-form-item
            label="Add Reason *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input ref="reasonTxtBox"
              v-decorator="[
                'reasonName',
                {
                  initialValue: ticket.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input reason',
                    },
                  ],
                },
              ]"
              placeholder="Reason "
              @blur="isReasonExist"
            /> 
            </a-form-item
        ><div v-if="isExistReas" class="txt-red">Consent Already Exist</div></a-col>
        
          
        </a-row>
       

        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :is-created="isCreated" :loading="loading" />
          </a-col>
        </a-row>
        </div>
      </a-form>

      <div >
        <a-table
          :columns="columnsReason"
          :data-source="datasourceReason"
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
                Admin <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="getReasonById(action.id)">Edit</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <a @click="delReason(action.id)">Delete</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>

    </a-modal>

    <!-- End Modal -->

    <!-- Add Role Modal -->
    <a-modal
      :footer="null"
      :width="750"
      title="Role"
      :destroy-on-close="true"
      :visible="visibleRole"
      :dialog-style="{ top: '200px' }"
      :loading="loading"
      @cancel="showModalRole(false)"
      @ok="showModalRole(false)"
    >
      <a-form :form="formRole" class="support-add-modal" @submit.prevent="onSubmitRole">
        <div class="">
          <a-row :gutter="20">
          <a-col :span="12">
          <a-form-item
            label="Add Role *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: roleticket.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input role',
                    },
                  ],
                },
              ]"
              placeholder="Enter Role"
            /> 
            </a-form-item
        ></a-col>
        
          
        </a-row>
       

        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :is-created="isCreated" :loading="loading" />
          </a-col>
        </a-row>
        </div>
      </a-form>

      <div >
        <a-table
          :columns="columnsRole"
          :data-source="datasourceRole"
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
                Admin <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="goto(`/users/${action.globalId}`)">Edit</a>
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
                  <span>Delete</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>

    </a-modal>

    <!-- End Modal -->
      </div>
    </a-card>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { filterOption,preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  // import PageLayout from '~/components/layout/PageLayout'
  import ReasonServices from '~/services/API/ReasonServices'
  import RoleServices from '~/services/API/RoleServices'
  import StaffServices from '~/services/API/StaffServices'
  import SampleServices from '~/services/API/SampleServices'
  import SampleReturnServices from '~/services/API/SampleReturnServices'
  import { isEmpty } from '~/services/Helpers'
  import { _getFormatMoment } from '~/services/Helpers/MomentHelpers'
  import ShipmentLogistic from '~/pages/inbound/samples/shipmentLogistic'
  import OrganizationServices from '~/services/API/OrganizationServices'
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { 
      // PageLayout,
      ShipmentLogistic},
    mixins: [routeHelpers, notifications],
    props:{
        
      events: {
        type: Object,
        default: () => ({}),
      },
      roleticket: {
        type: Object,
        default: () => ({}),
      }
    },
    data() {
      return {
        isImptyAuth:false,
        sampleReturnId:0,
        staffId:0,
        isShow:false,
        isExistReas:false,
        sampleId:'',
        reasons:[],
        visible:false,
        bookCourier: false,
        organization: [],
        visibleReason:false,
        isBookCourier: true,
        dataSourceReturnSample: [],
        visibleRole:false,
        formCourier: this.$form.createForm(this, {
          name: 'courierCreate',
        }),
        form: this.$form.createForm(this, {
          name: 'formCreate',
        }),
        formReason: this.$form.createForm(this, {
          name: 'reasonCreate',
        }),
        formRole: this.$form.createForm(this, {
          name: 'roleCreate',
        }),
        entity: {
        type: Object,
        default: () => ({}),
        },
        ticket: {
        type: Object,
        default: () => ({}),
        },
        sampleDummyData:
          { },
          columnsReason: [
          {
            title: 'Reason Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        reasonId: 0,
        isConfirmReason: true,
        isConfirmData: false,
        datasourceReason:[],
        columnsRole: [
          {
            title: 'Role Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourceRole:[],
        oId:0,
        roles:[
        ],
        loading:false,
        isCreated:false,
        isEdit: false,
        totalQuantity: 0,
        returnedQuantity:0,
        fileList: [],
        isConfirm: false,
      }
    },
    computed: {
     
    },
    mounted() {
      this.sampleId = this.$route.query.id;
      this.fetchAllReasons()
      this.getSample()
      this.getSampleReturnById(this.$route.query.samRetGuid)
    },
    methods: {
      filterOption,
      preventDefault,
      _getFormatMoment,
      showModal(show) {
      this.visible = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    showModalReason(show) {
      this.isCreated = false
      this.visibleReason = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    isDataConfirmed(e){
      this.isConfirm = e
    },
    getReasonById(id){
      ReasonServices.getById(id).then((response)=>{
        this.formReason.setFieldsValue({
          reasonId: response.data.id,
          reasonName: response.data.name
        })
        this.isCreated = true
      })
    },
    confirmData(e){
      this.form.validateFields((err,values)=>{
        if(!err){
          this.isConfirm = e
          this.isConfirmReason = !e
          this.isConfirmData = !e
        }
      })

    },  
    isReasonExist(event){
      this.isExistReas = false
      const name= event.target.value
      ReasonServices.isReasonExist(name).then((response)=>{
        if(response.data !== null)
        {
          this.isExistReas = true
          this.$refs.reasonTxtBox.focus()
        }
      })
    },
    getOrganization(id)
    {
      OrganizationServices.getById(id).then((response)=>{
        this.organization = response.data
        // this.events.organizationName = response.data.name
        this.dataSourceReturnSample=[response.data]
      })
    },
    delReason(id)
    {
      ReasonServices.deleteReason(id).then((response)=>{
        this.fetchAllReasons()
      })
      
    },
    showModalRole(show) {
      this.visibleRole = show
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
            StaffServices.create(values).then((response)=>{
              this.isImptyAuth = false
              this.loading=false
              this.visible=false

            })
          }
        } else {
          this.loading = false
        }
      })
    },
    getTotal(quantity){
      if(quantity > this.totalQuantity || quantity < 1 ){
        this.sampleDummyData.returnQuantity = this.totalQuantity
        if(this.isCreated){
          this.sampleDummyData.returnQuantity = this.returnedQuantity
        }
        this.error()
      }
      this.isEdit = false
    },
    error() {
      this.$error({
        title: 'You cannot return more/less than remaining quantity',
      });
    },
    changePrice(){
      this.isEdit = true
    },
    getSampleReturnById(id){
      if(!isEmpty(id)){
        this.loading = true
        SampleReturnServices.srgetById(id).then((response)=>{
          this.entity = response.data
          this.isCreated = true
          this.getSample(response.data.sampleId)
        }).catch(this.error).finally(this.loading = false)
      }
    },
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values, 'shipment values')
            const formData = new FormData()
            if(!isEmpty(this.entity.id)){formData.append('id',this.entity.id)}
            formData.append('sampleId',this.sampleId)
            formData.append('returnQuantity',this.sampleDummyData.returnQuantity)
            formData.append('consigneeId', values.consigneeId)
            formData.append('courierId', values.courierId)
            formData.append('courierServiceAllocationId', values.courierServiceAllocationId)
            formData.append('dateOfShipment', values.dateOfShipment)
            formData.append('dated', values.dated)
            formData.append('organizationName', values.organizationName)
            formData.append('phoneNo', values.phoneNo)
            // formData.append('reasonId', values.reasonId)
            formData.append('shipingNo', values.shipingNo)
            formData.append('temprature', values.temprature)
            formData.append('organizationId',values.organizationId)
            formData.append('reasonId',this.reasonId)
            console.log(this.fileList)
            this.fileList.forEach((files) => {
              formData.append('shippingDocumentImage', files)
            })
          if (this.isCreated) {
            this.loading = true
           SampleReturnServices.update(formData).then((response)=>{
            this.sampleReturnId = response.data.sampleReturnId
            this.goto('/inbound/samples')
           }).catch(this.error).finally(this.loading = false)
          } else {
            SampleReturnServices.create(formData).then((response)=>{
              this.sampleReturnId = response.data.result.sampleReturnId
              this.loading=false
              this.goto('/inbound/samples/sampleNotice?id='+this.sampleReturnId+'&oId='+this.oId)
            })
        }
        } else {
          this.isImptyAuth = true
          this.loading = false
        }
      })
    },
    handleReasonChange(e){
      this.reasonId = e
      // alert(e)
    },
    getSample()
    {
      SampleServices.getById(this.sampleId).then((response)=>{
        this.sampleDummyData = response.data
        this.oId=response.data.organizationId
        this.getOrganization(this.oId)
        if(this.isCreated){
          this.sampleDummyData.returnQuantity = this.entity.returnedQuantity
          this.returnedQuantity = this.entity.returnedQuantity
          this.totalQuantity = this.entity.returnedQuantity
        } else {
          this.totalQuantity = response.data.returnQuantity
        }
      })
    },
    onSubmitReason(e) {
      e.preventDefault()
      this.formReason.validateFields((err, values) => {
        if (!err) {
          if(!this.isExistReas){
          this.loading = true
          if (this.isCreated) {
            ReasonServices.update(values).then((response)=>{
              this.loading=false
              this.isCreated = false
              this.formReason.resetFields()
              this.fetchAllReasons()
            })
          } else {
            ReasonServices.create(values).then((response)=>{
              this.fetchAllReasons()
              this.loading=false
              this.formReason.resetFields()
            })
          }
        }
        } else {
          this.loading = false
        }
      })
    },
    onSubmitRole(e) {
      this.loading = true
      e.preventDefault()
      this.formRole.validateFields((err, values) => {
        if (!err) {
          if (this.isCreated) {
            this.updateRole(values)
          } else {
            RoleServices.create(values).then((response)=>{
              this.visibleRole=false
              this.fetchAllRole()
              this.loading=false
            })
          }
        } else {
          this.loading = false
        }
      })
    },
    onBookCourier(show){
      this.form.validateFields((err,values)=>{
        if(!err){
          this.isShow = show
          this.bookCourier = show
          this.isConfirmData = show
          this.isBookCourier = !show
        }
      })
      
    },
    showReturn(show){
          this.isShow = show
          this.bookCourier = show
          this.isConfirmData = show
          this.isConfirmReason = show
          this.isConfirm = !show
          this.isBookCourier = !show
          this.entity.reasonId = this.reasonId
    },
    fetchAllReasons()
    {
      ReasonServices.get().then((response)=>{
        this.reasons=response.data
        this.datasourceReason=response.data
      })
    },
    fetchAllRole()
    {
      RoleServices.get().then((response)=>{
        this.reasons=response.data
        this.datasourceRole=response.data
      })
    },
    handleFile(info){
      this.fileList = info
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
  margin-left: 10px;
}
.mg-t-20{
  margin-top: 20px;
}
.mt-300{
  margin-top: 300px;
}
.text-container {
  max-width: 400px; /* Set a max width as needed */
  word-wrap: break-word; /* Allow words to break to the next line */
}
</style>