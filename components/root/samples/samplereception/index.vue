<template>
    <div slot="content">
        <a-table :scroll="{ x: true }"
                :columns="columnsReception"
                :loading="loading"
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
              <a-icon type="edit" @click="goto('/inbound/location/label?id='+record.sampleGuid)" />
              </template>
              <template slot="return" slot-scope="text,record">
              <a-icon v-if="record.returnQuantity !== 0" type="retweet" class="text-blue font-20" @click="goto('/inbound/samples/returnSample?id='+record.sampleGuid)" />
              </template>
              <template slot="dateReceived" slot-scope="text, record">
                {{  _getFormatMoment(record.dateReceived).format("DD/MM/YYYY") }}
                </template>
          <template slot="sampleId" slot-scope="text,record">
          <span>
            <a @click="record.processStatus === statuses.accept.name? gotoProce(record.sampleGuid):isVerified=true">{{ record.puid }}</a>
          </span>
        </template>    
          <template slot="typeName" slot-scope="text,record">
          <span>
            <a @click="record.processStatus === statuses.accept.name? gotoProce(record.sampleGuid):isVerified=true">{{ record.typeName }}</a>
          </span>
        </template>

              <span slot="status" slot-scope="text, record">
                <!-- //Steps -->
                <div class="treatment-steps">
                  <span class="step-col" >
                    <a-steps :initial="1" size="small">
                      <a-step
                        v-for="phase in record.processResponseDTO"
                        :key="phase.stageNo"
                        :title="phase.name"
                        :status="
                          phase.isAlreadyFill === null
                            ? 'wait'
                            : ''
                        "
                        :class="phase.stageNo < record.currentStage ? 'ant-steps-item-finish' : phase.stageNo === record.currentStage ? 'ant-steps-item-active-blue':'' "
                          
                        
                        @click="
                          phase.stageNo < record.currentStage
                            ?stepClick(record, phase) :phase.stageNo === record.currentStage ?stepClick(record, phase):''
                            
                        "
                      />
                      {{ record.processResponseDTO }}
                    </a-steps>
                  </span>
                </div>

                <!-- //Steps -->
              </span>
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
            <ErrorModal :message="message" :isShow="isVerified" @close-modal="isVerified = false"></ErrorModal>
    </div>
</template>
<script>

import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import  { CONSENT_STATUSES, USER_ROLES } from '~/services/Constant/index' 
import ErrorModal from '~/components/common/ErrorModal.vue'
import routeHelpers from '~/mixins/route-helpers'
import {
  SMART_LAB_TREATMENT_PENDING_PHASES
} from '~/services/Constant/Phases'
import SampleServices from '~/services/API/SampleServices'
import { _getFormatMoment } from '~/services/Helpers/MomentHelpers'
// import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { ErrorModal },
  mixins: [routeHelpers, notifications],
  data() {
    return {
      loading:true,
      statuses:CONSENT_STATUSES,
      roleUsers:USER_ROLES,
      phases:SMART_LAB_TREATMENT_PENDING_PHASES,
      isActiveStage:false,
      isWaiting:false,
      isVerified:false,
      processStatus:'',
      message:'This Project Process have not accepted.',
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
          dataIndex: 'totalQuantity',
          key: 'totalQuantity' ,
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
          dataIndex: 'dateReceived',
          scopedSlots :{
            customRender: 'dateReceived'
          }
        },
        {
          title:'Return',
          dataIndex: 'return',
          scopedSlots :{
            customRender: 'return'
          }
        },
        {
          title: 'Status',
          dataIndex: 'status',
          scopedSlots: {
          customRender: 'status',
          }
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots:{
            customRender: 'action'
          }
        }

      ],
      totalWidth:0,
      stageNbr:0,
      currentId : 0,
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.getSample()
    
  },
  methods: {
    preventDefault,
    _getFormatMoment,
    getSample()
    {
      SampleServices.get().then((response)=>{
        this.dummyDataSourceReception = response.data
      }).catch(this.error)
          .finally(() => (this.loading = false))
    },
  stepClick(record, phase) {
      // insane logic
      //  2 for patient
      // return false
      this.goto('/inbound/samples/sampleStatusWiseList?id='+record.sampleGuid)
    },
    getActiveSatge(dat, id)
    {
     if(this.currentId !== id){
      this.currentId = id
      this.isActiveStage = 'completed'
     }
      if(dat.isAlreadyFill !== null)
      {
        this.currentId = id
        this.isActiveStage ='completed'
        return 'ant-steps-item-finish'
      }
      else if( this.isActiveStage === 'completed')
      {
        this.currentId  = id
        this.isActiveStage = 'blue'
        return 'ant-steps-item-active-blue'
      }
      else{
        return ''
      }
      // console.log(dat);

      // if(dat.isAlreadyFill !== null)
      // {
      //   return 'ant-steps-item-finish';
      // }
      // else if(dat.isAlreadyFill === null && this.isActiveStage === false && this.isWaiting === false)
      // {
      //   this.isActiveStage = true
      //   this.isWaiting=true
      //   return 'ant-steps-item-active-blue'
      // }
      // else
      // {
      //   return '';
      // }
      // this.stageNbr = dat.find(process => process.isAlreadyFill === null)!=null?dat.find(process => process.isAlreadyFill === null).stageNo:dat.slice(-1)[0]?.stageNo
      
    },
    gotoProce(id){
      this.goto('/inbound/samples/sampleStatusWiseList?id='+id)
    },
    getBySearch(val){
      if(val === '')
      {
        this.getSample()
      }
      else{
        SampleServices.getBySearch(val).then((response)=>{
        this.dummyDataSourceReception = response.data
        console.log(this.dummyDataSourceReception)
      })
      }
    }
  }
  
}
</script>