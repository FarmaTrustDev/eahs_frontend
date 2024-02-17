<template>
    <div class="donor-home">
      <h1 class="title mt-15">
      <strong>Patient Dashboard</strong>
    </h1>
      <a-card class="grey-card" :bordered="false">
        <a-row>
          <a-col :md="10"> 
            <!-- <div class="home-tab">
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/consent`, 12)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Consent</strong>
                </h4>
              </a>
            </div> -->
            <div class="home-tab">
              <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg"
                      width="120"
                      height="100"
                    />
                <a
                href="javascript:;"
                @click="handleSidebarKey(`/patient`, 13)"
                >
                <h4 class="heading-home">
                  <strong class="strong">Sample</strong>
                </h4>
                </a>
            </div>
            <div class="home-tab">
              <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg"
                      width="120"
                      height="100"
                    />
              <a
                href="javascript:;"
                @click="handleSidebarKey(`/patient/consent`, 14)"
              >
                <h4 class="heading-home">
                  <strong class="strong">Studies<span class="color-red">{{ message }}</span></strong>
                </h4>
              </a>
            </div>
          </a-col>
          <a-col :md="10">
            
          </a-col>
        </a-row>
      </a-card>
    </div>
  </template>
  <script>
  import routeHelpers from '~/mixins/route-helpers'
  import PatientServices from '~/services/API/PatientServices'
  import { isEmpty } from '~/services/Helpers'
  export default({
    mixins:[routeHelpers],
    data() {
      return {
        consents : [],
        message: ''
      }
    },
    mounted() {
      const data = JSON.parse(localStorage.getItem('vuex'))
        this.getPendingConsents(data.auth.user.email)
    },
    methods: {
      getPendingConsents(email){
        PatientServices.getPendingConsent({ Email: email }).then((response)=>{
          this.consents = response.data
          if(!isEmpty(this.consents)){
            this.message = `(${this.consents.length})`
          }
        }).catch(this.error)
      },
    }
  })
  </script>