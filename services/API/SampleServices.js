import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/sample`

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
  function getByOrganization() {
    return request({
      url: `${baseApi}/GetByOrganization`,
      method: 'GET',
    })
  }
  function getSampleByProcessName(inpt) {
    return request({
      url: `${baseApi}/getSampleByProcessName/${inpt}`,
      method: 'GET',
    })
  }
  function getBySearch(val) {
    return request({
      url: `${baseApi}/search/${val}`,
      method: 'GET',
    })
  }
  function getResearcherSample() {
    return request({
      url: `${baseApi}/GetResearcherSample`,
      method: 'GET',
    })
  }
  function getClientSample() {
    return request({
      url: `${baseApi}/GetClientSample`,
      method: 'GET',
    })
  }
  function getCustodianSample() {
    return request({
      url: `${baseApi}/GetCustodianSample`,
      method: 'GET',
    })
  }
  function getManufacturerSample() {
    return request({
      url: `${baseApi}/GetManufacturerSample`,
      method: 'GET',
    })
  }
  function getPatientSample() {
    return request({
      url: `${baseApi}/GetPatientSample`,
      method: 'GET',
    })
  }

function update(data){
  return request({
    url: `${baseApi}`,
    method: 'PUT',
    data,
  })
}

function searchSample(params = {}) {
  return request({
    url: `${baseApi}/search`,
    params,
  })
}

function getTodaySample() {
  return request({
    url: `${baseApi}/get-today-sample`,
    method: 'GET'
  })
}

const SampleServices = {
    create,
    getById,
    get,
    update,
    getResearcherSample,
    getCustodianSample,
    getClientSample,
    getManufacturerSample,
    getPatientSample,
    getBySearch,
    getByOrganization,
    searchSample,
    getSampleByProcessName,
    getTodaySample
  }
  
  export default SampleServices