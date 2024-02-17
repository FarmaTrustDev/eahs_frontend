import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/courierService`


function get() {
    return request({
      url: `${baseApi}`,
      method: 'GET'
    })
  }
  function getById(id) {
    return request({
      url: `${baseApi}/${id}`,
      method: 'GET'
    })
  }
  function getByDelTime(id) {
    return request({
      url: `${baseApi}/getByDelTime/${id}`,
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

function getByCourierServiceAllocationId(id) {
  return request({
    url: `${baseApi}/getById/${id}`,
    method: 'GET'
  })
}

function update(data){
  return request({
    url : `${baseApi}`,
    data,
    method: 'PUT'
  })
}

function softDelete(id){
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE'
  })
}

const CourierServiceServices = {
    get,
    create,
    getById,
    getByDelTime,
    getByCourierServiceAllocationId,
    update,
    softDelete
  }
  
  export default CourierServiceServices