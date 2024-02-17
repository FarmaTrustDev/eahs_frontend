<template>
    <page-layout
      :loading="false"
      :title="parseInt(actionId) === 0? 'Inbound/ Sample Reception/'+sampleData.locationName:'Outbound/'+sampleData.locationName"
      class="specific container page-search-input-container"
      :create="false"
    >
    <template slot="headerMenus">
      <a-input
        ref="userNameInput"
        class="page-search-input"
        placeholder="Search template" 
      >
        <a-icon slot="prefix" type="search" />
      </a-input>
    </template>
    <div slot="content">
      <!-- <template slot="content"> -->
      <!-- <h3 class="page-title float-left">
            {{ translation.LabList_2_551 }}
          </h3> -->

      <!-- </template> -->

      <project-step :sample-id="sampleId" :process-id="processId" :templateId="sampleData.templateId" :active-tab="activeTab" :project-steps="projectSteps"></project-step>

      <a-table
        :columns="columns"
        :data-source="dataSource"
        class="rounded-table"
        :pagination="{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50', '100'],
        }"
      >
      <template slot="title" slot-scope="title">
        <span>
          <a @click="goto(`/inbound/location?tempId=${title.globalId}&id=${sampleId}&actionId=${actionId}&processId=${processId}&stepId=${stepId}`)">{{
                  title.title
                }}</a>
        </span>
      </template>
        <template slot="action" slot-scope="action">
         <a @click="showModal(true, action.labelsResponseDTO)">View Detail</a>     
        </template>
      </a-table>
      <a-modal
          :visible="labelModals"
          title="Label Components"
          class="support-add-modal"
          :dialog-style="{ top: '20px' }"
          :footer="null"
          :width="600"
          @cancel="showModal(false)"
        >
        <a-row>
            <div v-for="label in labels" :key="label.id" class="ant-col ant-col-10 mt-10 mb-10 mr-10 consentClass">
                <div class="pt-3 pl-5"><h3>{{label.value}}</h3></div>
            </div>
            
        </a-row> 
    </a-modal>
    </div>


    
    </page-layout>
  </template>
  <script>
  import TemplateServices from '~/services/API/TemplateServices'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import SampleServices from '~/services/API/SampleServices'
  import ProjectStep from '~/components/root/projectSteps'
  import ProcessServices from '~/services/API/ProcessServices'
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: {
        PageLayout,
        ProjectStep
    },
    mixins: [routeHelpers],
    data() {
        return {
        dataSource:[],
        columns: [
            {
            title: `Title`,
            key: 'title',
            scopedSlots: { customRender: 'title' },
            },
            {
            title: `Description`,
            dataIndex: 'description',
            key: 'description',
            },
            {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
            },
        ],
        loading: true,
        fullName: [],
        sampleId:'',
        sampleData:{},
        labelModals:false,
        labels:[],
        processId:'',
        projectSteps:[],
        activeTab:'',
        stepId:''
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
    watch: {
        translation(newValues, oldValue) {
        if (newValues !== oldValue) {
            this.columns[2].title = newValues.Actio_1_220
        }
        },
    },
    mounted() {
        this.fetch()
        this.getTranslationData()
        this.sampleId = this.$route.query.id
        this.processId = this.$route.query.processId
        this.actionId = this.$route.query.actionId
        this.stepId = this.$route.query.stepId
        this.activeTab =  this.$route.query.currentStage
        this.getSample()
        this.getProjectSteps(this.sampleId,this.processId)
    },
    methods: {
        getTranslationData() {
        this.columns[2].title = this.translation.Actio_1_220
        },
        getSample() {
            SampleServices.getById(this.sampleId).then((response) => {
            this.sampleData = response.data
            })
        },
        preventDefault,
        getProjectSteps(id,pid)
        {
            ProcessServices.fetchAllStepsByProjProcId(id,pid).then((response)=>{
                this.projectSteps = response.data.result?.stepResponseDTO
            })
        },
        fetch() {
        TemplateServices.getAccepted()
            .then((response) => {
            this.dataSource = response.data
            })
            .finally(() => (this.loading = false))
        },
        searchLab(){
        console.log('hello')
        },
        showModal(sho, lab) {
            this.labels=lab
            this.labelModals = sho
        },
    },
}
</script>
  