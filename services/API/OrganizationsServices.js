import request from '../request'
import { BASE_API } from '../Constant'
const Qs = require('qs')
const baseApi = `${BASE_API}/Client`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}
function createClient(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}
function updateClient(id, data) {
    return request({
      url: `${baseApi}/${id}`,
      data,
      method: 'PUT',
    })
}
function deleteClient(id) {
    return request({
      url: `${baseApi}/${id}`,
      method:'PATCH',
    })
}
function deleteClientApp(id) {
  return request({
    url: `${baseApi}/deleteClientApp/${id}`,
    method:'PATCH',
  })
}
function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}
function getAppClient(appId){
  return request({
    url: `${baseApi}/appClient/${appId}`,
  })
}
function getApps(orgId){
  return request({
    url: `${baseApi}/apps/${orgId}`,
  })
}
const OrganizationsServices = {
  get,
  createClient,
  updateClient,
  deleteClient,
  getById,
  getAppClient,
  getApps,
  deleteClientApp
}

export default OrganizationsServices

