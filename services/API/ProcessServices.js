import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/process`

function create(data){
    return request({
        url : `${baseApi}`,
        data,
        method : 'POST'
    })
}
function sendProcessApprovalManager(projId){
    return request({
        url : `${baseApi}/sendProcessApprovalManager/${projId}`,
        method : 'GET'
    })
}
function processApproval(data){
    return request({
        url : `${baseApi}/submitProcessApproval`,
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
function updateSatges(data){
    return request({
        url : `${baseApi}/updateStages`,
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
function deleteByProcessId(id){
    return request({
        url: `${baseApi}/${id}`,
        method : 'DELETE'
    })
}
function getAllProcess(id){
    return request({
        url: `${baseApi}/fetchAllProcess/${id}`,
        method : 'GET'
    })
}
function isProcessExist(inpt,id){
    return request({
        url: `${baseApi}/isProcessExist/${inpt}/${id}`,
        method : 'GET'
    })
}
function fetchAllProcessByGroup(){
    return request({
        url: `${baseApi}/fetchAllProcessByGroup`,
        method : 'GET'
    })
}
function getAllProcessBySample(id){
    return request({
        url: `${baseApi}/fetchAllProcessBySample/${id}`,
        method : 'GET'
    })
}
function fetchAllStepsByProjProcId(sId,procId){
    return request({
        url: `${baseApi}/fetchAllStepsByProjProcId/${sId}/${procId}`,
        method : 'GET'
    })
}

const ProcessServices  = {
    create,
    getById,
    deleteByProcessId,
    getAllProcess,
    getAllProcessBySample,
    update,
    updateSatges,
    processApproval,
    fetchAllProcessByGroup,
    sendProcessApprovalManager,
    fetchAllStepsByProjProcId,
    isProcessExist
}

export default ProcessServices