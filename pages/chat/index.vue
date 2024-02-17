getUser(users) {},
<template>
  <page-layout
    :loading="loading"
    :title="translation.Chat_1_31"
    :bordered="borderCard"
    class="specific container"
    :create="false"
  >
    <template slot="headerMenus">
      <a-button type="primary" @click="showZoomModal(true)">{{
        translation.Newzoom_3_119
      }}</a-button>
      <a-button type="primary" @click="showModal(true)">{{
        translation['Users_1_504']
      }}</a-button>
      <a-button type="primary" @click="showGroupModal(true)">{{
        translation.AddGroup_2_456
      }}</a-button>
    </template>
    <template slot="content">
      <chat
        @loadShowModal="loadShowModal"
        @handleGroupModal="handleGroupModal"
      />
      <zoom @showZoomModal="loadZoomModal" />
    </template>
  </page-layout>
</template>
<script>
import chat from '~/components/chat'
import zoom from '~/components/zoom'
import PageLayout from '~/components/layout/PageLayout'

export default {
  components: { chat, PageLayout, zoom },
  data() {
    return {
      loading: false,
      borderCard: false,
      showGroup: false,
      showModal: () => {},
      showZoomModal: () => {},
      showGroupModal: () => {},
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    loadShowModal(show) {
      this.showModal = show
    },
    loadZoomModal(zoomModal) {
      this.showZoomModal = zoomModal
    },
    handleGroupModal(method) {
      this.showGroupModal = method
    },
  },
}
</script>
