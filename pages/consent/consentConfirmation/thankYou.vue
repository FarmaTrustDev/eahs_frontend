<template>
    <a-result :title="response">
    <template #icon>
      <a-icon type="smile" theme="twoTone" />
    </template>
  </a-result>
</template>
<script>
export default({
    layout:"noAuth",
    data() {
    return {
        response:''
    }
    },
    mounted(){
        this.response = this.$route.query.response
    },  
})
</script>