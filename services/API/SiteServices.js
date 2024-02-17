import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/site`

function create(data){
    return request({
        url : `${baseApi}`,
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

function remove(id){
    return request({
        url : `${baseApi}/${id}`,
        method : 'DELETE'
    })
}

function getById(id){
    return request({
        url: `${baseApi}/${id}`,
        method : 'GET'
    })
}
function getSiteById(id){
    return request({
        url: `${baseApi}/getBySiteId/${id}`,
        method : 'GET'
    })
}
function getAllSite(id){
    return request({
        url: `${baseApi}/fetchAllSite/${id}`,
        method : 'GET'
    })
}
function getAllSites(){
    return request({
        url: `${baseApi}/getAllSites`,
        method : 'GET'
    })
}
function getAllSiteByLabId(id){
    return request({
        url: `${baseApi}/fetchAllSiteByLabId/${id}`,
        method : 'GET'
    })
}
function getPending(lId){
    return request({
        url: `${baseApi}/get-pending/${lId}`,
        method: 'GET'
    })
}
function approval(data){
    return request({
        url : `${baseApi}/approval`,
        data,
        method: 'POST'
    })
}

function getAllSiteByFridgeId(id){
    return request({
        url : `${baseApi}/getAllSiteByFridgeTypeId/${id}`,
        method: 'GET'
    })
}

const SiteServices  = {
    create,
    update,
    getById,
    getAllSite,
    getAllSiteByLabId,
    getSiteById,
    getAllSites,
    remove,
    getPending,
    approval,
    getAllSiteByFridgeId
}

export default SiteServices