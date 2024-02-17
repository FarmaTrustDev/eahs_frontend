<template>
  <div class="container min-vh-100">
   <AuthResetPassword v-if="isAuthenticated" :title="title" :auth-key="privateKey" />
  </div>
</template>

<script>
import AuthServices from '~/services/API/AuthServices'
import { setAccessToken, setRefreshToken } from '~/services/Auth'
import { isEmpty } from '~/services/Helpers'

export default {
  layout: 'auth',
  middleware: 'no-auth', 
  data() {
    return {
      privateKey:'',
      isAuthenticated:false,
      title:'',
    }
  },
  mounted(){
    this.privateKey=this.$route.query.id
    this.title=this.$route.query.emailType
    this.checkUserKey(this.privateKey)
  },
  methods:{
    checkUserKey(key) {
      AuthServices.getActivationAuth(key)
        .then((response) => {
          setRefreshToken(response.refreshToken)
          setAccessToken(response.accessToken)
          this.$store.commit('setToken', {
            token: response.accessToken,
            status: response.success,
          })
          this.isAuthenticated=true
        })
        .catch((e) => {
          if (!isEmpty(e.response)) {
            this.error = e.response.data.message
            this.showError = true
            this.$route.push({path: '/login'})
          }
        })
        .finally(() => (this.loading = false))
    },
  }
}
</script>
<style scoped>
.min-vh-100 {
  min-height: 100%;
}
</style>
