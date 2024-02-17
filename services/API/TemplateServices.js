import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/template`

function create(data){
  return request({
      url : `${baseApi}`,
      data,
      method : 'POST'
  })
}

function getById(id){
  return request({
      url: `${baseApi}/${id}`,
      method : 'GET'
  })
}

function get(){
  return request({
      url: `${baseApi}`,
      method : 'GET'
  })
}

function fetchTemplates(){
  return request({
      url: `${baseApi}/fetchTemplates`,
      method : 'GET'
  })
}
function fetchAllLabelsByTemplateId(id){
  return request({
      url: `${baseApi}/fetchAllLabelsByTemplateId/${id}`,
      method : 'GET'
  })
}
function getPending(){
  return request({
      url: `${baseApi}/get-pending`,
      method : 'GET'
  })
}
function getAccepted(){
  return request({
      url: `${baseApi}/get-accepted`,
      method : 'GET'
  })
}

function getRejected(){
  return request({
      url: `${baseApi}/get-rejected`,
      method : 'GET'
  })
}
function approval(data){
  return request({
      url: `${baseApi}/approval`,
      data,
      method : 'POST'
  })
}

function update(data){
  return request({
    url : `${baseApi}`,
    data,
    method : 'PUT'
})
}
const LabelServices = {
  create,
  getById,
  fetchTemplates,
  fetchAllLabelsByTemplateId,
  getPending,
  approval,
  get,
  getAccepted,
  getRejected,
  update
}

export default LabelServices
