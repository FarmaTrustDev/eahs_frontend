<template>
    <PageLayout
    sub-title="Nurse"
      class="specific container page-search-input-container"
      :create="false"
    >
    <template slot="content">
        <a-page-header
        :span="24"
    style="border: 1px solid rgb(235, 237, 240)"
    title="Please confirm if you want us to research on your consent form."
  />
    <br>
    <a-button type="primary" large @click="PatientConsentStatus('approve')">Confirm</a-button>
    <a-button type="danger" large @click="PatientConsentStatus('reject')">Reject</a-button>
</template>
    </PageLayout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
export default{
    components:{PageLayout},
    methods:{
        PatientConsentStatus(status){

        }
    }
}
</script>