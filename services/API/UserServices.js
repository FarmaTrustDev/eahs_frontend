import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/user`

function detail(data) {
  return request({
    url: `${baseApi}/details`,
    data,
  })
}
function adminMenu(data) {
  return request({
    url: `${baseApi}/adminMenu`,
    data,
  })
}

function verify(data){
  return request({
    url: `${baseApi}/signature`,
    data,
    method: 'POST',
  })
}

function otherMenu(data) {
  return request({
    url: `${baseApi}/otherMenu`,
    data,
  })
}

function users() {
  return request({
    url: `${baseApi}/users`,
  })
}
function hospitals() {
  return request({
    url: `${baseApi}/hospitals`,
  })
}

function adminSubMenus() {
  return request({
    url: `${baseApi}/admin-menus`,
  })
}

function profile() {
  return request({
    url: `${baseApi}/profile`,
  })
}
function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}
function getUser() {
  return request({
    url: `${baseApi}/organizationSpecificUsers`,
  })
}
function getSearchUser(params = {}) {
  return request({
    url: `${baseApi}/search`,
    params,
  })
}
function getAllUsers(){
  return request({
    url: `${baseApi}/getAllUsers`
  })
}
function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}
function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}
function update(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    data,
    method: 'PATCH',
  })
}
function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}

function test(params = {}) {
  return request({
    url: `${baseApi}/test`,
    params,
  })
}

function getByBagId(bagId) {
  return request({
    url: `${baseApi}/bag-puid/${bagId}`

  })
}
function activateAccount(id, data) {
  return request({
    url: `${baseApi}/send-email/${id}`,
    data,
    method: 'POST',
  })
}

function resetPassword(id, data) {
  return request({
    url: `${baseApi}/reset-password/${id}`,
    data,
    method: 'PATCH',
  })
}

function resetPasswordEmail(data){
  return request({
    url: `${baseApi}/reset-password-email`,
    data,
    method: 'POST',
  })
}

function sendEmailToHospitals(data){
  return request({
    url: `${baseApi}/send-email-to-hospitals`,
    data,
    method: 'POST',
  })
}

function basicDetail(){
  return request({
    url: `${baseApi}/basic-detail`,
  })
}

function userWithOrganizationTypeId(params = {}) {
  return request({
    url: `${baseApi}/user-with-organization-type-id`,
    params,
  })
}

const UserServices = {
  detail,
  adminMenu,
  otherMenu,
  adminSubMenus,
  users,
  hospitals,
  profile,
  create,
  getById,
  update,
  destroy,
  get,
  getUser,
  getByBagId,
  getAllUsers,
  test,
  activateAccount,
  resetPassword,
  resetPasswordEmail,
  getSearchUser,
  sendEmailToHospitals,
  basicDetail,
  userWithOrganizationTypeId,
  verify
}

export default UserServices
