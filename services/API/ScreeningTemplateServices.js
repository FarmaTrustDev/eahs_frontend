import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/ScreeningTemplate`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}

function getHospitalScreening(params = {}) {
  return request({
    url: `${baseApi}/getHospitalScreeningTemplate`,
    params,
  })
}

function getHospitalTempStatus(templateId, treatmentTypeId, manufacturerId) {
  return request({
    url: `${baseApi}/${templateId}/${treatmentTypeId}/${manufacturerId}`,
    method:'GET',
  })
}

function getScreeningTempStatus(templateId) {
  return request({
    url: `${baseApi}/getScreeningTemplateStatus/${templateId}`,
    method:'GET',
  })
}

function getScreeningCategoryStatus(templateId) {
  return request({
    url: `${baseApi}/getScreeningCategoryStatus/${templateId}`,
    method:'GET',
  })
}

function markAcceptance(templateId, treatmentTypeId, manufacturerId) {
  return request({
    url: `${baseApi}/markAcceptance/${templateId}/${treatmentTypeId}/${manufacturerId}`,
    method:'GET',
  })
}

function submitScreeningRequest(templateId, treatmentTypeId, manufacturerId) {
  return request({
    url: `${baseApi}/submit-screening-request/${templateId}`,
    method:'GET',
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

function update(id, data) {
  // console.log(data)
  return request({
    url: `${baseApi}/update/${id}`,
    method: 'put',
    data,
  })
}


const ScreeningTemplateServices = {
  get,
  getHospitalScreening,
  getHospitalTempStatus,
  markAcceptance,
  create,
  getById,
  update,
  getScreeningTempStatus,
  submitScreeningRequest,
  getScreeningCategoryStatus
}

export default ScreeningTemplateServices
