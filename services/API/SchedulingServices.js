import request from '../request'
import { BASE_API } from '../Constant'
const Qs = require('qs')
const baseApi = `${BASE_API}/Scheduling`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}
function getDetailById(id) {
  return request({
    url: `${baseApi}/detail/${id}`,
  })
}

function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

function update(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'Put',
    data,
  })
}

function markScheduleRequest(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'Patch',
    data,
  })
}

function getEstimation(treatmentAvailabilityId) {
  return request({
    url: `${baseApi}/treatment-availability/${treatmentAvailabilityId}`,
  })
}

function getByTreatment(id, params = {}) {
  return request({
    url: `${baseApi}/treatment/${id}`,
    params,
  })
}

function getDetailByTreatment(id, params = {}) {
  return request({
    url: `${baseApi}/detail/treatment/${id}`,
    params,
  })
}

function getDetailByTreatmentOut(id, params = {}) {
  return request({
    url: `${baseApi}/detail/treatment-out/${id}`,
    params,
  })
}

function createForManufacturer(data) {
  return request({
    url: `${baseApi}/create-for-manufacturer`,
    data,
    method: 'POST',
  })
}

const SchedulingServices = {
  get,
  create,
  getById,
  update,
  getEstimation,
  getByTreatment,
  markScheduleRequest,
  getDetailById,
  getDetailByTreatment,
  getDetailByTreatmentOut,
  createForManufacturer,
  
}

export default SchedulingServices
