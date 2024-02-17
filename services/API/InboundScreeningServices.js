import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/inboundScreening`

function getAll(){
    return request({
        url: `${baseApi}`,
        method: 'GET'
    })
}

function create(data){
    return request({
        url: `${baseApi}`,
        data,
        method: 'POST'
    })
}

const InboundScreeningServices = {
    getAll,
    create
}

export default InboundScreeningServices