<script setup>
import { ref, onMounted } from 'vue'
import ProjectServices from '~/services/API/ProjectServices'

const transcript = ref('')
const isRecording = ref(false)

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const sr = new Recognition()

onMounted(() => {
	sr.continuous = true
	sr.interimResults = true

	sr.onstart = () => {
		alert("as")
		console.log('SR Started')
		isRecording.value = true
	}

	sr.onend = () => {
		console.log('SR Stopped')
		isRecording.value = false
	}

	sr.onresult = (evt) => {
		for (let i = 0; i < evt.results.length; i++) {
			const result = evt.results[i]

			if (result.isFinal) CheckForCommand(result)
		}

		const t = Array.from(evt.results)
			.map(result => result[0])
			.map(result => result.transcript)
			.join('')
		
		transcript.value = t
	}
})
function getProducts()
{
    alert("function")
    ProjectServices.get().then((response=>{
        transcript.value=JSON.stringify(response.data)
        this.dataSource=response.data
        console.log(response.data)
    }))
}
const CheckForCommand = (result) => {
	const t = result[0].transcript;
	if (t.includes('all projects') || t.includes('yes') || t.includes('screening')) {
        alert("re")
        getProducts()
		sr.stop()
	} else if (
		t.includes('what is the time') ||
		t.includes('what\'s the time')
	) {
		sr.stop()
		alert(new Date().toLocaleTimeString())
		// setTimeout(() => sr.start(), 10000)
	}
}

const  ToggleMic = () => {
	if (isRecording.value) {
		sr.stop()
	} else {
		sr.start()
	}
}
</script>
<script>

export default {
    data(){
        return{
        datasource:[],
      columns: [
        {
          title: 'Project ID',
          key: 'id',
          scopedSlots: { customRender: 'projectId' },
        },
        {
          title: 'Project Name',
          key: 'description',
          scopedSlots: { customRender: 'projectName' },
        },
        {
          title:'Date',
          dataIndex: 'projectDate',
          key: 'projectDate',
        }
      ],
        }
    }
}
</script>

<template>
	<div class="app">
		<button :class="`mic`" @click="ToggleMic">Record</button>
		<div class="transcript" v-text="transcript"></div>
        <div slot="content">
      <a-table
        :columns="columns"
        :data-source="datasource"
        :loading="loading"
        class="rounded-table pt-10 users-list"
        :pagination="{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50', '100'],
        }"
      >
     
      <!-- <template slot="projectConsent" v-if="isNurse" slot-scope="projectConsent">
        <span style="float: left;" v-for="projectConsen,index in projectConsent.projectConsent" :key="index+'pCo'">
         <div v-if="isNurse">
          <a-button v-if="projectConsen.consentStatusName==='Accepted'"   :style="{ backgroundColor: projectConsen.color , color:'white' , height:'30px',border:'none' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button>
         <a-button v-else @click="goto('/consent/editconsent?id='+projectConsen.consentGuid+'&pId='+projectConsent.globalId)"  :style="{ backgroundColor: projectConsen.color , color:'black' , height:'30px',border:'none' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button>
        </div>
        <div v-if="isAdmin">
          <a-button v-if="projectConsen.consentStatusName==='Pending'"  @click="goto('/consent/consentApproval?id='+projectConsen.consentGuid+'&pId='+projectConsent.id+'&pCSId='+projectConsen.consentStatusGuid)" :style="{ backgroundColor: projectConsen.color , color:'black' , height:'30px',border:'none' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button>
         <a-button v-else :style="{ backgroundColor: 'white' , color:'black' , height:'30px','border-color':'#f1f1f1' , 'margin-top':'2px'}">{{projectConsen.consentName + " "}}</a-button>
        </div>
        </span>
      </template> -->
        
      </a-table>
    </div>
	</div>
    
</template>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

body {
	background: #281936;
	color: #0b0b0b;
}
</style>
