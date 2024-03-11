import request from '../request'
import { BASE_API } from '../Constant'
const Qs = require('qs')
const baseApi = `${BASE_API}/app`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}
function createApp(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}
function updateApp(id, data) {
    return request({
      url: `${baseApi}/${id}`,
      data,
      method: 'PUT',
    })
}
function deleteApp(id) {
    return request({
      url: `${baseApi}/${id}`,
      method:'PATCH',
    })
}
function allocateAppRole(appId, roleId) {
    return request({
      url: `${baseApi}/${appId}/${roleId}`,
      method:'POST',
    })
}
function allocateAppClient(appId, clientId) {
    return request({
      url: `${baseApi}/${appId}/${clientId}`,
      method:'POST',
    })
}
function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}
function deleteRoleSystem(id) {
  return request({
    url: `${baseApi}/appRoles/${id}`,
    method:'PATCH',
  })
}

const AppServices = {
  get,
  createApp,
  updateApp,
  deleteApp,
  allocateAppRole,
  allocateAppClient,
  getById,
  deleteRoleSystem,
}

export default AppServices

