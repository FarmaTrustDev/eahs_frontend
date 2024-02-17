import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/transportVessel`


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

function put(data){
  return request({
    url: `${baseApi}`,
    data,
    method: 'PUT'
  })
}

function getById(id){
  return request({
    url : `${baseApi}/${id}`,
    method: 'GET'
  })
}

function disable(id){
  return request({
    url : `${baseApi}/${id}`, 
    method: `DELETE`
  })
}

const TransportVesselServices = {
    get,
    create,
    put,
    getById,
    disable
  }
  
  export default TransportVesselServices