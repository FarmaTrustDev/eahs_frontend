<template>
    <div>
      <a-form :form="form" :layout="formLayout" @submit.prevent="onSubmit">
        <FormFields
          :form="form"
          :entity="questData"
          :anesth="anesth"
          :risks="risks"
          :is-created="isCreated"
          :is-impty-ansth="isImptyAnsth"
          :is-impty-risk="isImptyRisk"
          @cheCreated="checkCreated"
          @handleChange="handleChange"
          @handleChangeImage="handleChangeImage"
        />
        <a-form-item :label-col="{ span: 20 }" :wrapper-col="{ span: 18 }">
          <FormActionButton class="mt-15" style="margin-right: 20px;"
            :is-created="isCreated"
            :loading="loading"
            custom-text="Add Question"
          />
        </a-form-item>
      </a-form>
    </div>
  </template>
  <script>
  import routeHelpers from '~/mixins/route-helpers'
  import nullHelper from '~/mixins/null-helpers'
  import notifications from '~/mixins/notifications'
  import ProjectServices from '~/services/API/ProjectServices'
  import ConsentQuestionServices from '~/services/API/ConsentQuestionServices'
  import FormFields from '~/components/root/consent/question/FormField'
  
  export default {
    components: { FormFields },
    mixins: [notifications, routeHelpers, nullHelper],
    data() {
      return {
        loading: false,
        successResponse: '',
        showError: false,
        questData: {},
        entityId: null,
        formLayout: 'vertical',
        form: this.$form.createForm(this, {
          name: 'questionCreate',
        }),
        gotoLink: '/consent/consentform',
        projectServices:ProjectServices,
        consentQuestionServices:ConsentQuestionServices,
        fileList: [],
        isCreated: false,
        file: [],
        activate: true,
        deactivate: true,
        anesth:[],
        risks:[],
        anesData:[],
        consentGUID:0,
        questGUID:0,
        isEdit:false,
        isImptyAnsth:false,
        isImptyRisk:false
      }
    },
    computed: {
     
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {
      this.checkCreated()
      this.consentGUID = this.$route.query.constId;
      this.questGUID   = this.$route.query.questGId;
      this.isEdit   = this.$route.query.isEdit;
      this.pId = this.$route.query.pId;
      this.getQuestionById(this.questGUID)
    },
    methods: {
      handleChange(info,id,aORr) {
        if(aORr ==='risk')
        {
        this.pushListArrayRisk(info,id)
        }
        else{
          this.pushListArrayAnesthetic(info,id)
        }
      },
      handleChangeImage(file)
      {
        this.fileList = file
        console.log(this.fileList)
      },
      checkCreated() {
        const entityId = this.$route.params.questGId
        if (this.isGuid(entityId)) {
          this.entityId = entityId
          this.isCreated = true
          // this.fetch(entityId)
        }
      },
      // fetch(id) {
      //   this.loading = true
      //   this.apiService
      //     .getById(id)
      //     .then((response) => {
      //       this.entity = response.data
      //       this.questData = response.data
      //       if (this.isFunction(this.getEntity)) {
      //         this.getEntity(response)
      //       }
      //     })
      //     .finally(() => (this.loading = false))
      // },
      upsert(values) {

        const formData = new FormData()
          for (const key in values) {
            if(key === 'anesthetic')
            {
              values.anesthetic.forEach((value, index) => {
                formData.append('anesthetic[]', value);
              });
            }
            else if(key === 'risk')
            {
              values.risk.forEach((value, index) => {
                formData.append('risk[]', value);
              });
            }
            else{
            formData.append(key, values[key])
            }
          }

          this.fileList.forEach((files) => {
            formData.append('questionUploadDocument', files)
          })
        if (this.isFunction(this.beforeUpsert)) {
          this.beforeUpsert(values)
        }
        if (this.isCreated) {
          return this.update(formData)
        }
        return this.create(formData)
      },
      pushListArrayAnesthetic(valu, rowId) {
        const a=this.anesth.includes(rowId)
        if(a === false)
        {
          if(valu === true)
          {
            this.anesth.push(rowId)
          }
        }
        else if(valu===false){

          this.anesth.splice(this.anesth.indexOf(rowId),1)
        }
    },
    pushListArrayRisk(valu, rowId) {
        const a=this.risks.includes(rowId)
        if(a === false)
        {
          if(valu === true)
          {
            this.risks.push(rowId)
          }
        }
        else if(valu===false){
              this.risks.splice(this.risks.indexOf(rowId),1)
        }
        
    },
      update(values) {
        this.btnLoading = true
        this.loading = true
        this.consentQuestionServices
          .update(this.questGUID,values)
          .then((response) => {
            this.success(response.message)
            this.goto('/consent/editconsent?id='+this.consentGUID+'&pId='+this.pId)
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
      create(values) {
        this.btnLoading = true
        this.loading = true
        this.consentQuestionServices
          .create(values)
          .then((response) => {
            this.success(response.message)
            if(this.isEdit)
            { 
              this.goto('/consent/editconsent?id='+this.consentGUID+'&pId='+this.pId+'&isAssign=false')
            }
            else{
            this.goto('/consent/consentform?id='+this.pId+'&constId='+this.consentGUID)
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
            
            if(this.risks.length === 0)
            {
              this.isImptyRisk=true
              this.btnLoading = false
              this.loading = false
            }
            else if(this.anesth.length===0)
            {
              this.isImptyAnsth=true
              this.btnLoading = false
              this.loading = false
            }
            else {
            const formData = new FormData()
            for (const key in values) {
              formData.append(key, values[key])
            }
            const data=JSON.parse(
              JSON.stringify(
                { 
                  questionName: values.questionName, 
                  questionDescription: values.questionDescription, 
                  anesthetic: this.anesth, 
                  risk:this.risks,
                  consentGloabalId:this.consentGUID 
                }
                ))
            this.upsert(data)
          }

         }
         else{
              this.btnLoading = false
              this.loading = false
         }
          
        })
        
      },
      getQuestionById(id)
      {
          this.consentQuestionServices
          .getQuestionById(id)
          .then((response) => {
            if(response.data.length!==0)
            {
            this.isCreated=true
            this.entity = response.data
            this.questData = response.data
            this.anesth = response.data.anesthetic
            this.risks = response.data.risk
            }
          })
          .finally(() => (this.loading = false))
      }
    },
  }
  </script>
  