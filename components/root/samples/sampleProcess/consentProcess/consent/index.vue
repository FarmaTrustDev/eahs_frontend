<template>
    <div slot="content"  class="tabCol">
        <a-table 
                              :columns="columns"
                              :data-source="dummyDataSource"
                              
                              class="rounded-table pt-10  "
                              :pagination="{
                                defaultPageSize: 10,
                                showSizeChanger: true,
                                pageSizeOptions: ['10', '20', '30', '50', '100'],
                              }"
                            >
                  <span slot="action" slot-scope="value, row">
                    <a-icon v-if="row.action===true" type="check"  class="txt-green" />
                    <a-icon v-else type="close" class="txt-red" />
                  </span>
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
      PtntID:0,
      responsiblePerson:'',
      datasource: [],
        dummyDataSource:[],
        columns: [
          {
            title: 'Detail',
            dataIndex: 'detail',
            key:'detail'
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
            key: 'personResponsible'
          },
          {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
          }
        ],
        isConsented:false
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
    this.getSampleConsentProcessing()
  },
  methods: {
    preventDefault,
    getSampleConsentProcessing()
    {
      SampleStatusServices.getCSProcessing(this.sampleId).then((response)=>{
        this.dummyDataSource=response.data.result
      })
    }
  },
}
</script>