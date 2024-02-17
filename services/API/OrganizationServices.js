import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/Organization`

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
function getAllocatedOrDefault(){
  return request({
    url: `${baseApi}/getAllocatedOrDefaultLogistics`,
  })  
}

function getByGuid(id){
  return request({
    url: `${baseApi}/getByGuid/${id}`
  })
}

function update(id,data){
  return request({
    url:`${baseApi}/${id}`,
    data,
    method:'PATCH'
  })
}

function getAll(){
  return request({
    url : `${baseApi}/get-institutions`,
    method: 'GET'
  })
}

function getCouriers(){
  return request({
    url : `${baseApi}/get-logistics`,
    method: 'GET'
  })
}
function getPartners(){
  return request({
    url : `${baseApi}/get-partners`,
    method: 'GET'
  })
}
const OrganizationServices = {
  get,
  create,
  destroy,
  getByGuid,
  put,
  getById,
  getAllocatedOrDefault,
  update,
  getAll,
  getCouriers,
  getPartners
}

export default OrganizationServices
