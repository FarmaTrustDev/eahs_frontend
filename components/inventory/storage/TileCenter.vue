<template>
  <div class="tileCenter border p-15">
    <div class="heading text-center">{{ heading }}</div>
    <slot name="center"></slot>
    <div class="footer w-100 clearfix">
      <a-icon type="environment" theme="filled" /> {{ footer }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    heading: { type: String, default: 'Storage Suite 3, Germany - Cellfuse' },
    footer: { type: String, default: 'Storage Suite 3, Germany - Cellfuse' },
  },
}
</script>
<style lang="scss" scoped>
.tileCenter {
  min-height: 400px;
  font-size: 0.875rem;
  border-radius: 10px;
  padding-bottom: 51px;

  .footer {
    color: #7a7575;
    position: absolute;
    bottom: 15px;
  }
  .heading {
    padding: 15px 0 15px;
    color: #000;
  }
}
</style>
