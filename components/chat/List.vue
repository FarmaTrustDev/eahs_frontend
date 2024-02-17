<template>
  <a-list
    item-layout="horizontal"
    :data-source="conversations"
    :bordered="false"
    class="reduce-margin"
  >
    <a-list-item
      slot="renderItem"
      slot-scope="conversation"
      style="cursor: pointer"
      @click="getConversation(conversation)"
    >
      <a-list-item-meta :description="conversation.message">
        <span slot="title" style="text-decoration: none">
          <!-- sorry for the shit code  -->
          <span v-if="!conversation.isGroup">
            <span v-if="conversation.isOwner">{{
              conversation.recipient_Name
            }}</span>
            <span v-else>{{ conversation.sender_Name }}</span>
          </span>
          <span v-else>{{ conversation.group_Name }}</span>
        </span>
        <a-avatar slot="avatar" :src="conversation.group_Image" />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
export default {
  props: {
    conversations: { type: Array, default: () => [] },
  },
  data() {
    return {}
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {
    getConversation(conversation) {
      this.$emit('getConversation', conversation)
    },
  },
}
</script>
