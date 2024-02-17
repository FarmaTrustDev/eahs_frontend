import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/institute`


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

function create(data) {
    return request({
        url: `${baseApi}`,
        data,
        method: 'POST'
    })
}

const InstituteServices = {
    get,
    create,
    getById
  }
  
  export default InstituteServices