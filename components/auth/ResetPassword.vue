<template>
  <div class="half-secondary">
    <div class="login">
      <a-card :bordered="false" :title="title==='Activate' ? 'Activate Account' : 'Reset Password'">
        <a-form :form="form" layout="horizontal" @submit="onSubmit">
          <a-alert v-if="showError" :message="error" banner closable />
          <a-form-item label="Password">
            <a-input-password
              v-decorator="[
                'password',
                {
                  rules: [
                    { required: true, message: 'This field is required!' },
                  ],
                },
              ]"
              size="large"
              placeholder="Password"
              type="password"
            />
          </a-form-item>
          <a-form-item :label="translation.ConfiPassw_2_473">
            <a-input-password
              v-decorator="[
                'confirmPassword',
                {
                  rules: [
                    { required: true, message: 'This field is required.' },
                  ],
                },
              ]"
              size="large"
              :placeholder="translation.ConfiPassw_2_473"
              type="password"
            />
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'privateKey',
                {
                  initialValue: authKey,
                  rules: [
                    { required: true, message: '' },
                  ],
                },
              ]"
              size="large"
              placeholder=""
              type="hidden"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              block
              size="large"
              type="primary"
              html-type="submit"
              :loading="loading"
              >Submit</a-button
            >
            <h3 > <a @click="goto('/login')"> Back To Login</a> </h3>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script>
import UserServices from '~/services/API/UserServices'
import { success } from '~/services/Helpers/notifications'
import { isEmpty } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'

export default {
  props: {
    authKey: { type: String, required: true },
    title:{ type: String},
  },
  mixins: [routeHelpers],   
  data() {
    return {
      formLayout: 'horizontal',
      loading: false,
      successResponse: '',
      error: null,
      showError: false,
      form: this.$form.createForm(this, {
        name: 'login',
      }),
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },   
  methods: {
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const pass=values.password
          const confirmPass=values.confirmPassword
          if(pass===confirmPass){
            UserServices.resetPassword(values.privateKey,values).then((response)=>{
              success(this,{message:response.data})
            }).then(()=>{
              this.$router.push({ path: '/login' })
              this.loading = false
            })
            .catch((e) => {
            if (!isEmpty(e.response)) {
            this.error = e.response.data.message
            this.showError = true
            }
            })
            .finally(() => (this.loading = false))
          }else{
            this.error='Confirm Password does not match'
            this.showError=true
            this.loading = false  
          }
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
