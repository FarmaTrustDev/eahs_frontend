import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/biologicalSafetyLevel`


function get() {
    return request({
      url: `${baseApi}`,
      method: 'GET'
    })
  }

function create(data) {
    return request({
        url: `${baseApi}`,
        data,
        method: 'POST'
    })
}

function update(data) {
  return request({
      url: `${baseApi}`,
      data,
      method: 'PUT'
  })
}

function getById(id) {
  return request({
      url: `${baseApi}/${id}`,
      method: 'GET'
  })
}

function remove(id) {
  return request({
      url: `${baseApi}/${id}`,
      method: 'DELETE'
  })
}

const BiologicalSafetyLevelServices = {
    get,
    create,
    update,
    getById,
    remove
  }
  
  export default BiologicalSafetyLevelServices