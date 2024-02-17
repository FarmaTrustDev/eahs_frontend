<template>
    <page-layout
      :loading="false"
      title=""
      :create="false"
      class="sample-container page-search-input-container"
    >
      <div slot="content" class="mtm-70">
        <div class="h-tabs">
          <a-tabs type="card" >
              <a-tab-pane key="1" tab="Sample Reception">
                <div>
                  <!-- :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" -->
                  <a-list item-layout="vertical"  >
                    <a-row>
                    
                    <a-col :offset="19" :span="4">
                      <a-list-item>
                          <a-input 
                          ref="userNameInput"
                          class="page-search-input"
                          placeholder="Search Sample"
                          style=" height: 40px;margin-top:-15px;"
                          @keyup="searchChild"
                        >
                        <a-icon slot="prefix" type="search" />
                        </a-input>
                      </a-list-item>
                    </a-col>
                  </a-row>
                 
                  </a-list>
                </div>
                <Reception ref="childRef"></Reception>
                </a-tab-pane>
              
              <!-- <a-tab-pane key="2" tab="Labels">
                <div>
                  <a-list item-layout="vertical"  >
                    <a-row>
                    
                    <a-col :offset="19" :span="4">
                      <a-list-item>
                          <a-input 
                          ref="userNameInput"
                          class="page-search-input"
                          placeholder="Search Sample"
                          style=" height: 40px;margin-top:-15px;"
                          @keyup="searchChild"
                        >
                        <a-icon slot="prefix" type="search" />
                        </a-input>
                      </a-list-item>
                    </a-col>
                  </a-row>
                  </a-list>
                </div>
                <Labels></Labels>
                </a-tab-pane> -->
              
               
              <a-tab-pane key="3" tab="Sample Return">
                <div>
                  <a-list item-layout="vertical"  >
                    <a-row>
                    
                    <a-col :offset="19" :span="4">
                      <a-list-item>
                          <a-input 
                          ref="userNameInput"
                          class="page-search-input"
                          placeholder="Search Sample"
                          style=" height: 40px;margin-top:-15px;"
                          @keyup="searchChild"
                        >
                        <a-icon slot="prefix" type="search" />
                        </a-input>
                      </a-list-item>
                    </a-col>
                  </a-row>
                  
                  </a-list>
                </div>
                  <Return></Return>
                </a-tab-pane>
              </a-tabs>
              
        </div>
        <div class="ant-col ant-col-7">

        </div>
        <div class="ant-col ant-col-12 mt-15">
          <b>if a new sample has arrived and you cannot find in this list please</b>
        </div>
        <div class="ant-col ant-col-3 mt-2">
          <a-button type="primary" @click="goto('/inbound/samples/form')">Register New Sample</a-button>
        </div>
      </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  // import Labels from '~/components/root/samples/labels'
  import Reception from '~/components/root/samples/samplereception'
  import Return from '~/components/root/samples/samplereturn'
  
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout,Reception,Return },
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
  