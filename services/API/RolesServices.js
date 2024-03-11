import request from '../request'
import { BASE_API } from '../Constant'
const Qs = require('qs')
const baseApi = `${BASE_API}/Role`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}
function getAppRoles(id){
  return request({
    url: `${baseApi}/${id}`,
  })
}
function createRole(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}
function updateRole(id, data) {
    return request({
      url: `${baseApi}/${id}`,
      data,
      method: 'PUT',
    })
}
function deleteRole(id) {
    return request({
      url: `${baseApi}/${id}`,
      method:'PATCH',
    })
}
function getById(id) {
  return request({
    url: `${baseApi}/getById/${id}`,
  })
}
const RolesServices = {
  get,
  createRole,
  updateRole,
  deleteRole,
  getAppRoles,
  getById
}

export default RolesServices

