<template>
    <div>
      <a-form :form="form" :layout="formLayout" @submit="onSubmit">
        <center>
          
          <h2>{{translation.Pleasprovi_4_957}}</h2>

          <a-alert v-if="showError" :message="error" banner closable />
          <a-form-item :label="translation.Usern_1_400">
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [
                    { required: true, message: 'Please input your Email!' },
                  ],
                },
              ]"
              size="large"
              :placeholder="translation.Usern_1_400"
            />
          </a-form-item>
          <a-form-item :label="translation.Passw_1_681">
            <a-input-password
              v-decorator="[
                'password',
                {
                  rules: [
                    { required: true, message: 'Please input your password' },
                  ],
                },
              ]"
              size="large"
              :placeholder="translation.Passw_1_681"
              type="password"
            />
          </a-form-item>
            <a-button
              class="ant-btn"
              style="padding: 5px 50px"
              @click="handleCancel()"
              >{{translation.cance_1_296}}</a-button
            >
            <a-form-item style="float:left; width: 50%;">
                <FormActionButton
                    :text="translation.Confi_1_646"
                />
                <!-- <a-button type="primary" html-type="submit">Submit</a-button> -->
            </a-form-item>
        </center>
      </a-form>
    </div>
  </template>
  <script>
  // import TreatmentServices from '~/services/API/TreatmentServices'
  import routeHelpers from '~/mixins/route-helpers'
  import nullHelper from '~/mixins/null-helpers'
  import notifications from '~/mixins/notifications'
  import imagesHelper from '~/mixins/images-helper'
  import UserServices from '~/services/API/UserServices'
  
  export default {
    mixins: [notifications, routeHelpers, nullHelper, imagesHelper],
    data() {
      return {
        patientId: null,
        message: 'true',
        formLayout: 'vertical',
        form: this.$form.createForm(this, {
          name: 'patientEnrollment',
        }),
        loading: false,
        categories: null,
        isCreated: false,
        showMessage: false,
        showError: false,
        // error: null,
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {},
    methods: {
      onSubmit(e) {
        this.showError=false
        this.loading = true
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            UserServices.verify(values).then((response)=>{
                console.log(response.data)
                if(response.data===null){
                    this.error='Your identity is not proven, please provide correct detail to proceed'
                    this.showError=true
                    this.loading=false
                }
                else{
                    this.loading=false
                    this.handleOk()
                }
                
            }).catch(this.error)
            .finally(() => (this.loading = false))
            // values.screeningStatus = true
            // this.create(values)
          } else {
            this.confirm('Please provide UserName & Password!')
            this.loading = false
          }
        })
      },
      handleOk() {
        this.handleSignatureOk()
      },
      handleCancel() {
        this.handleSignatureCancel()
      },
      handleSignatureOk(){
        this.$emit('handleSignatureOk')
      },
      handleSignatureCancel(){
        this.$emit('handleSignatureCancel')
      }
    },
  }
  </script>
  