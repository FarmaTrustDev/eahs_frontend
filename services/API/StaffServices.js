import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/staff`


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

const StaffServices = {
    get,
    create,
  }
  
  export default StaffServices