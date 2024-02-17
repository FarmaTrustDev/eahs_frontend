import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/equipment`

function get(){
    return request({
        url: `${baseApi}`,
        method : 'GET'
    })
}

function create(data){
    return request({
        url: `${baseApi}`,
        data,
        method : 'POST'
    })
}

function getById(id){
    return request({
        url: `${baseApi}/${id}`,
        method: 'GET'
    })
}

function softDelete(id){
    return request({
        url: `${baseApi}/${id}`,
        method: 'DELETE'
    })
}

function updateEquipment(data){
    return request({
        url : `${baseApi}`,
        data,
        method : 'PUT'
    })
}

const EquipmentServices = {
    get,
    create,
    getById,
    softDelete,
    updateEquipment
}
export default EquipmentServices