<template>
  <div>
    <a-layout-header>
      <div class="user-detail">
        
      </div>

      <div class="hospital-detail">
        
        <!-- Header notifications -->
        <div class="notifications"  v-if="isCustomer">
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                <!-- <a-icon type="bell" theme="filled" /> -->
                <a-badge :count="cartItemCount">
                  <!-- <a-avatar shape="square" icon="bell"/> -->
                  <a-icon type="shopping-cart" />
                </a-badge>
              </a>
              
              <a-menu slot="overlay" class="cart-dropdown">
                <a-menu-item><h2>Your Cart</h2></a-menu-item>
                <!-- {{notifications.length == 0 ? "upper" : "test" }} -->
                <a-menu-item v-if="cartItemCount == 0">
                  <span>No Item Selected</span>
                </a-menu-item>
                <a-menu-item style="width:auto" v-for="catItem in cartItemData" :key="catItem.id" >
                  <strong
                    ><p class="m-0 ant-col ant-col-18">
                      {{ catItem.productName }}
                    </p><p class="ant-col ant-col-6">{{ catItem.productPrice }}{{ catItem.priceUnit }}</p></strong>
                  <span class="ellipsis border-bottom ant-col ant-col-24">Delivery Time:{{ catItem.deliveryTime }} days</span>
                </a-menu-item>
                <a-menu-item><a-button v-if="cartItemCount !=0 " class="ant-col ant-col-24 orderButton wd-12 ml-50" @click="goto('/outbound/product/productCheckout')"  style="margin-top:28px">Checkout</a-button></a-menu-item>
              </a-menu>
            </a-dropdown>
        </div>
        
        <!-- Header Logo -->
        <!-- Header notifications -->
        <div class="notifications" style="margin: 0">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <!-- <a-icon type="bell" theme="filled" /> -->
              <a-badge :count="consentCount">
                <!-- <a-avatar shape="square" icon="bell"/> -->
                <img
                  src="https://cdn-icons-png.flaticon.com/512/57/57167.png"
                  alt=""
                  width="25px"
                />
              </a-badge>
            </a>
            <a-menu slot="overlay" class="notifications-dropdown">
              <!-- {{notifications.length == 0 ? "upper" : "test" }} -->
              <a-menu-item v-if="consentCount == 0">
                <span>No notifications</span>
              </a-menu-item>

              <a-menu-item   
                v-for="notification in consentData"
              
                :key="notification.id"
                @click="goto('/consent/consentApproval?id='+notification.globalId+'&pId='+notification.projectId+'&pCSId='+notification.consentStatusResponseDTO.consentStatusGlobalId)"
              >
                <strong
                  ><p class="m-0">
                    {{ notification.name }}
                  </p></strong
                >
                <span class="ellipsis border-bottom">{{
                  notification.consentStatusResponseDTO.name
                }}</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      
        <!-- Header Logo -->
        <div class="org-title">
          <div class="login-logo-x">
            <img 
              v-if="user.organizationProfileImage"
              :src="getImageUrl(logo)" 
              width="20px"
              logo
              hendling
              for
              temp
              class="logo"
            >
            <img
              v-else
              src="https://demoapi.qmaid.co/Logos/2020_10_22.14_48_51.jpg"
              width="20px"
              logo
              hendling
              for
              temp
              class="logo"
            />
            <span class="title">{{ user.organizationName }} </span>
          </div>
        </div>
        <!-- Header Lang Select -->
        <div>
          {{ translation.first }}
          <a-select
            :default-value="isEmpty(selectedLanguage) ? 'en' : selectedLanguage"
            style="width: 130px"
            @change="selectLanguage"
          >
            <a-select-option v-for="language in languages" :key="language.id">
              {{ language.name }}
              <img :src="getImageUrl('web/flags/'+ language.flag)" style="vertical-align:middle"  />
            </a-select-option>
          </a-select>
        </div>
      </div>
    </a-layout-header>
  </div>
</template>

<script>
import { HubConnectionBuilder } from '@aspnet/signalr'
import { isEmpty } from '~/services/Utilities'
import { isArray } from '~/services/Helpers'
import { EVENT_CHAT_NOTIFICATION } from '~/services/Constant/Events'
import TranslationServices from '~/services/API/TranslationServices'
import translationHelpers from '~/mixins/translation-helpers'
import ChatServices from '~/services/API/ChatServices'
import { BASE_URL } from '~/services/Constant/index'
import imagesHelper from '~/mixins/images-helper'
import routeHelpers from '~/mixins/route-helpers'
import CartServices from '~/services/API/CartServices'
import ConsentServices from '~/services/API/ConsentService'

const connection = new HubConnectionBuilder()
  .withUrl(`${BASE_URL}NotificationUserHub`)
  .build()

connection.start()

export default {
  name: 'Header',
  mixins: [translationHelpers, routeHelpers, imagesHelper],
  data() {
    return {
      isCustomer:false,
      languages: [
        { id: 'en', name: 'English' , flag: 'uk.png'},
        { id: 'de', name: 'German' , flag: 'de.png'},
        { id: 'za', name: 'Chinese' , flag: 'cn.png'},
        { id: 'ar', name: 'Arabic' , flag: 'sa.png'},
        { id: 'fr', name: 'French' , flag: 'fr.png'},
      ],
      lang: null,
      notificationCount: 0,
      consentData:[],
      consentCount:0,
      cartItemCount: 0,
      notifications: [],
      logo: '',
      cartItemData:[]
    }
  },
  async fetch() {
    let language = this.selectedLanguage

    if (isEmpty(language)) {
      language = 'en'
    }
    await this.fetchLanguages(language)
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      return this.$store.getters.getUser
    },
  },
  mounted() {
    const data = JSON.parse(localStorage.getItem('vuex'))
    this.notificationHandler()
    this.genericNotificationHandler()
    this.fetchUnreadMessages()
    this.checkImage()
    this.uploadTranslations()
    // this.getConsent()
    if(data.auth.user.roleName === 'CUSTOMER_TYPE' || data.auth.user.roleName === 'INSTITUTE_CUSTOMER_TYPE' )
    {
      this.isCustomer=true
      this.getCartItem()
      this.$root.$on('updateCart', () => {
            // your code goes here
            this.getCartItem()
        })
    }
    // this.$root.$on('updateConsent', () => {
    //         // your code goes here
    //         this.getConsent()
    //     })
    
        
    // this.downloadTranslations()
  },
  methods: {
    isEmpty,
    uploadTranslations() {
      TranslationServices.getTranslation()
    },
    getCartItem()
    {
      CartServices.get().then((response)=>{
        if(response.data!=null)
        {
        this.cartItemCount = response.data.cartDetail.length
        this.cartItemData = response.data.cartDetail
        console.log(this.cartItemData)
        }
        else{
          this.cartItemCount = 0
          this.cartItemData = []
        }
      })
    },
    getConsent()
    {
      ConsentServices.getPendingConsent().then((response)=>{
        this.consentCount = response.data.length
        this.consentData = response.data
      })
    },
    downloadTranslations() {
      TranslationServices.getTranslationFile().then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'translationData.xlsx')
        document.body.appendChild(fileLink)
        fileLink.click()
      })
    },
    notificationHandler() {
      connection.on('Notification', (notification) => {
        const notify = notification

        if (!isEmpty(notify.data) && isArray(notify.data.notify_To)) {
          const notifyTo = notify.data.notify_To
          //  *check if the user is in the notify to
          if (notifyTo.includes(`${this.user.id}`)) {
            this.emitNotification(notification)
          }
        }
      })
    },
    genericNotificationHandler() {
      const fetchUnreadMessages = this.fetchUnreadMessages
      connection.on('GenericNotification', (notification) => {
        fetchUnreadMessages()
      })
    },
    fetchUnreadMessages() {
      ChatServices.fetchUnreadMessages().then((response) => {
        this.notificationCount = response.count
        this.notifications = response.data
      })
    },
    emitNotification(notification) {
      this.$nuxt.$emit(EVENT_CHAT_NOTIFICATION, notification)
    },
    selectLanguage(language) {
      this.fetchLanguages(language)
      // this.goto(`${this.$route.path}`)
    },
    async fetchLanguages(language) {
      await TranslationServices.get({ [language]: true }).then(
        (translations) => {
          this.$store.commit('setSelectedLanguage', language)
          this.$store.commit('setTranslation', translations.data)
          this.lang = translations.data
        }
      )
    },
    markRead(notification) {
      ChatServices.markAsRead(notification.id)
        .then((response) => {
          this.fetchUnreadMessages()
        })
        .then(() => {
          this.goto(`/chat`)
        })
    },
    checkImage()
      {
        if(!isEmpty(this.user.organizationProfileImage))
        {
          this.logo = this.user.organizationProfileImage.replace(/['"]+/g, '')
          
        }
      },
      
  },
}
</script>
