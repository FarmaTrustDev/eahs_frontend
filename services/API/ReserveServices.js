import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/reserve`


function get() {
    return request({
      url: `${baseApi}`,
      method: 'GET'
    })
  }
  function deleteCartItem(id) {
    return request({
      url: `${baseApi}/${id}`,
      method: 'DELETE'
    })
  }

function create(id) {
    return request({
        url: `${baseApi}/${id}`,
        method: 'POST'
    })
}
function checkOut(data) {
  return request({
      url: `${baseApi}/CheckOut`,
      data,
      method: 'POST'
  })
}

const ReserveServices = {
    get,
    create,
    deleteCartItem,
    checkOut
  }
  
  export default ReserveServices