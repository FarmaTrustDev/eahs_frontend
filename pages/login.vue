<template>
  <div class="container min-vh-100 " >
    <AuthLogin />
  </div>
</template>

<script>
export default {
  layout: 'auth',
  middleware: 'no-auth',
}
</script>
<style scoped>
.min-vh-100 {
  min-height: 100%;
}
.bgCol{
  background-color: white;
}
</style>
