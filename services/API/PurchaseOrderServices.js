import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/purchaseOrder`


function update(data){
    return request({
        url: `${baseApi}`,
        data,
        method: 'PUT'
    })

}
function getBioBankOrder() {
    return request({
      url: `${baseApi}`,
      method: 'GET'
    })
  }
  function getByOrganizationOrder() {
    return request({
      url: `${baseApi}/GetByOrganization`,
      method: 'GET'
    })
  }

  function searchOrder(params = {}) {
    return request({
      url: `${baseApi}/search`,
      params,
    })
  }
  function searchOrderProduct(inpt) {
    return request({
      url: `${baseApi}/searchOrder/${inpt}`,
      method: 'GET'
    })
  }

const PurchaseOrderServices = {
    update,
    getBioBankOrder,
    getByOrganizationOrder,
    searchOrder,
    searchOrderProduct
}

export default PurchaseOrderServices