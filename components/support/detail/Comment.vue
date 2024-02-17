<template>
  <div class="chat-page">
    <div class="border-bottom">
      <b> Ticket CKD-{{ ticket.id }}</b>
      <br />
      <br />

      Subject:
      <span class="text-capitalize mb-10" style="display: inline-block"
        >{{ ticket.subject }} <br />
      </span>
    </div>

    <!-- <a-divider></a-divider> -->
    <a-row>
      <a-col class="chat-list right-bar">
        <!-- <pre> {{ data }}</pre> -->

        <a-list :data-source="data" item-layout="horizontal" :bordered="false">
          <a-list-item
            slot="renderItem"
            slot-scope="item"
            :class="'message-' + getType(item.isOwner)"
          >
            <a-comment :author="item.sender_Name" :content="item.content" class="">
              <template slot="content"
                ><div class="message-time content-body">
                  {{ item.message }}
                </div></template
              >
              <a-tooltip slot="datetime" :title="item.read_at">
                <span>{{ getDateFormat(item.read_at) }}</span>
              </a-tooltip>
            </a-comment>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <a-row>
        <a-col class="cmnt-msg">
          <a-form-item>
            <a-input
              v-decorator="[
                'message',
                {
                  rules: [
                    { required: true, message: 'Empty message not allow' },
                  ],
                },
              ]"
              class="send-message-input"
              :placeholder="translation.Typemessa_3_246"
            />
            <a-input
              v-decorator="[
                messageTo,
                {
                  rules: [
                    { required: true, message: 'Please input your name!' },
                  ],
                  initialValue: `${messageToId}`,
                },
              ]"
              type="hidden"
            />

            <a-input
              v-decorator="[
                `Recipient_Name`,
                {
                  rules: [
                    { required: true, message: 'Please input your name!' },
                  ],
                  initialValue: 'Paige Turner',
                },
              ]"
              type="hidden"
            />
            <a-input
              v-decorator="[
                `TicketId`,
                {
                  rules: [
                    { required: true, message: 'Please input your name!' },
                  ],
                  initialValue: ticket.id,
                },
              ]"
              type="hidden"
            />
            <a-input
              v-decorator="[
                `Sender_Name`,
                {
                  rules: [
                    { required: true, message: 'Please input your name!' },
                  ],
                  initialValue: user.name,
                },
              ]"
              type="hidden"
            />
          </a-form-item>
        </a-col>
        <a-col class="text-right">
          <a-form-item class="p-0 m-0">
            <a-button html-type="submit" :loading="submitting" type="primary">
              Submit
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import moment from 'moment'
import SupportServices from '~/services/API/SupportServices'
export default {
  props: {
    data: { type: Array, default: () => {} },
    messageToId: { type: String, default: null, required: true },
    messageTo: { type: String, default: `recipient_Id`, required: true },
    ticket: { type: Object, default: () => {}, required: true },
  },
  data() {
    return {
      submitting: false,
      value: '',
      moment,
      form: this.$form.createForm(this, {
        name: 'chat',
      }),
      formLayout: 'vertical',
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {},
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        // console.log(values)

        if (!err) {
          this.postMessage(values)
          this.form.resetFields()
        } else {
          this.loading = false
        }
      })
    },
    postMessage(params) {
      this.submitting = true
      SupportServices.postNotification(params).then((response) => {
        // console.log(response)
        this.submitting = false
        this.$emit('fetch', response)
      })
    },

    handleChange(e) {
      this.value = e.target.value
    },
    getType(isOwner) {
      return isOwner ? 'received' : 'sent'
    },
    getDateFormat(date) {
      return moment(String(date)).format('hh:mm Do MMMM YYYY')
    },
  },
}
</script>
