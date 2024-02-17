<template>
    <div slot="content">
      <a-table
                :columns="columnsReturn"
                :data-source="dummyDataSourceReturn"
                :loading="loading"
                class="rounded-table pt-10"
                :pagination="{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '30', '50', '100'],
                }"
              >
              <template slot="blockChainNumber" slot-scope="text,record">
                  <span v-if="record.blockChainNumber!==null">{{ record.blockChainNumber }}</span>
                  <span v-else>123456</span>
                </template>
              <template slot="locationName" slot-scope="text,record">
              {{ record.locationName }}
              <a-icon v-if="record.sampleReturnId===0" type="edit" @click="goto('/inbound/location')" />
              </template>
              <span slot="status" slot-scope="text, record">
               <a-button type="primary"  class="wd-11" @click="goto('/inbound/samples/returnSample?id='+record.sampleGuid+'&samRetGuid='+record.sampleReturnGuid)"  >Edit
               </a-button>
              </span>
              </a-table>
      
    </div>
</template>
<script>

import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
// import SampleServices from '~/services/API/SampleServices'
import SampleReturnServices from '~/services/API/SampleReturnServices'

// import PageLayout from '~/components/layout/PageLayout'
export default {
  components: {  },
  mixins: [routeHelpers, notifications],
  data() {
    return {
      loading:true,
      datasourceReturn: [],
      dummyDataSourceReturn:[
      ],
      columnsReturn: [
        {
            title: 'Blockchain Number',
            dataIndex: 'blockChainNumber',
            scopedSlots: {
                customRender: 'blockChainNumber'
                }
        },
        {
          title: 'Client',
          dataIndex: 'clientName',
          key: 'clientName',
        },
        {
          title: 'Sample ID',
          dataIndex: 'puid',
          key: 'puid' ,
        },
        {
          title: 'Type',
          dataIndex: 'typeName',
          key: 'typeName',
          
        },
        {
          title: 'Total Quantity',
          dataIndex: 'quantity',
          key: 'quantity' ,
        },
        {
          title: 'Return Quantity',
          dataIndex: 'returnQuantity',
          key: 'returnQuantity' ,
        },
        {
          title: 'Project Name',
          dataIndex: 'projectName',
          key: 'projectName' ,
        },
        {
          title: 'Location',
          dataIndex: 'locationName',
          scopedSlots: {
          customRender: 'locationName',
          }
        },
        {
          title:'Status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
        },
      ],
      
    }
  },
  computed: {
  },
  mounted() {
    this.getSample()
  },
  methods: {
    preventDefault,
    getSample()
    {
      SampleReturnServices.get().then((response)=>{
        this.dummyDataSourceReturn = response.data
      }).catch(this.error)
          .finally(() => (this.loading = false))
    }
  },
}
</script>
<style scoped>
.md-10{width: 160px;}
</style>