import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/sOP`

function create(data){
    return request({
        url: `${baseApi}`,
        data,
        method: 'POST'
    })
}

function get(){
    return request({
        url : `${baseApi}`,
        method: 'GET'
    })
}

function getById(id){
    return request({
        url: `${baseApi}/GetById/${id}`,
        method: 'GET'
    })
}

function remove(id){
    return request({
        url: `${baseApi}/${id}`,
        method: 'DELETE'
    })
}

const SOPServices = {
    create,
    get,
    getById,
    remove
}

export default SOPServices