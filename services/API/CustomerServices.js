import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/customer`


function get() {
    return request({
      url: `${baseApi}/getCustomerByUser`,
      method: 'GET'
    })
  }
  function deleteCartItem(id) {
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

const CartServices = {
    get,
    create,
    deleteCartItem
  }
  
  export default CartServices