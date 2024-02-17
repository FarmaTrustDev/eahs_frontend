<template>
    <PageLayout
    title="My Documents"
    :create="false"
    :back="false"
    >
    <div slot="content"> 
        <a-col :offset="18">
                <a-input
                          ref="userNameInput"
                          class="page-search-input wd-100"
                          placeholder="Search Documents"
                          @keyup="searchDocument"
                          >
                      <a-icon slot="prefix" type="search" />
                      </a-input>
              </a-col>
        <a-table
        :columns="columns"
        :data-source="data"
        :loading="loading"
        class="rounded-table pt-10 users-list"
        >
        <template slot="documentName" slot-scope="text,record">
            <a  @click="gotoLink(record.documentStatus,record.consentGuid,record.patientId,record.projectCPId,record.projectGuid)">
             {{ record.documentName }}
            </a>
        </template>
        <template slot="action" slot-scope="text,record">
            <template v-for="status in documentStatuses">
                <a-tooltip 
                :key="status.value"
                placement="topLeft" 
                >
                    <template slot="title">
                        <span>{{ status.description }}</span>
                    </template>
                    <component
                    :is="status.component"
                    v-if="record.documentStatus === status.value"
                        :key="status.value"
                        @click="handleStatusClick(status, record)"
                        >
                        {{ status.displayValue }}
                    </component>
                </a-tooltip>
            
            </template>
        </template>
        <template slot="consentedDate" slot-scope="text,record">
            {{ GetConsentDate(record.consentDate) }}
        </template>
        </a-table>
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
            <center> 
                <a-button type="primary" @click="WithDrawDocuments(true,withdraw24Hour)">
                Yes, I need 24 hours
                </a-button>
                <a-button type="primary" :loading="loading" @click="WithDrawDocuments(false,withdraw)">
                Withdraw now
                </a-button>
            </center>
            </template>
        </a-modal>
    </div>
    </PageLayout>
</template>
<script>
import moment from 'moment'
import PageLayout from '~/components/layout/PageLayout'
import PatientServices from '~/services/API/PatientServices'
import imagesHelper from '~/mixins/images-helper'
import { CONSENT_STATUSES,DOCUMENT_STATUSES} from '~/services/Constant/index'
import routeHelpers from '~/mixins/route-helpers'
export default({
    components:{PageLayout},
    mixins:[imagesHelper,routeHelpers],
    data(){
        return{
            moment,
            loading:false,
            documentStatuses : DOCUMENT_STATUSES,
            columns:[
                {
                    title: 'Study Name',
                    dataIndex: 'study',
                    key: 'study',
                },
                {
                    title: 'Institutions',
                    dataIndex: 'institution',
                    key: 'institution',
                },
                {
                    title: 'Research title',
                    dataIndex: 'researchTitle',
                    key: 'researchTitle',
                },
                {
                    title: 'Country',
                    dataIndex: 'country',
                    key: 'country',
                },
                {
                    title: 'Document Name',
                    dataIndex: 'documentName',
                    scopedSlots:{customRender: 'documentName'}
                },
                {
                    title: 'Consent Date',
                    dataIndex: 'consentDate',
                    scopedSlots : {customRender : 'consentedDate'},
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    scopedSlots : {customRender : 'action'},
                }
            ],
            data:[],
            visible:false,
            patientEmail: '',
            currentData:[],
            withdraw : CONSENT_STATUSES.withdraw.name,
            withdraw24Hour: CONSENT_STATUSES.withdraw24Hours.name,
            pending: CONSENT_STATUSES.pending.name,
        }
    },
    mounted(){
        const data = JSON.parse(localStorage.getItem('vuex'))
        this.getStudies(data.auth.user.email)
        this.patientEmail = data.auth.user.email

    },  
    methods:{
        getStudies(email){
            this.loading = true
            // const formData = new FormData()
            PatientServices.getDonorDocuments({ Email: email }).then((response)=>{
              this.data =  response.data
              this.loading = false
            })
        },
        handleStatusClick(status, record) {
            if (status.action && typeof this[status.action] === 'function') {
                this[status.action](true, record)
            }
            },
        GetConsentDate(date)
        {
            return date!== null ? moment(date).format('DD/MM/YYYY hh:mm') : ''
        },
        WithDrawDocuments(toDecide,status){
            const formData = new FormData()
            formData.append('ToDecide',toDecide)
            formData.append('PatientEmail',this.patientEmail)
            formData.append('ProjectConsentPatientId',this.currentData.projectCPId)
            formData.append('ProjectConsentStatus',status)
            PatientServices.withDrawDocuments(formData).then((response)=>{
                this.getStudies(this.patientEmail)
            })
            this.visibleModal(false,'')
        },
        visibleModal(e,record){
            this.currentData = record
            this.visible = e
        },
        gotoLink(status,consentId,patientId,PCPId,projectGuid){
            if(status !== this.pending){
                this.goto(`/consent/consentConfirmation/consentForm?cId=${consentId}&id=${PCPId}&pId=${patientId}`)
            }else{
                this.goto(`/consentConfirmation?cId=${consentId}&projectCPId=${PCPId}&id=${projectGuid}&pId=${patientId}`)
            }
        },
        searchDocument(event) {
        const keyword = event.target.value
      this.fetchDocument({
        documentName: keyword,
        institute: keyword,
        study: keyword,
        active: true,
        isDonor: true,
        email : this.patientEmail
      })
    },
    fetchDocument(params = {}) {
      this.loading = true
      PatientServices.searchDocuments(params).then((response) => {
        this.data = response.data
      })
      this.loading = false
    },
    }
})
</script>