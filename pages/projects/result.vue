<template>
    <PageLayout
    :create="false"
    :back="false"
    >
    
    <div slot="content">
        <center>
            <a-row>
                <!-- <iframe width="100%" height="900" :src="getImageUrl(filePath)"></iframe> -->
                <img :src="getImageUrl('images/result.PNG')" alt="Excel Preview" />
            </a-row>
            <a-row class="mt-10">
                <a-col :span="12" >
                    <a-button type="primary" class="wd-16 float-right mr-10">
                        <a :href="this.getImageUrl(filePath)" target="_blank">Download</a>
                    </a-button>
                    
                </a-col>
                <a-col :span="12">
                    <a-button type="primary" class="wd-16 float-left ml-10" @click="goto('/projects')">
                    See SOPs    
                    </a-button>
                </a-col>
            </a-row>
        </center>
    </div>
    </PageLayout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout.vue'
import SOPResultServices from '~/services/API/SOPResultServices'
import imagesHelper from '~/mixins/images-helper'
import routeHelpers from '~/mixins/route-helpers'
export default{
    components:{PageLayout},
    mixins:[imagesHelper,routeHelpers],
    data(){
        return{
            filePath: '',
            fileName: '',
            excelPreview: ''
        }
    },
    mounted(){
        const id = this.$route.query.id
        this.get(id)
    },
    methods:{
         get(id){
            SOPResultServices.getById(id).then((resp)=>{
                this.filePath = resp.data.filePath.split('"').join('')
                this.fileName = resp.data.fileName
            })
        },
        downloadFile() {
            const response = this.$http.get(this.filePath, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = this.fileName;
      link.click();
            },
    },
}
</script>