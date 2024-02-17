import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/treatmentBag`

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

function put(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    data,
    method: 'put',
  })
}

function markCollectionComplete(id) {
  return request({
    url: `${baseApi}/markCollectionComplete/${id}`,
    method: 'put',
  })
}

function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}

function getByTreatmentId(id, params = {}) {
  return request({
    url: `${baseApi}/treatment/${id}`,
    params,
  })
}

function sendMail(id, data) {
  return request({
    url: `${baseApi}/send-email/${id}`,
    data,
    method: 'POST',
  })
}

const TreatmentBagServices = {
  get,
  create,
  destroy,
  put,
  getById,
  getByTreatmentId,
  markCollectionComplete,
  sendMail
}

export default TreatmentBagServices
