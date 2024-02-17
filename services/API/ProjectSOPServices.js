import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/projectSOP`

function create(data){
    return request({
        url: `${baseApi}`,
        data,
        method : 'POST'
    })
}

const ProjectSOPServices = {
    create,
}

export default ProjectSOPServices