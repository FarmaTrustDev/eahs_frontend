import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/anesthetic`

function get() {
  return request({
    url: `${baseApi}`,
    method: 'GET',
  })
}
function search(params = {}) {
  return request({
    url: `${baseApi}/search`,
    params,
  })
}

function create(data) {
    console.log(data)
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

function update(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'PATCH',
    data,
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}

const AnestheticServices = {
  create,
  update,
  getById,
  get,
  destroy,
  search
}

export default AnestheticServices
