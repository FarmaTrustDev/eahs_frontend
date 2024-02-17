<template>
    <div slot="content">
      <a-col :offset="18">
        <a-input 
                          ref="userNameInput"
                          class="page-search-input wd-100"
                          placeholder="Search Order"
                          @keyup="searchOrder"
                        >
                        <a-icon slot="prefix" type="search" />
                        </a-input>
      </a-col>
      
        <a-table
                :columns="userRole === UserRole.admin_type.name?columnsBioBank:userRole === UserRole.institute_admin.name
                ? columnsClient:columnsCustomer "
                :data-source="dummyDataSource"
                :loading="loading"
                class="rounded-table pt-10 users-list"
                :pagination="{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '30', '50', '100'],
                }"
              >
              <template slot="totalPrice" slot-scope="text,record">
              <span>
              {{ record.totalPrice }}{{  record.priceUnit  }}
              </span>
              </template>
              <template slot="productPrice" slot-scope="text,record">
              <span>
              {{ record.productPrice }}{{  record.priceUnit  }}
              </span>
              </template>
              <template slot="salePrice" slot-scope="text,record">
              <span>
              {{ record.salePrice }}{{  record.priceUnit  }}
              </span>
              </template>
              <template slot="deliveryCharges" slot-scope="text,record">
              <span>
              {{ record.deliveryCharges }}{{  record.priceUnit  }}
              </span>
              </template>
              <template slot="orderDate" slot-scope="text, record">
                {{  _getFormatMoment(record.orderDate).format("DD/MM/YYYY") }}
                </template>
            </a-table>
    </div>
</template>
<script>

import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import PurchaseOrderServices from '~/services/API/PurchaseOrderServices'
import CartServices from '~/services/API/CartServices'
import  { USER_ROLES } from '~/services/Constant/index'
import { _getFormatMoment } from '~/services/Helpers/MomentHelpers' 
// import PageLayout from '~/components/layout/PageLayout'
export default {
  mixins: [routeHelpers, notifications],
  data() {
    return {
      loading:true,
      datasource: [],
      UserRole:USER_ROLES,
      dummyDataSource:[],
      columnsClient: [
        {
          title: 'Item',
          dataIndex: 'sampleName',
          key: 'sampleName',
        },
        {
          title: 'Item ID',
          dataIndex: 'samplePuid',
          key:'samplePuid'
        },
        {
          title: 'Quantity Ordered',
          dataIndex: 'sampleTotalQuantity',
          key: 'sampleTotalQuantity' ,
        },
        {
          title: 'Quantity Receipt',
          dataIndex: 'productQuantity',
          key: 'productQuantity' ,
        },
        {
          title: 'Order Date',
          dataIndex: 'orderDate',
          scopedSlots: {
          customRender: 'orderDate',
          } ,
        },
        {
          title: 'Price / Vials',
          dataIndex: 'productPrice',
          scopedSlots: {
          customRender: 'productPrice',
          } ,
        },
        {
          title: 'Sale Price / Vials',
          dataIndex: 'salePrice',
          scopedSlots: {
          customRender: 'salePrice',
          } ,
        },
        {
          title: 'Delivery Charges',
          dataIndex: 'deliveryCharges',
          scopedSlots: {
          customRender: 'deliveryCharges',
          } ,
        },
        {
          title:'Total',
          dataIndex: 'totalPrice',
          scopedSlots: {
          customRender: 'totalPrice',
          } ,
        },
      ],
      columnsCustomer: [
        {
          title: 'Item',
          dataIndex: 'sampleName',
          key: 'sampleName',
        },
        {
          title: 'Item ID',
          dataIndex: 'samplePuid',
          key:'samplePuid'
        },
        {
          title: 'Quantity Ordered',
          dataIndex: 'sampleTotalQuantity',
          key: 'sampleTotalQuantity' ,
        },
        {
          title: 'Order Date',
          dataIndex: 'orderDate',
          scopedSlots: {
          customRender: 'orderDate',
          } ,
        },
        {
          title: 'Price / Vials',
          dataIndex: 'productPrice',
          scopedSlots: {
          customRender: 'productPrice',
          } ,
        },
        {
          title:'Total',
          dataIndex: 'totalPrice',
          scopedSlots: {
          customRender: 'totalPrice',
          } ,
        },
      ],
      columnsBioBank: [
        {
          title: 'Item',
          dataIndex: 'sampleName',
          key: 'sampleName',
        },
        {
          title: 'Item ID',
          dataIndex: 'samplePuid',
          key:'samplePuid'
        },
        {
          title: 'Quantity Ordered',
          dataIndex: 'sampleTotalQuantity',
          key: 'sampleTotalQuantity' ,
        },
        {
          title: 'Quantity Shipped',
          dataIndex: 'productQuantity',
          key: 'productQuantity' ,
        },
        {
          title: 'Order Date',
          dataIndex: 'orderDate',
          scopedSlots: {
          customRender: 'orderDate',
          } ,
        },
        {
          title: 'Price',
          dataIndex: 'productPrice',
          scopedSlots: {
          customRender: 'productPrice',
          } ,
        },
        {
          title: 'Delivery Charges',
          dataIndex: 'deliveryCharges',
          scopedSlots: {
          customRender: 'deliveryCharges',
          } ,
        },
        {
          title: 'Recipient',
          dataIndex: 'recipient',
          key: 'recipient' ,
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address' ,
        },
        {
          title: 'State/Province',
          dataIndex: 'state',
          key:'state'
        },
        {
          title:'Postcode',
          dataIndex: 'postcode',
          key: 'postcode',
        },
        {
          title:'Shipping',
          dataIndex: 'shipping',
          key: 'shipping',
        },
        {
          title:'Total',
          dataIndex: 'totalPrice',
          scopedSlots: {
          customRender: 'totalPrice',
          } ,
        },
      ],
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
    if(this.userRole === USER_ROLES.institute_customer_type.name)
    {
    this.$root.$emit('updateCart')
    // this.getAllCustomerProduct()
    }
    
    this.getAllBioBankAdminOrders()
    
    // if(this.userRole === USER_ROLES.institute_admin.name){
    //   this.getAllOrganizationOrders()
    // }
    
  },
  methods: {
    preventDefault,
    _getFormatMoment,
    getAllBioBankAdminOrders()
    {
      PurchaseOrderServices.getBioBankOrder().then((Response)=>{
        this.dummyDataSource=Response.data
      }).catch(this.error)
          .finally(() => (this.loading = false))
    },
    getAllOrganizationOrders()
    {
      PurchaseOrderServices.getByOrganizationOrder().then((Response)=>{
        this.dummyDataSource=Response.data
      }).catch(this.error)
          .finally(() => (this.loading = false))
    },
    getAllCustomerProduct()
    {
      CartServices.getAllCustomerProduct().then((Response)=>{
        this.dummyDataSource = Response.data
      }).catch(this.error)
          .finally(() => (this.loading = false))
    },
    searchOrder(event) {
        const keyword = event.target.value
        if(keyword==='')
        {
          this.getAllBioBankAdminOrders()
        }
        else{
        PurchaseOrderServices.searchOrderProduct(keyword).then((response)=>{
          this.dummyDataSource = response.data
        })
        this.loading=false
      }
    },
    fetchOrder(params = {}) {
      this.loading = true
      PurchaseOrderServices.searchOrder(params).then((response) => {
        this.dummyDataSource = response.data
      })
      this.loading = false
    },
  },
}
</script>