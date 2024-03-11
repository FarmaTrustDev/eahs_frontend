<template>
  <a-layout-sider v-model="collapsed" class="sidebar" width="265" theme="light">
    <div class="logo-container">
      
    </div>
    <a-skeleton
      :loading="false"
      :paragraph="{ rows: 10 }"
      class="side-menu"
    >
      <a-menu :selected-keys="selectedKey" mode="inline">
        <a-menu-item
          v-for="menu in menus"
          :key="menu.key"
          @click="goto(menu)"
        >
          <div class="menu-container">
            <div>
              <img :src="menu.icon" style="width: 17px" />
            </div>
            <div>
              <span class="title">{{ menu.name }}</span>
            </div>
          </div>
        </a-menu-item>

        <a-menu-item key="10" class="logout-menu" @click="logout">
          <div class="menu-container">
            <img :src="logoutImg" />
            <span class="title">Logout</span>
          </div>
        </a-menu-item>
      </a-menu>
    </a-skeleton>
  </a-layout-sider>
</template>

<script>
// import { mapGetters } from 'vuex'
import { setAccessToken, setRefreshToken } from '~/services/Auth'
import UsersServices from '~/services/API/UsersServices'
import { isEmpty } from '~/services/Helpers'
export default {
  mixins: [],
  data() {
    return {
      collapsed: false,
      menus:[],
      logoutImg:
        'https://cgt-dev-ft.microsysx.com/images/v2/icons/logout.svg?0.229',
    }
  },
  computed: {
    
  },
  mounted() {
    this.getMenu()
  },

  methods: {
    showCollapse() {
      if (window.innerWidth < 960) {
        this.collapsed = true
      }
    },
    isEmpty,
    goto(menu) {
      this.$store.commit('setSelectedMenu', [`${menu.key}`])
      this.$router.push({
        path: menu.to,
      })
    },
    getMenu(){
      UsersServices.getMenu().then((response)=>{
        this.menus = response.data
      })
    },
    logout() {
      setRefreshToken('')
      setAccessToken('')
      this.$store.commit('setToken', {})
      this.$store.commit('setUser', {})
      this.$store.commit('setSelectedMenu', ['1'])
      this.$router.push({
        path: '/login',
      })
    },
  },
}
</script>
