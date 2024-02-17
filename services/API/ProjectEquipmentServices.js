import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/projectEquipment`

function create(data){
    return request({
        url: `${baseApi}`,
        data,
        method : 'POST'
    })
}

const ProjectEquipmentServices = {
    create,
}

export default ProjectEquipmentServices