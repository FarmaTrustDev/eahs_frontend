import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/step`

function create(data){
    return request({
        url: `${baseApi}`,
        method : 'POST',
        data,
    })
}
function updateStep(data){
    return request({
        url: `${baseApi}`,
        method : 'PUT',
        data,
    })
}

function get(){
    return request({
        url : `${baseApi}`,
        method : 'GET'
    })
}

function getStepQuestion(id,samplId){
    return request({
        url : `${baseApi}/getStepQuestions/${id}/${samplId}`,
        method : 'GET'
    })
}
function getStepQuestionByStepId(id){
    return request({
        url : `${baseApi}/getStepQuestionsByStepId/${id}`,
        method : 'GET'
    })
}

function getByProcessId(id){
    return request({
        url : `${baseApi}/get-by-process-id/${id}`,
        method : 'GET'
    })
}
function checkStepWithStage(procid,name){
    return request({
        url : `${baseApi}/checkStepWithStage/${procid}/${name}`,
        method : 'GET'
    })
}
function editStep(id){
    return request({
        url : `${baseApi}/${id}`,
        method : 'GET'
    })
}
function deleteStep(id){
    return request({
        url : `${baseApi}/${id}`,
        method : 'DELETE'
    })
}

const StepServices = {
    create,
    get,
    getByProcessId,
    deleteStep,
    editStep,
    updateStep,
    getStepQuestion,
    checkStepWithStage,
    getStepQuestionByStepId
}

export default StepServices