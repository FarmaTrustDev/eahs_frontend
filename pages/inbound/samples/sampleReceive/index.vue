<template>
    <page-layout
      :loading="false"
      title="Sample Received"
      :create="false"
      class="sample-container page-search-input-container"
    >
      <div slot="content" class="mtm-70">
        
        <div class="h-tabs">
            <a-col :offset="17" :span="4">
                <a-input 
                    ref="userNameInput"
                    class="page-search-input"
                    placeholder="Search Sample"
                    style=" height: 40px;margin-top:-15px;"
                    @keyup="searchChild"
                >
                <a-icon slot="prefix" type="search" />
    
                </a-input>
            </a-col>
          <Receive ref="childRef"></Receive>
        
              
        </div>
        <div class="ant-col ant-col-9">

        </div>
        <div class="ant-col ant-col-12 mt-40">
          <b>if a new sample has arrived and you cannot find in this list please</b>
        </div>
        <div class="ant-col ant-col-3 mt-2">
          <a-button type="primary" @click="goto('/inbound/samples/sampleReceive/addSampleReceive')">Receive Sample</a-button>
        </div>
      </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import Receive from '~/components/root/samples/sampleReceive'
  
  
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout,Receive },
    mixins: [routeHelpers, notifications],
    data() {
      return {
        inbound:10,
        outbound:5,
        processing:7,
        scheduled:3
      }
    },
    computed: {
     
    },
    mounted() {
      
    },
    methods: {
      preventDefault,
      searchChild(event)
      {
        this.$refs.childRef.getBySearch(event.target.value)
      }
    },
  }
  </script>
  <style scoped>
  .mg-50{
    margin-left: 50px;
  }
  .sample{
    max-width: 1180px;
    width: auto;
  }
</style>
  