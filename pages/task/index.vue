<template>
    <PageLayout :create="false" title="Task List">
      <template slot="headerMenus" v-if="defaultUserRole !== roleUsers.manager_type.name">   
        <!-- <a-button type="primary" :disabled="isRegister" @click="processCreating(true)">Add New Process</a-button> -->
      </template>
      
      <div slot="content">
        <div class="bd-r-5">
              
              <a-row>
                <a-col :span="24">
                <a-tabs class="h-tabs" @change="getSample">
                  <a-tab-pane v-for="(process , index) in processData" :key="index" :tab="process.processName" >
                    <!-- <template >
                      
                        {{ process.processName }}
                      
                    </template> -->
                    <div class="tabCol">
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
                                <!-- <a-icon type="edit" @click="goto('/inbound/location/label?id='+record.sampleGuid+'&actionId=0')" /> -->
                                </template>
                                <template slot="return" slot-scope="text,record">
                                <a-icon v-if="record.returnQuantity !== 0" type="retweet" class="text-blue font-20" @click="goto('/inbound/samples/returnSample?id='+record.sampleGuid)" />
                                </template>
                                <template slot="dateReceived" slot-scope="text, record">
                                    {{  _getFormatMoment(record.dateReceived).format("DD/MM/YYYY") }}
                                    </template>
                            <template slot="sampleId" slot-scope="text,record">
                            <span>
                                <a >{{ record.puid }}</a>
                            </span>
                            </template>    
                            <template slot="typeName" slot-scope="text,record">
                            <span>
                                <a >{{ record.typeName }}</a>
                            </span>
                            </template>

                            <span slot="status" slot-scope="text, record">
                                <!-- //Steps -->
                                <div class="treatment-steps">
                                <span class="step-col" >
                                    <a-steps :initial="1" size="small">
                                    <a-step
                                        v-for="phase in record.stepResponseDTO?.stepResponseDTO"
                                        :key="phase.stageNo"
                                        :title="phase.name"
                                        :status="
                                        phase.isAlreadyFill === null
                                            ? 'wait'
                                            : ''
                                        "
                                        :class="phase.stepStageNo < record.currentStage ? 'ant-steps-item-finish' : phase.stepStageNo === record.currentStage ? 'ant-steps-item-active-blue':'' "
                                        
                                        @click="stepClick(phase,record.sampleGuid,record.stepResponseDTO?.id ,record.templateId,record.currentStage,record.stepResponseDTO?.isPublishedable)"
                                       
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
                            <!-- <a-menu-item key="2" >
                                <span @click="goto(`/inbound/samples/sampleRegister?id=${action.sampleGuid}`)">Edit</span>
                            </a-menu-item> -->
                            </a-menu>
                        </a-dropdown>
                            </span>

        </a-table>
                    </div>
                  </a-tab-pane>
                </a-tabs>
              </a-col>
              
              <!-- <div class="ant-col ant-col-24 mt-15" v-for="proces in processData" :key="proces.processId" >
                <a-col :span="24" class="bg-grey">
                  <a-col :span="20"><h2 class="mt-15 ml-15">{{ proces.processName }} </h2></a-col>
                  <a-col :span="4">
                    <a-button type="primary" class="wd-11 mt-15" @click="visibleModelStep(true,proces.processId)">Add New Step</a-button>
                  </a-col>
                </a-col>
                <a-col :span="12" class="bg-grey" v-for="step in proces.stepResponseDTO" :key="step.id">
                <a-col :span="16"><h3 class="ml-15"> {{ step.name }}</h3></a-col>
                <a-col :span="2"><h3 class="ml-15"> <a @click="editStep(step.id)"><a-icon type="edit" style="color:blue"/></a></h3></a-col>
                <a-col :span="2"><h3 class="ml-15"> <a @click="deleteStep(step.id)"><a-icon type="delete" style="color:red"/></a></h3></a-col>
                </a-col>
              </div> -->
            </a-row>
            
      </div>
        
      <ErrorModal :message="message" :isShow="isVerified" @close-modal="isVerified = false"></ErrorModal>
  
      </div>
    </PageLayout>
  </template>
  <script>
  import PageLayout from '~/components/layout/PageLayout.vue'
  import { filterOption,preventDefault } from '~/services/Helpers'
  import ProcessServices from '~/services/API/ProcessServices'
  import routeHelpers from '~/mixins/route-helpers'
  import notifications from '~/mixins/notifications'
  import  { CONSENT_STATUSES, USER_ROLES } from '~/services/Constant/index'
  import SampleServices from '~/services/API/SampleServices'
  import SampleStorage from '~/services/API/SampleStorageServices'
  import { _getFormatMoment } from '~/services/Helpers/MomentHelpers'
  import SamplePPSSServices from '~/services/API/SamplePPSSServices'
  import ErrorModal from '~/components/common/ErrorModal.vue'
  // import Upload from '~/components/upload'
  import { DOCUMENT_EXTENSIONS } from '~/services/Constant'
  export default {
    components: {
      PageLayout,ErrorModal
      // Upload
    },
    mixins: [routeHelpers, notifications],
    data() {
      return {
        roleUsers:USER_ROLES,
        statusData:CONSENT_STATUSES,
        allowedExtensions : DOCUMENT_EXTENSIONS,
        loading:false,
        defaultUserRole:'',
        message:'This sample has not been stored yet',
        isVerified:false,
        processData:[],
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
      dummyDataSourceReception:[]
      }
    },
    mounted() {
      const data = JSON.parse(localStorage.getItem('vuex'))
      this.defaultUserRole =data.auth.user.roleName
      this.fetchProcess()
    },
    methods: {
      filterOption,
      _getFormatMoment,
      preventDefault,
      
      fetchProcess()
      {
        ProcessServices.fetchAllProcessByGroup().then((response)=>{
          this.processData=response.data
          if(this.processData.length!==0)
          {
          this.getSample(0)
          }
        })
      },
      stepClick(stepData,sampleId,processId,templateId,currentStage,isPublishAble)
      {
        if(stepData.stepStageNo <= currentStage)
        {
        if(isPublishAble === true){
          SampleStorage.getBySampleId(sampleId).then((response)=>{
            if(response.data === null)
            {
              this.isVerified = true
            }
            else{
              this.checkStatus(stepData,sampleId,processId,templateId,currentStage)
            }

          })
        }
        else{
          this.checkStatus(stepData,sampleId,processId,templateId,currentStage)
        }
      }
      },

      checkStatus(stepData,sampleId,processId,templateId,currentStage)
      {
        
          SamplePPSSServices.checkSampleDefaultStatu(sampleId,processId).then((response)=>{

            })        
            if(stepData.isProcess)
            {
              this.goto('/inbound/samples/qualityAssurance?id='+sampleId+'&stepId='+stepData.id+'&processId='+processId+'&at='+stepData.id+'&templateId='+templateId+'&currentStage='+currentStage)
            }
            else if(stepData.isStorage)
            {
              this.goto('/inbound/location/label?id='+ sampleId + '&processId='+processId+'&actionId=0&currentStage='+currentStage+'&stepId='+stepData.id)
            }
            else if(stepData.isSampleKit)
            {
              this.goto('/inbound/location/label?id='+ sampleId + '&processId='+processId+'&actionId=1&currentStage='+currentStage+'&stepId='+stepData.id)
            }
            else{
              this.goto('/inbound/samples/sampleRegister/viewSample?id='+ sampleId +'&processId='+processId+'&currentStage='+currentStage)
            }
        
      },

      getSample(key)
      {
        this.loading=true
        const tabName = this.processData[key].processName;
        this.dummyDataSourceReception=[]
        SampleServices.getSampleByProcessName(tabName).then((response)=>{
            this.dummyDataSourceReception = response.data
        }).catch(this.error)
            .finally(() => (this.loading = false))
        },
    },
  }
  </script>
  <style scoped>
  .ant-tooltip-placement-top, .ant-tooltip-placement-topLeft, .ant-tooltip-placement-topRight {
      padding-bottom: 8px;
      display: none !important;
  }
        .ant-tooltip .ant-tooltip-placement-top {
          display:none !important;
        }
      .no-tooltip .ant-tooltip-inner {
          display: none !important;
          position: relative;
      }
  </style>