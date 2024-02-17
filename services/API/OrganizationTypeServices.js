import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/OrganizationType`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}
function post(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
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
function put(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'put',
  })
}
function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}

function GetAllTypes(){
  return request({
    url: `${baseApi}/get-all-types`,
    method: 'GET'
  })
}
const OrganizationTypeServices = {
  get,
  post,
  create,
  destroy,
  put,
  getById,
  GetAllTypes,
}

export default OrganizationTypeServices