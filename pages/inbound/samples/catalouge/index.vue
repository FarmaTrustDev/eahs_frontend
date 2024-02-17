<template>
  <page-layout
    :loading="false"
    title="Inbound/Sample Reception/ Publish to Catalogue"
    class="specific container page-search-input-container"
    :create="false"
  >
    <div slot="content">
      <div class="ant-col ant-col-11">
            <div class="ant-col ant-col-24 mt-20 txtClas">Catalogue Entry:</div>
            <div class="ant-col ant-col-10 mt-15 ml-15 txtClas">Sample Name:</div>
            <div
              class="ant-col ant-col-10 ml-15 mt-15"
              style="font-size: 23px; font-weight: 300"
            >
              {{ sampleDummyData.name }}
            </div>
            <div class="ant-col ant-col-24 mt-15 ml-15 txtClas">
              Sample Description:
            </div>
            <div
                class="
                  ant-col ant-col-24
                  bg-grey
                  mt-15
                  ml-15
                  pd-lf-20 pd-rt-20 pd-btm-20 pd-tp-20
                "
              >
                {{ sampleDummyData.description }}
            </div>
      </div>
      <a-form :form="form" @submit="onSubmit">
        <div class="ant-col ant-col-11 ml-30">
          <div class="ant-col ant-col-24 mt-20 txtClas">
            <div class="ant-col ant-col-15">Pricing:</div>
              <div class="ant-col ant-col-9">
              <!-- <a-button
                type="link"
                class="mg-50 wd-11"
                @click="showModalTier(true)"
                >Add Tier</a-button
              > -->
              </div>
          </div>
          <div class="ant-col ant-col-24">
            <a-row>
              <a-col :span="12" class="mt-5">
                <a-form-item style="margin-bottom: -24px;">
                <a-select
                  v-decorator="[
                    'tierPriceId',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please select tier price',
                        },
                      ],
                    },
                  ]"
                  class="w-100"
                  placeholder="Select Tier"
                  size="large"
                  :show-search="true"
                  :filter-option="filterOption"
                  @change="checkOtherTier"
                >
                  <a-select-option v-for="pri in pricing" :key="pri.id">
                    {{ pri.name }}
                  </a-select-option>
                  <a-select-option key="other" @click="showModalTier(true)">other</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
              <a-col :offset="1" :span="11" class="mt-5">
                <a-form-item style="margin-bottom: -8px;">
                <a-input :disabled="isTierSelected"
                v-decorator="[
                    'price',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter price',
                        },
                      ],
                    },
                  ]"
                  type="large"
                  class="txtBoxSt1"
                  placeholder="Please enter price"
                  
                />
              </a-form-item>
              </a-col>
            </a-row>
            <div class="ant-col ant-col-24 ml-15 mt-10 txtClas">Delivery:</div>
            <a-row >
              <a-col :span="12" class="mt-10">
                <a-form-item style="margin-bottom: -24px;">
                <!-- <a-input
                :value="defaultCourier"
                class="w-100 ml-15"
                disabled
                /> -->
                <a-select
                  
                  v-decorator="[
                    'courierServiceId',
                    {
                      // initialValue: sampleDummyData.courierId,
                      rules: [
                        {
                          required: true,
                          message: 'Please select courier service',
                        },
                      ],
                    },
                  ]"
                  class="w-100"
                  placeholder="Select Courier"
                  @change="getCourierServices"
                  >
                  <!-- :defaultValue="defaultCourier" -->
                  <a-select-option v-for="log in courier" :key="log.id">
                    {{ log.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col >
              <a-col :offset="1" :span="11" class="mt-10">
                <a-form-item style="margin-bottom: -24px;">
                <a-select
                  v-decorator="[
                    'deliveryId',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please select delivery',
                        },
                      ],
                    },
                  ]"
                  :filter-option="filterOption"
                  :show-search="true"
                  placeholder="Please select delivery"
                >
                  <a-select-option
                    v-for="delivery in deliveries"
                    :key="delivery.id"
                  >
                    {{ delivery.name }} with the price {{ delivery.price }} in
                    {{ delivery.deliveryTime }} day(s)
                  </a-select-option>
                </a-select>
              </a-form-item>
              </a-col>
            </a-row>
              
          <!-- <div v-if="!isTierSelected">
              <a-empty>
                <span slot="description">
                  There is no <a>Tier Pricing</a>
                </span>
              </a-empty>
            </div> -->


          </div>
          <div class="ant-col ant-col-24">
          <div class="ant-col ant-col-24">
            <div class="ant-col ant-col-24">
              
              
              <div class="ant-col ant-col-24 mt-15">
                <!-- <div v-if="deliveries.length === 0">
                  <a-empty>
                    <span slot="description">
                      There is no <a>Courier Deliveries</a>
                    </span>
                  </a-empty>
                </div> -->
                
              </div>
            </div>
          </div>
          
          </div>
        </div>
       

        <div class="ant-col ant-col-24 mt-40 ml-15">
          <a-row>
            <a-col :md="11">
              <a-card :offset="2" class="bg-grey">
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Invoice Number:</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.invoiceNo }}
                    </h3></a-col
                  >
                </a-row>

                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Custodian's name:</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.custodianName }}
                    </h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Courier:</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.courierName }}
                    </h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Client:</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.clientName }}
                    </h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Waybill Number:</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.wayBillingNo }}
                    </h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Date Received:</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.dateReceived }}
                    </h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Courier Email:</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.courierEmail }}
                    </h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Courier Contact:</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.courierContact }}
                    </h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Sample Description:</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.description }}
                    </h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Quantity Received:</h3></a-col
                  >
                  <a-col :offset="1" :span="8">
                    <span v-if="isEdit" class="display-flex">
                  <a-input  
                  v-model="sampleDummyData.totalQuantity" 
                  :value="sampleDummyData.totalQuantity" 
                  />
                    <a-icon type="check" class="mt-6 ml-2" @click="getTotal(sampleDummyData.totalQuantity)" /></span>
                    <h3 
                    v-else
                    class="txtClas3" 
                    >
                        {{ sampleDummyData.totalQuantity }}
                        
                      </h3>
                    
                  </a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Researcher Name</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.reasearcherName }}
                    </h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Study Name</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.projectName }}
                    </h3></a-col
                  >
                </a-row>
              </a-card>
            </a-col>
            <a-col :md="11" class="ml-15">
              <a-card
                class="bg-grey"
                style="padding-top: 15px; padding-bottom: 10px"
              >
                <!-- <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Project ID</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.projectId }}
                    </h3></a-col
                  >
                </a-row> -->
                
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">#ARN</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.lotNo }}
                    </h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Protocol</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.protocolName }}
                    </h3></a-col
                  >
                </a-row>
                <!-- <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Protocol ID</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.protocolId }}
                    </h3></a-col
                  >
                </a-row> -->
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Location</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.locationName }}
                    </h3></a-col
                  >
                </a-row>
                <!-- <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Client ID</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.clientId }}
                    </h3></a-col
                  >
                </a-row> -->
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Purchase Order</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">
                      {{ sampleDummyData.purchaseOrder }}
                    </h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Fulfillment ID</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">N/A</h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">ShipmentDate/Time</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">N/A</h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Quantity per Location</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">N/A</h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Date Orderd</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">N/A</h3></a-col
                  >
                </a-row>
                <a-row :span="24">
                  <a-col :span="12" :offset="1"
                    ><h3 class="txtClas2">Ship Via</h3></a-col
                  >
                  <a-col :offset="1" :span="8"
                    ><h3 class="txtClas3">N/A</h3></a-col
                  >
                </a-row>
              </a-card>
            </a-col>
          </a-row>
        </div>
        <div class="ml-15">
          <a-table
            :columns="columnsReturn"
            :data-source="dataSourceShipment"
            class="rounded-table pt-10 ant-col ant-col-23"
            :loading="loading"
          >
          </a-table>
          <a-col :offset="20" :span="4">
            <FormActionButton
              type="primary"
              class="wd-11"
              :loading="loading"
              custom-text="Submit"
            />
          </a-col>
        </div>
      </a-form>
      <!-- Tier Modal -->
      <a-modal
        :footer="null"
        :width="750"
        title="Tier"
        :destroy-on-close="true"
        :visible="visibleTier"
        :dialog-style="{ top: '200px' }"
        :loading="loading"
        @cancel="showModalTier(false)"
        @ok="showModalTier(false)"
      >
        <a-form
          :form="formTier"
          class="support-add-modal"
          @submit.prevent="onSubmitTier"
        >
          <div class="">
            <a-row :gutter="20">
              <a-col :span="12">
                <a-form-item>
                  <v-input
                  v-decorator="[
                      'tierId',
                      {
                        initialValue: ticketTier.id,
                        rules: [],
                      },
                    ]"
                    type="hidden"
                  />
                </a-form-item>
                <a-form-item
                  label="Tier Name *:"
                  :label-col="{ span: 24 }"
                  :wrapper-col="{ span: 22 }"
                >
                  <a-input
                    v-decorator="[
                      'tierName',
                      {
                        initialValue: ticketTier.name,
                        rules: [
                          {
                            required: true,
                            message: 'Please input Tier',
                          },
                        ],
                      },
                    ]"
                    placeholder="Tier "
                  /> </a-form-item
              ></a-col>
            </a-row>

            <a-row class="">
              <a-col class="text-right">
                <FormActionButton :is-created="isCreated" :loading="loading" />
              </a-col>
            </a-row>
          </div>
        </a-form>

        
          <a-table
            :columns="columnsTier"
            :data-source="datasourceTier"
            :loading="loading"
            class="rounded-table pt-10"
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
                    <a @click="getTierById(action.id)">Edit</a>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <a-popconfirm
                            title="Are you sure you want to delete ?"
                            ok-text="Yes"
                            cancel-text="No"
                            placement="topLeft"
                            @confirm="deleteTier(action.id)"
                            >
                          <span>Delete</span>
                          </a-popconfirm>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
          </a-table>
      </a-modal>
      <!-- End Modal -->
    </div>
  </page-layout>
</template>
<script>
import notifications from '~/mixins/notifications'
import { filterOption,preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import PageLayout from '~/components/layout/PageLayout'
import SampleServices from '~/services/API/SampleServices'
import TierServices from '~/services/API/TierServices'
import CourierServiceServices from '~/services/API/CourierServiceServices'
import OrganizationServices from '~/services/API/OrganizationServices'
import ProductServices from '~/services/API/ProductServices'
// import PurchaseOrderServices from '~/services/API/PurchaseOrderServices'
// import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { PageLayout },
  mixins: [routeHelpers, notifications],
  data() {
    return {
      form: this.$form.createForm(this, {
        name: 'login',
      }),
      dataSourceShipment: [],
      loading: false,
      isCreated: false,
      isTierSelected: true,
      isEdit: false,
      defaultCourier : '',
      sampleDummyData: {},
      pricing: [],
      deliveries: [],
      totalQuantity: '',
      columnsReturn: [
        {
          title: 'Shippement Destination',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Address1',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
        },
        {
          title: 'State/Province',
          dataIndex: 'state',
          key: 'state',
        },
        {
          title: 'Zip',
          dataIndex: 'zip',
          key: 'zip',
        },
        {
          title: 'Contact',
          dataIndex: 'phone',
          key: 'phone',
        },
      ],
      courier: [],
      ticketTier: [],
      stepId:'',
      processId:'',
      formTier: this.$form.createForm(this, {
        name: 'tierCreate',
      }),
      visibleTier: false,
      datasourceTier: [],
      columnsTier: [
        {
          title: 'Tier Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      price: [],
      selectedVals:[],
      selectedPrices: [],
      selectedDeliveries: [],
      isCourierServiceSelected: false,
    }
  },
  mounted() {
    this.sampleId = this.$route.query.id
    this.stepId = this.$route.query.stepId
    this.processId = this.$route.query.processId
    this.selectedVals = JSON.parse(this.$route.query.selectedVal)
    this.getSample()
    this.getTier()
    this.getCouriers()
  },
  methods: {
    filterOption,
    preventDefault,
    showModalTier(show) {
      this.visibleTier = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    getSample() {
      console.log(this.selectedVals)
      
      const tot=this.selectedVals.length
      console.log(tot)
      SampleServices.getById(this.sampleId).then((response) => {
        this.sampleDummyData = response.data
        this.sampleDummyData.totalQuantity=tot
        // this.totalQuantity = response.data.totalQuantity
        this.totalQuantity=tot
        this.defaultCourier = response.data.courierName
        // this.getCourierServices(response.data.courierId)
        this.getShipmentDetail(response.data.organizationId)
      })
    },
    getCouriers() {
      OrganizationServices.getCouriers().then((response) => {
        this.courier = response.data
      })
    },
    changePrice(){
      this.isEdit = true
    },
    getTier() {
      TierServices.get().then((response) => {
        this.pricing = response.data
        this.datasourceTier = response.data
      })
    },
    checkOtherTier(value)
    {
      if(value === 'other')
      {
        this.$nextTick(() => {
        this.form.setFieldsValue({
          tierPriceId: null
        });
      });
      }
      else{
        this.isTierSelected = false
      }
    },
    deleteTier(id) {
      this.loading = true
      TierServices.remove(id).then((response)=>{
        this.getTier()
      }).finally(this.loading = false)
    },
    getTierById(id) {
      this.loading = true
      TierServices.getById(id).then((response)=>{
        this.ticketTier = response.data
        this.isCreated = true
      }).finally(this.loading = false)
    },
    getCourierServices(id) {
      CourierServiceServices.getById(id).then((response) => {
        this.deliveries = response.data
        this.isCourierServiceSelected = true
      })
    },
    handleChange(value) {
      this.isTierSelected = false
    },
    getShipmentDetail(id) {
      OrganizationServices.getById(id)
        .then((response) => {
          this.dataSourceShipment = [response.data]
        })
        .catch(this.error)
    },
    getTotal(quantity){
      if(quantity > this.totalQuantity){
        this.sampleDummyData.totalQuantity = this.totalQuantity
        this.error()
      }
      this.isEdit = false
    },
    error() {
      this.$error({
        title: 'Entered quantity is greater than received quantity',
      });
    },
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const bodyData={
            'CourierServiceAllocationId':values.deliveryId,
            'Price':values.price,
            'priceUnit':'$',
            'tierId':values.tierPriceId,
            'sampleId':this.sampleId,
            'stepId':this.stepId,
            'processId':this.processId,
            'totalQuantity':this.sampleDummyData.totalQuantity,
            'SampleStorageRequestDTO':this.selectedVals,
          }
          /* const formData = new FormData()
          formData.append('CourierServiceAllocationId',values.deliveryId)
          formData.append('Price',values.price)
          formData.append('priceUnit','$')
          formData.append('tierId',values.tierPriceId)
          formData.append('sampleId',this.sampleId)
          formData.append('stepId',this.stepId)
          formData.append('processId',this.processId)
          formData.append('SampleStorageRequestDTO',JSON.stringify(this.selectedVals)) */
          ProductServices.publish(bodyData).then((response)=>{
          }).catch(this.error)
          // const data = new FormData()
          // data.append('price',values.price)
          // data.append('priceUnit','$')
          // data.append('sampleId',this.sampleDummyData.sampleId)
          // data.append('purchaseQuantity',this.sampleDummyData.totalQuantity)
          // PurchaseOrderServices.update(data).then((response)=>{
          this.goto('/outbound/orderSummary')
          // }).catch(this.error)
          .finally(this.loading = false)
        }
      })
      this.loading = false
    },
    onSubmitTier(e) {
      this.loading = true
      e.preventDefault()
      this.formTier.validateFields((err, values) => {
        if (!err) {
          if (this.isCreated) {
            TierServices.update(values).then((response) => {
              this.loading = false
              this.isCreated = false
              this.ticketTier = []
              this.getTier()
              this.showModalTier(false)
            })
          } else {
            TierServices.create(values).then((response) => {
              this.loading = false
              this.getTier()
            })
          }
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
