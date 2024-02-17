<script>
import { Doughnut } from 'vue-chartjs'

export default {
  name: 'PatientsChart',
  extends: Doughnut,
  props:['chartData','options'],
  methods: {
    update() {
      window.dispatchEvent(new Event('resize'));
      this.$data._chart.update()
      window.dispatchEvent(new Event('resize'));
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
    window.dispatchEvent(new Event('resize'));
  }
};
</script>