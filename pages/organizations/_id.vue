<template>
  <page-layout :create="false" :loading="loading" title="Organizations">
    <template slot="content">
     <formfield />
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'

import formfield from '~/components/organizations/form'
export default {
  components: { 'page-layout': PageLayout,formfield },
  props: {
    organization: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      loading: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'OrganizationsCreate',
      }),

    }
  },
  methods: {
    // onSubmit(e) {
    //   this.loading = true
    //   e.preventDefault()
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       console.log(values)
    //       OrganizationServices.put(values)
    //         .then((response) => {
    //           console.log(response.data)
    //         })
    //         .finally(() => (this.loading = false))
    //     } else {
    //       this.loading = false
    //     }
    //   })
    // },
  },
}
</script>