import request from '../request'
import { BASE_API } from '../Constant'
const Qs = require('qs')
const baseApi = `${BASE_API}/afterCare`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
    paramsSerializer: (params) => {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
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
function getByTreatment(id, params = {}) {
    return request({
      url: `${baseApi}/treatment/${id}`,
      params,
    })
  }
const AfterCareServices = {
  get,
  create,
  getById,
  getByTreatment,
}

export default AfterCareServices

