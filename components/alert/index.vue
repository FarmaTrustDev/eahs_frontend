<template>
  <a-alert :type="type" :message="message"></a-alert>
</template>
<script>
export default {
  props: {
    message: { type: String, required: true },
    type: { type: String, required: false, default: 'info' },
  },
}
</script>
