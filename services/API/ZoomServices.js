import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/zoom`

function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

const ZoomServices = {
  create
}

export default ZoomServices
