<template>
    <div style="margin-top: 50px;">
        <a-row>
            <a-col :span="12">
                <img src='~/assets/logo/ad_logo.png' style="height: 220px; width: 50%; border: none;"/>
            </a-col>
            <a-col :span="12">
                <img src='~/assets/logo/hs_logo.png' style="height: 220px; width: 50%;"/>
            </a-col>
        </a-row>
        <a-row style="margin-top:300px">
            <a-col :span="12">
              <div class="wheel-wrapper">
              <div
                class="wheel-pointer"
                @click="onClickRotate"
              >
                Start
              </div>
              <div
                class="wheel-bg"
                :class="{freeze: freeze}"
                :style="`transform: rotate(${wheelDeg}deg)`"
              >
                <div class="prize-list">
                  <div
                    class="prize-item-wrapper"
                    v-for="(item,index) in prizeList"
                    :key="index"
                  >
                    <div
                      class="prize-item"
                      :style="`transform: rotate(${(360/ prizeList.length) * index}deg)`"
                    >
                      <div class="prize-name">
                        {{ item.name }}
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </a-col>
            <a-col :span="12">
              <div v-if="selectedJudge" class="result-label">
                <h2 style="text-align: left;">Selected Judge:</h2>
                <strong><h2 style="text-align: left;">{{ selectedJudge }}</h2></strong>
              </div>
            </a-col>
        </a-row>
        <a-row style="margin-top: 350px;">
            <a-col :span="5">
                <a-button :disabled="spinning" type="primary" style="width: 200px;" @click="onClickRotate">Spin</a-button>
            </a-col>
            <a-col :span="5">
                <a-button :disabled="spinning" type="primary" style="width: 200px;" @click="resetWheel">Reset</a-button>
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
        judges: ["Judge 1", "Judge 2", "Judge 3", "Judge 4", "Judge 5", "Judge 6", "Judge 7"], // Add your judge names here
        selectedSection: [],
        sectionColors: [],
        freeze: false,
        rolling: false,
        wheelDeg: 0,
        prizeNumber: 24,
        prizeListOrigin: [
            {
            icon: "https://picsum.photos/40?random=1",
            name: "Hassan Askari"
            },
            {
            icon: "https://picsum.photos/40?random=2",
            name: "Raja Sharif"
            },
            {
            icon: "https://picsum.photos/40?random=3",
            name: "Fahad Abdullah"
            },
            {
            icon: "https://picsum.photos/40?random=4",
            name: "Zulqrnain Ali"
            },
            {
            icon: "https://picsum.photos/40?random=5",
            name: "Kashif"
            },
            {
            icon: "https://picsum.photos/40?random=6",
            name: "Sadia"
            },
            {
            icon: "https://picsum.photos/40?random=7",
            name: "Sadaan"
            },
            {
            icon: "https://picsum.photos/40?random=8",
            name: "Jahanzaib"
            },
            {
            icon: "https://picsum.photos/40?random=9",
            name: "Hassans"
            },
            {
            icon: "https://picsum.photos/40?random=10",
            name: "Rajas"
            },
            {
            icon: "https://picsum.photos/40?random=11",
            name: "Fahads"
            },
            {
            icon: "https://picsum.photos/40?random=12",
            name: "Zulqrnains"
            },
            {
            icon: "https://picsum.photos/40?random=13",
            name: "Kashifs"
            },
            {
            icon: "https://picsum.photos/40?random=14",
            name: "Sadias"
            },
            {
            icon: "https://picsum.photos/40?random=15",
            name: "Sadaans"
            },
            {
            icon: "https://picsum.photos/40?random=16",
            name: "Jahanzaibs"
            },
            {
            icon: "https://picsum.photos/40?random=17",
            name: "Hassans"
            },
            {
            icon: "https://picsum.photos/40?random=18",
            name: "Rajas"
            },
            {
            icon: "https://picsum.photos/40?random=19",
            name: "Fahads"
            },
            {
            icon: "https://picsum.photos/40?random=20",
            name: "Zulqrnains"
            },
            {
            icon: "https://picsum.photos/40?random=21",
            name: "Kashifs"
            },
            {
            icon: "https://picsum.photos/40?random=22",
            name: "Sadias"
            },
            {
            icon: "https://picsum.photos/40?random=23",
            name: "Sadaans"
            },
            {
            icon: "https://picsum.photos/40?random=24",
            name: "Jahanzaibs"
            }
        ]
      };
    },
    computed: {
      gradientStyle() {
        const stops = this.sectionColors
          .map((color, index) => `${color} ${(index / this.judges.length) * 100}%`)
          .join(', ');
        return `conic-gradient(${stops})`;
      },
      prizeList() {
        return this.prizeListOrigin.slice(0, this.prizeNumber);
      }
    },
    methods: {
      spinWheel() {
        if (this.spinning) return;

        this.spinning = true;
        const randomRotation = Math.floor(Math.random() * 360);
        this.rotation += 360 * 5 + randomRotation;

        // Simulate an asynchronous action (e.g., API call) that takes time
        setTimeout(() => {
          const selectedIndex = Math.floor(this.rotation / (360 / this.judges.length)) % this.judges.length;
          this.selectedJudge = this.judges[selectedIndex];
          this.spinning = false;
        }, 3000); // Adjust the duration as needed
      },
      resetWheel() {
        this.selectedJudge = null;
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
      onClickRotate() {
        if (this.rolling) {
            return;
        }
        const result = Math.floor(Math.random() * this.prizeList.length);
        this.roll(result);
        },
        roll(result) {
        this.rolling = true;
        const { wheelDeg, prizeList } = this;
        this.wheelDeg =
            wheelDeg -
            wheelDeg % 360 +
            6 * 360 +
            (360 - 360 / prizeList.length * result);
        setTimeout(() => {
            this.rolling = false;
            alert("Result：" + prizeList[result].name);
        }, 4500);
      }
    },
    created() {
      // Initialize sectionColors with dynamic colors
      this.sectionColors = Array.from({ length: this.judges.length }, () => this.generateRandomColor());
    },
    watch: {
      judges(newJudges) {
        // Re-initialize sectionColors when judges change
        this.sectionColors = Array.from({ length: newJudges.length }, () => this.generateRandomColor());
      },
      prizeNumber() {
        this.freeze = true;
        this.wheelDeg = 0;

        setTimeout(() => {
            this.freeze = false;
        }, 0);
      }
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

html {
  background: #dd7c7d;
}

.wheel-wrapper {
  width: 600px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
}

.wheel-pointer {
  width: 80px;
  height: 80px;
  border-radius: 1000px;
  background: yellow;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 60px;
  z-index: 10;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    top: -32px;
    left: 50%;
    border-width: 0 8px 40px;
    border-style: solid;
    border-color: transparent transparent yellow;
    transform: translateX(-50%);
  }
}
.wheel-bg {
  width: 100%;
  height: 100%;
  border-radius: 1000px;
  overflow: hidden;
  transition: transform 4s ease-in-out;
  background: #7eef97;

  &.freeze {
    transition: none;
    background: red;
  }
}

.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}

.prize-item-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 300px;
}

.prize-item {
  width: 100%;
  height: 100%;
  transform-origin: bottom;

  .prize-name {
    padding: 45px 15px 20px 25px;
    transform: rotate(-72deg) translate(220, 0);
    text-anchor: end;
    width: 10px;
  }

  .prize-icon {
    padding-left: 1px;
  }
}
</style>
