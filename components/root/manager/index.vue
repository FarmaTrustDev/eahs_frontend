<template>
    <div class="donor-home">
      <h1 class="title mt-15">
      <strong>Manager Dashboard</strong>
    </h1>
      <a-card class="grey-card" :bordered="false">
        <a-row>
          <a-col :md="10">
            <div class="home-tab">
              <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg"
                      width="120"
                      height="100"
                    />
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/projects/tabs`, 16)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Project<span class="color-red"> {{ totalPendingProjects }}</span></strong>
                </h4>
              </a>
            </div>
            <div class="home-tab">
             
                    <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/dashBoard-treatment.svg"
                      width="120"
                      height="100"
                    />
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/lab`, 6)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Lab<span class="color-red">{{ labMessage }}</span></strong>
                </h4>
              </a>
            </div>
          </a-col>
          <a-col :md="10">
            <div class="home-tab">
              <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/dashBoard-treatment.svg"
                      width="120"
                      height="100"
                    />
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/administration/storage/facility/storageConfig/`, 7)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Equipment<span class="color-red">{{ fridgeMessage }}</span> </strong>
                </h4>
              </a>
            </div>
            <div class="home-tab">
              <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/dashBoard-treatment.svg"
                      width="120"
                      height="100"
                    />
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/administration/labels/tabs`, 8)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Template <span class="color-red">{{ templateMessage }}</span></strong>
                </h4>
              </a>
            </div>
          </a-col>
          <a-col :md="10">
            <div class="home-tab mt-0">
              <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg"
                      width="120"
                      height="100"
                    />
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/projects/tabs`, 16)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Process<span class="color-red"> {{ totalPendingProcess }}</span></strong>
                </h4>
              </a>
            </div>
            </a-col> 
            <a-col :md="10">
            <div class="home-tab mt-0">
              <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg"
                      width="120"
                      height="100"
                    />
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/projects/tabs`, 16)"
              >
                  <h4 class="heading-home">
                  <strong class="strong">Consent<span class="color-red"> {{ totalPendingConsents }}</span></strong>
                </h4>
              </a>
            </div>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </template>
  <script>
  import routeHelpers from '~/mixins/route-helpers'
  import LabServices from '~/services/API/LabServices'
  import FridgeServices from '~/services/API/FridgeServices'
  import TemplateServices from '~/services/API/TemplateServices'
  import ProjectServices from '~/services/API/ProjectServices'
  import { isEmpty } from '~/services/Helpers'
  export default({
    mixins:[routeHelpers],
    data() {
      return {
        labMessage : '',
        fridgeMessage : '',
        templateMessage:'',
        pendingProjects : [],
        totalPendingProjects: '',
        totalPendingConsents : '',
        totalPendingProcess : ''
      }
    },
    mounted() {
      this.getPending()
      this.fetchFridge()
      this.getPendingTemplate()
      this.getPendingProjects()
        this.fetchPendingConsent()
    },
    methods : {
      getPending(){
      this.loading = true
      LabServices.getPending().then((response)=>{
        if(!isEmpty(response.data)){
          this.labMessage = `(${response.data.length})`
        }
      }).catch(this.error).finally(this.loading = false)
    },
    getPendingTemplate(){
      TemplateServices.getPending().then((response)=>{
        if(!isEmpty(response.data)){
          this.templateMessage = `(${response.data.length})`
        }
      }).catch(this.error).finally(this.loading = false)
    },
    fetchFridge(){
        FridgeServices.getPending().then((response)=>{
        if(!isEmpty(response.data)){
          this.fridgeMessage = `(${response.data.length})`
        }
        })
      },
    
      getPendingProjects(){
        ProjectServices.getPendingProjects().then((response)=>{
          this.pendingProjects = response.data
          if(!isEmpty(this.pendingProjects)){
            this.totalPendingProjects = `(${this.pendingProjects.length})`
          }
        }).catch(this.error)
      },
      fetchPendingConsent() {
        ProjectServices.getAdminProject()
          .then((response) => {
            this.datasource = response.data
            if(!isEmpty(this.datasource)){
              const pendingConsents = this.datasource.map(item => item.totalPendingConsents).reduce((total, count) => total + count, 0)
              if(pendingConsents !== 0){
                this.totalPendingConsents =`(${pendingConsents})`
              }
              const pendingProcess = this.datasource.map(item => item.totalPendingProcess).reduce((total, count) => total + count, 0)
              if(pendingProcess !== 0){
                this.totalPendingProcess  = `(${pendingProcess})`
              }
            }
          }).catch(this.error)
          .finally(() => (this.loading = false))
      },
    },
  })
  </script>