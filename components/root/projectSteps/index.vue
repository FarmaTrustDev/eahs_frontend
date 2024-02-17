<template>
    <div style="margin-bottom:20px">
        <!-- <div class="manf-project-step container">
          <div class="h-tabs large-tabs rounded-table manf-treatment-body treatment-list-body">
                <a-tabs :animated="false" type="card" v-model="localActiveTab" >
                    <a-tab-pane v-for="step in projectSteps" :key="step.id"  >
                        <template #tab >
                      <span @click="stepClick(step,sampleId,processId,templateId)">
                        {{ step.name }}
                       
                      </span>
                    </template>
                    </a-tab-pane>
                </a-tabs>
        </div>
        </div> -->
        <div class="grey-card  enrollment-page schedule-create-tabs"  >
              <a-card class="default-border-radius" style="margin-top: -15px;margin-bottom:-15px;margin-left: -15px;margin-right: -15px;">
                <a-skeleton :loading="loading" class="green-on-update" style="margin-top: -15px;">
                            <a-tabs v-model="localActiveTab">
                              <a-tab-pane 
                              v-for="process in projectSteps" 
                              :key="process.stepStageNo" 
                              :disabled="process.stepStageNo > activeTab"
                              >
                              <!--   :tab="process.processName" :class="getTabClass(process)" -->
                              <div   :style="{marginTop: '-10px',marginRight: '-50px',width: `${800 / projectSteps.length}px`}" slot="tab" class="tab-title main" :class="process.stepStageNo < localActiveTab ?'ant-tabs-tab-completed':process.stepStageNo === localActiveTab?'ant-tabs-tab-active':'' " @click="stepClick(process,sampleId,processId,templateId,localActiveTab)">
                                  {{ process.name }}
                                  </div>
                              </a-tab-pane>
                            </a-tabs>
                </a-skeleton>
              </a-card>
            </div>
    </div>
  </template>
  
  <script>
  
  import routeHelpers from '~/mixins/route-helpers'

  export default {
    mixins: [routeHelpers],
    props: {
      sampleId: {
        type: String,
        required: true,
      },
      processId: {
        type: String,
        required: true,
      },
      templateId: {
        type: String,
        required: true,
      },
      activeTab: {
        type: Number,
      },
      projectSteps: {
        type: Array,
        required: true,
      },

    },
    data(){
        return{
          localActiveTab:parseInt(this.activeTab)
        }
    },
    watch: {
    activeTab(newVal) {
      this.localActiveTab = parseInt(newVal);
    },
    },
    mounted(){ 
      
    },
    methods:{
        // stepClick(stepData,sampleId,processId,templateId)
        // {
        //   if(stepData.stepStageNo <= this.activeTab ){
        //       if(stepData.isProcess)
        //       {
        //         this.goto('/inbound/samples/qualityAssurance?id='+sampleId+'&stepId='+stepData.id+'&processId='+processId+'&at='+stepData.id+'&templateId='+templateId+'&currentStage='+this.activeTab)
        //       }
        //       else if(stepData.isStorage)
        //       {
        //         this.goto('/inbound/location/label?id='+ sampleId + '&processId='+processId+'&actionId=0&currentStage='+this.activeTab)
        //       }
        //       else if(stepData.isSampleKit)
        //       {
        //         this.goto('/inbound/location/label?id='+ sampleId + '&processId='+processId+'&actionId=1&currentStage='+this.activeTab)
        //       }
        //       else{
        //         this.goto('/inbound/samples/sampleRegister/viewSample?id='+ sampleId +'&processId='+processId+'&currentStage='+this.activeTab)
        //       }
        //     }
        // },
        stepClick(stepData,sampleId,processId,templateId,currentStage)
      {
        if(stepData.stepStageNo <= currentStage)
        {      
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
        }
      },
    }
  };
  </script>
  