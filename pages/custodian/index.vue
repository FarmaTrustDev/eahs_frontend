<template>
    <page-layout
      :loading="false"
      title="Samples"
      class="specific container page-search-input-container"
      :create="false"
      :back="false"
    >
    <div slot="content">
        <a-table
                :columns="columnsReception"
                :data-source="dummyDataSourceReception"
                class="rounded-table pt-10 users-list"
                :pagination="{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '30', '50', '100'],
                }"
              >
            <template slot="locationName" slot-scope="text,record">
              {{ record.locationName }}
              <a-icon type="edit" @click="goto('/inbound/location')" />
              </template>

          <template slot="sampleId" slot-scope="text,record">
          <span>
            <a @click="goto('/inbound/samples/sampleStatusWiseList?id='+record.sampleGuid)">{{ record.puid }}</a>
          </span>
        </template>    
          <template slot="typeName" slot-scope="text,record">
          <span>
            <a @click="goto('/inbound/samples/sampleStatusWiseList?id='+record.sampleGuid)">{{ record.typeName }}</a>
          </span>
        </template>
            <span slot="action" slot-scope="action">
                <a-dropdown>
            <a-button class="action-button" @click="preventDefault">
              Admin <a-icon type="down" />
            </a-button>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a @click="goto(`/inbound/samples/sampleRegister/viewSample?id=${action.sampleGuid}`)">View</a>
              </a-menu-item>
              <a-menu-item key="2" >
                <span @click="goto(`samples/sampleRegister?id=${action.sampleGuid}`)">Edit</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
              </span>

            </a-table>
    </div>
    </page-layout>
</template>
<script>

import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import {
  SMART_LAB_TREATMENT_PENDING_PHASES
} from '~/services/Constant/Phases'
import SampleServices from '~/services/API/SampleServices'
import PageLayout from '~/components/layout/PageLayout'

export default {
  components: { PageLayout },
  mixins: [routeHelpers, notifications],
  data() {
    return {
        phases:SMART_LAB_TREATMENT_PENDING_PHASES,
      datasourceReception: [],
      dummyDataSourceReception:[],
      columnsReception: [
        {
          title: 'Client',
          dataIndex: 'clientName',
          key: 'clientName',
        },
        {
          title: 'Sample ID',
          dataIndex: 'sampleId',
          scopedSlots: {
          customRender: 'sampleId',
          }
        },
        {
          title: 'Type',
          dataIndex: 'typeName',
          scopedSlots: {
          customRender: 'typeName',
          }
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity' ,
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
          title:'Date',
          dataIndex: 'createdDate',
          key: 'createdDate',
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots:{
            customRender: 'action'
          }
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
    this.GetSample()
  },
  methods: {
    preventDefault,
    GetSample()
    {
      SampleServices.getCustodianSample().then((response)=>{
        this.dummyDataSourceReception = response.data
      })
    },
  stepClick(record, phase) {
      // insane logic
      //  2 for patient
      // return false
      this.goto('/inbound/samples/sampleStatusWiseList?id='+record.sampleGuid)
    }
  }
  
}
</script>