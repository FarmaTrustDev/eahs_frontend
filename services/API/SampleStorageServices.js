import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/sampleStorage`


function create(data) {
  return request({
      url: `${baseApi}`,
      data,
      method: 'POST'
  })
}
function getByRackId(data) {
  return request({
      url: `${baseApi}/getByRackId/${data}`,
      method: 'GET'
  })
}
function getSampleByFridgeLocation(col,row,fridge,shelf){
  return request({
    url: `${baseApi}/getSampleByFridgeLocation/${fridge}/${col}/${row}/${shelf}`,
    method: 'GET'
  })
}

function getBySampleAndRackId(sampleId, rackId){
  return request({
    url: `${baseApi}/getBySampleAndRackId/${sampleId}/${rackId}`,
    method: 'GET'
  })
}

function getBySampleId(sampleId){
  return request({
    url: `${baseApi}/getBySampleId/${sampleId}`,
    method: 'GET'
  })
}
const SampleStorageServices = {
  create,
  getByRackId,
  getBySampleAndRackId,
  getSampleByFridgeLocation,
  getBySampleId
}

export default SampleStorageServices