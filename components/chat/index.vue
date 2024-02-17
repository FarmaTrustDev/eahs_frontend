<template>
  <div class="chat-page chat-card-padding">
    <!-- <a-button type="primary" @click="showUsersModal(true)">Add Users</a-button> -->
    <a-row class="grey-card" style="margin: 0">
      <a-col :span="9" class="left-bar">
        <a-card :bordered="false" class="default-card chat-container-height"
          ><a-spin :spinning="conversationLoader">
            <List
              :conversations="conversations"
              @getConversation="getConversation" /></a-spin
        ></a-card>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="14" class="right-bar clearfix">
        <a-card :bordered="false" class="default-card height-100">
          <div class="max-h-200">
            <a-spin class="p-0" :spinning="endToEndConversationLoader">
              <Conversation
                v-if="!isEmpty(recipient)"
                :recipient="recipient"
                :data="endToEndConversation"
                @fetch="loadFromChat"
                @loadScrollMethod="loadScrollMethod"
              />
              <a-empty v-else class="h-100vh">
                <span slot="description">
                  {{ translation.SelecUser_5_117 }}
                </span>
                <a-button type="primary" @click="showUsersModal(true)">
                  {{ translation.StartNow_2_457 }}
                </a-button>
              </a-empty>
            </a-spin>
          </div></a-card
        >
      </a-col>
    </a-row>
    <a-modal
      :width="1200"
      :visible="groupModal"
      title="Groups"
      :dialog-style="{ top: '10px' }"
      :footer="null"
      :destroy-on-close="true"
      @cancel="handleGroupModal(false)"
    >
      <Group @getGroup="getGroup" />
    </a-modal>
    <a-modal
      :visible="usersModal"
      :title="translation.UsersList_2_575"
      :footer="null"
      width="40%"
      @cancel="showUsersModal(false)"
    >
    
      <UserList @getUser="getUser" />
    </a-modal>
  </div>
</template>
<script>
import List from '~/components/chat/List'
import Conversation from '~/components/chat/Conversation'
import Group from '~/components/chat/groups'
import ChatServices from '~/services/API/ChatServices'
import { EVENT_CHAT_NOTIFICATION } from '~/services/Constant/Events'
import UserList from '~/components/users/ChatList'
import { isEmpty } from '~/services/Helpers'
export default {
  components: { Conversation, List, UserList, Group },
  data() {
    return {
      conversations: [],
      conversationLoader: false,
      endToEndConversation: [],
      opponentId: null,
      messageTo: null,
      usersModal: false,
      recipient: {},
      endToEndConversationLoader: false,
      scrollMethod: () => {},
      groupModal: false,
      newConversations: [],
      
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.fetchConversation()
    this.registerEventNotification()

    this.$emit('loadShowModal', this.showUsersModal)
    this.$emit('handleGroupModal', this.handleGroupModal)
  },
  methods: {
    loadScrollMethod(method) {
      this.scrollMethod = method
    },
    isEmpty,
    fetchConversation() {
      this.conversationLoader = true

      ChatServices.getConversations()
        .then((conversations) => {
          for (const dat in conversations.data) {
            if (
              conversations.data[dat].id === 925 ||
              conversations.data[dat].id === 913
            ) {
              console.log('hello remove tis if printed')
            } else {
              this.newConversations.push(conversations.data[dat])
              this.conversations.push(conversations.data[dat])
            }
          }
          // console.log(this.conversations)
          // this.conversations = conversations.data
        })
        .catch((e) => {})
        .finally(() => {
          this.conversationLoader = false
        })
    },
    fetch(params = {}) {
      // End to End conversation right side
      this.endToEndConversationLoader = true
      ChatServices.get(params)
        .then((response) => {
          this.endToEndConversation.splice(0)
          for (const dt in response.data) {
            if (
              response.data[dt].id === 973 ||
              response.data[dt].id === 903 ||
              response.data[dt].id === 905
            ) {
              console.log(response.data[dt])
            } else {
              this.endToEndConversation.push(response.data[dt])
            }
          }
        })
        .then(() => {
          this.scrollMethod()
        })
        .finally(() => (this.endToEndConversationLoader = false))
    },
    getConversation(conversation) {
      let params = {}
      const recipientData = {}

      if (conversation.isGroup) {
        recipientData.type = 'group_Id'
        recipientData.name = !isEmpty(conversation.group_Name)
          ? conversation.group_Name
          : conversation.group_name
        recipientData.id = conversation.group_Id
        params = {
          group_Id: conversation.group_Id,
        }
      } else {
        recipientData.type = 'recipient_Id'
        recipientData.name = conversation.recipient_Name
        recipientData.id = conversation.opponentId
        params = {
          recipient_Id: conversation.opponentId,
        }
      }

      this.recipient = recipientData
      this.fetch(params)
    },
    registerEventNotification() {
      const getNotification = this.getNotification
      this.$nuxt.$on(EVENT_CHAT_NOTIFICATION, (notification) => {
        getNotification(notification.data)
      })
    },
    // this method works when auto message generate
    // ! hot fix need to optimize the code
    getNotification(notification) {
      const opponentId = notification.sender_Id

      let params = {}
      const recipientData = {}
      if (notification.isGroup) {
        recipientData.type = 'group_Id'
        params = {
          group_Id: notification.group_Id,
        }
        recipientData.id = notification.group_Id
      } else {
        recipientData.id = opponentId
        recipientData.type = 'recipient_Id'
        recipientData.name = notification.recipient_Name
        params = {
          recipient_Id: opponentId,
        }
      }
      this.recipient = recipientData
      this.fetchConversation()
      this.fetch(params)
    },
    showUsersModal(show) {
      this.usersModal = show
    },
    handleGroupModal(show) {
      this.groupModal = show
    },
    getUser(users) {
      this.recipient = {
        type: 'recipient_Id',
        name: users.firstName,
        id: users.id,
      }

      this.fetch({ recipient_Id: users.id })
      this.showUsersModal(false)
    },
    getGroup(group) {
      this.recipient = {
        type: 'group_Id',
        name: group.name,
        id: group.id,
      }

      this.fetch({
        Group_Id: group.id,
        sender_id: this.$store.getters.getUser.id,
      })
      this.handleGroupModal(false)
    },
    loadFromChat(notification) {
      this.getConversation(notification.data)
    },

  },
}
</script>
