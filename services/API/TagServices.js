import requestBlyott from '../requestBlyott'
import request from '../request'
import { BASE_API } from '../Constant'

const baseBlyottApi = `https://api.blyott.com`
const baseApi = `${BASE_API}/tag`

function getAllLocations(data) {
  return requestBlyott({
    url: `${baseBlyottApi}/tagsAurora`,
    data,
    method: 'POST',
  })
}

function fetchTagsFromCGTBlyott() {
  return request({
    url: `${baseApi}`,
    method: 'GET',
  })
}

function fetchBlyottTagByCode(code){
  return requestBlyott({
    url: `${baseBlyottApi}/tag/${code}`,
    method: 'GET',
  })
}

function createBlyott(data) {
  return requestBlyott({
    url: `${baseBlyottApi}/tag`,
    data,
    method: 'POST',
  })
}

function updateBlyott(data) {
  return requestBlyott({
    url: `${baseBlyottApi}/tag`,
    data,
    method: 'PUT',
  })
}

function update(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'PUT',
  })
}

function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

function getAvailableTags(){
  return request({
    url: `${baseApi}/availableTags`,
  })  
}
/*
function update(data) {
  return request({
    url: `${baseApi}`,
    method: 'Put',
    data,
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

function getNotification(ticket) {
  return request({
    url: `${baseApi}/get-notification-by-ticket/${ticket}`,
  })
}

function getByGUId(id) {
  return request({
    url: `${baseApi}/get-by-guid/${id}`,
  })
}

function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}

function postNotification(data) {
  return request({
    url: `${baseApi}/add-notification`,
    data,
    method: 'POST',
  })
} */

const TagServices = {
    getAllLocations,
    create,
    fetchTagsFromCGTBlyott,
    createBlyott,
    fetchBlyottTagByCode,
    updateBlyott,
    update,
    getById,
    getAvailableTags,

  /*
  get,
  destroy,
  getByGUId,
  getNotification,
  postNotification */
}

export default TagServices
