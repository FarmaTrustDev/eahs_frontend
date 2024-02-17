<template>
    <page-layout
      :create="false"
      :loading="loading"
      :bordered="false"
      :title="isUpdate"
      class="container"
    >
      <template slot="content">
        <div class="grey-card mtminus-2 container">
          <a-card :bordered="false" class="mtminus-2" style="border-radius: 20px;">
            <!-- <h2>{{translation.AddUser_3_418}}</h2> -->
            <FormField @isUpdate="checkUpdate" />
          </a-card>
        </div>
      </template>
    </page-layout>
  </template>
  <script>
  import PageLayout from '~/components/layout/PageLayout'
  import FormField from '~/components/root/consent/form'
  export default {
    components: { 'page-layout': PageLayout, FormField },
    data() {
      return {
        isUpdate:'Add New Project',
        loading: false,
        formLayout: 'vertical',
        form: this.$form.createForm(this, {
          name: 'consentCreate',
        }),
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    methods: {
      checkUpdate(value)
      {
        this.isUpdate = value
      }
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
  