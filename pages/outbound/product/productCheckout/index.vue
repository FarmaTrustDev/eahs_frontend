<template >
      <div  slot="content">
        <h2>Your Cart</h2>
        <div v-if="cartDummyData.length===0" class="ant-col ant-col-20 mt-40" >
          <a-empty >
            <span slot="description"> There is no <a>Product</a> </span>
          </a-empty>
        </div>
        <div v-if="isDataExist" class="txt-red"><span>Please Add Item</span></div>
        <div  v-for="cart in cartDummyData" :key="cart.id"  >
        <div class="ant-col ant-col-22 mt-15 consentClass">  
        <a-row>
          <a-col :lg="{span:10}" :md="{span:5}" :sm="{span:3}" :xs="{span:5}">
          <div class="pt-3 ml-10"><h3>{{ cart.productName }} - {{ cart.productQuantity }}</h3></div>
          </a-col>
          <a-col :lg="{span:7}" :md="{span:3}" :sm="{span:3}" :xs="{span:3}">
          <div class="pt-3 ml-10"><h3>{{ cart.productPrice }}{{ cart.priceUnit }}</h3></div>
          </a-col>
          <a-col :lg="{span:3}" :md="{span:6}" :sm="{span:7}" :xs="{span:6}">
          <div class="ant-col ant-col-3"><a-button class="removeButton" @click="deleteCartItem(cart.cartDetailId,cart.productPrice,'qnt' + cart.cartDetailId,cart)">Remove</a-button></div>
        </a-col>
        <a-col :lg="{span:1}" :md="{span:6}" :sm="{span:7}" :xs="{span:6}">
          <div class="ant-col ant-col-2"><a-button class="plusButon" @click="AddQuantity('qnt' + cart.cartDetailId , cart.productPrice,cart.productQuantity)">+</a-button></div>
        </a-col>
        <a-col :lg="{span:1}" :md="{span:6}" :sm="{span:7}" :xs="{span:6}">
          <div class="ant-col ant-col-2"><a-button class="showQuantity" v-bind:id="'qnt' + cart.cartDetailId" value="1" >1</a-button></div>
        </a-col>
        <a-col :lg="{span:1}" :md="{span:6}" :sm="{span:7}" :xs="{span:6}">
          <div class="ant-col ml-5 ant-col-2"><a-button class="plusButon" @click="SubtractQuantity('qnt' + cart.cartDetailId, cart.productPrice)" >-</a-button></div>
        </a-col>
        </a-row>
        </div> 
        
        <h3 class="ant-col ant-col-24 mt-10">Delivery Time: {{ cart.deliveryTime }} Days</h3>
        </div>
        <div class="ant-col ant-col-24"><h2>Courier Service:</h2></div>
        <div class="ant-col ant-col-12">
          <a-select
                
                v-decorator="[
                  'courierServiceId',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please select courier service',
                      },
                    ],
                  },
                ]"
                class="w-100 ml-15"
                placeholder="Select Courier"
                :filter-option="filterOption"
                :show-search="true"
                >
                <a-select-option 
                v-for="log in courier" 
                :key="log.id"
                @click="getCourierServices(log.id)" 
                >
                {{ log.name }}
              </a-select-option>
            </a-select>
            <!-- :default-value="defaultCourier" -->
        </div>
        <div class="ant-col ant-col-24"><h2>Delivery Options:</h2></div>
        <div 
        class="ant-col ant-col-22" 
        style="border: 2px solid #D9D9D9;border-radius: 20px;"
        >
          <a-empty v-if="deliveries.length===0">
            <span slot="description"> There is no <a>Delivery Service</a> </span>
          </a-empty>
          <div 
          v-for="delivery in deliveries" 
          :key="delivery.id" 
          class="ant-col ant-col-8" 
          >
            <div class="ant-col ant-col-8 ml-30 mt-15">
                        <h1>{{ delivery.name }}</h1>
                    </div>
                    <div class="ant-col ant-col-5 mt-5"><a-input class="txtBoxSt"
                                    v-decorator="[
                                        delivery.name,
                                        {
                                        initialValue: 'asd',
                                        rules: [
                                            {
                                            required: true,
                                            message: 'Please input your project description',
                                            },
                                        ],
                                        },
                                    ]"
                                    :value=delivery.price
                                    placeholder="£1245"
                    /> 
                    </div>
                    <div class="ant-col ant-col-3 ml-20 mt-15">
                        <a-switch :checked="courierSerId === delivery.id"
                                v-decorator="[
                                delivery.id,
                                {
                                    rules: [],
                                    valuePropName: 'checked',
                                },
                                ]"
                                :data-rowId="1"
                                size="large"
                                class="toggle_record"
                                checked-children="Yes"
                                un-checked-children="No"
                                @change="(value) => handleCheck(value, delivery.price,delivery.id)"
                            />
                    </div>
                    <div class="ant-col ant-col-24 ml-30 ">
                        Delivered within
                    </div>
                    <div class="ant-col ant-col-24 ml-30 ">
                        {{ delivery.deliveryTime }} Days
                    </div>
        </div>
    </div>
    <div v-if="isCourierService" class="ant-col ant-col-24 txt-red mt-4"><span>Please select CourierService</span></div>
    
          
          <a-form :form="form" @submit="onSubmitCart()">
              <div v-if="isNew">
                <a-row>
                  <a-col :span="20">
                    <h2 class="mt-15"><b>Shipping Details</b></h2>
                  </a-col>
                  <a-col :span="2">
                  <div class="font-18 color-red mt-10 cursor-pointer ml-20">
                    <span>close</span>
                    <a-icon 
                    type="close"
                    class="mt-10 " 
                    @click="newShipment(false)"
                    />
                  </div>
                  </a-col>
                </a-row>
                <a-row>
                <a-col :span="5">
                  <h2>Shipment destination:</h2>
                </a-col>
                <a-col :span="7">
                  <a-form-item>
                  <a-input
                  v-decorator="[
                    'destination',
                    {
                                    // initialValue: entityPatient.isDonor,
                                    rules: [
                                      {required: true,
                                      message: 'Please enter destination'}
                                    ],
                                    // valuePropName: 'checked',
                                  },
                  ]"/>
                </a-form-item>
                </a-col>
                <a-col :span="1"></a-col>
                <a-col :span="2">
                  <h2>Country:</h2>
                </a-col>
                <a-col :span="7">
                  <a-form-item class="mb-11">
                    <a-select
                    v-decorator="[
                      'country',
                      {
                        // initialValue: entityPatient.country,
                        rules: [
                          {
                            required: true,
                            message: 'Please select country',
                          },
                        ],
                      },
                    ]"
                    :show-search="true"
                  >
                    <a-select-option v-for="country in countries" :key="country.name">
                      {{ country.name }}
                    </a-select-option>
                  </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="5">
                  <h2>Zip:</h2>
                </a-col>
                <a-col :span="7">
                    <a-form-item>
                    <a-input
                    v-decorator="[
                    'zip',
                    {
                                    // initialValue: entityPatient.isDonor,
                                    rules: [
                                      {required: true,
                                      message: 'Please enter zip'}
                                    ],
                                    // valuePropName: 'checked',
                                  },
                  ]" />
                  </a-form-item>
                </a-col>
                <a-col :span="1"></a-col>
                <a-col :span="2">
                  <h2>State:</h2>
                </a-col>
                <a-col :span="7">
                  <a-form-item>
                    <a-input
                    v-decorator="[
                    'state',
                    {
                                    // initialValue: entityPatient.isDonor,
                                    rules: [
                                      {required: true,
                                      message: 'Please enter state'}
                                    ],
                                    // valuePropName: 'checked',
                                  },
                  ]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="5">
                  <h2>City:</h2>
                </a-col>
                <a-col :span="7">
                  <a-form-item>
                    <a-input
                    v-decorator="[
                    'city',
                    {
                                    // initialValue: entityPatient.isDonor,
                                    rules: [
                                      {required: true,
                                      message: 'Please enter city'}
                                    ],
                                    // valuePropName: 'checked',
                                  },
                  ]" />
                  </a-form-item>
                </a-col>
                <a-col :span="1"></a-col>
                <a-col :span="2">
                  <h2>Contact:</h2>
                </a-col>
                <a-col :span="7">
                  <a-form-item>
                    <a-input
                    v-decorator="[
                    'contact',
                    {
                                    // initialValue: entityPatient.isDonor,
                                    rules: [
                                      {required: true,
                                      message: 'Please enter contact'}
                                    ],
                                    // valuePropName: 'checked',
                                  },
                  ]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="5">
                  <h2>Address:</h2>
                </a-col>
                <a-col :span="17">
                  <a-form-item>
                    <a-input
                    v-decorator="[
                    'address',
                    {
                                    // initialValue: entityPatient.isDonor,
                                    rules: [
                                      {required: true,
                                      message: 'Please enter address'}
                                    ],
                                    // valuePropName: 'checked',
                                  },
                  ]" />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
            
          <a-table
                  v-if="!isNew"
                  :columns="columnsShipment"
                  :data-source="dummyDataSourceShipment"
                  class="rounded-table pt-10 ant-col ant-col-22"
                  :pagination="false"
                >
                
          </a-table>
          <a-col :span="2" :offset="18">
        <a-button v-if="!isNew" class="wd-200" type="primary" @click="newShipment(true)">Add new shipping detail</a-button>
        </a-col>
          <div class="ant-col ant-col-22 mt-10" style="border: 2px solid #D9D9D9;border-radius: 20px;">
              <div class="fl-rt ant-col ant-col-4 mt-10">
              <h4 class="ant-col ant-col-24 ">Sub Total :{{ this.totalPrice }}{{ this.unit }}</h4>
              <h4 class="ant-col ant-col-24 ">Shipping :{{ this.shippingPrice }}{{ this.unit }}</h4>
              <h4 class="ant-col ant-col-24 ">VAT :</h4>
              <h4 class="ant-col ant-col-24 ">Total :{{ subTotalPrice }}{{ this.unit }}</h4>
              </div>
          </div>
          <a-col :span="3" :offset="18">
          <FormActionButton type="primary" class="mt-10 wd-10 ml-40" custom-text="Check Out" />
          </a-col>
        </a-form>
        <a-modal
    :visible="visibleConfirm"
    :footer="null"
    @cancel="closeConfirmModal(false)"
    centered
    >
    <center> <h2 class="mt-5">Please Select Consentform!</h2>
    <a-button class="ant-btn ant-btn-primary error-ok-btn mt-5" type="primary" @click="closeConfirmModal(false)">Back</a-button></center>
    </a-modal>

    </div>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { filterOption,preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import CartServices from '~/services/API/CartServices'
  import CourierServiceServices from '~/services/API/CourierServiceServices'
  import CustomerServices from '~/services/API/CustomerServices'
  import OrganizationServices from '~/services/API/OrganizationServices'
  import  { CART_STATUSES } from '~/services/Constant/index'
  import CountryServices from '~/services/API/CountryServices'
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { },
    mixins: [routeHelpers, notifications],
    props:{
      entity: { 
        type: Object,
         default: () => ({}) 
        }
    },
    data() {
      return {
        courier:[],
        totalPrice:0,
        subTotalPrice:0,
        unit:'',
        dummyDataSourceShipment:[],
        isProject:false,
        checkedOut:CART_STATUSES.checkedOut.name,
        isCreateCheck:false,
        visibleConfirm:false,
        isConsent:false,
        consentIds:[],
        cartDummyData:[],
        userDeleteModal: false,
        loading: false,
        fullName: [],
        isExist:false,
        userId: '',
        shippingPrice:0,
        consentList:[],
        deliveries:[],
        countries:[],
        form: this.$form.createForm(this, {
            name: 'shippingForm',
            }),
        existValue:0,
        courierSerId:0,
        cartDetail:[],
        columnsShipment: [
        {
          title: 'Shippement Destination',
          dataIndex: 'destination',
          key: 'destination',
        },
        {
          title: 'Address1',
          dataIndex: 'address',
          key: 'address' ,
        },
        {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
          
        },
        {
          title: 'State/Province',
          dataIndex: 'state',
          key: 'state' ,
        },
        {
          title: 'Zip',
          dataIndex: 'zip',
          key: 'zip' ,
        },
        {
          title: 'Contact',
          dataIndex: 'phone',
          key: 'phone' ,
        },
      ],
      maxDelivery:0,
      cartID:0,
      isCourierService:false,
      isDataExist:false,
      isNew: false
      }
    },
    computed: {
      
    },
    mounted() {
      this.getCartItem()
      this.totalPrice=0
      this.getCustomerShipment()
      this.getCouriers()
      this.getAllCountries()
    },
    methods: {
        filterOption,
        preventDefault,
        getCartItem()
        {
        CartServices.get().then((response)=>{
            this.cartDummyData=response.data.cartDetail
            this.unit = response.data.cartDetail[0].priceUnit
            this.cartID = response.data.cartId
            this.checkMaxDelivery(this.cartDummyData)
            this.calculateSubTotal()
            
        })
        },
        getAllCountries()
        {
          CountryServices.getAllCountries().then((response)=>{
            this.countries= response.data
          })
        },
        newShipment(e){
          this.isNew = e
        },  
        getCouriers() {
          OrganizationServices.getCouriers().then((response) => {
            this.courier = response.data
          })
        },
        getCourierServices(id)
        {
          CourierServiceServices.getById(id).then((response)=>{
            this.deliveries=response.data
            
          })
        },
      deleteCartItem(id,price,qnty,cart)
      {
        CartServices.deleteCartItem(id).then((response=>{
            this.callMethod();
            const tot= price * parseInt(document.getElementById(qnty).value)
            this.totalPrice= this.totalPrice - parseInt(tot);
            this.subTotalPrice = this.subTotalPrice - parseInt(tot);
            const index = this.cartDummyData.indexOf(cart);
            if (index > -1) {
              this.cartDummyData.splice(index, 1);
              if(this.cartDummyData.length === 0){
                this.goto('/outbound/orderSummary')
              }
            }
              }))
      },
      getCustomerShipment()
      {
        CustomerServices.get().then((response)=>{
            this.dummyDataSourceShipment=[response.data]
       })
      },
      checkMaxDelivery()
      {
      this.cartDummyData.forEach((detail) => {
      const deliveryTime = detail.deliveryTime;
      if (deliveryTime > this.maxDelivery) {
        this.maxDelivery = parseInt(deliveryTime);
      }
      });
      // this.getCourierServices(this.maxDelivery)
      },
      calculateSubTotal()
      {
      this.totalPrice=0;
      this.cartDummyData.forEach((detail) => {
      const prodPrice = detail.productPrice;
      this.totalPrice=this.totalPrice + prodPrice;
      this.subTotalPrice = this.totalPrice;
      });
      },
      calculateOnTotalChange(price,int)
      {
        if(int === 1)
        {
          this.totalPrice=this.totalPrice + price;
        }
        else{
          this.totalPrice=this.totalPrice - price;
        }
          this.subTotalPrice = parseInt(this.totalPrice) + parseInt(this.shippingPrice);
        
      },
      callMethod() {
      this.$root.$emit('updateCart')
    },
    handleCheck(value,price,cSId)
    {
      this.isCourierService=false
      if(this.courierSerId === 0 && value === true)
      {
      this.courierSerId = cSId;
      this.shippingPrice=price;
      if(value=== true)
      {
        this.subTotalPrice  =parseInt(this.subTotalPrice ) + parseInt(price);
      }
      else{
        this.subTotalPrice  =parseInt(this.subTotalPrice ) - parseInt(price);
        this.shippingPrice = 0
      }
      }
      if(this.courierSerId !== 0 && value === false)
      {
        this.courierSerId = 0;
        this.shippingPrice=price;
      if(value === true)
      {
        this.subTotalPrice  =parseInt(this.subTotalPrice ) + parseInt(price);
      }
      else{
        this.subTotalPrice  =parseInt(this.subTotalPrice ) - parseInt(price);
        this.shippingPrice = 0
      }
      }
      
    },
    AddQuantity(id,price,prodQty)
    {
      this.existValue=document.getElementById(id).value;
      this.existValue = parseInt(this.existValue) + 1;
      if(this.existValue <= prodQty)
      {
      document.getElementById(id).value=parseInt(this.existValue);
      document.getElementById(id).innerHTML=parseInt(this.existValue);
      this.calculateOnTotalChange(parseInt(price),1);
      }
    },
    SubtractQuantity(id,price)
    {
      this.existValue=document.getElementById(id).value;
      if(parseInt(this.existValue) !== 1 )
      {
      this.existValue = parseInt(this.existValue) - 1;
      
      document.getElementById(id).value=parseInt(this.existValue);
      document.getElementById(id).innerHTML=parseInt(this.existValue);
      this.calculateOnTotalChange(parseInt(price),2);
      }
    },
    onSubmitCart(e)
    {
      if(this.courierSerId ===0)
      {
        this.isCourierService = true
      }
      else if(this.cartDummyData.length === 0 )
      {
        this.isDataExist = true
      }
      else{
        // e.preventDefault()
        
        this.form.validateFields((err, values) => {
          if(!err){
            this.createCheckout(values)
          } 
        })
    }
    },
    createCheckout(values){
      this.cartDummyData.forEach((detail) => {
              this.cartDetail.push({cartDetailId:detail.cartDetailId,cartId:this.cartID,productId:detail.productId,productTotalQuantity:parseInt(document.getElementById('qnt'+detail.cartDetailId).value),productTotalPrice:detail.productPrice * parseInt(document.getElementById('qnt'+detail.cartDetailId).value) })
            });
            // console.log(this.cartDetail)
            const formData = new FormData()
            this.cartDetail.forEach((item, index) => {
              for (const key in item) {
                formData.append(`cartDetail[${index}].${key}`, item[key]);
              }
            });
            if(this.isNew){
              formData.append('destination', values.destination)
              formData.append('city', values.city)
              formData.append('address', values.address)
              formData.append('contact', values.contact)
              formData.append('zip', values.zip)
              formData.append('country', values.country)
              formData.append('state', values.state)
              formData.append('isNewAddress',true)
            }
            formData.append('courierServiceAllocationId', this.courierSerId)
            formData.append('totalPrice', this.subTotalPrice)
            formData.append('cartId', this.cartID)
            formData.append('totalQuantity', this.cartDummyData.length)
            formData.append('cartStatusName', this.checkedOut)
            CartServices.checkOut(formData).then((response)=>{
              console.log(response.data)
              this.callMethod()
            }).catch(this.error).finally(this.goto('/outbound/orderSummary'))
    }
    },
  }
  </script>
  