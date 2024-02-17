<template>
  <div>
    <svg
      width="49"
      height="85"
      viewBox="0 0 49 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="80" rx="4" fill="#D9D9D9" />
      <path
        d="M0 19H48V39H0V19Z"
        da="3"
        :class="getBlinkClass()"
        :fill="getColor(3)"
      />
      <path
        d="M0 39H48V59H0V39Z"
        da="2"
        :class="getBlinkClass()"
        :fill="getColor(2)"
      />
      <path
        d="M0 59H48V75C48 77.2091 46.2091 79 44 79H4C1.79086 79 0 77.2091 0 75V59Z"
        :class="getBlinkClass()"
        :fill="getColor(1)"
        da="1"
      />
      <path
        d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H44C45.933 0.5 47.5 2.067 47.5 4V39.5H0.5V4Z"
        :stroke="color"
      />
      <path
        d="M0.5 40.5H47.5V76C47.5 77.933 45.933 79.5 44 79.5H4C2.067 79.5 0.5 77.933 0.5 76V40.5Z"
        :stroke="color"
      />
      <path
        d="M3 80H44.703L44.1048 81.4955C43.4973 83.0141 42.0265 84.0099 40.3909 84.0099H7.0812C5.17447 84.0099 3.53281 82.6641 3.15887 80.7944L3 80Z"
        fill="black"
      />
      <line
        x1="4.50977"
        y1="14.9258"
        x2="4.50976"
        y2="31.5693"
        :stroke="color"
        stroke-linecap="round"
      />
      <line
        x1="4.50977"
        y1="53.4209"
        x2="4.50976"
        y2="70.0645"
        :stroke="color"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>
<script>
// const types = [1, 2, 3, 4]0,25,50,75,100

const colors = {
  red: '#FC1212',
  blue: '#2F79E3',
  yellow: '#FE9418',
  grey: '#D9D9D9',
}
const typeColor = [colors.grey, colors.blue, colors.yellow, colors.red]
export default {
  props: {
    color: { type: String, default: '#1943AE' },
    sampleId: { type: String },
    tempId: { type: String },
    type: { type: Number, default: 0 },
  },
  data() {
    return {}
  },
  methods: {
    getUpperPortion(type) {
      if (this.type > 1) {
        return colors.red
      }
      return colors.grey
    },
    getLowerPortion(type) {
      if (this.type > 1) {
        return colors.red
      }
      if (this.type === 1) {
        return colors.yellow
      }
      return colors.grey
    },
    getColor(type) {
      return type <= this.type ? typeColor[this.type] : '#D9D9D9'
    },
    getBlinkClass() {
      return this.type > 2 && 'blink_me'
    },
  },
}
</script>
