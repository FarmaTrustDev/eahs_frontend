<template>
    <ConsentConfirmation />
</template>

<script>
import ConsentConfirmation from '~/pages/consent/consentConfirmation/viewConsentForm.vue'

export default{
    middleware: "no-auth",
    layout:'noAuth',
    components:{ConsentConfirmation},
}
</script>