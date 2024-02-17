<template>
    <page-layout
      :loading="false"
      title="New Sample Log"
      class="specific container page-search-input-container"
      :create="false"
    >
      
      <div slot="content">
        <div class="mt-30">
          <h4 class="pt-10">Register New Sample</h4>
          <h4 class="pt-10">Please fill in the sample detail below</h4>
        </div>
        <SampleReceive></SampleReceive>
      </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import SampleReceive from '~/components/root/samples/sampleReceive/addSampleReceive'
  
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout, SampleReceive},
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
      
    },
  }
  </script>
  <style>
  .mg-50{
    margin-left: 50px;
  }
</style>