import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/fridgeType`

function get() {
  return request({
    url: `${baseApi}`,
    method: 'GET'
  })
}
function getById(id) {
    return request({
      url: `${baseApi}/getById/${id}`,
      method: 'GET'
    })
  }
const FridgeTypeServices = {
  get,
  getById
}

export default FridgeTypeServices
