import requestBlyott from '../requestBlyott'
import request from '../request'
import { BASE_API } from '../Constant'

const baseBlyottApi = `https://api.blyott.com`
const baseApi = `${BASE_API}/tag`

function getAllTagHardware() {
  return requestBlyott({
    url: `${baseBlyottApi}/hardware/0`,
    method: 'GET',
  })
}

function fetchTagHardwareFromCGTBlyott() {
  return request({
    url: `${baseApi}`,
    method: 'GET',
  })
}

function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

function createBlyott(data) {
  return requestBlyott({
    url: `${baseBlyottApi}/tagHardware`,
    data,
    method: 'POST',
  })
}

function fetchBlyottLocationByCode(code){
  return requestBlyott({
    url: `${baseBlyottApi}/tagHardware/${code}`,
    method: 'GET',
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'GET',
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

const TagHardwareServices = {
    getAllTagHardware,
    create,
    createBlyott,
    fetchTagHardwareFromCGTBlyott,
    getById,
    fetchBlyottLocationByCode
  /* update,
  getById,
  get,
  destroy,
  getByGUId,
  getNotification,
  postNotification */
}

export default TagHardwareServices
