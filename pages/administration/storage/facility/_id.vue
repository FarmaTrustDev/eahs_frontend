<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    class="container"
    :title="translation.AddStora_3_557"
  >
    <template slot="content">
      <!-- <h2 class="page-title">
        <strong>{{ translation.AddStora_3_557 }}</strong>
      </h2>
       -->

      <div class="grey-card">
        <a-card :bordered="false" class="default-border-radius">
          <formField class="mt-15" />
        </a-card>
      </div>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import formField from '~/components/root/inventory/storageFacility/form'
export default {
  components: { 'page-layout': PageLayout, formField },
  data() {
    return {
      loading: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'UsersCreate',
      }),
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
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
