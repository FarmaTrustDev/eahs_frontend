import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/sampleConsentScreening`


function create(data){
    return request({
        url: `${baseApi}`,
        data,
        method: 'POST'
    })
}

const SampleConsentScreeningServies = {
    create
}

export default SampleConsentScreeningServies