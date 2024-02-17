<template>
    <page-layout
      :loading="false"
      title=""
      class="specific container page-search-input-container"
      :create="false"
      :back="false"
    >
      <!-- <template slot="headerMenus">
        
        <a-input
          ref="userNameInput"
          class="page-search-input"
          placeholder="Search Sample"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
        <a-button type="primary" @click="goto('/inbound/samples/form')">Add New Sample</a-button>
      </template> -->
      <div slot="content" class="mtm-70">
        <div class="h-tabs">
          <a-tabs type="card" >
              <a-tab-pane key="1" tab="Orders Summary">
                <OrderSummary></OrderSummary>
                </a-tab-pane>
               
              <a-tab-pane v-if="userRole !== userRoleArr.admin_type.name" key="2" tab="Catalogue">
                <Catalogue></Catalogue>
                </a-tab-pane>
              
              
              <a-tab-pane v-if="userRole !== userRoleArr.institute_customer_type.name" key="3"  tab="Samples">
                  <Samples></Samples>
                </a-tab-pane>
              </a-tabs>
              
        </div>
      </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import Catalogue from '~/components/root/outbound/catalogue'
  import OrderSummary from '~/components/root/outbound/orderSummary'
  import Samples from '~/components/root/outbound/samples'
  import  {  USER_ROLES } from '~/services/Constant/index'
  
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout,Catalogue,OrderSummary,Samples },
    mixins: [routeHelpers, notifications],
    data() {
      return {
        userRoleArr:USER_ROLES,
        userRole:''
      }
    },
    computed: {
     
    },
    mounted() {
      const data = JSON.parse(localStorage.getItem('vuex'))
    this.userRole =data.auth.user.roleName
    if(this.userRole === this.userRoleArr.institute_customer_type.name)
    {
      this.callMethod()
    }
      
    },
    methods: {
      preventDefault,
      callMethod() {
      this.$root.$emit('updateCart')
    },
    },
  }
  </script>
  
  