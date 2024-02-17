<template>
    <div>
      <a-form :form="form" :layout="formLayout" @submit.prevent="onSubmit">
        <FormFields
          :form="form"
          :entity="userData"
          :is-created="isCreated"
          @cheCreated="checkCreated"
          @handleChange="handleChange"
        />
        <!-- <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 22 }">
          <FormActionButton
            :is-created="isCreated"
            :loading="loading"
            :custom-text="translation['Save&_3_453']"
          />
        </a-form-item> -->
      </a-form>
    </div>
  </template>
  <script>
  import routeHelpers from '~/mixins/route-helpers'
  import nullHelper from '~/mixins/null-helpers'
  import notifications from '~/mixins/notifications'
  import UserServices from '~/services/API/UserServices'
  import ProjectServices from '~/services/API/ProjectServices'
  import FormFields from '~/components/root/samples/form/FormField.vue'
  
  export default {
    components: { FormFields },
    mixins: [notifications, routeHelpers, nullHelper],
  
    data() {
      return {
        loading: false,
        successResponse: '',
        showError: false,
        userData: {},
        entityId: null,
        formLayout: 'vertical',
        form: this.$form.createForm(this, {
          name: 'sampleCreate',
        }),
        gotoLink: '/inbound/samples/',
        apiService: UserServices,
        projectService:ProjectServices,
        fileList: [],
        isCreated: false,
        file: [],
        activate: true,
        deactivate: true,
      }
    },
    computed: {
      users() {
        return this.$store.getters.getUser
      },
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {
      this.checkCreated()
    },
    methods: {
      handleChange(info) {
        this.fileList = info
      },
      checkCreated() {
        const entityId = this.$route.params.id
        if (this.isGuid(entityId)) {
          this.entityId = entityId
          this.isCreated = true
          this.fetch(entityId)
        }
      },
      fetch(id) {
        this.loading = true
        this.apiService
          .getById(id)
          .then((response) => {
            this.entity = response.data
            this.userData = response.data
            if (this.isFunction(this.getEntity)) {
              this.getEntity(response)
            }
          })
          .finally(() => (this.loading = false))
      },
      upsert(values) {
        if (this.isFunction(this.beforeUpsert)) {
          this.beforeUpsert(values)
        }
        if (this.isCreated) {
          return this.update(values)
        }
        return this.create(values)
      },
      update(values) {
        this.btnLoading = true
        this.apiService
          .update(this.entityId, values)
          .then((response) => {
            this.success(response.message)
            if (!this.isEmpty(this.gotoLink)) {
              this.userDetail()
               this.users.name === 'Super Admin' ? this.goto(`/superAdmin/users`) : this.goto(`${this.gotoLink}`)
            }
            if (this.isFunction(this.afterUpdate)) {
              this.afterUpdate(response)
              this.btnLoading = false
              this.loading = false
            }
          })
          .catch(this.error)
          .finally(() => {
            this.loading = false
          })
      },
      create(values) {
        this.btnLoading = true
        this.loading = true
        this.projectService
          .create(values)
          .then((response) => {
            this.success(response.message)
            if (!this.isEmpty(this.gotoLink)) {
              this.users.name === 'Super Admin' ? this.goto(`/superAdmin/users`) : this.goto(`${this.gotoLink}`)
            }
            if (this.isFunction(this.afterCreate)) {
              this.afterCreate(response)
              this.btnLoading = false
              this.loading = false
            }
          })
          .catch(this.error)
          .finally(() => {
            this.btnLoading = false
            this.loading = false
          })
      },
      onSubmit(e) {
        this.loading = true
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            // console.log(values)
            /* const formData = new FormData()
            for (const key in values) {
              formData.append(key, values[key])
            }
              this.fileList.forEach((files) => {
                formData.append('profileImageUrl', files)
              }) */
            this.upsert(values)
          } else {
            this.loading = false
          }
        })
        // this.loading = false
      },
      userDetail() {
        UserServices.detail()
          .then((response) => {
            this.$store.commit('setUser', response.data)
          })
          .then(() => {
             this.users.name === 'Super Admin' ? this.goto(`/superAdmin/users`) :  this.$router.push({ path: '/users' })
            this.loading = false
          })
      },
    },
  }
  </script>
  