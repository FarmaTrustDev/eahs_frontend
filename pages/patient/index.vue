<template>
    <page-layout
      :loading="false"
      title="Samples"
      class="specific container page-search-input-container"
      :create="false"
      :back="false"
    >
    <div slot="content">
      <a-col :offset="18">
                <a-input
                          ref="userNameInput"
                          class="page-search-input wd-100"
                          placeholder="Search Sample"
                          @keyup="searchSample"
                          >
                      <a-icon slot="prefix" type="search" />
                      </a-input>
              </a-col>
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
              <!-- <a-menu-item key="2" >
                <span @click="goto(`samples/sampleRegister?id=${action.sampleGuid}`)">Edit</span>
              </a-menu-item> -->
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
import SampleServices from '~/services/API/SampleServices'
import PageLayout from '~/components/layout/PageLayout'

export default {
  components: { PageLayout },
  mixins: [routeHelpers, notifications],
  data() {
    return {
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
          key: 'locationName'
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
        },
      ],
      userId: ''
      
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
    const data = JSON.parse(localStorage.getItem('vuex'))
    this.userId = data.auth.user.id
  },
  methods: {
    preventDefault,
    GetSample()
    {
      SampleServices.getPatientSample().then((response)=>{
        this.dummyDataSourceReception = response.data
      })
    },
    searchSample(event) {
        const keyword = event.target.value
        this.fetchSample({
          samplePuid: keyword,
          study:keyword,
          userId: this.userId,
          active: true
        })
    },
    fetchSample(params = {}) {
      this.loading = true
      SampleServices.searchSample(params).then((response) => {
        this.dummyDataSourceReception = response.data
      })
      this.loading = false
    },
  }
  
}
</script>