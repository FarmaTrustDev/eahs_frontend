import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/translation`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}

function getTranslation(){
  return request({
    url: `${baseApi}/translate`,
  })
}

function getTranslationFile(){
  return request({
    url: `${baseApi}/getTranslations`,
    responseType: 'blob',
    method:'get'
  })
}
const TranslationServices = {
  get,
  getTranslation,
  getTranslationFile,
}

export default TranslationServices
