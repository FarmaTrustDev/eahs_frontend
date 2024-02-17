import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/project`

function get() {
  return request({
    url: `${baseApi}`,
    method: 'GET',
  })
}

function getAdminProject() {
  return request({
    url: `${baseApi}/getAdminProject`,
    method: 'GET',
  })
}
function fetchProjectOtherUser() {
  return request({
    url: `${baseApi}/getProjectUserWise`,
    method: 'GET',
  })
}
function getPendingProjects() {
  return request({
    url: `${baseApi}/getAllPendingProject`,
    method: 'GET',
  })
}
function getProjectBySearch(input) {
  return request({
    url: `${baseApi}/getProjectBySearch/${input}`,
    method: 'GET',
  })
}

function search(params = {}) {
  return request({
    url: `${baseApi}/search`,
    params,
  })
}

function addNew(data){
  return request({
    url: `${baseApi}/create`,
    data,
    method: 'POST'
  })
}

function getDetail(){
  return request({
    url: `${baseApi}/get`,
    method: 'GET',
  })
}
function getAllInvestigatorProject(){
  return request({
    url: `${baseApi}/getAllInvestigatorProject`,
    method: 'GET',
  })
}
function getAllPartnerProject(){
  return request({
    url: `${baseApi}/getAllPartnerProject`,
    method: 'GET',
  })
}

function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

function getWithOrgId(){
  return request({
    url: `${baseApi}/getWithOrgId`,
    method: 'GET'   
  })
}

function update(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'PUT',
    data,
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}
function submitProjectApproval(id,inpt) {
  return request({
    url: `${baseApi}/${id}/${inpt}`,
    method: 'GET'
  })
}

function isProjectExist(name) {
  return request({
    url: `${baseApi}/isProjectExist/${name}`,
  })
}

function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}

const ProjectServices = {
  create,
  update,
  getById,
  get,
  destroy,
  search,
  addNew,
  getDetail,
  getAllInvestigatorProject,
  getAllPartnerProject,
  getAdminProject,
  getWithOrgId,
  isProjectExist,
  getProjectBySearch,
  submitProjectApproval,
  getPendingProjects,
  fetchProjectOtherUser
}

export default ProjectServices
