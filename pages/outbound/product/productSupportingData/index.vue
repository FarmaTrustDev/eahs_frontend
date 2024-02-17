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
        <a-button type="primary" class="md-11" @click="goto('/inbound/samples/form')">Add New Activity</a-button>
      </template>
      <div slot="content" class="mtm-70">
        <div class="ant-col ant-col-24 mt-40 ml-15 " >
           <h2 class="pt-10">Description</h2>
        </div>
        <div class="ant-col ant-col-20 mt-20 bg-grey mg-t-10 plr-10 pt-10 pb-10" >
            <p>{{ product.productDescription }}</p>
        </div>
        <div class="ant-col ant-col-24 mt-15 ml-15 " >
           <h2 class="pt-10">Supporting Data</h2>
        </div>
        <div class="ant-col ant-col-20 mt-20 mg-t-10 plr-10 pt-10 " >
            <div class="ant-col ant-col-8" v-for="data in dataSet" :key="data.id">
            <a-button class="wd-17" @click="goto('/outbound/product/productSupportingDataDetail?id='+productId)">{{ data.name }}</a-button>
            </div>
        </div>
        <div class="ant-col ant-col-24 mt-15 ml-15 " >
           <h2 class="pt-10">References</h2>
        </div>
        <div class="ant-col ant-col-20 mt-20 mg-t-10 plr-10 pt-10  " v-for="reference in product.productReference" :key="reference.id">
            <div><h4>{{ reference.author}},<bdi class="text-blue">{{ reference.title }}</bdi>.{{ reference.journal }}.{{ reference.pageFromTo }}({{ reference.bublishingDate }}). </h4></div>
        </div>
        
            <a-col :offset="18" :span="4">
                <a-button type="primary" class="wd-11">Download All</a-button>
            </a-col>
            <a-col :offset="18" :span="4" class="mt-15">
                <a-button type="primary" class="wd-11">Upload</a-button>
            </a-col>
      </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import ProductServices from '~/services/API/ProductServices'
  
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout },
    mixins: [routeHelpers, notifications],
    data() {
      return {
        product:{
            productName:'Blood Sample',
            description:'Sed uc percepiet asahdhsa sakdksajd klc nndj  djsdjs skkdskd sdjkskdsd.Sed uc percepiet asahdhsa sakdksajd klc nndj  djsdjs skkdskd sdjkskdsd.Sed uc percepiet asahdhsa sakdksajd klc nndj  djsdjs skkdskd sdjkskdsd.Sed uc percepiet asahdhsa sakdksajd klc nndj  djsdjs skkdskd sdjkskdsd.',
            shippingConditions:'Dry Ice',
            storageCondition:'Liquid Nitrogen',
            biologicalSafetyLevel:'BSL-1',
            productReference:[
                {id:1,authors:'A.L.Jackson et al',title:'Position-specific chemical modification increase specificity of sirna-mediated gen silencing',journal:'RNA 12(7)',pageFromTo:'1197-1205',publishiingDate:'july 2006'},
                {id:1,authors:'A.Birminghum et al',title:'3-UTR seed Position-specific chemical modification increase specificity of sirna-mediated gen silencing',journal:'RNA 12(7)',pageFromTo:'199-204',publishiingDate:'March 2006'},
                {id:1,authors:'E.M.Andersol al',title:'Experimental chemical modification increase specificity of sirna-mediated gen silencing',pageFromTo:'853-881',journal:'RNA 12(7)',publishiingDate:'May 2008'},
            ],
        },
        dataSet:[
            {id:1,name:'DataSet 1'},
            {id:2,name:'DataSet 1'},
            {id:3,name:'DataSet 1'}
        ]
      }
    },
    computed: {
     
    },
    mounted() {
      this.productId = this.$route.query.id;
      this.getProductById();
      // this.callMethod();
      
    },
    methods: {
      preventDefault,
      getProductById()
      {
        ProductServices.getById(this.productId).then((Response=>{
          this.product=Response.data
        }))
      },
    //   callMethod() {
    //   this.$root.$emit('updateCart')
    // },
    },
  }
  </script>
 
  