import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/HospitalLogistic`

function get() {
  return request({
    url: `${baseApi}`,
    method: 'GET'
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
function destroyAll() {
  return request({
    url: `${baseApi}`,
    method: 'DELETE',
  })
}
const HospitalLogisticServices = {
  get,
  create,
  destroy,
  put,
  getById,
  destroyAll
}

export default HospitalLogisticServices
