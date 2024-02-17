<template>
  <a-card class="avatar-card" :hoverable="hoverable" @click="handleClick">
    <a-card-meta :title="title">
      <template slot="description"
        >{{ description }}
        <a-icon v-if="arrow" type="right" />
      </template>
    </a-card-meta>
  </a-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    hoverable: {
      type: Boolean,
      default: false,
    },
    arrow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    },
  },
}
</script>
<style lang="scss" scoped>
// using on home page if other place used would be change on demand
.capsule {
  font-size: 1.75rem;
  padding: 15px 25px;
  margin-right: 10px;
}
</style>
