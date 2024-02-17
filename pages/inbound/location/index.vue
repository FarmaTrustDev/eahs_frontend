<template>
  <page-layout
    :loading="false"
    :title="parseInt(actionId) === 0 ? 'Inbound/ Sample Reception/'+sampleDummyData.locationName : 'Outbound/'+sampleDummyData.locationName"
    class="specific container page-search-input-container"
    :create="false"
  >
    <div slot="content">
        <div><h3 class="mt-20"><b>You need to <span v-if="parseInt(actionId)===0">store</span><span v-else>pick</span> {{sampleDummyData.totalQuantity - sampleDummyData.productQuantity}} Vials at {{fridgeType}}</b></h3></div>
        <Listing :storages="dynamicStorage" :sample-id="sampleId" :fridge-id="fridgeId" :temp-id="tempId" :typeId="isInbound" :actionId="actionId" :processId="processId" :stepId="stepId" class="mt-25" />
    </div>
  </page-layout>
</template>
  <script>
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import { baseStorage } from '~/services/Constant/DummyData'
  import Listing from '~/components/inventory/storage/Listing'
  import SampleServices from '~/services/API/SampleServices'
  import SampleStorageServices from '~/services/API/SampleStorageServices'
  import FridgeServices from '~/services/API/FridgeServices'
  import FridgeTypeServices from '~/services/API/FridgeTypeServices'
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout,Listing },
    mixins: [routeHelpers, notifications],
    props:{
      entity: { 
        type: Object,
         default: () => ({}) 
        }
    },
    data() {
      return {
        inbound:10,
        outbound:5,
        processing:7,
        scheduled:3,
        storage: baseStorage,
        isInbound: false,
        sampleId:'',
        tempId:'',
        sampleDummyData:{},
        dynamicStorage:[],
        fridgeType:'',
        stepId:'',
        processId:'',
        fridgeId:'',
        actionId:0,
      }
    },
    computed: {
      
    },
    mounted() {
      this.sampleId = this.$route.query.id
      this.tempId = this.$route.query.tempId
      this.actionId = this.$route.query.actionId
      this.stepId = this.$route.query.stepId
      this.processId = this.$route.query.processId
      this.getSample()
      // this.getSampleStorage()
    },
    methods: {
      preventDefault,
      getSample() {
        SampleServices.getById(this.sampleId).then((response) => {
          this.sampleDummyData = response.data
          this.getAllFridgesBySiteId(this.sampleDummyData.locationId, this.sampleDummyData.idealTemprature)
          this.getFridgeType(this.sampleDummyData.idealTemprature)
          this.getFridgeBySample(this.sampleDummyData.sampleGuid)
        })
      },
      getFridgeType(id){
        FridgeTypeServices.getById(id).then((response)=>{
          this.fridgeType=response.data.name
        })
      },
      getAllFridgesBySiteId(id, fridgeTypeId){
        FridgeServices.getAllFridgesBySiteANDFTypeId(id,fridgeTypeId).then((response)=>{
          this.dynamicStorage=response.data
        })
      },
      getFridgeBySample(id){
        SampleStorageServices.getBySampleId(id).then((response)=>{
          console.log(response.data)
          this.fridgeId=response.data.id
        })
      }
    },
  }
  </script>
  <style>
  .mg-50{
    margin-left: 50px;
  }
  .mt-25{
    margin-top: -25px;
  }
</style>
  