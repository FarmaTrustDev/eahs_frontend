<template>
  <a-form-item class="text-right">
    <slot name="extra" />
    <a-button
      :loading="loading"
      :type="btnType"
      :html-type="htmlType"
      :disabled="disabled || loading"
      @click="submit"
    >
      <slot name="icon" />{{ getText() }}</a-button
    >
  </a-form-item>
</template>
<script>
const defaultText = 'Create'
export default {
  props: {
    position: {
      default: 'left',
      type: String,
    },
    isCreated: { default: false, type: Boolean },
    text: { default: defaultText, type: String },
    btnType: { default: 'primary', type: String },
    loading: { default: false, type: Boolean },
    disabled: { default: false, type: Boolean },
    customText: { default: null, type: String },
    htmlType: { default: 'submit', type: String },
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
    getText() {
      if (this.isCreated) {
        if (this.text !== defaultText) {
          return this.text
        }
        return this.translation.Updat_1_208
      }
      return this.customText !== null ? this.customText : this.text
    },
    submit() {
      this.$emit('click')
    },
  },
}
</script>
