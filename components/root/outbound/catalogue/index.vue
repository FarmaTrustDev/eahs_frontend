<template>
    <div slot="content" >
      <a-col :offset="18">
      <a-input
         class="page-search-input"
         placeholder="Search Product"
         @keyup="getAllProductsBySearch"
       >
         <a-icon slot="prefix" type="search" />
       </a-input>
      </a-col>
        <div>
        <a-table
                :columns="userRole === USERROLES.institute_admin.name?columns:columnsCust"
                :data-source="dummyDataSource"
                :loading="loading"
                class="rounded-table pt-10 users-list"
                :pagination="{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '30', '50', '100'],
                }"
              >
              <template slot="productName" slot-scope="text,record">
              <span>
              <a  @click="goto('/outbound/product?id='+record.productGuid)" >{{ record.productName }} - {{ record.quantity }}</a>
              </span>
              </template>
              <template slot="price" slot-scope="text,record">
              <span>
              {{ record.price  }}{{  record.priceUnit }}
              </span>
              </template>
              
              <template slot="publish" slot-scope="text,record" >
              <span>
                <a-button v-if="!isCustomer()" type="primary" class="h-45" @click="goto('/outbound/product/addProduct?id='+record.productGuid)" >Publish Product</a-button>
              </span>
              </template>
              <template slot="deliveryTime" slot-scope="text,record">
              <span>
              {{ record.deliveryTime }} Days
              </span>
              </template>
              <template slot="action" slot-scope="action,record">
                <div v-if="userRole===USERROLES.institute_customer_type.name">
                  <div v-if="record.quantity !== 0">
                  <a-button v-if="record.isCheckout === false" class="orderButton ml-15 h-45" @click="submitCart(record.id)" >Add to Cart</a-button>
                  <a-button v-else class="orderButton ml-15 h-45"  >Selected</a-button>
                  <a-button v-if="record.reservedId === 0" class="orderButton ml-15 h-45" @click="submitReserve(record.id)" >Reserve</a-button>
                  <a-button v-else class="orderButton ml-15 h-45"  >Reserved</a-button>
                </div>
                <div v-else>
                  <span style="color: red;">Sold Out</span>
                </div>
              </div>
              </template>
        </a-table>    
        </div>
       
        <!-- <div class="ant-col ant-col-4  ml-40" style="margin-top: 35px;"> -->
        <!-- <a-button type="primary" @click="goto('/outbound/product/addProduct')" v-if="!isCustomer()">Add New Product</a-button> -->
      <!-- </div> -->
    <a-modal
    centered
    :visible="visibleConfirm"
    :footer="null"
    @cancel="closeConfirmModal(false)"
    >
    <center> <h2 class="mt-5">You have successfully reserved this product</h2>
      <h2 class="mt-5">It is being hold for 48 hours</h2>
    <a-button class="ant-btn ant-btn-primary error-ok-btn mt-5" type="primary" @click="closeConfirmModal(false)">Back</a-button></center>
    </a-modal>
    </div>
</template>
<script>

import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import ProductServices from '~/services/API/ProductServices'
import CartServices from '~/services/API/CartServices'
import ReserveServices from '~/services/API/ReserveServices'
import userDetail from '~/mixins/user-detail' 
import  { CART_STATUSES ,USER_ROLES } from '~/services/Constant/index'

// import PageLayout from '~/components/layout/PageLayout'
export default {
  mixins: [routeHelpers, notifications,userDetail],
  data() {
    return {
      loading:true,
      datasource: [],
      userRole:'',
      USERROLES:USER_ROLES,
      dummyDataSource:[],
      pending:CART_STATUSES.pending.name,
      columns: [
        {
          title: 'Product Name - Quantity',
          dataIndex: 'productName',
          scopedSlots: {
          customRender: 'productName',
          }
        },
        {
          title: 'Delivery Time',
          dataIndex: 'deliveryTime',
          scopedSlots: {
          customRender: 'deliveryTime',
          } ,
        },
        {
          title: 'Price / Vials',
          dataIndex: 'price',
          scopedSlots: {
          customRender: 'price',
          } ,
        },
        {
          title: 'Publish',
          dataIndex: 'publish',
          scopedSlots: {
          customRender: 'publish',
          } ,
        },
        
      ],
      columnsCust: [
        {
          title: 'Product Name - Quantity',
          dataIndex: 'productName',
          scopedSlots: {
          customRender: 'productName',
          }
        },
        {
          title: 'Delivery Time',
          dataIndex: 'deliveryTime',
          scopedSlots: {
          customRender: 'deliveryTime',
          } ,
        },
        {
          title: 'Price / Vials',
          dataIndex: 'price',
          scopedSlots: {
          customRender: 'price',
          } ,
        },
        {
          title: 'Action',
          scopedSlots: {
          customRender: 'action',
          } ,
        },
      ],
      cartArray:[],
      arrayCart:[],
      receivedArray:[],
      visibleConfirm:false
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    const data = JSON.parse(localStorage.getItem('vuex'))
    this.userRole =data.auth.user.roleName
    // if(this.userRole===this.USERROLES.institute_admin.name)
    // {
    // this.getAllProductsAdmin()
    // }
    // if(this.userRole===this.USERROLES.institute_customer_type.name)
    // {
      this.getAllProducts()
    // }
  },
  
  methods: {
    preventDefault,
    getAllProducts()
    {
      ProductServices.get().then((Response=>{                                           
        this.dummyDataSource = Response.data
      })).catch(this.error)
          .finally(() => (this.loading = false))
    },
    getAllProductsBySearch(event)
    {
      const inpt=event.target.value
      if(inpt==='')
      {
        this.getAllProducts()
      }
      else
      {
      ProductServices.getBySearch(inpt).then((Response=>{                                           
        this.dummyDataSource = Response.data
      })).catch(this.error)
          .finally(() => (this.loading = false))
    }
    },
    getAllProductsAdmin()
    {
      ProductServices.getAllProductsAdmin().then((Response=>{                                           
        this.dummyDataSource = Response.data
      })).catch(this.error)
          .finally(() => (this.loading = false))
    },
    submitCart(id)
    {
      this.loading=true
      const formData =new FormData()
      formData.append('productId',id)
      formData.append('CartStatusName',this.pending)
      CartServices.create(formData).then((Response)=>{
        this.callMethod()
        this.getAllProducts()
      }).finally(()=>(this.loading=false))
    },
    submitReserve(id)
    {
      ReserveServices.create(id).then((Response)=>{
        this.callMethod()
        this.visibleConfirm = true
        this.getAllProducts()
      })
    },
    callMethod() {
      this.$root.$emit('updateCart')
    },
    closeConfirmModal(action)
    {
      this.visibleConfirm = action
    }
  },
}
</script>