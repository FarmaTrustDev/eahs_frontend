<template>
    <page-layout
      :loading="false"
      title="Add Product"
      class="specific container page-search-input-container"
      :create="false"
    >
      <div slot="content" >
        <a-form :form="form" class="support-add-modal" @submit.prevent="onSubmit">
          <a-row>
        <a-col :span="8">
          <a-form-item
            label="Product Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
             >
            <a-input
              v-decorator="[
                'productName',
                {
                  initialValue: entity.productName,
                  rules: [
                    {
                      required: true,
                      message: 'Please input your product name',
                    },
                    { 
                      message: 'Please enter a valid Product Name'
                    }
                  ],
                },
              ]"
              placeholder="Product Name"
              disabled
            /> 
            </a-form-item>
        </a-col>
        <a-col :span="8">
            <a-form-item
            label="Product Description*:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
             >
            <a-textarea
              v-decorator="[
                'productDescription',
                {
                  initialValue: entity.productDescription,
                  rules: [
                    {
                      required: true,
                      message: 'Please input your product description',
                    },
                    { 
                      message: 'Please enter a valid product Description'
                    }
                  ],
                },
              ]"
              placeholder="Product Description"
              disabled
            /> 
            </a-form-item>
        </a-col>
        <a-col :span="8">
            <a-form-item
            label="Delivery Time *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
             >
            <a-input 
              v-decorator="[
                'deliveryTime',
                {
                  initialValue: entity.deliveryTime,
                  
                },
              ]"
            type="number"
              placeholder="Delivery Time"
              disabled
            /> 
            </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
            <a-form-item
            label="Quantity *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
             >
            <a-input 
              v-decorator="[
                'quantity',
                {
                  initialValue: entity.quantity,
                 
                },
              ]"
            type="number"
              placeholder="Quantity"
              disabled
            /> 
            </a-form-item>
        </a-col>
        <a-col :span="8">
            <a-form-item
            label="Purchase Price *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
             >
            <a-input 
              v-decorator="[
                'price',
                {
                  initialValue: entity.price,
                  
                },
              ]"
            type="number"
              placeholder="Price"
              disabled
            /> 
            </a-form-item>
        </a-col>
        <a-col :span="8">
            <a-form-item
            label="Sale Price *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
             >
            <a-input 
              v-decorator="[
                'salePrice',
                {
                  initialValue: entity.salePrice,
                  
                },
              ]"
            type="number"
              placeholder="Price"
             
            /> 
            </a-form-item>
        </a-col>
      </a-row>
        <a-col :span="24">
            <h3>Product Specifications</h3>
        </a-col>
        <a-col :span="8"><a-button type="link"  @click="showModalSC(true)">Add Shipping Condition</a-button></a-col>
        <a-col :span="8"><a-button type="link"  @click="showModalStorageC(true)">Add Storage Condition</a-button></a-col>
        <a-col :span="8"><a-button type="link"  @click="showModalBiological(true)">Add Biological Safety Level</a-button></a-col>
        <a-col :span="8">
            <a-form-item
            label="Shipping Condition *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
             >
             <a-select
              v-decorator="[
                'shippingConditionId',
                {
                  initialValue: entity.shippingConditionId,
                  rules: [
                    {
                      required: true,
                      message: 'Please select your shipping condition',
                    },
                  ],
                },
              ]"
              placeholder="Shipping Condition"
              :filter-option="filterOption"
              :show-search="true"
              style="width: 100%"
              size="large"
              class="default-select"
            >
              <a-select-option v-for="shiping in shippingConditions" :key="shiping.id">
                {{ shiping.name }}
              </a-select-option>
            </a-select> 
            </a-form-item>
        </a-col>
        <a-col :span="8">
            <a-form-item
            label="Storage Condition *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
             >
             <a-select
              v-decorator="[
                'storageConditionId',
                {
                  initialValue: entity.storageConditionId,
                  rules: [
                    {
                      required: true,
                      message: 'Please select your Storage condition',
                    },
                  ],
                },
              ]"
              placeholder="Storage Condition"
              style="width: 100%"
              size="large"
              class="default-select"
              :show-search="true"
              :filter-option="filterOption"
            >
              <a-select-option v-for="storage in storageConditions" :key="storage.id">
                {{ storage.name }}
              </a-select-option>
            </a-select> 
            </a-form-item>
        </a-col>
        <a-col :span="8">
            <a-form-item
            label="Biological Safety Level *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
             >
             <a-select
              v-decorator="[
                'biologicalSafetyLevelId',
                {
                  initialValue: entity.biologicalSafetyLevelId,
                  rules: [
                    {
                      required: true,
                      message: 'Please select your Biological Safety Level',
                    },
                  ],
                },
              ]"
              placeholder="Biological Safety Level"
              style="width: 100%"
              :show-search="true"
              size="large"
              class="default-select"
              :filter-option="filterOption"
            >
              <a-select-option v-for="biological in biologicalSafetyLevels" :key="biological.id">
                {{ biological.name }}
              </a-select-option>
            </a-select> 
            </a-form-item>
        </a-col> 
        <a-col :span="19">
            <h3>Product References</h3>
        </a-col>
        <a-col :span="4">
            <a-button class="mb-10" type="primary" @click="addRecord">Add New Reference</a-button>
        </a-col>
        <a-col :span="4">Title</a-col>
        <a-col :span="4">Authors</a-col>
        <a-col :span="4">PageFromTo</a-col>
        <a-col :span="4">Journal</a-col>
        <a-col :span="4">Publishing Date</a-col>
        <a-col :span="4">Remove</a-col>
        <div 
        v-for="(record, index) in records" :key="index"
        class="ant-col ant-col-24 mt-15" 
        >
        <a-col :span="4" >
            <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 22 }">
                <a-input 
                v-model="record.title"
                placeholder="Title"
                /> 
            </a-form-item>
        </a-col>
        <a-col :span="4">
            <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 22 }">
                <a-input 
                v-model="record.author"
                placeholder="Author"
                /> 
            </a-form-item>
        </a-col>
        <a-col :span="4">
            <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 22 }">
                <a-input 
                v-model="record.pageFromTo"
                placeholder="Page From To"
                /> 
            </a-form-item>
        </a-col>
        <a-col :span="4">
            <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 22 }">
                <a-input 
                v-model="record.journal"
                placeholder="Journal"
                /> 
            </a-form-item>
        </a-col>
        <a-col :span="4">
            <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 22 }">
                <a-input 
                v-model="record.publishingDate"
                type="date"
                placeholder="Publishing Date"
                /> 
            </a-form-item>
        </a-col>
        <a-col :span="4"><a-icon class="mt-15 ml-30" style="color:red" type="minus-circle" @click="deleteRecord(index)" /></a-col>
        </div>
        <a-col :span="2" :offset="21" class="mt-15">
            <FormActionButton  :loading="loading"  custom-text="Create"  />
          </a-col>
        </a-form>  
        
    <!-- Modal of Shipping Condition -->
    <a-modal
      :footer="null"
      :width="750"
      title="Add Shipping Condition"
      :destroy-on-close="true"
      :visible="visibleSC"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalSC(false)"
      @ok="showModalSC(false)"
    >
      <a-form :form="formSC" class="support-add-modal" @submit.prevent="onSubmitSC">
        <a-form-item>
          <a-input 
          v-decorator="[
                'shippingConditionId',
                {
                  initialValue: scevent.shippingConditionId,
                },
              ]"  
          type="hidden" 
              />
        </a-form-item>
        <a-row :gutter="20">
          
        <a-col :span="12">
          <a-form-item
            label="Shipping Condition Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'shippingConditionName',
                {
                  initialValue: scevent.shippingConditionName,
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
          
        </a-row>
       

        <a-row class="">
          <a-col :span="2" :offset="21">
            <FormActionButton  :loading="loading"  custom-text="Create" :is-created="isCreatedSC" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        
        <a-table
          :columns="columnsSC"
          :data-source="datasourceSC"
          :loading="loading"
          class="rounded-table pt-10 users-list"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
        >
        
          <template slot="action" slot-scope="text,record" >
            <a-dropdown>
              <a-button class="action-button" @click="preventDefault">
                Admin <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="fetchScById(record.id)" >Edit</a>
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
                  <a @click="deleteSC(record.id)" >Delete</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
    <!-- End  -->
    <!-- Modal of Storage Condition -->
    <a-modal
      :footer="null"
      :width="750"
      title="Add Storage Condition"
      :destroy-on-close="true"
      :visible="visibleStorageC"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalStorageC(false)"
      @ok="showModalStorageC(false)"
    >
      <a-form :form="formStorageC" class="support-add-modal" @submit.prevent="onSubmitStorageC">
        <a-form-item>
          <a-input 
          v-decorator="[
                'storageConditionId',
                {
                  initialValue: storagecevent.storageConditionId,
                },
              ]"  
          type="hidden" 
              />
        </a-form-item>
        <a-row :gutter="20">
          
        <a-col :span="12">
          <a-form-item
            label="Storage Condition Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'storageConditionName',
                {
                  initialValue: storagecevent.storageConditionName,
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
          
        </a-row>
       

        <a-row class="">
          <a-col :span="2" :offset="21">
            <FormActionButton  :loading="loading"  custom-text="Create" :is-created="isCreatedStorageC" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        
        <a-table
          :columns="columnsStorageC"
          :data-source="datasourceStorageC"
          :loading="loading"
          class="rounded-table pt-10 users-list"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
        >
        
          <template slot="action" slot-scope="text,record">
            <a-dropdown>
              <a-button class="action-button" @click="preventDefault">
                Admin <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="fetchStorageCById(record.id)">Edit</a>
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
                  
                  <a @click="deleteStorageCondition(record.id)">Delete</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
    <!-- End  -->
    <!-- Modal of Storage Condition -->
    <a-modal
      :footer="null"
      :width="750"
      title="Add Biological Safety Level"
      :destroy-on-close="true"
      :visible="visibleBiological"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalBiological(false)"
      @ok="showModalBiological(false)"
    >
      <a-form :form="formBiological" class="support-add-modal" @submit.prevent="onSubmitBiological">
        <a-form-item>
          <a-input 
          v-decorator="[
                'biologicalSafetyLevelId',
                {
                  initialValue: biologicalevent.id,
                },
              ]"  
          type="hidden" 
              />
        </a-form-item>
        <a-row :gutter="20">
          
        <a-col :span="12">
          <a-form-item
            label="Biological Safety Level Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'biologicalSafetyLevelName',
                {
                  initialValue: biologicalevent.name,
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
          
        </a-row>
       

        <a-row class="">
          <a-col :span="2" :offset="21">
            <FormActionButton  :loading="loading"  custom-text="Create" :is-created="isCreatedBiological" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        
        <a-table
          :columns="columnsBiological"
          :data-source="datasourceBiological"
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
                  <a @click="getBiologicalSafetyById(action.id)">Edit</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <a-popconfirm
                    title="Are you sure you want to delete ?"
                    ok-text="Yes"
                    cancel-text="No"
                    placement="topLeft"
                    @confirm="deleteBiologicalSafety(`${action.id}`)"
                  >
                  <span>Delete</span>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
    <!-- End  -->

      </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { filterOption,preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import ShippingConditionServices from '~/services/API/ShippingConditionServices'
  import StorageConditionServices from '~/services/API/StorageConditionServices'
  import BiologicalSafetyLevelServices from '~/services/API/BiologicalSafetyLevelServices'
  import ProductServices from '~/services/API/ProductServices'
  import  {  USER_ROLES } from '~/services/Constant/index' 

  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout },
    mixins: [routeHelpers, notifications],
    data() {
      return {
        loading:false,
        visibleSC: false,
        visibleStorageC: false,
        visibleBiological: false,
        biologicalSafetyLevels:[],
        storageConditions:[],
        shippingConditions:[],
        refentity: { 
        type: Object,
         default: () => ({}) 
        },
        records: [],
        entity: { 
        type: Object,
         default: () => ({}) 
        },
        form: this.$form.createForm(this, {
          name: 'productCreate',
        }),
        formSC: this.$form.createForm(this, {
          name: 'sCCreate',
        }),
        formStorageC: this.$form.createForm(this, {
          name: 'storageCCreate',
        }),
        formBiological: this.$form.createForm(this, {
          name: 'biologicalCreate',
        }),
        scevent: { 
        type: Object,
         default: () => ({}) 
        },
        storagecevent: { 
        type: Object,
         default: () => ({}) 
        },
        biologicalevent: { 
        type: Object,
         default: () => ({}) 
        },
        isCreatedSC:false,
        isCreatedStorageC:false,
        isCreatedBiological:false,
        datasourceSC: [],
        datasourceStorageC: [],
        datasourceBiological: [],
        columnsSC: [
          {
            title:'Shipping Condition Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        columnsStorageC: [
          {
            title:'Storage Condition Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        columnsBiological: [
          {
            title:'Biological SAfety Level Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ]
      }
    },
    computed: {
     
    },
    mounted() {
      this.productId = this.$route.query.id;
      const data = JSON.parse(localStorage.getItem('vuex'))
      this.userRole =data.auth.user.roleName
      if(this.userRole === USER_ROLES.institute_customer_type.name)
      {
        this.fetchProductById()
      }
      if(this.userRole === USER_ROLES.institute_admin.name)
      {
        this.fetchAdminProductById()
      }
      this.fetchSC()
      this.fetchBiological()
      this.fetchStorageC()
      

    },
    methods: {
      filterOption,
      preventDefault,
      addRecord() {
      this.records.push({ title: '', author: '', pageFromTo: '',journal:'',publishingDate:'' }); // Add a new empty record
    },
    deleteRecord(index) {
      this.records.splice(index, 1); // Remove the record at the specified index
    },
    showModalSC(show) {
      this.visibleSC = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    showModalStorageC(show) {
      this.visibleStorageC = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    showModalBiological(show) {
      this.visibleBiological = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    fetchSC() {
        ShippingConditionServices.get().then((response) => {
          this.shippingConditions = response.data
          this.datasourceSC = response.data
        })
      },
      fetchStorageC() {
        
        StorageConditionServices.get().then((response) => {
          this.storageConditions = response.data
          this.datasourceStorageC = response.data
        })
      },
      fetchBiological() {
        
        BiologicalSafetyLevelServices.get().then((response) => {
          this.biologicalSafetyLevels = response.data
          this.datasourceBiological=response.data
        })
      },
      fetchProductById()
      {
        ProductServices.getById(this.productId).then((response)=>{
          this.entity=response.data
        })
      },
      fetchScById(id)
      {
        this.formSC.resetFields()
        ShippingConditionServices.getById(id).then((response)=>{
          this.isCreatedSC = true
          this.formSC.setFieldsValue({
          shippingConditionId: response.data.id,
          shippingConditionName: response.data.name,
      });
        })
      },
      fetchStorageCById(id)
      {
        this.formStorageC.resetFields()
        StorageConditionServices.getById(id).then((response)=>{
          this.isCreatedStorageC = true
          this.formStorageC.setFieldsValue({
            storageConditionId: response.data.id,
            storageConditionName: response.data.name,
      });
        })
      },

      deleteSC(id)
      {
        ShippingConditionServices.deleteSC(id).then((response)=>{
          this.fetchSC()
        })
      },
      deleteStorageCondition(id)
      {
        StorageConditionServices.deleteStorag(id).then((response)=>{
          this.fetchStorageC()
        })
      },
      fetchAdminProductById()
      {
        ProductServices.getByIdAdminProduct(this.productId).then((response)=>{
          this.entity=response.data
        })
      }
      ,
      onSubmitSC(e) {
      e.preventDefault()
      this.formSC.validateFields((err, values) => {
        if (!err) {
          if(this.isCreatedSC)
          {
            ShippingConditionServices.update(values).then((response)=>{
            this.loading = false
            this.isCreatedSC = false
            this.formSC.resetFields()
            this.fetchSC()
          })
          }
          else{
          ShippingConditionServices.create(values).then((response)=>{
            this.loading = false
            this.fetchSC()
            this.formSC.resetFields()
          })
        }
        } 
      })
    },
    onSubmitStorageC(e) {
      e.preventDefault()
      this.formStorageC.validateFields((err, values) => {
        if (!err) {
          if(this.isCreatedStorageC)
          {
            StorageConditionServices.update(values).then((response)=>{
            this.loading = false
            this.isCreatedStorageC = false
            this.formStorageC.resetFields()
            this.fetchStorageC()
          })
          }
          else{
          StorageConditionServices.create(values).then((response)=>{
            this.loading = false
            this.formStorageC.resetFields()
            this.fetchStorageC()
          })
        }
        } 
      })
    },
    onSubmitBiological(e) {
      e.preventDefault()
      this.formBiological.validateFields((err, values) => {
        if (!err) {
          if(this.isCreatedBiological)
          {
            this.loading = true
            BiologicalSafetyLevelServices.update(values).then((response)=>{
              this.isCreatedBiological = false
              this.fetchBiological()
          }).finally(this.loading = false)
          }
          else{
            this.loading = true
            BiologicalSafetyLevelServices.create(values).then((response)=>{
            this.fetchBiological()
          }).finally(this.loading = false)
        }
        } 
      })
    },
    deleteBiologicalSafety(id){
      this.loading = true
      BiologicalSafetyLevelServices.remove(id).then((response)=>{
        this.fetchBiological()
      }).finally(this.loading = false)
    },
    getBiologicalSafetyById(id){
      this.loading = true
      BiologicalSafetyLevelServices.getById(id).then((response)=>{
        this.biologicalevent = response.data
        this.isCreatedBiological = true
      }).finally(this.loading = false)
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
        // const formData = new FormData()

        //   for (const key in values) {
        //     formData.append(key, values[key])
        //   }
        //   const jsonData = JSON.stringify(this.records);
        //   formData.append('productReference',jsonData)
        const data=JSON.parse(JSON.stringify({productName: values.productName,productDescription:values.productDescription,price:values.price,salePrice:values.salePrice,deliveryTime:values.deliveryTime,quantity:values.quantity,shippingConditionId:values.shippingConditionId,storageConditionId:values.storageConditionId,biologicalSafetyLevelId:values.biologicalSafetyLevelId,productReference:this.records }))
          if(this.isCreated)
          {
            alert("update")
          }
          else{
        
        
          ProductServices.create(data,this.productId).then((response)=>{
            this.loading = false
            this.goto('/outbound/orderSummary')
          })
        }
        } 
      })
    },
    },
  }
  </script>
 
  