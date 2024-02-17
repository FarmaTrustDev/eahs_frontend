import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/FridgeShelves`

function create(data){
    return request({
        url : `${baseApi}`,
        data,
        method : 'POST'
    })
}
function update(data){
    return request({
        url : `${baseApi}`,
        data,
        method : 'PUT'
    })
}

function getById(id){
    return request({
        url: `${baseApi}/${id}`,
        method : 'GET'
    })
}
function deleteShelf(id){
    return request({
        url: `${baseApi}/${id}`,
        method : 'DELETE'
    })
}
function getShelfById(id){
    return request({
        url: `${baseApi}/getByShelfId/${id}`,
        method : 'GET'
    })
}
function getAllShelf(id){
    return request({
        url: `${baseApi}/fetchAllShelf/${id}`,
        method : 'GET'
    })
}
function getAllShelfByFridgeId(id){
    return request({
        url: `${baseApi}/fetchAllShelfByFridgeId/${id}`,
        method : 'GET'
    })
}

function getPendingShelves(id){
    return request({
        url: `${baseApi}/getPendingShelves/${id}`,
        method : 'GET'
    })
}

function approval(data){
    return request({
      url : `${baseApi}/approval`,
      data,
      method: 'POST'
    })
  }

const ShelfServices  = {
    create,
    getById,
    getAllShelf,
    getAllShelfByFridgeId,
    getShelfById,
    update,
    deleteShelf,
    getPendingShelves,
    approval
}

export default ShelfServices