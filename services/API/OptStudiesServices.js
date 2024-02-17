import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/OptStudies`

function create(data){
    return request({
        url : `${baseApi}`,
        data,
        method: 'POST'
    })
}

function get(id){
    return request({
        url: `${baseApi}/${id}`,
        method: 'GET'
    })
}

const OptStudiesServices = {
    create,
    get
}

export default OptStudiesServices