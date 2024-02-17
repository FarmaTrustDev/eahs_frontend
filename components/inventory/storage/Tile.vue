<template>
  <div class="fridge-tile">
    <div class="title text-center mb-10">
      {{ storage.name }}
    </div>
    <div class="img">
      <fridge :color="storage.color" :sample-id="sampleId" :temp-id="tempId" :type="storage.quantity<=25 ? 1 : storage.quantity<=75 ? 2 : 3" />
    </div>

    <div class="icons">
      <div class="clearfix">
        <span>
          <img
            class="mr-5"
            :src="getImageUrl('web/inventory/storage/full-screen.svg')"
          />{{ storage.quantity }} % {{translation.Full_1_603}}
        </span>
        <span>
          <img
            class="mr-5"
            :src="getImageUrl('web/inventory/storage/frozen.svg')"
          />{{ storage.fridgeTypeName }}
        </span>
      </div>
    </div>
    <div class="location">
      <a-icon type="environment" theme="filled" />
      <span class="text"> {{ storage.siteName }}, <br /> {{ storage.siteZoneName }}</span>
    </div>
  </div>
</template>
<script>
import fridge from '~/components/inventory/freezers/Fridge'
import imagesHelper from '~/mixins/images-helper'
export default {
  components: { fridge },
  mixins: [imagesHelper],
  props: {
    storage: { type: Object, default: () => ({}) },
    name: { type: String, default: 'Storage Suite 3, Germany - Cellfuse' },
    location: { type: String, default: 'Fridge Atara 001' },
    color: { type: String, default: '#1943AE' },
    sampleId: { type: String },
    tempId: { type: String },
  },
  data() {
    return {}
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  methods: {},
}
</script>
