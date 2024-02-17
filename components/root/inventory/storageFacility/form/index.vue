<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <formfield 
        :entity="entity"
        :is-created="isCreated"
        @cheCreated="checkCreated"
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
import FridgeServices from '~/services/API/FridgeServices'
import formfield from '~/components/root/inventory/storageFacility/form/FormField'
import { CONSENT_STATUSES } from '~/services/Constant'
import Signature from '~/components/signature'
export default {
  components: { formfield ,Signature},
  mixins: [notifications, routeHelpers, nullHelper],

  data() {
    return {
      loading: false,
      successResponse: '',
      showError: false,
      pending: CONSENT_STATUSES.pending.name,
      user: {},
      entity:{},
      fridgeData : {},
      visibleSignature : false,
      entityId: null,
      showModal:false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'fridgeCreate',
      }),
      gotoLink: '/administration/storage/facility',
      apiService: FridgeServices,
      fileList: [],
      isCreated: false,
      
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.checkCreated()
  },
  methods: {
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
          if (this.isFunction(this.getEntity)) {
            this.getEntity(response)
          }
        })
        .catch(this.error)
        .finally(() => {
          this.loading = false
        })
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
      values.status = this.pending
      this.apiService
        .create(values)
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
        .catch(this.error)
        .finally(() => {
          // this.btnLoading = false
          // this.loading = false
          this.loading = false
        })
    },  

    handleSignatureOk() {
      this.visibleSignature = false
      this.upsert(this.fridgeData)
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    handleOk() {
      this.handleSignatureCancel()
    },
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.fridgeData = values
          this.visibleSignature = true
          // this.success('Message sent for approval')
          // this.showModal=true
        } else {
          this.loading = false
        }
        
      })
    },
  },
}
</script>
