import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/sampleProjectProcessStepStatus`

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

function create(data,id) {
  return request({
    url: `${baseApi}/${id}`,
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

function checkSampleDefaultStatu(sampleId,processId) {
  return request({
    url: `${baseApi}/checkSampleDefaultStatu/${sampleId}/${processId}`,
  })
}

function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}

const SamplePPSSServices = {
  create,
  update,
  getById,
  get,
  destroy,
  search,
  checkSampleDefaultStatu
}

export default SamplePPSSServices
