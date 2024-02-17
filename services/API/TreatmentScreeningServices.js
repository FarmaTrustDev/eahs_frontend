import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/treatmentScreening`

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

const TreatmentScreeningServices = {
  get,
  create,
  getById,
  update,
}

export default TreatmentScreeningServices
