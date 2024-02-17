import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/TreatmentType`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}

function getRemaining(params = {}) {
  return request({
    url: `${baseApi}/remaining`,
    params,
  })
}

function getActive(params = {}) {
  return request({
    url: `${baseApi}/active`,
    params,
  })
}

function getWithScreening(params = {}) {
  return request({
    url: `${baseApi}/withScreening`,
    params,
  })
}
function getActiveWithOutScreening(params = {}) {
  return request({
    url: `${baseApi}/activeWithOutScreening`,
    params,
  })
}
function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

function getByIntId(param) {
  return request({
    url: `${baseApi}/getById/${param}`,
  })
}

function create(name){
  return request({
    url: `${baseApi}/create/${name}`,
    method: 'POST'
  })
}

function deleteById(id){
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE'
  })
}

const TreatmentTypeServices = {
  get,
  getById,
  getRemaining,
  getActive,
  getWithScreening,
  getByIntId,
  getActiveWithOutScreening,
  create,
  deleteById,
}

export default TreatmentTypeServices
