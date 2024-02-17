import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/lab`

function get() {
  return request({
    url: `${baseApi}`,
    method: 'GET'
  })
}
function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'GET'
  })
}
function getByIntId(id) {
  return request({
    url: `${baseApi}/getByIntId/${id}`,
    method: 'GET'
  })
}
function create(data) {
  return request({
      url: `${baseApi}`,
      data,
      method: 'POST'
  })
}

function update(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    data,
    method: 'PATCH',
  })
}

function remove(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}

function approval(data) {
  return request({
    url : `${baseApi}/approval`,
    data,
    method: 'POST'
  })
}

function getPending(){
  return request({
    url : `${baseApi}/get-pending`,
    method: 'GET'
  })
}

function getAccepted(){
  return request({
    url : `${baseApi}/get-accepted`,
    method: 'GET'
  })
}

function getRejected(){
  return request({
    url : `${baseApi}/get-rejected`,
    method: 'GET'
  })
}

const LabServices = {
  get,
  create,
  getById,
  update,
  remove,
  approval,
  getPending,
  getAccepted,
  getRejected,
  getByIntId
}

export default LabServices
