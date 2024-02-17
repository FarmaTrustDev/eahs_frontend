import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/chat`

function getConversations(data) {
  return request({
    url: `${baseApi}/get-conversations`,
    data,
  })
}

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}

function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

function markAsRead(id) {
  return request({
    url: `${baseApi}/mark-as-read/${id}`,
    method: 'PUT',
  })
}

function fetchGroup(params = {}) {
  return request({
    url: `${baseApi}/groups`,
    params,
  })
}

function createGroup(data) {
  return request({
    url: `${baseApi}/groups`,
    data,
    method: 'POST',
  })
}

function fetchUnreadMessages(params = {}) {
  return request({
    url: `${baseApi}/get-unread-notifications`,
    params,
  })
}

const ChatServices = {
  getConversations,
  create,
  get,
  fetchGroup,
  createGroup,
  fetchUnreadMessages,
  markAsRead
}

export default ChatServices
