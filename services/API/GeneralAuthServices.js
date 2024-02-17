import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/generalAuth`

function getById(id,projectCPId) {
    return request({
      url: `${baseApi}/get/${id}/${projectCPId}`,
      method: 'GET'
    })
  }

  function patientProjectConsentStatus(data){
    return request({
        url: `${baseApi}/patient-project-consent-status`,
        data,
        method: 'POST'
    })
}

const GeneralAuthServices = {
    getById,
    patientProjectConsentStatus
}

export default GeneralAuthServices