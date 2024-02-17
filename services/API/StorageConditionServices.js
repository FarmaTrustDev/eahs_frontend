import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/storagecondition`


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
  function deleteStorag(id) {
    return request({
      url: `${baseApi}/${id}`,
      method: 'DELETE'
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

const StorageConditionServices = {
    get,
    create,
    update,
    getById,
    deleteStorag
  }
  
  export default StorageConditionServices