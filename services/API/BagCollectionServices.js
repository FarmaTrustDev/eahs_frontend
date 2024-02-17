import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/bagCollection`

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

function uploads(id) {
  return `${baseApi}/upload/${id}`
}

const BagCollectionServices = {
  get,
  create,
  destroy,
  update,
  getById,
  uploads
}

export default BagCollectionServices
