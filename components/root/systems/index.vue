<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <formfield 
        :form="form"
        :entity="entity"
        :is-created="isCreated"
        @cheCreated="checkCreated"
        @handleChangeImage="handleChangeImage"
      />

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
import AppServices from '~/services/API/AppServices'
import formfield from '~/components/root/systems/FormField'
import {CONSENT_STATUSES} from '~/services/Constant/index'
import Signature from '~/components/signature'
export default {
  components: { formfield ,Signature},
  props: {
  },
  mixins: [notifications, routeHelpers, nullHelper],

  data() {
    return {
      loading: false,
      successResponse: '',
      showError: false,
      user: {},
      visibleSignature : false,
      entityId: null,
      pending: CONSENT_STATUSES.pending.name,
      entity:{},
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'labCreate',
      }),
      gotoLink: '/system',
      apiService: AppServices,
      fileList: [],
      isCreated: false,
      
    }
  },
  mounted() {
    this.checkCreated()
  },
  computed:{
    
  },  
  methods: {
    handleChangeImage(file)
      {
        this.fileList = file
        console.log(this.fileList)
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
          this.form.setFieldsValue({
          appName: response.data.appName,
          appCode: response.data.appCode,
        });
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
        .updateApp(this.entityId, values)
        .then((response) => {
          this.success(response.message)
          if (!this.isEmpty(this.gotoLink)) {
            this.goto(`${this.gotoLink}`)
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
      this.apiService
        .createApp(values)
        .then((response) => {
          if(response.message===true){
            this.success(response.message)
          }else{
            this.success(response.errorMessage)
          }
          if (!this.isEmpty(this.gotoLink)) {
            this.goto(`${this.gotoLink}`)
          }
          if (this.isFunction(this.afterCreate)) {
            this.afterCreate(response)
            this.btnLoading = false
            this.loading = false
          }
        })
        .catch((error)=>{
                      if (error.response && error.response.data && error.response.data.message) {
                        const result = error.response.data.message.match(/\((.*)\)/)
                        this.error(result?.[1]);
                      }
                    })
        .finally(() => {
          // this.btnLoading = false
          // this.loading = false
          this.loading = false
        })
    },  
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {      
          this.upsert(values)
        } else {
          this.loading = false
        }
      })
      // this.loading = false
    },
    handleSignatureOk() {
      this.visibleSignature = false
      this.upsert(this.labData)
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    handleOk() {
      this.handleSignatureCancel()
    },
  },
}
</script>
