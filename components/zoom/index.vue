<template>
  <div>
    <a-modal
      :footer="null"
      :visible="visible"
      :title="loaded ? 'Meeting Created' : translation.Newzoom_3_119 "
      @cancel="showModal(false)"
    >
      <a-spin :spinning="loading">
        <Form v-if="!loaded" @submit="submit" />
        <div v-else>
          <a-descriptions title="Zoom Info">
            <a-descriptions-item label="Click the link to Copy Meeting Url">
              <a-button type="link" @click="copyToClipboard(data.start_url)">
                <a :href="data.join_url" target="_blank"> {{ data.start_url }}</a>
              </a-button>
            </a-descriptions-item>
          </a-descriptions>
          <a-button type="primary" @click="gotoMail(data)">
            {{translation.Shareby_3_127}}
          </a-button>
        </div>
      </a-spin>
    </a-modal>
  </div>
</template>
<script>
import ZoomServices from '~/services/API/ZoomServices'
import Form from '~/components/zoom/Form'
export default {
  components: { Form },
  data() {
    return {
      visible: false,
      loading: false,
      data: {},
      loaded: false,
    }
  },

  mounted() {
    this.$emit('showZoomModal', this.showModal)
  },
  methods: {
    showModal(show) {
      this.visible = show
      this.loaded = false
    },
    submit(values) {
      this.loading = true
      ZoomServices.create(values)
        .then((response) => {
          this.loaded = true
          this.data = response.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    copyToClipboard(text) {
      //   window.prompt('Copy to clipboard: Ctrl+C, Enter', text)
    },
    gotoMail(data) {
      window.location = `mailto:?subject=You%20have%20been%20invited%20to%20the%20following%20event.&body=Join%20with%20Zoom%20Meet%20${data.join_url}`
    },
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  }
}
</script>
