import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/treatmentAvailability`

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

function create(id, data) {
  return request({
    url: `${baseApi}/${id}`,
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

const TreatmentAvailabilityServices = {
  get,
  create,
  getById,
  update,
}

export default TreatmentAvailabilityServices
