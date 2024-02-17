import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/consentQuestion`

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
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

function uploadDocument(data) {
  return request({
    url: `${baseApi}/uploadDocument`,
    data,
    method: 'POST',
  })
}

function update(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'PUT',
    data,
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}
function getQuestionById(id) {
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

const ConsentQuestionServices = {
  create,
  update,
  getById,
  getQuestionById,
  get,
  destroy,
  search,
  uploadDocument
}

export default ConsentQuestionServices
