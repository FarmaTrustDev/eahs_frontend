<template>
  <div slot="content" class="tabCol" style="margin-top:-20px" >
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
              <span slot="detail" slot-scope="value, row">
                {{ row.detail }}
                <a-icon v-if="row.detail === 'Sample has been published in the catalogue'" type="edit"  @click="goto('/inbound/samples/catalouge?id='+sampleId)"  />
              </span>
              <span slot="action" slot-scope="value, row">
                <a-icon v-if="row.action===true" type="check"  class="txt-green" />
                      <a-icon v-else type="close"  class="txt-red" />
              </span>
            <!-- <span slot="detail" slot-scope="text, record"  >
                  {{ record.detail }}
                  <a-icon type="edit" v-if="record.detail=='Sample has been published in the catalouge'" @click="goto('/inbound/samples/catalouge')" />
            </span> -->
                          </a-table>
    
  </div>
</template>
<script>

import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import SampleStatusServices from '~/services/API/SampleStatusServices'

// import PageLayout from '~/components/layout/PageLayout'
export default {
components: {  },
mixins: [routeHelpers, notifications],
data() {
  return {
    
    datasource: [],
      dummyDataSource:[],
      columns: [
        {
          title: 'Detail',
          dataIndex: 'detail',
          scopedSlots: {
        customRender: 'detail',
        }
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
          key: 'personResponsible',
        },
        {
          title: 'Note',
          dataIndex: 'note',
          key: 'note',
        }
      ],
    userDeleteModal: false,
    
    fullName: [],
    userId: '',
  }
},
computed: {
  // ...mapGetters(['getUser']),
  user() {
    return this.$store.getters.getUser
  },
  translation() {
    return this.$store.getters.getTranslation
  },
},
mounted() {
  this.sampleId = this.$route.query.id;
  this.getSampleOutbountProcessing()
},
methods: {
  preventDefault,
  getSampleOutbountProcessing()
  {
    SampleStatusServices.getOBSProcessing(this.sampleId).then((response)=>{
      this.dummyDataSource=response.data.result
    })
  }
},
}
</script>