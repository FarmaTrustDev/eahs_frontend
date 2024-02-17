<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <formField />
      <a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import withCrud from '~/mixins/with-crud'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
import OrganizationServices from '~/services/API/OrganizationServices'
import formField from '~/components/organizations/form/FormField'

export default {
  components: { formField },
  mixins: [notifications, routeHelpers, nullHelper, withCrud],
  data() {
    return {
      loading: false,
      successResponse: '',
      showError: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'OrganizationsCreate',
      }),
      gotoLink: '/organizations',
      apiService: OrganizationServices,
    }
  },
  methods: {
    // onSubmit(e) {
    //   this.loading = true
    //   e.preventDefault()
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       console.log(values)
    //     } else {
    //       this.loading = false
    //     }
    //   })
    // },
  },
}
</script>
