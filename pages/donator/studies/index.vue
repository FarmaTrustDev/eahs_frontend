<template>
    <PageLayout
    :loading="false"
      title="My Studies"
      class="specific container page-search-input-container"
      :create="false"
      :back="false"
    > 
        <div slot="content">
            <div v-for="(project,index) in dummyData" :key="index"  class=" mt-15 consentClass">
            <a-row>
                <a-col :lg="{span:20}" :md="{span:18}" :sm="{span:12}" :xs="{span:24}">
          <div class="pt-3 cursor-pointer"><h3 class="ml-2">{{ project.study }}</h3></div>
          </a-col>
                <a-col :lg="{span:4}" :md="{span:6}">
                <!-- <template v-for="status in documentStatuses">
            <component
                :key="status.value"
                :is="status.component"
                v-if="project.status === status.value"
                @click="handleStatusClick(status, record)"
                >
                {{ status.displayValue }}
            </component>
            </template> -->
            <!-- <a-button class="bg-pink study-button" @click="visibleModal(true,project.id)"> -->
                {{ project.documentStatus }}
            <!-- </a-button> -->
        </a-col>
            <!-- <a-col :lg="{span:20}" :md="{span:18}" :sm="{span:12}" :xs="{span:24}">
          <div class="pt-3 cursor-pointer"><h3 class="ml-2">{{ project.name }}</h3></div>
          </a-col>
          <a-col :lg="{span:4}" :md="{span:6}">
            <a-button class="bg-pink study-button" @click="visibleModal(true,project.id)">
                {{ project.status }}
            </a-button>
          </a-col> -->
        </a-row>
        </div>
        <h3 class="pt-10 mt-25"><b>Would you like to opt in for future research?</b></h3>
        <h3 class="pt-10 mt-25"><b>I would like to opt out of studies that do:</b></h3>
        <div class="mt-25">
            <a-row 
            v-for="dat in futureStudies" :key="dat.id" class="pt-2">
                <div>
                    <a-col :span="2">
                    <a-switch
                    v-decorator="[
                        {
                            valuePropName: 'checked'
                        }
                    ]"
                    class="toggle_record"
                    checked-children="Yes"
                    un-checked-children="No"
                    size="large"
                    :checked="checkboxValues.includes(dat.id)"
                    @change="handleCheckboxChange(dat.id, $event)"
                     />
                </a-col>
                <a-col :span="10">
                    {{ dat.name }}
                </a-col>
                </div>
            </a-row>
            <FormActionButton type="primary" :is-created="isCreated" class="float-right" @click="generateOutputArray()" />
          </div>
        <a-modal
        :visible="visible"
        :footer="null"
        width = "700px"
        @cancel="visibleModal(false)"
        >
        <h2>Your sample helps us make great progress in this research! 
            Are you sure you want to withdraw your consent?
            Do you need 24 hours to decide?</h2>
            <hr/>
            <template>
                    <center> <a-button type="primary" :loading="loading">
                Yes, I need 24 hours
                </a-button>
                <a-button type="primary" :loading="loading" @click="withDrawStudy()">
                Withdraw now
                </a-button></center>
            </template>
        </a-modal>
        
        </div>
    </PageLayout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import PatientServices from '~/services/API/PatientServices'
import FutureStudiesServices from '~/services/API/FutureStudiesServices'
import OptStudiesServices from '~/services/API/OptStudiesServices'
import {isEmpty} from '~/services/Helpers'
import {  DOCUMENT_STATUSES,CONSENT_STATUSES } from '~/services/Constant/index'
export default({
    components:{PageLayout},
    data(){
        return{
            dummyData:[],
            projectConsentIds: [],
            data:[],
            documentStatuses: DOCUMENT_STATUSES,
            patientId:0,
            patientEmail: '',
            futureStudies:[],
            visible: false,
            loading: false,
            checkboxValues:[],
            checkList:[],
            isCreated:false,
            projectGuid : '',
            withdraw: CONSENT_STATUSES.withdraw.name
        }
    },
    mounted(){
        const data = JSON.parse(localStorage.getItem('vuex'))
        this.getStudies(data.auth.user.email)
        this.patientEmail = data.auth.user.email
        this.patientId = data.auth.user.id
        this.get(this.patientId)
        this.getFutureStudies()
    },
    methods:{
        getStudies(email){
            // const formData = new FormData()
            PatientServices.getStudies({ Email: email }).then((response)=>{
              this.dummyData =   response.data
            })
        },
        handleCheckboxChange(id, value) {
            this.pushListArray(value,id)
        },
        pushListArray(value, rowId) {
        const a=this.checkboxValues.includes(rowId)
        if(a === false)
        {
          if(value === true)
          {
            this.checkboxValues.push(rowId)
          }
        }
        else if(value === false){
          
          this.checkboxValues.splice(this.checkboxValues.indexOf(rowId),1)
        }
    },
        withDrawStudy(){
            const formData = new FormData()
            formData.append('ProjectGuid',this.projectGuid)
            formData.append('PatientEmail',this.patientEmail)
            formData.append('ProjectConsentStatus', this.withdraw)
            PatientServices.withDrawStudies(formData).then((response)=>{
            }).catch(this.error)
        },
        getFutureStudies(){
            FutureStudiesServices.get().then((response)=>{
                this.futureStudies = response.data
            }).catch(this.error)
        },
        visibleModal(e,projGuid){
            this.visible = e
            this.projectGuid = projGuid
        }, 
        generateOutputArray(){
            const outputArray = []
            
            const arrayLength = 7// Length of the array you want to create
            const newArray = Array.from({ length: arrayLength }, (_, index) => this.checkboxValues.includes(index+1));
            const data = JSON.parse(JSON.stringify(this.futureStudies))
            for(const study in data){
                const Action = newArray[parseInt(study)]
                const Id = parseInt(study) + 1
                const UserId = this.patientId
                outputArray.push({
                    Action,
                    Id,
                    UserId
                })
            }
            const studies = JSON.parse(JSON.stringify(outputArray))
                OptStudiesServices.create(studies).then((resp)=>{
                    this.get(this.patientId)
                }).catch(this.error)
        },
        get(id){
            OptStudiesServices.get(id).then((response)=>{
                this.checkboxValues =  JSON.parse(JSON.stringify(response.data.map(item => item.id)))
                if(!isEmpty(this.checkboxValues)){
                    this.isCreated = true
                }
            }).catch(this.error)
        },
        
    }
})
</script>