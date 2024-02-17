import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/SOPResult`

function create(data){
    return request({
        url: `${baseApi}`,
        data,
        method: 'POST'
    })
}

function getAll(){
    return request({
        url : `${baseApi}`,
        method: 'GET'
    })
}

function getById(id){
    return request({
        url: `${baseApi}/${id}`,
        method: 'GET'
    })
}

const SOPResultServices = {
    create,
    getAll,
    getById
}

export default SOPResultServices