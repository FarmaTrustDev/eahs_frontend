<template>
    <page-layout
    :create="false"
    :loading="loading"
    title="Sample Detail"
    >
    <div slot="content">

        <project-step :sample-id="sampleId" :process-id="processId" :project-steps="projectSteps" :active-tab="activeTab" :templateId="sample.templateId"></project-step>
        <a-card class="white-card default-card" :bordered="false">
        <a-row>
            <a-col :span="4" >
                Custodian
            </a-col>
            <a-col :span="8">
               <h3> {{ sample.custodianName }} </h3>
            </a-col>
            <a-col :span="4">
                Ideal Temperature
            </a-col>
            <a-col :span="8">
                <h3> {{ sample.idealTemprature }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
                Expiry Date
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.expiryDate }} </h3>
            </a-col>
            <a-col :span="4">
                Duration
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.duration }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
                Date Received
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.dateReceived }} </h3>
            </a-col>
            <a-col :span="4">
                Project
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.projectName }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
               Description
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.description }} </h3>
            </a-col>
            <a-col :span="4">
                Protocol
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.protocolName }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
               Purchase Order
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.purchaseOrder }} </h3>
            </a-col>
            <a-col :span="4">
                Package Level
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.pakageLevel }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
               Manufacturer
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.manufacturerName }} </h3>
            </a-col>
            <a-col :span="4">
                Type
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.typeName }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
               Quantity
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.quantity }} </h3>
            </a-col>
            <a-col :span="4">
                Unit of Measure
            </a-col>
            <a-col :span="8">
                <h3> {{ sample.unitName }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
               Stated Quantity
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.statedQuantity }} </h3>
            </a-col>
            <a-col :span="4">
                Product Class
            </a-col>
            <a-col :span="8">
                <h3> {{ sample.productClassName }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
               Total Quantity
            </a-col>
            <a-col :span="8">
                <h3> {{ sample.totalQuantity }} </h3>
            </a-col>
            <a-col :span="4">
                Transport Vessel
            </a-col>
            <a-col :span="8">
                <h3> {{ sample.transportVasselName }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
               Lot Number
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.lotNo }} </h3>
            </a-col>
            <a-col :span="4">
                Work Station
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.workStationName }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
               Time To Receipt
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.timeReceipt }} </h3>
            </a-col>
            <a-col :span="4">
                Client
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.clientName }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
               Patient
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.patientName }} </h3>
            </a-col>
            <a-col :span="4">
                Location
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.locationName }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
               Researcher
            </a-col>
            <a-col :span="8">
                <h3> {{ sample.reasearcherName }} </h3>
            </a-col>
            <a-col :span="4">
                Courier Name
            </a-col>
            <a-col :span="8">
                <h3> {{ sample.courierName }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
               Courier Email
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.courierEmail }} </h3>
            </a-col>
            <a-col :span="4">
                Courier Contact
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.courierContact }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
               Way Billing No
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.wayBillingNo }} </h3>
            </a-col>
            <a-col :span="4">
                Invoice No
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.invoiceNo }} </h3>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
                Is there an advance notification for sample?
            </a-col>
            <a-col :span="8">
                <h3> {{ sample.isNotificationAdvanced == true ? 'Yes' : 'No' }} </h3>
            </a-col>
            <a-col :span="4">
                Confirm data captured is accurate?
            </a-col>
            <a-col :span="8">
                <h3>  {{ sample.isDataCaptured == true ? 'Yes' : 'No' }} </h3>
            </a-col>
        </a-row>
    </a-card>
    </div>
</page-layout>
</template>

<script>
import SampleServices from '~/services/API/SampleServices'
import PageLayout from '~/components/layout/PageLayout'
import ProjectStep from '~/components/root/projectSteps'
import ProcessServices from '~/services/API/ProcessServices'

export default {
    components:{PageLayout,ProjectStep},
    data(){
        return {
            sample:'',
            loading:false,
            sampleId:'',
            processId:'',
            projectSteps:[],
            activeTab:'',
        }
    },
    mounted(){
        this.sampleId = this.$route.query.id
        this.processId = this.$route.query.processId
        this.activeTab = this.$route.query.currentStage
        this.GetSampleById()
        this.getProjectSteps(this.sampleId,this.processId)
    },
    methods:{
        GetSampleById(){
            const SampleGuid = this.$route.query.id
            SampleServices.getById(SampleGuid).then((response)=>{
                this.sample = response.data
            })
        },
        getProjectSteps(id,pid)
        {
            ProcessServices.fetchAllStepsByProjProcId(id,pid).then((response)=>{
                this.projectSteps = response.data.result?.stepResponseDTO
            })
        }
    }
}
</script>