import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/product`


function get() {
    return request({
      url: `${baseApi}`,
      method: 'GET'
    })
  }
  function getBySearch(inpt) {
    return request({
      url: `${baseApi}/GetProductBySearch/${inpt}`,
      method: 'GET'
    })
  }
  function getAllProductsAdmin() {
    return request({
      url: `${baseApi}/GetAllAdminProduct`,
      method: 'GET'
    })
  }
  function getByIdAdminProduct(id) {
    return request({
      url: `${baseApi}/adminProduct/${id}`,
      method: 'GET'
    })
  }
  function getById(id) {
    return request({
      url: `${baseApi}/${id}`,
      method: 'GET'
    })
  }

function create(data,id) {
    return request({
        url: `${baseApi}/${id}`,  
        data,
        method: 'POST'
    })
}

function publish(data){
  return request({
    url : `${baseApi}/publish-to-catalogue`,
    data,
    method: 'POST'
  })
}

const ProductServices = {
    get,
    create,
    getById,
    publish,
    getAllProductsAdmin,
    getByIdAdminProduct,
    getBySearch
  }
  
  export default ProductServices