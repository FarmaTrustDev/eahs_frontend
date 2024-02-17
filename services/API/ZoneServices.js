import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/siteZone`

function create(data){
    return request({
        url : `${baseApi}`,
        data,
        method : 'POST'
    })
}
function updateZone(data){
    return request({
        url: `${baseApi}`,
        method : 'PUT',
        data,
    })
}

function get(){
    return request({
        url : `${baseApi}`,
        method : 'GET'
    })
}
function getZoneById(id){
    return request({
        url: `${baseApi}/getByZoneId/${id}`,
        method : 'GET'
    })
}
function getBySiteId(id){
    return request({
        url : `${baseApi}/get-by-site-id/${id}`,
        method : 'GET'
    })
}
function editZone(id){
    return request({
        url : `${baseApi}/${id}`,
        method : 'GET'
    })
}
function deleteZone(id){
    return request({
        url : `${baseApi}/${id}`,
        method : 'DELETE'
    })
}
function getPending(id){
    return request({
        url : `${baseApi}/get-pending/${id}`,
        method : 'GET'
    })
}
function approval(data){
    return request({
        url : `${baseApi}/approval`,
        data,
        method : 'POST'
    })
}

const ZoneServices = {
    create,
    get,
    getBySiteId,
    deleteZone,
    editZone,
    updateZone,
    getZoneById,
    getPending,
    approval
}

export default ZoneServices