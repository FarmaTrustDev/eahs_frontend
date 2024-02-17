<template>
    <PageLayout
    title="My Institutions"
    :create="false"
    :back="false"
    >
    <div slot="content">
        <a-col :offset="18">
                <a-input
                          ref="userNameInput"
                          class="page-search-input wd-100"
                          placeholder="Search Institute"
                          @keyup="search"
                          >
                      <a-icon slot="prefix" type="search" />
                      </a-input>
              </a-col>
        <a-table
        :columns="columns"
        :data-source="data"
        :loading="loading"
        class="rounded-table pt-10 users-list"
        >
        <template slot="action" slot-scope="text, record">
            <a-button class="bg-pink" @click="optOut(record.institutionName, record.country)">
                Opt out
            </a-button>
        </template>
        </a-table>
    </div>
    </PageLayout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import imagesHelper from '~/mixins/images-helper';
import PatientServices from '~/services/API/PatientServices'
import { success } from '~/services/Helpers/notifications'
import { isEmpty } from '~/services/Utilities';
export default({
    components:{PageLayout},
    mixins:[imagesHelper],
    data(){
        return{
            loading:false,
            columns:[
                {
                    title: 'Institution Name',
                    dataIndex: 'institutionName',
                    key: 'institutionName',
                },
                {
                    title: 'Location',
                    dataIndex: 'country',
                    key: 'country',
                },
                {
                    title: 'Trial Type',
                    dataIndex: 'trial',
                    key: 'trial',
                },
                {
                    title: 'Status',
                    dataIndex: 'action',
                    scopedSlots : {customRender : 'action'},
                }
            ],
            data:[],
            email: ''
        }
    },
    mounted(){
        const data = JSON.parse(localStorage.getItem('vuex'))
        this.email = data.auth.user.email
        this.getInstitutes(data.auth.user.email)
    },
    methods:{
        getInstitutes(email){
            this.loading = true
            PatientServices.getDonorInstitutions({ Email: email }).then((response)=>{
              this.data =  response.data
              this.loading = false  
            })
        },
        optOut(instituteName, country){
            this.loading = true
            // const data = JSON.parse(localStorage.getItem('vuex'))
            // const mail = data.auth.user.email
            const data = JSON.parse(
                JSON.stringify(
                    {
                        Institute:instituteName, 
                        Email: this.email,
                        Country: country
                    }
                )
            )
            PatientServices.optOutFromCountry(data).then((response)=>{
                success(this, { message: response.data })
                this.getInstitutes(this.email)
            }).finally(this.loading = false)
        },
        search(event){
            const data = event.target.value
            if(!isEmpty(data)){
                this.loading = true
                PatientServices.searchInstitutions({Email:this.email,Search: data}).then((response)=>{
                    this.data = response.data
                }).finally(()=>{this.loading = false})
            }else{this.getInstitutes(this.email)}
        }
    }
})
</script>