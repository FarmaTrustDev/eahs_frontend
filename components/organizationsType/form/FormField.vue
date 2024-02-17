<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: organization.name,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Name!',
                  },
                ],
              },
            ]"
            placeholder="Please input your Name"
          /> </a-form-item
      ></a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    organization: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      organizations:[],
      typeLoading: true,
    }
  },
  mounted() {},
  methods: {},
}
</script>
