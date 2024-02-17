<template>
    <div>
      <div class="mb-15 pr-15 clearfix">
        <h2 class="">
          <strong v-if="user.organizationTypeAlias != 'SMARTLAB'">Equipment</strong>
          <strong v-if="user.organizationTypeAlias == 'SMARTLAB'" class="">Equipment</strong>
        </h2>
        <a-row class="display-inline-block" :gutter="10" style="margin-bottom: -20px;">
          
        </a-row>
      </div>
    </div>
  </template>
  <script>
  import imagesHelper from '~/mixins/images-helper'
  export default {
    mixins:[imagesHelper],
    props: { data: { type: Object, default: () => ({}) } },
    data() {
      return {
        outsideEquipment: [
          {
            img: 'web/inventory/Group-1000002123.svg',
            heading: 'Phase–contrast microscope',
          },
          {
            img: 'web/inventory/Group-1000002124.svg',
            heading: 'CO2 incubator',
          },
        ],
      }
    },
    computed: {
      user() {
        return this.$store.getters.getUser
      },
      translation() {
        return this.$store.getters.getTranslation
      },
    },
  }
  </script>