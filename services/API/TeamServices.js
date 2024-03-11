import request from '../request'
import { BASE_API } from '../Constant'
const Qs = require('qs')
const baseApi = `${BASE_API}/Team`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}
function createTeam(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}
function updateTeam(data) {
    return request({
      url: `${baseApi}`,
      data,
      method: 'PUT',
    })
}
function deleteTeam(id) {
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
function getTeam(appId, clientId){
  return request({
    url: `${baseApi}/${appId}/${clientId}`,
  })
}
const TeamServices = {
  get,
  createTeam,
  updateTeam,
  deleteTeam,
  getById,
  getTeam
}

export default TeamServices

