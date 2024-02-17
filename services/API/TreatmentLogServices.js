import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/treatmentLog`
function GetLastActionByTreatmentId(id) {
    return request({
      url: `${baseApi}/GetLastActionByTreatmentId/${id}`,
    })
  }

const TreatmentLogServices = {
    GetLastActionByTreatmentId
}

export default TreatmentLogServices