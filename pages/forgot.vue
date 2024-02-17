<template>
  <div class="container min-vh-100">
    <AuthForgot />
  </div>
</template>

<script>
import AuthForgot from "~/components/auth/forgot.vue";
export default {
    layout: "auth",
    middleware: "no-auth",
    components: { AuthForgot }
}
</script>
<style scoped>
.min-vh-100 {
  min-height: 100%;
}
</style>
