<template>
  <page-layout
    class="support container"
    :create="false"
    :loading="loading"
    title="Support Detail"
  >
    <template slot="content">
      <div class="grey-card">
        <a-row :gutter="56">
          <a-col :span="12">
            <Detail
            :data ="data"
            :ticket="entity"
             />
          </a-col>
          <a-col :span="12">
            <a-card class="default-border-radius">
              <div class="max-h-200">
                <Comment
                  message-to="Recipient_Id"
                  :ticket="entity"
                  message-to-id="99"
                  :data="data"
                  @fetch="fetchChat"
                />
              </div> </a-card
          ></a-col>
        </a-row>
      </div> </template
  ></page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import Detail from '~/components/support/detail'
import Comment from '~/components/support/detail/Comment'
import SupportServices from '~/services/API/SupportServices'
import withFetch from '~/mixins/with-fetch'
export default {
  components: { PageLayout, Detail, Comment },
  mixins: [withFetch],
  data() {
    return {
      loading: false,
      apiService: SupportServices,
      fetchMethod: SupportServices.getByGUId,
      data: [],
    }
  },
  methods: {
    afterFetch() {
      this.fetchChat()
    },
    fetchChat() {
      SupportServices.getNotification(this.entity.id).then((response) => {
        this.data = response.notifications
      })
    },
  },
}
</script>
