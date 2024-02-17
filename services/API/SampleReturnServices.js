import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/sampleReturn`

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
  function srgetById(id) {
    return request({
      url: `${baseApi}/sampleRD/${id}`,
    })
  }

  function update(data){
    return request({
      url : `${baseApi}`,
      method: 'PUT',
      data,
    })
  }

  function upload(data){
    return request({
      url : `${baseApi}/upload-document`,
      method: 'POST',
      data,
    })
  }
  
const SampleReturnServices = {
    create,
    getById,
    get,
    srgetById,
    update,
    upload
  }
  
  export default SampleReturnServices