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
            
          <template slot="name" slot-scope="text,record">
          <span>
            <a @click="goForRegister(record.globalId,record.patientId)">{{ record.name }}</a>
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
                <a @click="goto(``)">View</a>
              </a-menu-item>
              <a-menu-item key="2" >
                <span @click="goto(`/inbound/samples/sampleReceive/addSampleReceive?id=${action.globalId}`)">Edit</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
              </span>

        </a-table>
            <ErrorModal :message="message" :isShow="isVerified" @close-modal="isVerified = false"></ErrorModal>
            <ErrorModal :message="messageError" :isShow="showError" @close-modal="showError = false"></ErrorModal>
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
import SampleReceiveServices from '~/services/API/SampleReceiveServices'
import PatientServices from '~/services/API/PatientServices'
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
      showError : false,
      isVerified:false,
      processStatus:'',
      message:'This Project Process have not accepted.',
      messageError :'Please first assign the consent to this patient',
      datasourceReception: [],
      dummyDataSourceReception:[],
      columnsReception: [
        
        {
          title: 'Name',
          key: 'name' ,
          scopedSlots:{
            customRender: 'name'
          }
        },
        {
          title: 'Invoice No',
          dataIndex: 'invoiceNo',
          key: 'name' ,
        },
        {
          title: 'Quantity',
          dataIndex: 'quantityReceived',
          key: 'quantityReceived' ,
        },
        {
          title: 'Donor',
          dataIndex: 'patientName',
          key: 'patientName' ,
        },
        {
          title:'Receiving Date',
          dataIndex: 'expiryDate',
          key:'expiryDate'
        },
        {
          title:'Expiry Date',
          dataIndex: 'receivingDate',
          key:'receivingDate'
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
      SampleReceiveServices.get().then((response)=>{
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
    goForRegister(globalId,patientId)
    {
      PatientServices.getConsentStatusListPId(patientId).then((response)=>{
        if(response.data.length === 0){
          this.showError = true
        }else{
          this.goto('/inbound/samples/sampleRegister?id='+globalId+'&isReceived=true&patId='+patientId)
        }
      })
    },
    getBySearch(val){
      if(val === '')
      {
        this.getSample()
      }
      else{
        SampleReceiveServices.search(val).then((response)=>{
        this.dummyDataSourceReception = response.data
        console.log(this.dummyDataSourceReception)
      })
      }
    }
  }
  
}
</script>