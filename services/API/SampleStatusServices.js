import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/samplestatus`

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
  function getCSProcessing(id) {
    return request({
      url: `${baseApi}/GetConsentStatusProcessing/${id}`,
      method: 'GET',
    })
  }
  function getIBSProcessing(id) {
    return request({
      url: `${baseApi}/GetInboundStatusProcessing/${id}`,
      method: 'GET',
    })
  }
  function getOBSProcessing(id) {
    return request({
      url: `${baseApi}/GetOutboundStatusProcessing/${id}`,
      method: 'GET',
    })
  }
  function get() {
    return request({
      url: `${baseApi}`,
      method: 'GET',
    })
  }
const SampleStatusServices = {
    create,
    getById,
    get,
    getCSProcessing,
    getIBSProcessing,
    getOBSProcessing
  }
  
  export default SampleStatusServices