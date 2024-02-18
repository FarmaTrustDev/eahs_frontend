<template>
    <div>
        <a-row>
            <a-col :span="12">
                <img src='~/assets/logo/ad_logo.png' style="height: 220px; width: 65%; margin-left: 25px; border: none;"/>
            </a-col>
            <a-col :span="12">
                <img src='~/assets/logo/hs_logo.png' style="height: 220px; width: 65%;"/>
            </a-col>
        </a-row>
        <a-row style="margin-top:50px">
            <a-col :span="12">
                <div id="chart"></div>
                <a-button :disabled="spinning" type="primary" style="width: 350px; margin-top: 520px; margin-left: 50px;" @click="resetWheel()">Reset</a-button>
            </a-col>
            <a-col :span="12">
                <div v-for="(se,index) in selectedSection" :key="index">
                    <strong><h2>{{ se.question }}</h2></strong>
                </div>
            </a-col>
        </a-row>
        <a-row style="margin-top: 550px;">
            <a-col :span="12">
                
            </a-col>
            <a-col :span="12">
                
            </a-col>
        </a-row>
      <div id="question"><h1></h1></div>
    </div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  
  export default {
    data() {
        return {
            freeze: false,
            rolling: false,
            wheelDeg: 0,
            prizeNumber: 8,
            oldpick:[],
            prizeListOrigin: [
                {
                icon: "https://picsum.photos/40?random=1",
                name: "Hassan"
                },
                {
                icon: "https://picsum.photos/40?random=2",
                name: "Raja"
                },
                {
                icon: "https://picsum.photos/40?random=3",
                name: "Fahad"
                },
                {
                icon: "https://picsum.photos/40?random=4",
                name: "Zulqrnain"
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
                }
            ],
            selectedSection: [],
        }
    },
    mounted() {
        const self = this;
        let transitionStarted = false;
        let rotation = 0
        const padding = {top:20, right:40, bottom:0, left:0}
        const w = 500 - padding.left - padding.right
        const h = 500 - padding.top  - padding.bottom
        const r = Math.min(w, h)/2
        console.log(r)
        // var oldrotation
        let picked = 100000
        // self.oldpick = []
        // const color = d3.scale.category20(); // category20c()
        // const color = d3.scaleOrdinal().range(d3.schemeCategory20);
        const color = d3.scaleOrdinal()
        .range([
            "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
            "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf",
            // Add more colors as needed
        ]);
      const data = [
        {"label":"Dell LAPTOP",  "value":1,  "question":"What CSS property is used for specifying the area between the content and its border?"}, // padding
        {"label":"IMAC PRO",  "value":2,  "question":"What CSS property is used for changing the font?"}, // font-family
        {"label":"SUZUKI",  "value":3,  "question":"What CSS property is used for changing the color of text?"}, // color
        {"label":"HONDA",  "value":4,  "question":"What CSS property is used for changing the boldness of text?"}, // font-weight
        {"label":"FERRARI",  "value":5,  "question":"What CSS property is used for changing the size of text?"}, // font-size
        {"label":"APARTMENT",  "value":6,  "question":"What CSS property is used for changing the background color of a box?"}, // background-color
        {"label":"IPAD PRO",  "value":7,  "question":"Which word is used for specifying an HTML tag that is inside another tag?"}, // nesting
        {"label":"LAND",  "value":8,  "question":"Which side of the box is the third number in: margin:1px 1px 1px 1px; ?"}, // bottom
        {"label":"MOTOROLLA",  "value":9,  "question":"What are the fonts that don't have serifs at the ends of letters called?"}, // sans-serif
        {"label":"BMW", "value":10, "question":"With CSS selectors, what character prefix should one use to specify a class?"}
      ];
  
      const svg = d3.select('#chart')
        .append("svg")
        .data([data])
        .attr("width",  w + padding.left + padding.right)
        .attr("height", h + padding.top + padding.bottom);
      const container = svg.append("g")
        .attr("class", "chartholder")
        .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
      const vis = container.append("g");
  
      // const pie = d3.layout.pie().sort(null).value(function(d){return 1;});
      const pie = d3.pie()
        .sort(null) // Disable sorting
        .value(() => 1); // Value accessor function
      // const arc = d3.svg.arc().outerRadius(r);
      const arc = d3.arc().outerRadius(r);
      const arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("g")
        .attr("class", "slice");
  
        arcs.append("path")
    .attr("fill", (d, i) => color(i))
    .attr("d", arc); // Use the arc function to generate path
  
      arcs.append("text").attr("transform", function(d){
          d.innerRadius = 0;
          d.outerRadius = r;
          d.angle = (d.startAngle + d.endAngle)/2;
          return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
        })
        .attr("text-anchor", "end")
        .text( function(d, i) {
          return data[i].label;
        });
  
      container.on("click", spin);
  
      function spin(d){
        if(self.oldpick.length === data.length){
            self.oldpick=[]
            // container.on("click", null);
          // return;
        }
  
        const  ps       = 360/data.length
          // const pieslice = Math.round(1440/data.length)
          const rng      = Math.floor((Math.random() * 1440) + 360);
  
        rotation = (Math.round(rng / ps) * ps);
  
        picked = Math.round(data.length - (rotation % 360)/ps);
        picked = picked >= data.length ? (picked % data.length) : picked;
  
        if (self.oldpick.includes(picked)) {
            d3.select(this).call(spin);
            return;
        } else {
            self.oldpick.push(picked);
        }
        rotation += 90 - Math.round(ps/2);
        if (!transitionStarted) {
            self.generateList(data[picked])
            vis.transition()
            .duration(3000)
            .attrTween("transform", function() {
            return rotTween(rotation);
            })
            .each("start", function(){
            transitionStarted = true;
            })
            .each("end", function(){
            d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                .attr("fill", "#111");
            d3.select("#question h1")
                .text(data[picked].question);
            });
            
            
        }
        container.on("click", spin);
      }
      console.log(r)
      svg.append("g")
        .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
        .append("path")
        .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
        .style({"fill":"black"});
      
      container.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 60)
        .style({"fill":"white","cursor":"pointer"});
  
      container.append("text")
        .attr("x", 0)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .text("SPIN")
        .style("font-weight", "bold")
        .style("font-size", "30px")
        .style("fill", "white");
    

        
    },
    methods: {
        resetWheel()
        {
            this.selectedSection = []
            this.oldpick= []
        },
        generateList(data){
            this.selectedSection.push(data)
        }
    },
    
  }
  
  function rotTween(rotation) {
    const i = d3.interpolate(0, rotation);
    return function(t) {
      return "rotate(" + i(t) + ")";
    };
  }
  </script>
  
  <style scoped>
  text{
    font-family:Helvetica, Arial, sans-serif;
    font-size:11px;
    pointer-events:none;
  }
  
  #chart{
    position:absolute;
    width:500px;
    height:500px;
    top:0;
    left:0;
  }
  
  #question{
    position: absolute;
    width:400px;
    height:500px;
    top:0;
    left:520px;
  }
  
  #question h1{
    font-size: 50px;
    font-weight: bold;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    position: absolute;
    padding: 0;
    margin: 0;
    top:50%;
    -webkit-transform:translate(0,-50%);
    transform:translate(0,-50%);
  }
  </style>