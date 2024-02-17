import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/consignee`


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
  function delConsignee(id) {
    return request({
      url: `${baseApi}/delete/${id}`,
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
function updateConsignee(data) {
  return request({
      url: `${baseApi}`,
      data,
      method: 'PUT'
  })
}

const ConsigneeServices = {
    get,
    create,
    delConsignee,
    getById,
    updateConsignee
  }
  
  export default ConsigneeServices