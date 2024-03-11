import request from '../request'
import { BASE_API } from '../Constant'
const Qs = require('qs')
const baseApi = `${BASE_API}/User`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}
function getComplete() {
    return request({
      url: `${baseApi}/complete`
    })
}
function createUser(data) {
  return request({
    url: `${baseApi}/createUser`,
    data,
    method: 'POST',
  })
}
function verifyUser(data) {
    return request({
      url: `${baseApi}/verify`,
      data,
      method: 'POST',
    })
  }
function updateUser(id, data) {
    return request({
      url: `${baseApi}/${id}`,
      data,
      method: 'PUT',
    })
}
function allocateRole(id, data) {
  return request({
    url: `${baseApi}/allocateRole/${id}`,
    data,
    method: 'PUT',
  })
}
function resetPassword(id, data) {
  return request({
    url: `${baseApi}/resetPassword/${id}`,
    data,
    method: 'PUT',
  })
}
function deleteUser(id) {
    return request({
      url: `${baseApi}/${id}`,
      method:'PATCH',
    })
}
function getById(id) {
    return request({
      url: `${baseApi}/${id}`,
    })
}
function newUserById(id) {
  return request({
    url: `${baseApi}/newUser/${id}`,
  })
}

function getMenu(){
  return request({
    url: `${baseApi}/adminMenu`,
  })
}
function deleteUserSystem(appClId, appRoleId) {
  return request({
    url: `${baseApi}/${appClId}/${appRoleId}`,
    method:'PATCH',
  })
}
const UsersServices = {
  get,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
  getComplete,
  getById,
  allocateRole,
  deleteUserSystem,
  resetPassword,
  newUserById,
  getMenu,
}

export default UsersServices

