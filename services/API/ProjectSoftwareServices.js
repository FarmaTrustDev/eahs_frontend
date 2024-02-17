import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/projectSoftware`

function create(data){
    return request({
        url: `${baseApi}`,
        data,
        method : 'POST'
    })
}

const ProjectSoftwareServices = {
    create,
}

export default ProjectSoftwareServices