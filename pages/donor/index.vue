 <template>
    <page-layout
      :loading="false"
      :create="false"
      :back="false"
      class="container"
    >
    <div slot="content">
         <a-tabs :animated="false" class="logistic_tabs rounded-table">
              <a-tab-pane key="1" tab="Donor">
                <Donor />
              </a-tab-pane>
              <a-tab-pane key="2" tab="Patient">
                <Patient />
              </a-tab-pane>
            </a-tabs>
          
      </div>
      <!-- <div slot="content" style="margin-top: -60px;">
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
        <template slot="donorName" slot-scope="text,record">
          <div class="ant-col ant-col-8">
            <a-avatar :src="record.donarImage" :size="80" />
          </div>
          <div class="ant-col ant-col-12 mt-10">
            <span >
                {{ record.donorName }}
            </span><br>
            <span>
                {{ record.age }}
            </span><br>
            <span>
                {{ record.nationality }}
            </span>
          </div>
        </template>  
        <template slot="quantity" slot-scope="text,record">
          <span v-for="recQuan in record.quantity" :key="recQuan">
              {{ recQuan}} vials<br>
          </span>
        </template>  
        <template slot="sample" slot-scope="text,record">
          <span v-for="recSample in record.sample" :key="recSample.id">
              {{ recSample.sampleId }}<br>
          </span>
        </template>  
      <template slot="study" slot-scope="text,record">
          
          <span v-for="rec in record.study" :key="rec.id">
              {{ rec.studyName }}<br>
          </span>
        </template>  
      </a-table>
      </div> -->
    </page-layout>
  </template>
  <script>

  
  // import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import Patient from '~/pages/patient/detail'
  import Donor from '~/pages/donor/detail'

  export default {
    components: { PageLayout,Patient,Donor},
    data() {
      return {
        projects:[],
        loading:false,
        isCreated:false,
        // columns: [
        //   {
        //     title: 'Donor Details',
        //     key: 'donorName',
        //     scopedSlots: { customRender: 'donorName' },
        //   },
        //   {
        //     title: 'Sample ID',
        //     scopedSlots: { customRender: 'sample' },
        //     key: 'sample',
        //   },
        //   {
        //     title:'Type of Sample',
        //     dataIndex: 'type',
        //     key: 'type',
        //   },
        //   {
        //     title: 'Quantity',
        //     dataIndex: 'quantity',
        //     key: 'quantity',
        //   },
        //   {
        //     title: 'Studies/Experiment',
        //     key: 'study',
        //     scopedSlots: { customRender: 'study' },
        //   },
        // ],
        datasource:[],
        countries:[],
        visible:false,
        form: this.$form.createForm(this, {
            name: 'login',
            entityId: null,
            }),
      }
    },
    computed: {
    },
    mounted() {
      // this.getDonors()
      // this.getAllCountries()
    },
    methods: {
      // disabledDate: _disabledFutureDate,
    //   onSubmit(e) {
    //     this.loading = true
    //     e.preventDefault()
    //     this.form.validateFields((err, values) => {
    //       if(!err){
    //     this.loading = true
    //     PatientServices
    //       .create(values)
    //       .then((response) => {
    //         this.success(response.message)
    //       })
    //       .catch(this.error)
    //       .finally(() => {
    //         this.loading = false
    //         this.visible(false)
    //       })
    //       }
         
    //     })
    // },
    showModal(e){
      this.visible=e
    },
      // preventDefault,
    //   getAllCountries()
    // {
    //   CountryServices.getAllCountries().then((response)=>{
    //     this.countries= response.data
    //   })
    // },
      // getDonors()
      // {
      //   PatientServices.getDonors().then((response)=>{
      //     this.datasource = response.data
      //     console.log(response.data)
      //   })
      // }
    },
  }
  </script>