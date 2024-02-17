<template>
  <div class="consumables-tile">
    <div class="position-relative svg-container">
      <svg
        class="position-relative progressive-svg"
        viewBox="-8 -7 110.063 63.375"
      >
        <path
          d="M0,56.1V32.1C0,14.4,14.4,0,32.1,0h23.9c17.8,0,32.1,14.4,32.1,32.1v23.95"
          fill="none"
          :stroke=" threshold<=49? colorLow : threshold<=79 ? colorModerate : colorHigh"
          stroke-width="16"
          pathLength="100"
          :style="{ strokeDasharray: `${threshold}, 100` }"
        ></path>
      </svg>
      <svg class="static-svg" viewBox="-8 -7 110.063 63.375">
        <path
          d="M0,56.1V32.1C0,14.4,14.4,0,32.1,0h23.9c17.8,0,32.1,14.4,32.1,32.1v23.9"
          fill="none"
          stroke="#ececec"
          stroke-width="16"
          pathLength="100"
        ></path>
      </svg>
    </div>
    <figure>
      <span class="digit top-digit">{{ threshold }}</span>
      <div class="slider-beast" >
        <svg
          class="slider-svg"
          width="158"
          height="50"
          viewBox="0 0 166 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_235:30)">
            <path
              d="M4 22C4 12.0589 12.0589 4 22 4H143.101C153.042 4 161.101 12.0589 161.101 22V35.2095C161.101 45.1506 153.042 53.2094 143.101 53.2094H22C12.0589 53.2094 4 45.1506 4 35.2094V22Z"
              fill="#1E2B4D"
              :data-value="threshold"
              ref="draggable"
              class="drag-image ui-draggable ui-draggable-handle"
              @mousedown="startDragging"
              @mousemove="drag"
              @mouseup="stopDragging"
            ></path>
          </g>
          <path
            :d="`M${calculateStartX()} 19.1484V43.8077`"
            :stroke="getStrokeColor()"
            stroke-width="3.2"
            stroke-linecap="round"
          ></path>
        </svg>
        
        
      </div>
    </figure>
    <h6 class="consumables-heading">{{ data.heading }}</h6>
  </div>
</template>
<script>
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [imagesHelper],
  props: {
    data: {
      type: Object,
      default: () => ({
        threshold: 8,
        heading: 'some heading props',
      }),
    },
  },
  data() {
    return {
      threshold: 0,
      isDragging: false,
      startX: 8,
      colorLow:'#ff0909',
      colorModerate:'#ffbf00',
      colorHigh:'#2359e8'
    }
  },
  mounted() {
    this.threshold = this.data.threshold;
    this.attachEventListeners();
  },
  beforeDestroy() {
    this.detachEventListeners();
  },
  computed: {
    startThreshold() {
      return 8;
    },
    endThreshold() {
      return 100;
    },
  },
  methods: {
    attachEventListeners() {
      const draggable = this.$refs.draggable;
      draggable.addEventListener("mousedown", this.startDragging);
      draggable.addEventListener("mousemove", this.drag);
      draggable.addEventListener("mouseup", this.stopDragging);
    },
    detachEventListeners() {
      const draggable = this.$refs.draggable;
      draggable.removeEventListener("mousedown", this.startDragging);
      draggable.removeEventListener("mousemove", this.drag);
      draggable.removeEventListener("mouseup", this.stopDragging);
    },
    startDragging(event) {
      this.isDragging = true;
      this.startX = event.clientX;
    },
    drag(event) {
      if (this.isDragging) {
        const deltaX = event.clientX - this.startX;
        const threshold = this.threshold + deltaX;
        if (threshold >= this.startThreshold && threshold <= this.endThreshold) {
          this.threshold = threshold;
        }
        this.startX = event.clientX; // Update the startX for smooth dragging
      }
    },
    stopDragging() {
      this.isDragging = false;
    },
    calculateStartX() {
      const percentage = this.thresholdToPercentage(this.threshold);
      return this.interpolate(this.startThreshold, this.endThreshold, percentage, 32, 132);
    },
    calculateEndY() {
      const percentage = this.thresholdToPercentage(this.threshold);
      return this.interpolate(this.startThreshold, this.endThreshold, percentage, 19.1484, 43.8077);
    },
    getStrokeColor() {
      if (this.threshold <= 49) {
        return this.colorLow;
      } else if (this.threshold <= 79) {
        return this.colorModerate;
      } else {
        return this.colorHigh;
      }
    },
    thresholdToPercentage(value) {
      return (value - this.startThreshold) / (this.endThreshold - this.startThreshold) * 100;
    },
    interpolate(x1, x2, y, y1, y2) {
      return y1 + (y - x1) * (y2 - y1) / (x2 - x1);
    },
  },
}
</script>