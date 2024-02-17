import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/statistics`

function treatment(id) {
  return request({
    url: `${baseApi}/treatment/${id}`,
  })
}


const StatisticsServices = {
  treatment
}

export default StatisticsServices
