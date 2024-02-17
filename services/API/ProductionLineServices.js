import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/ProductionLine`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}

function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,

  })
}

function update(id, data) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'PUT',
    data,
  })
}

const ProductionLineService = {
  get,
  getById,
  create,
  update
}

export default ProductionLineService
