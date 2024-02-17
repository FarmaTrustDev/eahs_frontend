<template>
    <page-layout
      :create="false"
      :loading="loading"
      :bordered="false"
      :sub-title="userRole"
      class="specific container page-search-input-container"
    >
      <template slot="content">
        <div class="grey-card mtminus-2 container" style="border-radius: 0%;">
            <h2 class="heading">{{name}}</h2>
            <a-card style="border-radius: 0%;">
                <div>
                  <p>{{ description }}</p>
                </div>
            </a-card>
            <FormField :project-name="name" />
        </div>
      </template>
    </page-layout>
  </template>
  <script>
  import PageLayout from '~/components/layout/PageLayout'
  import FormField from '~/components/root/consent/patient'
  import ProjectServices from '~/services/API/ProjectServices'
  import  { USER_ROLES } from '~/services/Constant/index' 

  export default {
    components: { 'page-layout': PageLayout, FormField },
    data() {
      return {
        loading: false,
        formLayout: 'vertical',
        form: this.$form.createForm(this, {
          name: 'patientCreate',
        }),
        data:null,
        projectId:'',
        description:'',
        userRole:'',
        name:''
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {
      const projectId = this.$route.params.id
      this.fetch(projectId)
      const data = JSON.parse(localStorage.getItem('vuex'))
      this.userRoleType =data.auth.user.roleName
      if(this.userRoleType === USER_ROLES.admin_type.name)
      {
        this.userRole = USER_ROLES.admin_type.role
      }
    }
    ,
    methods: {
      fetch(id){
        ProjectServices.getById(id).then((response)=>{
            this.data = response.data
            this.projectId=this.data.projectId
            this.description=this.data.description
            this.name=this.data.name
          })
          .finally(() => (this.loading = false))
      },
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
  