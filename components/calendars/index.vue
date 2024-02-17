<template>
  <div>
    <FullCalendar
      :options="calendarOptions"
      :header="{
        left: 'prev,next ',
      }"
      @select="handleEventClick"
      @changeDate="handleDateClick"
    />
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  props: {
    handleDateClick: {
      default: () => ({}),
      type: Function,
      require: true,
    },
  },
  data() {
    return {
      calendarOptions: {
        headerToolbar: {
          left: false,
          center: 'title',
          right: 'prev,next'
        },
        plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
        initialView: 'dayGridMonth',
        nowIndicator: true,
        editable: false,
        selectable: true,
        displayEventTime : false,
        events:this.handleDateClick,
        slotMinTime: '08:00:00',
        height: 550,
        slotMaxTime: '21:00:00',
        customButtons: {
          // next: {
          //   click(a, v) {
          //     console.log(a, v)
          //     return ''
          //   },
          // },
        },
        // select(info) {
        //   alert('selected ' + info.startStr + ' to ' + info.endStr)
        // },
        eventClick: this.handleEventClick,
        // dateClick: this.handleSelect,
        views: {
          timeGridFourDay: {
            type: 'timeGrid',
            duration: { days: 3 },
            buttonText: '3 day',
          },
        },
      },
      openDatePicker: false,
      calendarEventsData: [],
      entityId: null,
      isCreated: false,
      savedEvents: [],
    }
  },
  mounted() {
  },
  methods: {
    handleEventClick(arg) {
      this.$emit('getEventClick', arg)
    },
  },
}
</script>
