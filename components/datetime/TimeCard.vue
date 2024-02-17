<template>
  <a-card class="white-card" :bordered="false">
    <a-row>
      <a-col :span="10"
        ><span class="danger-time">
          {{ _getFormatMoment().format('HH:mm') }}</span
        ></a-col
      >
      <a-col :span="12">
        <div class="dateTimeBox">
          <span class="daysName">{{ _getFormatMoment().format('dddd') }}</span>
          <br />
          <span class="TodaysDate">{{
            _getFormatMoment().format('Do MMM YYYY')
          }}</span>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
import { _getFormatMoment } from '~/services/Helpers/MomentHelpers'
export default {
  methods: {
    _getFormatMoment,
  },
}
</script>
