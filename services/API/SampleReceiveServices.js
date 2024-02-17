import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/sampleReceive`

function create(data) {
    return request({
        url: `${baseApi}`,
        data,
        method: 'POST'
    })
}
function getById(id) {
    return request({
      url: `${baseApi}/${id}`,
    })
  }
  function get() {
    return request({
      url: `${baseApi}`,
      method: 'GET',
    })
  }
  
  function search(inpt) {
    return request({
      url: `${baseApi}/search/${inpt}`,
    })
  }

  function update(data){
    return request({
      url : `${baseApi}`,
      method: 'PUT',
      data,
    })
  }

  
  
const SampleReceiveServices = {
    create,
    getById,
    get,
    update,
    search
  }
  
  export default SampleReceiveServices