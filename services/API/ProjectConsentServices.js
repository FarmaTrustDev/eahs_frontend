import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/ProjectConsent`

function getDetailByProjectId(id){
    return request({
        url: `${baseApi}/getDetailByProjectId/${id}`,
        method: 'GET',
    })
}

function patientProjectConsentStatus(data){
    return request({
        url: `${baseApi}/patient-project-consent-status`,
        data,
        method: 'POST'
    })
}
function create(data) {
    return request({
      url: `${baseApi}`,
      data,
      method: 'POST',
    })
  }
  function update(data) {
    return request({
      url: `${baseApi}`,
      data,
      method: 'PUT',
    })
  }
  function gAPCIdsByPID(id){
    return request({
        url: `${baseApi}/gAPCIdsByPID/${id}`,
        method: 'GET',
    })
}
function gAPCDataByPID(id){
  return request({
      url: `${baseApi}/gAPCDataByPID/${id}`,
      method: 'GET',
  })
}
function getPendingConsents(id){
  return request({
      url: `${baseApi}/getAdminPendingConsentByProjectId/${id}`,
      method: 'GET',
  })
}
function getAllConsentsByProId(id){
  return request({
      url: `${baseApi}/getAdminConsentByProjectId/${id}`,
      method: 'GET',
  })
}
const ProjectConsentServices = {
    getDetailByProjectId,
    patientProjectConsentStatus,
    create,
    gAPCIdsByPID,
    update,
    gAPCDataByPID,
    getPendingConsents,
    getAllConsentsByProId
  }
  
  export default ProjectConsentServices