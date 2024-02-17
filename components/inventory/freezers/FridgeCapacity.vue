<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="81"
      viewBox="0 0 50 81"
      fill="none"
    >
      <path
        d="M4.94067 0.5H45.0595C46.9925 0.5 48.5595 2.067 48.5595 4V37.9951H1.44067V4.00001C1.44067 2.06701 3.00768 0.5 4.94067 0.5Z"
        fill="#D9D9D9"
        :stroke="color"
      />
      <path
        d="M1.44067 38.9951H48.5595V72.9901C48.5595 74.9231 46.9925 76.4901 45.0595 76.4901H4.94068C3.00768 76.4901 1.44067 74.9231 1.44067 72.9901V38.9951Z"
        fill="#D9D9D9"
        :stroke="color"
      />
      <path
        d="M4.14844 76.9901H45.8514L45.2532 78.4856C44.6458 80.0042 43.1749 81 41.5393 81H8.22964C6.32291 81 4.68125 79.6542 4.30731 77.7845L4.14844 76.9901Z"
        :fill="color"
      />
      <line
        x1="5.45068"
        y1="10.9258"
        x2="5.45068"
        y2="27.5693"
        :stroke="color"
        stroke-linecap="round"
      />
      <line
        x1="5.45068"
        y1="49.4208"
        x2="5.45068"
        y2="66.0644"
        :stroke="color"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    color: { type: String, default: '#1943AE' },
  },
  data() {
    return {}
  },
}
</script>
