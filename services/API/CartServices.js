import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/cart`

function get() {
  return request({
    url: `${baseApi}/cartByCustomer`,
    method: 'GET'
  })
}

function getAllCustomerProduct() {
    return request({
      url: `${baseApi}/customerProduct`,
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
function checkOut(data) {
  return request({
      url: `${baseApi}/checkOut`,
      data,
      method: 'POST'
  })
}

const CartServices = {
    get,
    create,
    deleteCartItem,
    checkOut,
    getAllCustomerProduct
  }
  
  export default CartServices