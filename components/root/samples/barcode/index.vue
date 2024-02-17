<template>
    <a-row>
                <a-col :md="10">
                   <a-card :offset="2" class="bg-grey">
                       <a-row :span="24" >
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Invoice Number</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.invoiceNumber }}</h3></a-col>
                       </a-row>
                       <a-row :span="24" >
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Waybill Number</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.wayBillingNo }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Date Received</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.dateReceived }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Courier Email</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.courierEmail }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Courier Contact</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.courierContact }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Sample Description</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.description }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Quantity Received</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.quantity }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Client</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.clientName }}</h3></a-col>
                       </a-row>
                   </a-card>
                </a-col>
                <a-col :md="10" :offset="2">
                    <a-card class="bg-grey">
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Researcher Name</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.researcherName }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Study Name</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.projectName }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Project ID</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.projectId }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">#ARN</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.lotNo }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Protocol</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.protocolName }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Protocol ID</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.protocolId }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Location</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.locationName }}</h3></a-col>
                       </a-row>
                       <a-row :span="24">
                        <a-col :span="12" :offset="1"><h3 class="txtFt">Client ID</h3></a-col>
                        <a-col :offset="1" :span="8"><h3 class="txtTp">{{ sampleDummyData.clientId }}</h3></a-col>
                       </a-row>
                   </a-card>
                </a-col>
            </a-row>
</template>
<script>

import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'

// import PageLayout from '~/components/layout/PageLayout'
export default {
  components: {  },
  mixins: [routeHelpers, notifications],
  data() {
    return {
        sampleDummyData:
          { 
          }
      
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    
  },
  methods: {
    preventDefault
    
  },
}
</script>
<style scoped>
.mg-tp-30{
  margin-top:13px ;
}
.txtFt{
  padding-top: 8px;font-weight: 200;
}
.txtTp{
  padding-top: 8px;
}
</style>