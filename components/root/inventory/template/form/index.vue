<template>
    <div>
      <a-form :form="form" :layout="formLayout" @submit="onSubmit">
        <formfield 
          :form="form"
          :entity="entity"
          :is-created="isCreated"
          :is-label-list-empty="islabelListEmpty"
          :checkedList="checkedList"
          @cheCreated="checkCreated"
          @handleChange="handleChange"
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
  import TemplateServices from '~/services/API/TemplateServices'
  import formfield from '~/components/root/inventory/template/form/FormField'
  import {CONSENT_STATUSES} from '~/services/Constant/index'
  import Signature from '~/components/signature'
  export default {
    components: { formfield ,Signature},
    mixins: [notifications, routeHelpers, nullHelper],
  
    data() {
      return {
        loading: false,
        pending: CONSENT_STATUSES.pending.name,
        successResponse: '',
        showError: false,
        user: {},
        entityId: null,
        entity:{},
        templateData:{},
        visibleSignature : false,
        formLayout: 'vertical',
        form: this.$form.createForm(this, {
          name: 'labelsCreate',
        }),
        gotoLink: '/administration/labels',
        apiService: TemplateServices,
        isCreated: false,
        labelList:[],
        islabelListEmpty:false,
        checkedList: [],
        labelData:[]
      }
    },
    mounted() {
      this.checkCreated()
    },
    computed:{
      translation() {
        return this.$store.getters.getTranslation
      },
    },  
    methods: {
        handleChange(valu, ky, val) {
            const index = this.labelList.findIndex((item) => item.key === ky);
            if(index === -1)
            {
                if(valu === true)
                {
                    this.labelList.push({key:ky, value:val})
                }
            }
            if(valu === true){
                  if(this.isCreated){this.labelData.push({key:ky,value:val})}
                  this.checkedList.push(ky)
            }
            else if(valu === false){
                // if(this.isCreated)
                // {
                  this.labelData.splice(this.checkedList.indexOf(ky),1)
                  this.checkedList.splice(this.checkedList.indexOf(ky),1)
                // }
                  this.labelList.splice(index,1)
            }
        },
        checkCreated() {
            const entityId = this.$route.params.id
            if (this.isGuid(entityId)) {
            this.entityId = entityId
            this.isCreated = true
            this.fetch(entityId)
            }
        },
        handleSignatureOk() {
          this.visibleSignature = false
          this.upsert(this.templateData)
        },
        handleSignatureCancel(){
          this.visibleSignature = false
          this.loading = false
        },
        handleOk() {
          this.handleSignatureCancel()
        },
        eSignature()
        {
          this.visibleSignature = true
        },
        fetch(id) {
            this.loading = true
            this.labelData = []
            this.apiService
            .getById(id)
            .then((response) => {
                this.entity = response.data
                this.labelData = response.data.labelsResponseDTO
                this.checkedList = this.entity.labelsResponseDTO.map(item => item.key)
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
            console.log(values)
            values.globalId = this.entityId
            this.apiService
            .update(values)
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
        onSubmit(e) {
            this.loading = true
            e.preventDefault()
            this.form.validateFields((err, values) => {
            if (!err) {
                if(this.labelList.length === 0 && this.labelData.length === 0)
                {
                    this.islabelListEmpty=true
                    this.btnLoading = false
                    this.loading = false
                }else{
                    const data=JSON.parse(
                    JSON.stringify({ 
                    title: values.title, 
                    description: values.description, 
                    labelsRequestDTO: this.isCreated ?  this.labelData : this.labelList, 
                    }))
                    // console.log(data)
                    this.templateData = data
                    this.eSignature()
                }
            } else {
                this.loading = false
            }
            })
            // this.loading = false
        },
    },
  }
  </script>
  