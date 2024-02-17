import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/consent`

function get() {
  return request({
    url: `${baseApi}`,
    method: 'GET',
  })
}
function getConsentWithProjectStatus(id) {
  return request({
    url: `${baseApi}/getAllConsentWithProjectConsentStatus/${id}`,
    method: 'GET',
  })
}
function getPendingConsent() {
  return request({
    url: `${baseApi}/getAllPendingConsent`,
    method: 'GET',
  })
}
function getBySearch(name,id) {
  return request({
    url: `${baseApi}/search/${name}/${id}`,
    method: 'GET',
  })
}
function checkExistConsent(name) {
  return request({
    url: `${baseApi}/isExistConsent/${name}`,
    method: 'GET',
  })
}

function search(params = {}) {
  return request({
    url: `${baseApi}/search`,
    params,
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
  return request({
    url: `${baseApi}/${id}`,
    method: 'PATCH',
    data,
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

function getByIdS(id,pCSID,projId) {
  return request({
    url: `${baseApi}/getDa/${id}/${pCSID}/${projId}`,
    method:'GET'
  })
}

function submitConsentForm(id,staName){
  return request({
    url: `${baseApi}/${id}/${staName}`,
    method: 'POST'
  })
}
function submitConsentApproval(data){
  return request({
    url: `${baseApi}/consentApproval`,
    data,
    method: 'POST'
  })
}
function sendEmailConsentApproval(id,pId,staName){
  return request({
    url: `${baseApi}/sendEmailForConsentApproval/${id}/${pId}/${staName}`,
    method: 'POST'
  })
}

function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}
function exports(id,staName) {
  return request({
    url: `${baseApi}/expo/${id}/${staName}`,
    method: 'GET',
    responseType: 'blob',
  })
}
const ConsentServices = {
  create,
  update,
  getById,
  get,
  getBySearch,
  destroy,
  search,
  submitConsentForm,
  submitConsentApproval,
  sendEmailConsentApproval,
  exports,
  getByIdS,
  getPendingConsent,
  getConsentWithProjectStatus,
  checkExistConsent
}

export default ConsentServices
