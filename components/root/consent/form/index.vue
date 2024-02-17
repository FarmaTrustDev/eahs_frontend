<template>
    <div>
      <a-form :form="form"  :layout="formLayout" @submit.prevent="onSubmit" >
        <FormFields
          :form="form"
          :entity="projData"
          :is-created="isCreated"
          @cheCreated="checkCreated"
          @handleChange="handleChange"
        />
        <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 23 }">
          <FormActionButton
            :is-created="isCreated"
            :loading="loading"
            custom-text="Add Consent Form"
          />
        </a-form-item>
      </a-form>
      <a-modal 
      :visible="visibleSignature"
      :footer="null"
      class="error-model"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
    <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>
    </div>
  </template>
  <script>
  import routeHelpers from '~/mixins/route-helpers'
  import nullHelper from '~/mixins/null-helpers'
  import notifications from '~/mixins/notifications'
  import ProjectServices from '~/services/API/ProjectServices'
  import FormFields from '~/components/root/consent/form/FormField'
  import  { CONSENT_STATUSES } from '~/services/Constant/index'
  import Signature from '~/components/signature'
  export default {
    components: { FormFields,Signature },
    mixins: [notifications, routeHelpers, nullHelper],
  
    data() {
      return {
        loading: false,
        pending: CONSENT_STATUSES.pending.name,
        successResponse: '',
        showError: false,
        visibleSignature:false,
        projData: {},
        entityId: null,
        formLayout: 'vertical',
        form: this.$form.createForm(this, {
          name: 'consentCreate',
        }),
        gotoLink: '/consent',
        apiService: ProjectServices,
        projectService:ProjectServices,
        fileList: [],
        isCreated: false,
        file: [],
        projectData:{},
        activate: true,
        deactivate: true,
        requiredInves: false
      }
    },
    computed: {
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
        this.$emit('isUpdate', 'Update Project');
        this.loading = true
        this.apiService
          .getById(id)
          .then((response) => {
            this.entity = response.data
            this.projData = response.data
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
        values.investigatorId = JSON.parse([values.investigatorIds])
        this.apiService
          .update(this.entityId, values)
          .then((response) => {
            this.success(response.message)
            this.goto('/projects')
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
        values.statusName = this.pending
        values.investigatorId = JSON.parse([values.investigatorIds])
        console.log(values)
        // values.Add('StatusName',this.pending)
        this.btnLoading = true
        this.loading = true
        this.projectService
          .create(values)
          .then((response) => {
            this.success(response.message)
            this.goto('/consent/consentlist?id='+ response.data.result.globalId)
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
      handleOk() {
      this.handleSignatureCancel()
      },
      handleSignatureOk() {
      this.visibleSignature = false
      this.upsert(this.projectData)
      },
      handleSignatureCancel(){
        this.visibleSignature = false
        this.loading = false
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
            this.visibleSignature = true
            this.projectData = values
          } else {
            this.loading = false
          }
        })
        // this.loading = false
      },
      
    },
  }
  </script>
  