<template>
  <a-row>
    <a-col :span="24">
      <a-form-item
        :label="translation.Descr_1_69"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
      >
        <a-textarea
          v-decorator="[
            'agenda',
            {
              rules: [
                {
                  required: true,
                  message: translation.Pleasinput_4_630,
                },
              ],
            },
          ]"
          placeholder="Description"
        />
      </a-form-item>
    </a-col>
  </a-row>
</template>
<script>
export default {
    computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
}
</script>
