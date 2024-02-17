<template>
  <div>
    <a-row>
      
      <a-col :span="12">
        <a-form-item
          :label="translation.EquipName_2_553+':*'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: entity.name,
                rules: [
                  {
                    required: true,
                    message: translation.EquipName_2_553,
                  },
                ],
              },
            ]"
            :disabled="isCreated"
            :placeholder="translation.EquipName_2_553"
          /> 
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.EquipType_2_552+':*'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-select
            v-decorator="[
              'fridgeTypeId',
              {
                  initialValue: entity.fridgeTypeId,
                  rules: [
                    {
                      required: true,
                      message: translation.EquipName_2_553,
                    },
                  ],
              }
            ]"
            :show-search="true"
            :filter-option="filterOption"
            placeholder="Fridge Type"
            style="width: 100%"
            size="large"
            class="default-select"
          >
          <a-select-option v-for="fridgeType in fridgeTypes" :key="fridgeType.id">
              {{ fridgeType.name }}
          </a-select-option>
          </a-select>        
        </a-form-item>
      </a-col>
      <!-- <a-col :span="12">
        <a-form-item
          label="No of Shelves:*"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'noOfShelves',
              {
                initialValue: entity.noOfShelves,
                rules: [
                  {
                    required: true,
                    message: 'Shelves',
                  },
                ],
              },
            ]"
            :disabled="isCreated"
            placeholder="No Of Shelves"
          /> 
        </a-form-item>
      </a-col> -->
      <a-col :span="12">
        <a-form-item
          :label="translation.Lab_1_566+':*'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-select
            v-decorator="[
              'labId',
              {
                
                  initialValue: entity.labId,
                  rules: [
                    {
                      required: true,
                      message: translation.EquipName_2_553,
                    },
                  ],
              }
            ]"
            :show-search="true"
            :filter-option="filterOption"
            placeholder="Labs"
            style="width: 100%"
            size="large"
            class="default-select"
            @change="selectSite"
          >
          <a-select-option v-for="lab in labs" :key="lab.id">
              {{ lab.name }}
          </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>      
      <a-col :span="12">
        <a-form-item
          label="Site:*"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-select
            v-decorator="[
              'siteId',
              {
                  initialValue: entity.siteId,
                  rules: [
                    {
                      required: true,
                      message: 'Site',
                    },
                  ],
              }
            ]"
            :show-search="true"
            :filter-option="filterOption"
            placeholder="Sites"
            style="width: 100%"
            size="large"
            class="default-select"
            @change="selectZone"
          >
            <a-select-option v-for="site in sites" :key="site.id">
              {{ site.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.LabZone_2_554+':*'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-select
            v-decorator="[
              'siteZoneId',
              {
                  initialValue: entity.siteZoneId,
                  rules: [
                    {
                      required: true,
                      message: 'Zone',
                    },
                  ],
              }
            ]"
            :show-search="true"
            :filter-option="filterOption"
            placeholder="Zones"
            style="width: 100%"
            size="large"
            class="default-select"
          >
            <a-select-option v-for="zone in zones" :key="zone.id">
              {{ zone.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      
      <a-col :span="24">      
      <a-form-item
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 22 }"
        style="padding-top:30px"    
      >
        <FormActionButton
          :is-created="isCreated"
          :loading="loading"
          :custom-text="translation['Save&_3_453']"
        />
      </a-form-item>
      </a-col>      
    </a-row>
  </div>
</template>

<script>
import { _disabledFutureDate } from '~/services/Helpers/MomentHelpers'
import { filterOption, isEmpty } from '~/services/Helpers'
import LabServices from '~/services/API/LabServices'
import SiteServices from '~/services/API/SiteServices'
import ZoneServices from '~/services/API/ZoneServices'
import FridgeServices from '~/services/API/FridgeServices'

export default {
  props: {
    isCreated: {
      type: Boolean,
      default: false,
    },
    entity: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      entityId: null,
      loading: false,
      countries: [],
      labs:[],
      sites:[],
      zones:[],
      roles: [],
      formLayout: 'vertical',
      newSelected: false,
      labId:null,
      siteId:null,
      zoneId:null,
      fecthSite:true,
      fridgeTypes:[]
    }
  },
  mounted() {
    this.getLabs()
    this.getFridgeType()
    this.checkCreated()
  },
  updated() {
    if (this.isCreated && this.fecthSite && !isEmpty(this.entity)) {
      console.log(this.entity)
      this.checkCreated()
      this.fecthSite=false
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    filterOption,
    disabledDate: _disabledFutureDate,
    getFridgeType(){
      FridgeServices.getFridgeTypes().then((response)=>{
        this.fridgeTypes=response.data
      })
    },
    checkCreated(){
      if(this.isCreated){
        this.getSites(this.entity.labId)
        this.getZones(this.entity.siteId)
      }
    },
    selectSite(labId){
      this.getSites(labId)
    },
    selectZone(siteId){
      this.getZones(siteId)
    },
    getLabs(){
      LabServices.getAccepted().then((response)=>{
        this.labs=response.data
      })
    },
    getSites(labId){
      SiteServices.getAllSiteByLabId(labId).then((response)=>{
        this.sites=response.data
      })
    },
    getZones(siteId){
      ZoneServices.getBySiteId(siteId).then((response)=>{
        this.zones=response.data
      })
    },
    getSiteById(siteId){
      SiteServices.getSiteById(siteId).then((response)=>{
        this.sites.push(response.data)
      })
    },
    getZoneById(zoneId){
      ZoneServices.getZoneById(zoneId).then((response)=>{
        this.zones.push(response.data)
      })
    },
  },
}
</script>
