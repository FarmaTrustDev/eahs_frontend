import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/reasons`


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
  function isReasonExist(inpt) {
    return request({
      url: `${baseApi}/isReasonExist/${inpt}`,
      method: 'GET'
    })
  }
  function deleteReason(id) {
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
function update(data) {
  return request({
      url: `${baseApi}`,
      data,
      method: 'PUT'
  })
}

const ReasonServices = {
    get,
    create,
    getById,
    update,
    deleteReason,
    isReasonExist
  }
  
  export default ReasonServices