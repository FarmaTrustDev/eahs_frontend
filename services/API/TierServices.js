import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/tier`


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

function getById(id) {
  return request({
    url : `${baseApi}/${id}`,
    method: 'GET'
  })
}

function update(data) {
  return request({
      url: `${baseApi}`,
      data,
      method: 'PUT'
  })
}

function remove(id) {
  return request({
      url: `${baseApi}/${id}`,
      method: 'DELETE'
  })
}

const TierServices = {
    get,
    create,
    getById,
    update,
    remove
  }
  
  export default TierServices