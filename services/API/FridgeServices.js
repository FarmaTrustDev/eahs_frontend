import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/fridge`

function get() {
  return request({
    url: `${baseApi}`,
    method: 'GET'
  })
}
function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'GET'
  })
}
function deleteFridge(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE'
  })
}

function create(data) {
  return request({
      url: `${baseApi}`,
      data,
      method: 'POST'
  })
}

function update(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    data,
    method: 'PATCH',
  })
}

function getFridgeTypes() {
  return request({
    url: `${baseApi}/getFridgeTypes`,
    method: 'GET',
  })
}

function getAllFridgesBySiteANDFTypeId(id, fridgeTypeId) {
  return request({
    url: `${baseApi}/getAllFridgesBySiteANDFTypeId/${id}/${fridgeTypeId}`,
    method: 'GET',
  })
}

function getAllFridgesBySiteId(id) {
  return request({
    url: `${baseApi}/getAllFridgesBySiteId/${id}`,
    method: 'GET',
  })
}

function getAllRacksByFridgeId(id) {
  return request({
    url: `${baseApi}/getAllRacksByFridgeId/${id}`,
    method: 'GET',
  })
}
function getAllRacksByFridgeSampleId(sampleId, fridgeId) {
  return request({
    url: `${baseApi}/getAllRacksByFridgeSampleId/${sampleId}/${fridgeId}`,
    method: 'GET',
  })
}
function getAllFridgesByLabId(id){
  return request({
    url: `${baseApi}/getAllFridgesByLabId/${id}`,
    method: 'GET',
  })
}
function getPending(){
  return request({
    url: `${baseApi}/get-pending`,
    method: 'GET'
  })
}

function getAccepted(){
  return request({
    url: `${baseApi}/get-accepted`,
    method: 'GET'
  })
}

function getRejected(){
  return request({
    url: `${baseApi}/get-rejected`,
    method: 'GET'
  })
}

const FridgeServices = {
  get,
  create,
  getById,
  update,
  deleteFridge,
  getFridgeTypes,
  getAllFridgesBySiteId,
  getAllRacksByFridgeId,
  getAllRacksByFridgeSampleId,
  getAllFridgesBySiteANDFTypeId,
  getPending,
  getAccepted,
  getRejected,
  getAllFridgesByLabId
}

export default FridgeServices
