<template>
  <span class="step-col" functional>
    <a-steps
      :initial="1"
      :current="getCurrentStep(treatment)"
      status="process"
      size="small"
    >
      <a-step
        v-for="phase in phases"
        :key="phase.phaseId"
        :title="phase.name"
        :class="getClass(phase, treatment)"
        @click="(a) => emitGotoView(patient, treatment, phase)"
      >
      </a-step>
    </a-steps>
  </span>
</template>
<script>
export default {
  props: {
    treatment: { type: Object, default: () => ({}) },
    phases: { type: Array, default: () => [] },
    patient: { type: Object, default: () => {} },
    currentStep: { type: Function, default: () => [] },
    gotoView: { type: Function, default: () => [] },
  },
  data() {
    return { current: 0 }
  },
  methods: {
    getClass(phase, treatment) {
      let className = phase.name

      if (
        phase.phaseId === 4 &&
        treatment.phaseId === 3 &&
        treatment.manufacturerRequestStatus
      ) {
        className = className + ' ' + 'rejected'
      }

      if (phase.phaseId === 16 && treatment.phaseId >= 15) {
        className = className + ' ' + 'ant-steps-item-finish afterCare'
      }

      return className
    },
    getCurrentStep(treatment) {
      this.current = this.currentStep(treatment)
      return this.current
    },
    emitGotoView(patient, treatment, phase) {
      if (this.current >= phase.id) {
        return this.gotoView(patient, treatment, phase)
      } else {
        return false
      }

      // this.gotoView(patient, treatment, phase)
    },
  },
}
</script>
