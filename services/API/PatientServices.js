import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/patient`
const baseApiMap = `${BASE_API}/Map/get-location-by-postal-code`

function get() {
  return request({
    url: `${baseApi}`,
    method:'GET',
  })
}

// function search(params = {}) {
//   return request({
//     url: `${baseApi}/search`,
//     params,
//   })
// }

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
    method: 'PUT',
    data,
  })
}

function getMapInfo(id) {
  return request({
    url: `${baseApiMap}/${id}`,
  })
}
function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

function destroy(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'DELETE',
  })
}

function projectPatientAssignment(data) {
  return request({
    url: `${baseApi}/project-patient-assignment`,
    data,
    method: `POST`
  })
}

function projectConsentPatientAssignment(data) {
  return request({
    url: `${baseApi}/project-patient-consent-assignment`,
    data,
    method: `POST`
  })
}

function getWithStatus(Id){
  return request({
    url: `${baseApi}/get-with-status/${Id}`,
    method: `get`
  })
}
function getWithStatusProcessing(Id,PId){
  return request({
    url: `${baseApi}/get-with-status-for-processing/${Id}/${PId}`,
    method: `get`
  })
}

function getConsentStatusList(patientId, projectId){
  return request({
    url: `${baseApi}/get-patient-consent-list-with-status/${patientId}/${projectId}`,
    method: `get`
  })
}

function getConsentStatusListPId(patientId){
  return request({
    url: `${baseApi}/get-patient-consent-list-with-status-pId/${patientId}`,
    method: `get`
  })
}

function getWithoutConsent(projectId){
  return request({
    url:`${baseApi}/get-wihtout-consent/${projectId}`,
    method:`get`
  })
}

function checkConsentCreated(projectId){
  return request({
    url:`${baseApi}/check-consent/${projectId}`,
    method:`get`
  })
}

function getDonors(isDonor)
{
  return request({
    url:`${baseApi}/getDonors/${isDonor}`,
    method:`get`
  })
}
// 
function getDonorStudies(params={}){
  return request({
    url : `${baseApi}/get-donor-studies`,
    params,
  })
}
// 
function getDonorDocuments(params={}){
  return request({
    url :  `${baseApi}/get-donor-documents`,
    params,
  })
}

function withDrawStudies(data){
  return request({
    url : `${baseApi}/withdraw-donor-studies`,
    data,
    method: 'PUT'
  })
}

function withDrawDocuments(data){
  return request({
    url: `${baseApi}/with-draw-donor-documents`,
    data,
    method : 'PUT'
  })
}

function search(params = {}){
  return request({
    url: `${baseApi}/searchWithoutConsent`,
    params
  })
}

function searchWithStatus(name,id){
  return request({
    url: `${baseApi}/searchWithStatus/${name}/${id}`,
    method: 'GET'
  })
}
// 
function getStudies(params={}){
  return request({
    url : `${baseApi}/get-studies`,
    params,
  })
}
// 
function getDonorInstitutions(params={}){
  return request({
    url : `${baseApi}/get-donor-institutions`,
    params,
  })
}

function getWithoutRejectedConsent(projectGuid){
  return request({
    url : `${baseApi}/get-patient-without-rejected-consent/${projectGuid}`,
    method: 'GET'
  })
}
// 
function optOutFromCountry(data){
  return request({
    url : `${baseApi}/opt-out`,
    data,
    method: 'PUT'
  })
}

function searchPatient(params = {}) {
  return request({
    url: `${baseApi}/search`,
    params,
  })
}

function searchDocuments(params = {}) {
  return request({
    url: `${baseApi}/search-donor-documents`,
    params,
  })
}
// 
function searchInstitutions(params={}){
  return request({
    url: `${baseApi}/search-donor-institutions`,
    params,
  })
}

function getWithAllAcceptedConsent(patientId, projectId){
  return request({
    url: `${baseApi}/get-with-all-accepted-consent/${patientId}/${projectId}`,
    method: 'GET'
  })
}
// 
function getPendingConsent(params={}){
  return request({
    url : `${baseApi}/get-pending-consent`,
    params,
  })
}

function getPendingProjects(isDonor, id){
  return request({
    url : `${baseApi}/get-with-pending-projects/${isDonor}/${id}`,
    method : 'GET'
  })
}
const PatientServices = {
  create,
  update,
  getById,
  get,
  getMapInfo,
  destroy,
  search,
  projectPatientAssignment,
  getWithStatus,
  getConsentStatusList,
  getWithoutConsent,
  getWithStatusProcessing,
  getDonors,
  getDonorStudies,
  getDonorDocuments,
  withDrawStudies,
  withDrawDocuments,
  searchWithStatus,
  getStudies,
  getDonorInstitutions,
  getWithoutRejectedConsent,
  optOutFromCountry,
  searchPatient,
  searchDocuments,
  searchInstitutions,
  getWithAllAcceptedConsent,
  getPendingConsent,
  projectConsentPatientAssignment,
  checkConsentCreated,
  getPendingProjects,
  getConsentStatusListPId
}

export default PatientServices
