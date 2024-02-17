import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/manufacturerTreatment`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

function getAvailability() {
  return request({
    url: `${baseApi}/get-availability`,
  })
}

function createAvailability(id, data) {
  return request({
    url: `${baseApi}/treatment-availability/${id}`,
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

function update(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'Put',
    data,
  })
}

function getTreatmentTypes() {
  return request({
    url: `${baseApi}/get-treatment-types`,
  })
}

const ManufacturerTreatmentServices = {
  get,
  create,
  getById,
  update,
  getAvailability,
  createAvailability,
  getTreatmentTypes
}

export default ManufacturerTreatmentServices
