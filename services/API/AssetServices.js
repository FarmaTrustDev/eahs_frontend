import requestBlyott from '../requestBlyott'
import request from '../request'
import { BASE_API } from '../Constant'

const baseBlyottApi = `https://api.blyott.com`
const baseApi = `${BASE_API}/asset`

function getAllLocations(data) {
  return requestBlyott({
    url: `${baseBlyottApi}/assets`,
    data,
    method: 'POST',
  })
}

function fetchAssetsFromCGTBlyott() {
  return request({
    url: `${baseApi}`,
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

function createBlyott(data) {
  return requestBlyott({
    url: `${baseBlyottApi}/asset`,
    data,
    method: 'POST',
  })
}

function fetchBlyottAssetByCode(code){
  return requestBlyott({
    url: `${baseBlyottApi}/assetDetails/${code}`,
    method: 'GET',
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'GET',
  })
}

function updateBlyott(data) {
  return requestBlyott({
    url: `${baseBlyottApi}/asset`,
    data,
    method: 'PUT',
  })
}

function update(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'PUT',
  })
}

function startUsingAsset(data) {
  return request({
    url: `${baseApi}/startUsingAsset`,
    data,
    method: 'PUT',
  })
}

function tagAllocation(data) {
  return request({
    url: `${baseApi}/tagAllocation`,
    data,
    method: 'PUT',
  })
}

function decommission(data) {
  return request({
    url: `${baseApi}/decommission`,
    data,
    method: 'PUT',
  })
}

function GetAssetByLocation() {
  return request({
    url: `${baseApi}/assetByLocation`,
    method: 'GET',
  })
}

function GetAssetSummary() {
  return request({
    url: `${baseApi}/summaryByAsset`,
    method: 'GET',
  })
}


function GetSingleAsset(id) {
  return request({
    url: `${baseApi}/singleAsset/${id}`,
    method: 'GET',
  })
}

function GetDetailAsset(id) {
  return request({
    url: `${baseApi}/detailAssetReport/${id}`,
    method: 'GET',
  })
}
/*
function update(data) {
  return request({
    url: `${baseApi}`,
    method: 'Put',
    data,
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

function getNotification(ticket) {
  return request({
    url: `${baseApi}/get-notification-by-ticket/${ticket}`,
  })
}

function getByGUId(id) {
  return request({
    url: `${baseApi}/get-by-guid/${id}`,
  })
}

function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}

function postNotification(data) {
  return request({
    url: `${baseApi}/add-notification`,
    data,
    method: 'POST',
  })
} */

const AssetServices = {
    getAllLocations,
    create,
    createBlyott,
    fetchAssetsFromCGTBlyott,
    getById,
    fetchBlyottAssetByCode,
    updateBlyott,
    update,
    GetAssetByLocation,
    GetAssetSummary,
    GetSingleAsset,
    GetDetailAsset,
    decommission,
    startUsingAsset,
    tagAllocation
  /* update,
  getById,
  get,
  destroy,
  getByGUId,
  getNotification,
  postNotification */
}

export default AssetServices
