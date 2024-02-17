<template>
    <div slot="content" class="tabCol">
        <a-table 
                              :columns="columns"
                              :data-source="dummyDataSource"
                              
                              class="rounded-table pt-10 "
                              :pagination="{
                                defaultPageSize: 10,
                                showSizeChanger: true,
                                pageSizeOptions: ['10', '20', '30', '50', '100'],
                              }"
                            >
                <span slot="action"  slot-scope="value, row">
                        <a-icon v-if="row.action===true" type="check"  class="txt-green" />
                        <a-icon v-else type="close"  class="txt-red" />
                </span>
                            </a-table>
      
    </div>
</template>
<script>

import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import SampleStatusServices from '~/services/API/SampleStatusServices'
import SampleServices from '~/services/API/SampleServices'
// import PageLayout from '~/components/layout/PageLayout'
export default {
  components: {  },
  mixins: [routeHelpers, notifications],
  data() {
    return {
      responsiblePerson:'',
      isArrived:false,
      isRegister:true,
      datasource: [],
        dummyDataSource:[],
        columns: [
          {
            title: 'Detail',
            dataIndex: 'detail',
            key: 'detail',
          },
          {
            title: 'Action',
          dataIndex: 'action',
          scopedSlots: {
          customRender: 'action',
          }
          },
          {
            title: 'Person Responsible',
           dataIndex: 'personResponsible',
            key:'personResponsible'
          },
          {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
          }
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
    this.sampleId = this.$route.query.id;
    this.getSample();
    this.getSampleInbountProcessing()
  },
  methods: {
    preventDefault,
    getSampleInbountProcessing()
    {
      SampleStatusServices.getIBSProcessing(this.sampleId).then((response)=>{
        this.dummyDataSource=response.data.result
      })
    },
    getSample()
      {
        SampleServices.getById(this.sampleId).then((response)=>{
          if(response.data.length!==0)
          {
            this.isRegister=true
            this.responsiblePerson=response.data.createdBy
            if(response.data.custodianId !==1)
            this.isArrived=true
          }
        })
      },
    
  },
}
</script>