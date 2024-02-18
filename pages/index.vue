<template>
  <div class="home-page container" >
    <!-- <h1 class="title mt-15">
      <strong>{{ translation['Mydashb_2_7'] }}</strong>
    </h1> -->
    <Judges />
  </div>
</template>

<script>
import routeHelpers from '~/mixins/route-helpers'
import Judges from '~/components/judges'
import AuthServices from '~/services/API/AuthServices'
import { setAccessToken, setRefreshToken} from '~/services/Auth'
import { success } from '~/services/Helpers/notifications'
import { isEmpty } from '~/services/Helpers'
export default {
  components: {
    Judges
  },
  mixins: [routeHelpers],
  data() {
    return {}
  },
  computed: {
  },
  mounted() {
    this.login()
  },
  methods: {
    gotoView(uri) {
      this.goto(`/${uri}`)
    },
    login() {
      AuthServices.login({ email: '', username:'eahs', password:'test123' })
        .then((response) => {
          setRefreshToken(response.refreshToken)
          setAccessToken(response.accessToken)
          this.$store.commit('setToken', {
            token: response.accessToken,
            status: true,
          })
          success(this, { message: response.message })
        })
        .catch((e) => {
          if (!isEmpty(e.response)) {
            this.error = 'Invalid Username/Password'
            this.showError = true
          }
        })
        .finally(() => (this.loading = false))
    },
  },
}
</script>
