import request from '../request'
import { BASE_API } from '../Constant'
const Qs = require('qs')
const baseApi = `${BASE_API}/country`

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
function getAllCountries() {
  return request({
    url: `${baseApi}/getAllCountries`,
    method: 'GET'
  })
}
function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

function update(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'Put',
    data,
  })
}

function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}

const CountryServices = {
  get,
  create,
  destroy,
  update,
  getById,
  getAllCountries
}

export default CountryServices
