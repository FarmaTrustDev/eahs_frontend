import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/futureStudies`

function get(){
    return request({
        url: `${baseApi}`,
        method : 'GET'
    })
}

const FutureStudiesServices = {
    get
}

export default FutureStudiesServices