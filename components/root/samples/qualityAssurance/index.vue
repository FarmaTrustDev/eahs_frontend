<template>
    <a-row> 
        <a-col :span="22" >
            <h2>Quality Assurance</h2>
            <project-step :sample-id="samplId" :process-id="processId" :active-tab="currentStage" :templateId="templateId" :project-steps="projectSteps"></project-step>
                  <a-card v-for="question in inboundScreening" :key="question.id" class="borderStyle cardSty">
                    <a-row>
                    <a-col :offset="1" :span="8"><span>{{ question.item}}</span></a-col>
                    <a-col :offset="1" :span="1">      <div v-if="question.isAlreadyFill === null"> <a-switch 
                                                            v-decorator="[
                                                            question.id,
                                                            {
                                                                rules: [],
                                                                valuePropName: 'checked',
                                                            },
                                                            ]"
                                                            class="mt4 toggle_record"
                                                            data-rowId="2"
                                                            size="large"
                                                            checked-children="Yes"
                                                            un-checked-children="No"
                                                            @change="handleCheckboxChange(question.id, $event)"
                                                        /></div>
                                                        <div v-else>
                                                <a-icon v-if="question.action===true" type="check" class="txt-green" />
                                                <a-icon v-else type="close" class="txt-red" />
                                              </div>
                                                      </a-col>
                                                        <a-col v-if="question.isAlreadyFill === null" :offset="1" :span="9">
                                                        <a-input v-model="question.description"
                                                            v-decorator="[
                                                                question.id,
                                                                {
                                                                initialValue: entity.note,
                                                                rules: [
                                                                    {
                                                                    required: true,
                                                                    message: 'Please input your note',
                                                                    },
                                                                ],
                                                                },
                                                            ]"
                                                            class="ht"
                                                            placeholder="Enter note here...."
                                                            @keyup="noteChecked(question.id)"
                                                            />
                                                          </a-col>
                                                          <a-col v-else :offset="1" :span="9">
                                                            <h3 v-if="question.note!==null">{{ question.note }}</h3>
                                                            <h3 v-else><center>N/A</center></h3>
                                                          </a-col>
                                                          
                                                            <a-col :offset="1" :span="1">
                                                              <a-upload
                                                              name="file"
                                                              :before-upload="beforeUploadWithParam(question.id)"
                                                              :multiple="true"
                                                              :headers="headers"
                                                              :remove="remove"
                                                              :preview="preview"
                                                              :default-file-list="savedList"
                                                              @change="handleChange(question.id, $event)"
                                                              >
                                                              <a-button> <a-icon type="upload" /> </a-button>
                                                              <slot name="button"></slot>
                                                            </a-upload> 
                                                          </a-col>
                                                        </a-row>
                                                        <a-row>
                                                          <a-col :span="12"></a-col>
                                                          <a-col :id="'no'+question.id" :span="12" style="display:none;color: red;" >Please provide a note.</a-col>
                                                      </a-row>
                </a-card>
              </a-col>
              <a-col :offset="19" :span="5">
      <a-button type="primary" v-if="isFill===null" class=" wd-13" :loading="loading" style="margin-top: 30px;" @click="generateOutputArray()"  >Next</a-button> 
  </a-col>
        
    </a-row>
    
</template>
<script>

import notifications from '~/mixins/notifications'
import { preventDefault,isEmpty } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import SampleConsentScreeningServies from '~/services/API/SampleConsentScreeningServices'
// import InboundScreeningServices from '~/services/API/InboundScreeningServices'
import StepServices from '~/services/API/StepServices'
import ProjectStep from '~/components/root/projectSteps'
import ProcessServices from '~/services/API/ProcessServices'
// import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { ProjectStep },
  mixins: [routeHelpers, notifications],
  props:{
    entity: {
        type: Object,
        default: () => ({}),
      }
  },
  data() {
    return {
      isFill:'',
      form: this.$form.createForm(this, {
        name: 'inboundCollectionProcess',
      }),
      savedList:[],
      inboundScreening: [],
      columns: [
        {
          title: ``,
          dataIndex: 'detail',
          width: '40%',
        },
        {
          title: ``,
          dataIndex: 'collected',
          scopedSlots: { customRender: 'collected' },
        },
        {
          title: ``,
          dataIndex: 'notes',
          width: '30%',
          scopedSlots: { customRender: 'notes' },
        },
        {
          title: '',
          scopedSlots: { customRender: 'uploader' },
        },
      ],
      imageUrl:null,
      loading: false,
      stepId:0,
      checkboxValues:new Array(6).fill(false),
        images: {},
        headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      imgData:[],
      isIdExist:'',
      validationErrors: [],
      processId:'',
      projectSteps:[],
      samplId:'',
      actTab:'',
      currentStage:''
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch:{
    validationErrors(newValid,oldValid){
      if(newValid !== oldValid){
        this.validationErrors = newValid
      }
    }
  },
  mounted() {
    this.stepId = this.$route.query.stepId
    this.processId = this.$route.query.processId
    this.templateId = this.$route.query.templateId
    this.samplId = this.$route.query.id
    this.actTab = this.$route.query.at
    this.currentStage = this.$route.query.currentStage
    this.fetchInboundScreening()
    this.getProjectSteps(this.samplId,this.processId)
  },
  methods: {
    handleChange(id, info) {
      if (info.file.status !== 'uploading') {
        const file = info;
        if(file){ 
          this.images[id] = info
        }
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    getProjectSteps(id,pid)
    {
        ProcessServices.fetchAllStepsByProjProcId(id,pid).then((response)=>{
            this.projectSteps = response.data.result?.stepResponseDTO
        })
    },
    handleBeforeUpload(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return false; // Prevent default upload behavior
    },
    beforeUploadWithParam(param) {
      return (file) => {
        const reader = new FileReader();
        reader.onload = (event)=> {
        const resultData = event.target.result;
        const res=resultData.split(',')[1];
        this.pushListImage(res,param)
        };
        reader.readAsDataURL(file);
        return false;

      };
      
    },
    preventDefault,
    handleCheckboxChange(id, value) {
        this.checkboxValues[id] = value;
        this.noteChecked(id)
    },
    fetchInboundScreening(){
      StepServices.getStepQuestion(this.stepId,this.samplId).then((response)=>{
        this.inboundScreening = response.data.result
        if(response.data.result !==null)
        {
          this.isFill = response.data.result[0].isAlreadyFill
        }
      })
    },
    checkval(id)
    {
      this.isNoteEmpty = true
      document.getElementById('no'+id).style.display = "block"
    },
    generateOutputArray() {
        const outputArray = []
        let isValid = true;
        let sampleId=''
        const data = JSON.parse(JSON.stringify(this.inboundScreening))
        console.log(this.inboundScreening[0].id)
        for (const question of data) {
          const isIdExist = this.imgData.find(item => item.iBSId === question.id) !== undefined ? this.imgData.find(item => item.iBSId === question.id).imgData : '';
          const StepQuestionId = question.id
          console.log(this.checkboxValues)
          const Action = this.checkboxValues[StepQuestionId] === undefined ? false:this.checkboxValues[StepQuestionId]
          const Notes = question.description
          const Image =  isIdExist
          const SampleGuid = this.$route.query.id
          const StepId = this.stepId
          sampleId=SampleGuid
          if (Action === false && isEmpty(Notes)) {
            this.checkval(question.id)
            isValid = false
          }else{
            this.validationErrors[StepQuestionId] = null;
          }
          outputArray.push({StepQuestionId,
            Notes,
            Action,
            Image,
            SampleGuid,
            StepId
          })
            
        }
        const sampleData = JSON.parse(JSON.stringify(outputArray))
        if(isValid){
          SampleConsentScreeningServies.create(sampleData).then((response)=>{
            if(response.data.result!==null){
            this.loading = true
            if(response.data.result.isNextStepStorage === true){
            this.goto(`/inbound/location/label?id=${sampleId}&processId=${this.processId}&actionId=0&currentStage=${response.data.result.nextPhase}&stepId=${response.data.result.stepId}`)
            }
            else{
              this.goto(`/inbound/location/label?id=${sampleId}&processId=${this.processId}&actionId=1&currentStage=${response.data.result.nextPhase}&stepId=${response.data.result.stepId}`)
            }
            this.loading = false
            }
          }).catch(this.error)
        }
        return outputArray
    },
    remove(data) {
      console.log(data)
    },
    preview(data) {
      console.log(data)
    },
    noteChecked(id)
    {
      document.getElementById('no'+id).style.display = "none"
    },
    pushListImage(image,id)
    {
      this.imgData.push({iBSId:id,imgData:image})

    }
  },
}
</script>
<style scoped>
.cardSty{
margin-top: 25px;
}
.ht{
  height:40px;
  margin-top:5px;
}
.mt4{
    margin-top: 13px;
}
</style>