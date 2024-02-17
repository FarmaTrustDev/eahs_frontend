<template>
      <div slot="content">
        <a-table 
                  :columns="columnsLabel"
                  :data-source="dummyDataSourceLabel"
                  
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
              <a-icon type="edit" @click="goto('/inbound/location/label?id='+record.sampleGuid)" />
              </template>
                <span slot="noOfLabels" slot-scope="text, record" >
                    {{ record.noOfLabels }}
               <a-button type="primary" class="wd-11"  >Print New Label
               </a-button>
              </span>
                </a-table>
        
      </div>
  </template>
  <script>
  
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import SampleServices from '~/services/API/SampleServices'
  
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: {  },
    mixins: [routeHelpers, notifications],
    data() {
      return {
        datasourceLabel: [],
        dummyDataSourceLabel:[],
        columnsLabel: [
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
            title: 'Number of Labels',
            dataIndex: 'noOfLabels',
            scopedSlots: {
            customRender: 'noOfLabels',
          }
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
      this.GetSample()
    },
    methods: {
      preventDefault,
      GetSample()
    {
      SampleServices.get().then((response)=>{
        this.dummyDataSourceLabel = response.data
      })
    },
      
      
    },
  }
  </script>