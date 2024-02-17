<template>
  <a-popconfirm
    placement="topLeft"
    :ok-text="translation.yes_1_654"
    :cancel-text="translation.no_1_656"
    @confirm="confirm"
  >
    <template slot="title">
      <p>{{ text }}</p>
    </template>
    <a-button html-type="button" ghost type="danger">{{ btnText }}</a-button>
  </a-popconfirm>
</template>
<script>
const defaultText = 'Delete'
export default {
  props: {
    text: {
      default: 'Are you sure to delete this task?',
      type: String,
    },
    btnText: { default: defaultText, type: String },
  },
  data() {
    return {}
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },    
  },  
  methods: {
    confirm() {
      this.$emit('delete')
    },
  },
}
</script>
