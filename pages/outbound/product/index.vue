<template>
    <page-layout
      :loading="false"
      :title=product.productName
      class="specific container page-search-input-container"
      :create="false"
    >
      <template slot="headerMenus">
        
        <!-- <a-input
          ref="userNameInput"
          class="page-search-input"
          placeholder="Search Sample"
        >
          <a-icon slot="prefix" type="search" />
        </a-input> -->
        <a-button type="primary" class="md-11" @click="goto('/outbound/product/productSupportingData?id='+productId)">See Full Data Logs</a-button>
      </template>
      <div slot="content" class="mtm-70">
        <div class="ant-col ant-col-24 mt-40 ml-5 " >
           <h2 class="pt-10">Description</h2>
        </div>
        <div class="ant-col ant-col-20 bg-grey mt-5 pt-10 pb-10 plr-10" >
            <p>{{ product.productDescription }}</p>
        </div>
        <div class="ant-col ant-col-24 mt-15 ml-5 " >
           <h2 class="pt-10">Specifications</h2>
        </div>
        <div class="ant-col ant-col-20 bg-grey mt-5 plr-10 pt-10 " >
            <div class="ant-col ant-col-24">
            <div class="ant-col ant-col-6"><h3>Shipping Conditions:</h3></div><div class="ant-col ant-col-4 pt-3">{{ product.shippingConditionName }}</div>
            </div>
            <div class="ant-col ant-col-24">
            <div class="ant-col ant-col-6"><h3>Storage Conditions:</h3></div><div class="ant-col ant-col-15 pt-3">{{ product.storageConditionName }}</div>
            </div>
            <div class="ant-col ant-col-24">
            <div class="ant-col ant-col-6"><h3>Biological Safety Level:</h3></div><div class="ant-col ant-col-15 pt-3">{{ product.biologicalSafetyLevelName }}</div>
            </div>
        </div>
        <div class="ant-col ant-col-24 mt-15 ml-10">
           <h2 class="pt-10">References</h2>
        </div>
        <div class="ant-col ant-col-20 mt-20 mg-t-10 plr-10 pt-10  " v-for="reference in product.productReference" :key="reference.id">
            <div><h4>{{ reference.author}},<bdi class="text-blue">{{ reference.title }}</bdi>.{{ reference.journal }}.{{ reference.pageFromTo }}({{ reference.bublishingDate }}). </h4></div>
        </div>
        <div class="ant-col ant-col-24 mt-40" v-if="prodQnty!==0">
            <a-button v-if="isChecked===false && userRole === UserRoles.institute_customer_type.name" @click="submitCart()" class="ant-col  orderButton ml-40" >Add to Cart</a-button>
            <a-button class="ant-col  orderButton" v-else>Selected</a-button>
            <a-button v-if="reserveId===0 && userRole === UserRoles.institute_customer_type.name" @click="submitReserve()" class="ant-col  orderButton ml-20" >Reserve</a-button>
            <a-button class="ant-col  orderButton" v-else>Reserved</a-button>  
          </div>
        </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import ProductServices from '~/services/API/ProductServices'
  import CartServices from '~/services/API/CartServices'
  import ReserveServices from '~/services/API/ReserveServices'
  import  { CART_STATUSES ,USER_ROLES } from '~/services/Constant/index'

  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout },
    mixins: [routeHelpers, notifications],
    data() {
      return {
        UserRoles:USER_ROLES,
        isChecked:false,
        reserveId:0,
        proId:0,
        prodQnty:0,
        pending:CART_STATUSES.pending.name,
        product:{
        }
      }
    },
    computed: {
     
    },
    mounted() {
      this.productId = this.$route.query.id;
      const data = JSON.parse(localStorage.getItem('vuex'))
      this.userRole =data.auth.user.roleName
      if(this.userRole === this.UserRoles.institute_customer_type.name)
      {
        this.callMethod();
        this.getProductById();
      }
      
      
    },
    methods: {
      preventDefault,
      getProductById()
      {
        ProductServices.getById(this.productId).then((Response=>{
          this.product=Response.data
          this.proId = Response.data.id
          this.isChecked=Response.data.isCheckout
          this.reserveId = Response.data.reservedId
          this.prodQnty = Response.data.quantity
        }))
      },
      callMethod() {
      this.$root.$emit('updateCart')
    },
    submitCart()
    {
      const formData =new FormData()
      formData.append('productId',this.proId)
      formData.append('CartStatusName',this.pending)
      CartServices.create(formData).then((Response)=>{
        this.callMethod()
        this.getProductById()
      })
    },
    submitReserve()
    {
      ReserveServices.create(this.proId).then((Response)=>{
        this.callMethod()
        this.getProductById()
      })
    },
    },
  }
  </script>
 
  