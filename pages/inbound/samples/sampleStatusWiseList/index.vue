<template>
    <page-layout
      :loading="false"
      title="Inbound/ Samples"
      :create="false"
      >
      <!-- class="page-search-input-container" -->
       
      <div slot="content" >
        <!-- <a-row > -->
          <!-- <a-col > -->
            <!-- <div> -->
            <div class="grey-card enrollment-page schedule-create-tabs">
              <a-card class="default-border-radius">
                <a-skeleton :loading="loading" class="green-on-update">
                  <h3>Sample ID {{SampleID}}</h3>
                            <a-tabs v-model="activeTab" tab-position="left">
                              <a-tab-pane   
                              v-for="process in processData" 
                              :key="process.stageNo" 
                              :disabled="process.stageNo > process.currentStage" 
                              >
                              <!--   :tab="process.processName" :class="getTabClass(process)" -->
                              <div  slot="tab" class="tab-title main" :class="process.stageNo <= process.currentStage && process.isAlreadyFill !== null ?'ant-tabs-tab-completed':process.stageNo === process.currentStage?'ant-tabs-tab-active':'' ">
                                  {{ process.processName }}
                                  </div>
                                  <div class="tabCol">
                                  <a-table 
                                            :columns="columnsProc"
                                            :data-source="process.stepResponseDTO"
                                            class="rounded-table pt-10 "
                                            :pagination="{
                                              defaultPageSize: 10,
                                              showSizeChanger: true,
                                              pageSizeOptions: ['10', '20', '30', '40', '50'],
                                            }"
                                          >
                                          <span slot="action"  slot-scope="action">
                                           <div v-if="process.isAlreadyFill === null">
                                            <a-switch v-model="action.action" class="mt4 toggle_record"   
                                                    
                                                    data-rowId="2"
                                                    size="large"
                                                    checked-children="Yes"
                                                    un-checked-children="No"
                                                    @change="(value) => noteChecked(action.id)"
                                                />
                                              </div>
                                              <div v-else>
                                                <a-icon v-if="action.action===true" type="check" class="txt-green" />
                                                <a-icon v-else type="close" class="txt-red" />
                                              </div>
                                          </span>
                                          <span slot="personResponsible"  slot-scope="personResponsible">
                                           
                                           {{ personResponsible.personResponsible }}
                                         </span>
                                          <span slot="note"  slot-scope="note">
                                            <a-col v-if="process.isAlreadyFill === null" :offset="8" :span="9">
                                                            <a-input v-model="note.note" class="ht" placeholder="Enter note here...."
                                                               @keyup="noteChecked(note.id)"
                                                                
                                                                
                                                                /></a-col>
                                                                <h3 v-else>{{ note.note }}</h3>
                                                                <div :id="'no'+note.id" style="display:none;color: red;">This is required</div>
                                          </span>
                                    </a-table>
                                    <a-col v-if="process.isAlreadyPublish === false" :offset="19">
                                      <a-button v-if="process.isPublishable === true && process.isAlreadyFill!==null"   type="primary" class="wd-11" @click="goto('/inbound/samples/catalouge?id='+sampleId)" >Publish</a-button>
                                    </a-col>
                                    
                                    <a-col :offset="19">
                                      <a-button v-if="process.isAlreadyFill === null && process.stepResponseDTO.length!==0"   type="primary" class="wd-11 mt-15" :loading="processResponseBtnLoading" @click="submitSampleProcessStatus(process)">Submit</a-button>
                                    </a-col>
                                </div>
                              </a-tab-pane>
                            </a-tabs>
                </a-skeleton>
              </a-card>
            </div>
                  <!-- </div> -->
          <!-- </a-col> -->
          
        <!-- </a-row> -->
      </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { preventDefault, isEmpty } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  // import outboundProcess from '~/components/root/samples/sampleProcess/outboundProcess'
  // import inboundProcess from '~/components/root/samples/sampleProcess/inboundProcess'
  // import consentProcess from '~/components/root/samples/sampleProcess/consentProcess'
  import PageLayout from '~/components/layout/PageLayout'
  import SampleServices from '~/services/API/SampleServices'
  import ProcessServices from '~/services/API/ProcessServices'
  import SamplePPSServices from '~/services/API/SamplePPSSServices'
  import PatientServices from '~/services/API/PatientServices'
  import { CONSENT_STATUSES } from '~/services/Constant'
  export default {
    components: { PageLayout},
    mixins: [routeHelpers, notifications],
    data() {
      return {
        activeTab:0,
        activeStage:0,
        SampleID:0,
        projId:0,
        isNoteEmpty:false,
        isAlreadyFilled:false,
        processResponseBtnLoading:false,
        processData:[],
        dummyDataSource:[],
        columnsProc: [
          {
            title: 'Step Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
          title: 'Action',
          key: 'action',
          scopedSlots: {
            customRender: 'action',
          }
          },
          {
            title: 'Person Responsible',
            scopedSlots: {
            customRender: 'personResponsible',
          },
            key:'personResponsible'
          },
          {
            title: 'Note',
            key: 'note',
            scopedSlots: {
              customRender: 'note',
            }
          }
        ],
        samplePSList:[],
        accepted: CONSENT_STATUSES.accept.name,
        loading:false
      }
    },
    computed: {
     
    },
    mounted() {

      this.sampleId = this.$route.query.id;
      this.getSample()
      this.getProcessBySample(this.sampleId)
      
    },
    methods: {
      preventDefault,
      getSample()
      {
        SampleServices.getById(this.sampleId).then((response)=>{
          this.SampleID=response.data.puid
          this.projId = response.data.projectGuid

        })
      },
      getProcessBySample(id)
      {
        ProcessServices.getAllProcessBySample(id).then((response)=>{
          this.processData=response.data
          if(response.data.length!==0)
          {
          this.activeTab = response.data[0].currentStage
          }
          // this.activeTab=response.data.find(process => process.isAlreadyFill === null)!=null?response.data.find(process => process.isAlreadyFill === null).stageNo:response.data.slice(-1)[0]?.stageNo;
          // this.activeStage=response.data.find(process => process.isAlreadyFill === null)!=null?response.data.find(process => process.isAlreadyFill === null).stageNo:response.data.slice(-1)[0]?.stageNo;
        })
      },
      handleCheck(isCheck,id ,procId)
      {
        this.isCreateCheck=true
        this.pushListArray(isCheck,id,procId)
      }
      ,
      pushListArray(valu, rowId ,procId) {
        const a=this.samplePSList.find(item=>item.id === rowId)
        if(a === undefined)
        {
          if(valu === true)
          {
            this.samplePSList.push({id:rowId,processId:procId})
          }
        }
        else if(valu === false){
          
          this.samplePSList.splice(this.samplePSList.findIndex(item=>item.id === rowId),1)
        }
    },
    submitSampleProcessStatus(sample)
    {
      this.processResponseBtnLoading=true;
      const items = sample.stepResponseDTO
      const collectedData = items.map((item) => {
          return item.action === false && item.note === null
            ?  this.checkval(item.id)
              :{
                action: item.action,
                note: item.note,
                id: item.id,
              }
        });
       // You can do further processing with 'collectedData' here
      
      if(this.isNoteEmpty === false)
      {
        PatientServices.getWithAllAcceptedConsent(sample.patientId,sample.projectGlobalId ).then((response)=>{
          if(!isEmpty(response.data.result) && response.data.result[0].consentStatus === this.accepted){
            SamplePPSServices.create(collectedData,this.sampleId).then((response)=>{
            this.getProcessBySample(this.sampleId)
            this.processResponseBtnLoading = false
            })
          } else {
            this.error()
          }
        })
      }
    },
    checkval(id)
    {
      this.isNoteEmpty = true
      document.getElementById('no'+id).style.display = "block"
    },
    noteChecked(id)
    {
     
      this.isNoteEmpty = false
      document.getElementById('no'+id).style.display = "none"
    },
    // getTabClass(process) {
    // Evaluate your criteria and return the class name accordingly
    //   if (process. !== null) {
    //     return 'ant-tabs-tab-completed'; // Apply the successful-tab class
    //   } else {
    //     return ''; // No additional class
    //   }
    // },
    checkIsAlreadyFilled(personR)
    {
      
      if(personR !== null)
      {
        this.isAlreadyFilled=true
      }
    },error() {
      this.$error({
        title: 'This patient has not accepted the consent',
      });
      this.processResponseBtnLoading=false;
    },
    },
  }
  </script>
  <style>
  .mg-50{
    margin-left: 50px;
  }
</style>