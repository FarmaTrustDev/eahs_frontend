<template>
  <div class="home-page container" >
    <!-- <h1 class="title mt-15">
      <strong>{{ translation['Mydashb_2_7'] }}</strong>
    </h1> -->
  </div>
</template>

<script>
// import { HubConnectionBuilder } from '@aspnet/signalr'
import AuthServices from '~/services/API/AuthServices'
import { setAccessToken, setRefreshToken} from '~/services/Auth'
// import { setAccessToken, setRefreshToken } from '~/services/Auth'
import { isEmpty } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
export default {
  components: {
  },
  mixins: [routeHelpers],
  // middleware: 'auth',
  data() {
    return {}
  },
  computed: {
    
  },
  mounted() {
    this.login()
  },
  methods: {
    login() {
      AuthServices.login({ email: '', username:'eahs', password:'test123' })
        .then((response) => {
          setRefreshToken(response.refreshToken)
          setAccessToken(response.accessToken)
          this.$store.commit('setToken', {
            token: response.accessToken,
            status: true,
          })
          // success(this, { message: response.message })
        })
        .catch((e) => {
          if (!isEmpty(e.response)) {
            this.error = 'Invalid Username/Password'
            this.showError = true
          }
        })
        .finally(() => (this.loading = false))
    },
    gotoView(uri) {
      this.goto(`/${uri}`)
    },
  },
}
</script>
