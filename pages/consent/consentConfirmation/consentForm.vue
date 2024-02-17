<template>
    <page-layout
      :loading="loading"
      title="Consent Confirmation"
      class="specific container page-search-input-container"
      :create="false"
    >
      <div slot="content" class="mtm-70">
        <div class="ant-col ant-col-24 mt-40 ml-15 " >
           <h2 class="pt-10"><b>{{ consentName }}</b></h2>
        </div>
        <div v-for="(consent, index) in question" :key="index">
        <div class="ant-col ant-col-24 mt-25 ml-15 " >
           <h3 class="pt-10"><b>{{ index + 1 }}. {{ consent.name }}</b></h3>
        </div>
        <div class="ant-col ant-col-18 mt-20 bg-white mg-t-10 plr-10 pt-10 pb-10" >
            <p>{{ consent.description }}</p>
        </div>
        <div class="ant-col ant-col-2 ml-25">
          <a-switch
          class="mt-15 toggle_record"
          checked-children="Yes"
          un-checked-children="No"
          :checked="consent.projectConsentQuestionStatus && 
                    consent.projectConsentQuestionStatus[0] && 
                    consent.projectConsentQuestionStatus[0].response === 'True' ? true : false "
          :value="index"
          />
          <!-- v-model="selectedOptions[index]"  -->
          
        </div>
      </div>
        <div class="ant-col ant-col-24 mt-25 ml-15 " >
           <h3 class="pt-10"><b>e-Signature</b></h3>
        </div>
        <div class="ant-col ant-col-24 mt-25 ml-15 " >
           <h3 class="pt-10"><b>Date:</b> <span class="ml-2">{{ consentedDate }}</span></h3>
        </div>
        <div class="ant-col ant-col-24 mt-15">
        </div>
      </div>
    </page-layout>
</template>
<script>
import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import PageLayout from '~/components/layout/PageLayout'
import ConsentServices from '~/services/API/ConsentService'

// import PageLayout from '~/components/layout/PageLayout'
export default{
  components: { PageLayout },
  mixins: [routeHelpers, notifications],
  data() {
    return {
      consentName:'123-456.ConsentForm_Template_2022',
      image:new Array(5),
      question:[],
      count:0,
      consentQuestions: [],
      selectedOptions: [],
      patientId: 0,
      consentId: 0,
      consentedDate: 0,
      loading:false
    }
  },
  computed: {
  },
  mounted() {
    this.projId = this.$route.query.id;
    this.patientId = this.$route.query.pId;
    this.consentId = this.$route.query.cId;
    this.fetchByID(this.consentId)
  },
  methods: {
    preventDefault,
    fetchByID(id){
        this.loading = true
      ConsentServices.getById(id).then((response)=>{
          this.consentName = response.data.consentName
          this.question = response.data.consentQuestion
          this.consentedDate = response.data.consentDate
          this.loading = false
        })
    },
  },
}
</script>