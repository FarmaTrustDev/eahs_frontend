<template>
  <div>
    <a-row class="pt-10">
      <a-col :span="12">
        <h3 class="page-title">Select Treatment Type</h3>
      </a-col>

      <a-col :span="12">
        <a-form-item>
          <a-select
            v-decorator="[
              'treatmentTypeId',
              {
                initialValue: treatmentTypeId,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Treatment Type!',
                  },
                ],
              },
            ]"
            :loading="typeLoading"
            :placeholder="placeholder"
            class="default-select w-100"
            size="large"
            :disabled="disabled"
            @change="onchange"
          >
            <a-select-option
              v-for="type in treatmentTypes"
              :key="type.id"
              :data-globalId="type.globalId"
            >
              {{ type.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row v-if="!treatmentTypes">
      <a-col class="empty-message">
        {{ translation.Selecthe_8_476 }}
      </a-col>
    </a-row>
  </div>
</template>

<script>
import TreatmentService from '~/services/API/TreatmentTypeServices'
export default {
  props: {
    treatmentTypeId: { type: Number, default: null },
    treatmentTypeName: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    fetchAll: { type: Boolean, default: false },
  },

  data() {
    return {
      treatmentTypes: {},
      typeLoading: false,
      placeholder: 'Select Treatment Type'
    }
  },
  mounted() {
    this.fetchTreatmentTypes()
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    fetchTreatmentTypes() {
      if (this.fetchAll) {
        this.fetchSelectedTreatmentTypes(this.treatmentTypeId)
      } else {
        this.typeLoading = true
        if (this.active) {
          TreatmentService.getWithScreening()
            .then((response) => {
              this.treatmentTypes = response.data
            })
            .finally(() => (this.typeLoading = false))
        } else {
          TreatmentService.getRemaining()
            .then((response) => {
              this.treatmentTypes = response.data
            })
            .finally(() => (this.typeLoading = false))
        }
      }
    },
    fetchSelectedTreatmentTypes(id) {
      TreatmentService.get(id).then((response) => {
        this.treatmentTypes = response.data
      })
    },
    onchange(value, e) {
      this.placeholder = ''
      this.$emit('onChange', value)
    },
  },
}
</script>
