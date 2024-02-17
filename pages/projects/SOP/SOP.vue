<template>
    <PageLayout
    :create="false"
    :back="false"
    >
    
    <div slot="content">
        <center>
            <a-row> 
                <iframe width="100%" height="900" :src="getImageUrl(imagePath)"></iframe>
            <!-- <img :src="getImageUrl('/images/process.PNG')" /> -->
            </a-row>
            <a-row class="mt-10">
                <a-col :span="12" >
                    <a-button type="primary" class="wd-16 float-right mr-10" >
                        <a :href="getImageUrl(imagePath)" download>Download</a>
                    </a-button>
                </a-col>
                <a-col :span="12">
                    <a-button type="primary" class="wd-16 float-left ml-10" @click="goto('/projects/results?Id='+ SOPId)">
                        See Results    
                    </a-button>
                </a-col>
            </a-row>
        </center>
    </div>
    </PageLayout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout.vue'
import SOPServices from '~/services/API/SOPServices'
import imagesHelper from '~/mixins/images-helper'
import routeHelpers from '~/mixins/route-helpers'
export default{
    components:{PageLayout},
    mixins:[imagesHelper,routeHelpers],
    data(){
        return{
            imagePath: '',
            imageName: '',
            SOPId: ''
        }
    },
    mounted(){
        const id = this.$route.query.Id
        this.getById(id)
    },
    methods:{
        getById(id){
            SOPServices.getById(id).then((response)=>{
                this.imagePath = response.data.filePath.split('"').join('')
                this.imageName = response.data.fileName
                this.SOPId = response.data.sopId
            }).catch(this.error)
        },
        downloadFile() {
            const link = document.createElement("a");
            link.href = this.imagePath;
            link.target = "_blank";
            link.download = this.imageName; // Specify the desired file name

            // Append the anchor element to the DOM
            document.body.appendChild(link);

            // Programmatically trigger a click event on the anchor element
            link.click();

            // Clean up the temporary anchor element
            document.body.removeChild(link);
            },      
    },
}
</script>