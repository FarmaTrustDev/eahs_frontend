<template>
    <div>
        <a-row>
            <a-col :span="3"></a-col>
            <a-col :span="7">
                <img src='~/assets/logo/ad_logo.png' style="height: 160px; width: 70%; margin-left: 25px; border: none;"/>
            </a-col>
            <a-col :span="4">
                <img src='~/assets/logo/hs_logo.png' style="height: 160px; width: 75%;"/>
            </a-col>
            <a-col :span="6">
                <img src='~/assets/logo/cat.png' style="height: 160px; width: 70%; border: none;"/>
                
            </a-col>
            <a-col :span="4"></a-col>
        </a-row>
        <a-row style="margin-top:50px">
            <a-col :span="14">
                <div id="chart"></div>
                <a-button :disabled="spinning" type="primary" style="width: 500px; margin-top: 620px; margin-left: 25px;" @click="resetWheel()">Reset</a-button>
                <a-col :span="17" style="text-align: center; margin-top: 5px; font-size: 20px; font-weight: bold;">{{ error }}</a-col>
            </a-col>
            <a-col :span="10" style="padding-top: 20px;">
                <a-row v-for="(se,index) in selectedSection" :key="index" style="margin-top: 20px;">
                    <a-col :span="2" style="font-size: 30px; display: flex; align-items: center;">{{ index+1 }}</a-col>
                    <a-col :span="3" style="padding-top: 7px;"><img :src="`${se.countryFlag}`" width="40" height="30"></a-col>
                    <a-col :span="16" style="font-size: 30px;">{{ se.judgeName }}</a-col>
                </a-row>
            </a-col>
        </a-row>
      <div id="question"><h1></h1></div>
    </div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  import JudgeServices from '~/services/API/JudgeServices'
  import RuleServices from '~/services/API/RuleServices'
  export default {
    data() {
        return {
            freeze: false,
            rolling: false,
            wheelDeg: 0,
            rulesData:[],
            prizeNumber: 8,
            oldpick:[],
            judgesData:[],
            error:'',
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
        self.fetch()
        self.populateList()
        let transitionStarted = false;
        let rotation = 0
        const padding = {top:20, right:40, bottom:0, left:0}
        const w = 600 - padding.left - padding.right
        const h = 600 - padding.top  - padding.bottom
        const r = Math.min(w, h)/2
        let perCount=false
        let member=false
        let conf=false
        // console.log(r)
        // var oldrotation
        let picked = 100000
        // self.oldpick = []
        // const color = d3.scale.category20(); // category20c()
        // const color = d3.scaleOrdinal().range(d3.schemeCategory20);
        const color = d3.scaleOrdinal()
        .range([
            "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
            "#8c564b", "#ff7f0e", "#2ca02c", "#d62728", "#17becf",
            "#8c564b", "#ff7f0e", "#2ca02c", "#d62728", "#17becf",
            "#8c564b", "#e377c2", "#2ca02c", "#d62728", "#17becf",
            "#8c564b", "#e377c2", "#2ca02c", "#d62728", "#17becf",
            "#8c564b", "#e377c2", "#2ca02c", "#d62728", "#17becf",
            // Add more colors as needed
        ]);
      /* let data = [
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
      ]; */
      // const data=self.judgesData
      // console.log(data)
      (async function(){
        await self.fetchRules();
        const rul=self.rulesData.data
        console.log(rul)
        if(rul[0].isIncluded===true){
            perCount=true
        }
        if(rul[1].isIncluded===true){
            conf=true
        }
        if(rul[2].isIncluded===true){
            member=true
        }
        // console.log(rul)
      
      let data;
      (async function() {
        try {
            await self.fetch();
            data = self.judgesData.data; // Assign value to the data variable
            // console.log(data);
            // Now you can use the 'data' variable here
            // Place the code that depends on 'data' here





            console.log(data)
      const svg = d3.select('#chart')
        .append("svg")
        .data([data])
        .attr("width",  w + padding.left + padding.right)
        .attr("height", h + padding.top + padding.bottom);
      const container = svg.append("g")
        .attr("class", "chartholder")
        .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
      const vis = container.append("g");
  
      const pie = d3.pie()
        .sort(null) // Disable sorting
        .value(() => 1); // Value accessor function
      const arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("g")
        .attr("class", "slice");
        arcs.append("path")
        .attr("fill", (d, i) => color(i))
        .attr("d", function(d) {
            return generateArcPath(d); // Assuming generateArcPath is a function that creates the arc path string
        });   
        
        arcs.append("text").attr("transform", function(d){
          d.innerRadius = 0;
          d.outerRadius = r;
          d.angle = (d.startAngle + d.endAngle)/2;
          return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
        })
        .attr("text-anchor", "end")
        .text( function(d, i) {
          return data[i].judgeName;
        })        
        .style("fill", "white");
        

      container.on("click", spin);
      function generateArcPath(d) {
        // Assuming d has properties like startAngle, endAngle, innerRadius, outerRadius
        const arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(r)
            .startAngle(d.startAngle)
            .endAngle(d.endAngle);

        return arcGenerator();
      }
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
            setTimeout(() => {
                self.generateList(data[picked], perCount, member, conf);
            }, 3000);

            // self.generateList(data[picked], perCount, member, conf)
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
                .attr("fill", "#fff");
            d3.select("#question h1")
                .text(data[picked].judgeName);
            });
            
            
        }
        container.on("click", spin);
      }
      // console.log(r)
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





        } catch (error) {
            console.error('Error fetching data:', error);
        }
        // Now you can use the 'data' variable here
      })();
      
    })();


    },
    methods: {
        resetWheel()
        {
            this.selectedSection = []
            this.oldpick= []
            localStorage.setItem("selectedSection", JSON.stringify([]))
            this.error=''
        },
        generateList(data, pC, me, conf){
            this.error=''
            console.log(data)
            if(conf===false){
                if(me===false){
                    if(pC===false){
                        const record = this.selectedSection?.find(entry => entry.id === data.id);
                        if(record===false || record===undefined){
                            this.selectedSection.push(data)
                            localStorage.setItem("selectedSection", JSON.stringify(this.selectedSection))
                        }
                        // this.selectedSection.push(data)
                    }else{
                        const record = this.selectedSection?.find(entry => entry.countryName === data.countryName);
                        if(record===false || record===undefined){
                            this.selectedSection.push(data)
                            localStorage.setItem("selectedSection", JSON.stringify(this.selectedSection))
                        }else{
                            // alert(data.countryName + ' already exists')
                            this.error=data.countryName + ' already exists'
                        }
                    }
                }else{
                    console.log('Entring to check member & per country rule')
                    if(!data.isMember){
                        if(!pC){
                            const record = this.selectedSection?.find(entry => entry.id === data.id);
                            if(record===false || record===undefined){
                                this.selectedSection.push(data)
                                localStorage.setItem("selectedSection", JSON.stringify(this.selectedSection))
                            }
                            // this.selectedSection.push(data)
                        }else{
                            const record = this.selectedSection?.find(entry => entry.countryName === data.countryName);
                            if(record===false || record===undefined){
                                this.selectedSection.push(data)
                                localStorage.setItem("selectedSection", JSON.stringify(this.selectedSection))
                            }else{
                                // alert(data.countryName + ' already exists')
                                this.error=data.countryName + ' already exists'
                            }
                        }
                    }else{
                        // const record = this.selectedSection?.find(entry => entry.isMember===true);
                        const numRecord=this.selectedSection?.filter(entry=>entry.isMember===true).length
                        // if(record===false || record===undefined){
                        if(numRecord<2){
                            if(!pC){
                                this.selectedSection.push(data)
                                localStorage.setItem("selectedSection", JSON.stringify(this.selectedSection))
                            }else{
                                const records = this.selectedSection?.find(entry => entry.countryName === data.countryName);
                                if(!records || records===undefined){
                                    this.selectedSection.push(data)
                                    localStorage.setItem("selectedSection", JSON.stringify(this.selectedSection))
                                }else{
                                    // alert(data.countryName + ' already exists')
                                    this.error=data.countryName + ' already exists'
                                }
                            }
                        }else{
                            this.error='EAHS member rule applied'
                        }
                    }
                }
                
            }else{
                console.log('Entring to check per conflict rule')
                if(!data.isConflict){
                    if(!me){
                        if(!pC){
                            // this.selectedSection.push(data)
                            const record = this.selectedSection?.find(entry => entry.id === data.id);
                            if(record===false || record===undefined){
                                this.selectedSection.push(data)
                                localStorage.setItem("selectedSection", JSON.stringify(this.selectedSection))
                            }
                        }else{
                            const record = this.selectedSection?.find(entry => entry.countryName === data.countryName);
                            if(record===false || record===undefined){
                                this.selectedSection.push(data)
                                localStorage.setItem("selectedSection", JSON.stringify(this.selectedSection))
                            }else{
                                // alert(data.countryName + ' already exists')
                                this.error=data.countryName + ' already exists'
                            }
                        }
                    }else{
                        console.log('Entring to check member rule')
                        if(!data.isMember){
                            console.log('Entring to check member and country')
                            if(!pC){
                                const record = this.selectedSection?.find(entry => entry.id === data.id);
                                if(record===false || record===undefined){
                                    this.selectedSection.push(data)
                                    localStorage.setItem("selectedSection", JSON.stringify(this.selectedSection))
                                }    
                            }else{
                                const records = this.selectedSection?.find(entry => entry.countryName === data.countryName);
                                // alert(records)
                                if(records===false || records===undefined){
                                    const record = this.selectedSection?.find(entry => entry.id === data.id);
                                    if(!record || record===undefined){
                                        this.selectedSection.push(data)
                                        localStorage.setItem("selectedSection", JSON.stringify(this.selectedSection))
                                    }
                                }else{
                                    // alert(data.countryName + ' already exists')
                                    this.error=data.countryName + ' already exists'
                                }
                            }
                            // this.selectedSection.push(data)
                        }else{
                            console.log('Entring to check member and country')
                            const numRecord=this.selectedSection?.filter(entry=>entry.isMember===true).length
                            if(numRecord<2){
                                if(!pC){
                                    const record = this.selectedSection?.find(entry => entry.id === data.id);
                                    if(record===false || record===undefined){
                                        this.selectedSection.push(data)
                                        localStorage.setItem("selectedSection", JSON.stringify(this.selectedSection))
                                    }    
                                }else{
                                    const records = this.selectedSection?.find(entry => entry.countryName === data.countryName);
                                    if(records===false || records===undefined){
                                        const record = this.selectedSection?.find(entry => entry.id === data.id);
                                        if(!record || record===undefined){
                                            this.selectedSection.push(data)
                                            localStorage.setItem("selectedSection", JSON.stringify(this.selectedSection))
                                        }
                                    }else{
                                        // alert(data.countryName + ' already exists')
                                        this.error=data.countryName + ' already exists'
                                    }
                                }
                            }else{
                                this.error='EAHS member rule applied'
                            }
                        }
                    }
                }else{
                    this.error='Conflict of interest rule applied'
                }
            }
        },
        /* fetch(){
            JudgeServices.get().then((response)=>{
                this.judgesData=response
                // console.log(this.judgesData.data)
            })
        } */
        populateList(){
            this.selectedSection=JSON.parse(localStorage.getItem('selectedSection'))
            console.log(JSON.parse(localStorage.getItem('selectedSection')))
        },
        fetch() {
            this.populateList()
            // this.selectedSection=
            return JudgeServices.getSpinJudges().then((response) => {
                this.judgesData = response;
                // console.log(this.judgesData.data)
            });
        },
        fetchRules() {
            return RuleServices.get().then((response) => {
                this.rulesData = response;
                // console.log(this.judgesData.data)
            });
        },
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
    width:600px;
    height:600px;
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