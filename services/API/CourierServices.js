import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/courier`


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

function getById(id){
  return request({
    url : `${baseApi}/${id}`,
    method: 'GET'
  })
}

function put(data){
  return request({
    url: `${baseApi}`,
    data,
    method: 'PUT'
  })
}


function disable(id){
  return request({
    url : `${baseApi}/${id}`, 
    method: `DELETE`
  })
}

const CourierServices = {
    get,
    create,
    put,
    getById,
    disable
  }
  
  export default CourierServices