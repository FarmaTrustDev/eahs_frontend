<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout class="main-section">
      <Header></Header>

      <a-layout-content style="margin: 0 16px ;">
        <!-- <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb> -->
        <div class="main center-container">
          <Nuxt />
        </div>
      </a-layout-content>
      <!-- <a-layout-footer style="text-align: center">
        CGT ©2022 Created by Hataali
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<script>
import Header from '~/components/layout/Header'

export default {
  components: {
    Header,
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      //  return this.$store.getters.getUser
      return 'user name'
    },
  },
}
</script>
<style>
#dashboard-layout .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
