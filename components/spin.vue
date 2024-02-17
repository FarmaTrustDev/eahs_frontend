<template>
    <div style="margin-top: 50px;">
        <a-row>
            <a-col :offset="6" :span="8">
                <img
                    style="height: 50px;"
                    src='~/assets/logo/ad_logo.png'
                     />
            </a-col>
            <a-col :offset="2" :span="8">
                <img
                    style="height: 50px;"
                    src='~/assets/logo/hs_logo.png'
                     />
            </a-col>
        </a-row>
        <a-row style="margin-top:20px">
            <a-col :offset="4" :span="5">
                <a-spin :spinning="spinning" tip="Spinning...">
                <div class="wheel" :style="{ background: gradientStyle, transform: 'rotate(' + rotation + 'deg)' }">
          
                </div>
                </a-spin>
            </a-col>
            <a-col :span="15">
                <div v-if="selectedSection" class="result-label">
                <h2>Selected Section:</h2>
                <div v-for="(se,index) in this.selectedSection" :key="index">
                    <strong><h2>{{ se.sec }}</h2></strong>
                </div>
                 </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col :offset="4" :span="2">
                <a-button :disabled="spinning" type="primary" @click="spinWheel">Spin</a-button>
            </a-col>
            <a-col :offset="1" :span="4">
                <a-button :disabled="spinning" type="primary" @click="resetWheel">Reset</a-button>
            </a-col>
        </a-row>
      
      
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        spinning: false,
        rotation: 0,
        sections: 7,
        selectedSection: [],
        sectionColors: [],
      };
    },
    computed: {
      gradientStyle() {
        const stops = this.sectionColors
          .map((color, index) => `${color} ${(index / this.sections) * 100}%`)
          .join(', ');
        return `conic-gradient(${stops})`;
      },
    },
    methods: {
      spinWheel() {
        if (this.spinning) return;
  
        this.spinning = true;
        const randomRotation = Math.floor(Math.random() * 360);
        this.rotation += 360 * 5 + randomRotation;
  
        // Simulate an asynchronous action (e.g., API call) that takes time
        setTimeout(() => {
          const sectionIndex = Math.floor(this.rotation / 360) % this.sections;
          this.selectedSection.push( { sec: sectionIndex + 1});
          this.spinning = false;
        }, 3000); // Adjust the duration as needed
      },
      resetWheel()
      {
        this.selectedSection = []
      },
      generateRandomColor() {
        // Function to generate a random color
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
    },
    created() {
      // Initialize sectionColors with dynamic colors
      this.sectionColors = Array.from({ length: this.sections }, () => this.generateRandomColor());
    },
    watch: {
      sections(newSections) {
        // Re-initialize sectionColors when sections change
        this.sectionColors = Array.from({ length: newSections }, () => this.generateRandomColor());
      },
    },
  };
  </script>
  
  <style scoped>
/* Add your wheel styling here */
.wheel {
  width: 200px;
  height: 200px;
  border: 2px solid #333;
  border-radius: 50%;
  position: relative;
  transition: transform 3s ease-out; /* Adjust the duration as needed */
}

.section {
  position: absolute;
  width: 50%; /* Adjust the width as needed */
  height: 50%; /* Adjust the height as needed */
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
}

.title {
  color: #222; /* Dark color for titles */
}

/* Customize the spinner arrow color */
.a-spin-dot i {
  background-color: blue; /* Change this to the desired color */
}

/* Add more styling as needed */

.result-label {
  margin-top: 20px;
  text-align: center;
}
</style>
