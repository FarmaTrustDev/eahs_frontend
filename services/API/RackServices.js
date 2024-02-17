import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/shelfRacks`

function create(data){
    return request({
        url : `${baseApi}`,
        data,
        method : 'POST'
    })
}
function updateRack(data){
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
function getRackById(id){
    return request({
        url: `${baseApi}/getByRackId/${id}`,
        method : 'GET'
    })
}
function getByShelfId(id){
    return request({
        url : `${baseApi}/get-by-shelf-id/${id}`,
        method : 'GET'
    })
}
function editRack(id){
    return request({
        url : `${baseApi}/${id}`,
        method : 'GET'
    })
}
function deleteRack(id){
    return request({
        url : `${baseApi}/${id}`,
        method : 'DELETE'
    })
}

const RackServices = {
    create,
    get,
    getByShelfId,
    deleteRack,
    editRack,
    updateRack,
    getRackById
}

export default RackServices