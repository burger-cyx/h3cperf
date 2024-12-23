import http from './axios'

export const getModelList = (json) => {
    return http.request({
        url: '/model/list',
        method: 'post',
        data: json
    })
}

export const getModelById = (id) => {
    return http.request({
        url: '/model/get',
        method: 'get',
        params: {
            "id": id
        }
    })
}

export const addModel = (json) => {
    return http.request({
        url: '/model/add',
        method: 'post',
        data: json
    })
}


export const getDatasetList = (json) => {
    return http.request({
        url: '/dataset/list',
        method: 'post',
        data: json
    })
}

export const getDatasetById = (id) => {
    return http.request({
        url: '/dataset/get',
        method: 'get',
        params: {
            "id": id
        }
    })
}

export const addDataset = (json) => {
    return http.request({
        url: '/dataset/add',
        method: 'post',
        data: json
    })
}

export const inferTaskAdd = (json) => {
    return http.request({
        url: 'infer/task/add',
        method: 'post',
        data: json
    })
}

export const inferTaskList = (json) => {
    return http.request({
        url: 'infer/task/list',
        method: 'post',
        data: json
    })
}

export const inferTaskExec = (json) => {
    return http.request({
        url: 'infer/task/exec',
        method: 'post',
        data: json
    })
}

export const trainTaskList = (json) => {
    return http.request({
        url: 'train/task/list',
        method: 'post',
        data: json
    })
}

export const inferTaskDelete = (json) => {
    return http.request({
        url: 'infer/task/delete',
        method: 'post',
        data: json
    })
}
export const trainTaskDelete = (json) => {
    return http.request({
        url: 'train/task/delete',
        method: 'post',
        data: json
    })
}

export const inferReportGet = (id) => {
    return http.request({
        url: 'infer/report/get',
        method: 'get',
        params: {
            "id": id
        }
    })
}

export const deleteInferReport = (json) => {
    return http.request({
        url: 'infer/report/delete',
        method: 'post',
        data: json
    })
}

export const trainTaskAdd = (json) => {
    return http.request({
        url: 'train/task/add',
        method: 'post',
        data: json
    })
}



export const getTrainTaskById = (id) => {
    return http.request({
        url: '/train/task/get',
        method: 'get',
        params: {
            "id": id
        }
    })
}

export const trainTaskExec = (json) => {
    return http.request({
        url: 'train/task/exec',
        method: 'post',
        data: json
    })
}

export const trainReportGet = (id) => {
    return http.request({
        url: 'train/report/get',
        method: 'get',
        params: {
            "id": id
        }
    })
}

export const deleteTrainReport = (json) => {
    return http.request({
        url: 'train/report/delete',
        method: 'post',
        data: json
    })
}


export const getInferTpl = () => {
    return http.request({
        url: '/template/list',
        method: 'post',
        data: {
            page: 1,
            size: 10,
            filter: {tag: "infer"},
            fuzzy: {}
          }
    })
}

export const getTrainTpl = () => {
    return http.request({
        url: '/template/list',
        method: 'post',
        data: {
            page: 1,
            size: 10,
            filter: {tag: "train"},
            fuzzy: {}
          }
    })
}

export const getTplById = (id) => {
    return http.request({
        url: '/template/config',
        method: 'get',
        params: {
            "id": id
        }
    })
}

export const getEnvList = () => {
    return http.request({
        url: '/runtime/list',
        method: 'post',
        data: {
            page: 1,
            size: 10,
            filter: {},
            fuzzy: {}
          }
    })
}

export const inferTaskCheck = (tpl_id, task_name) => {
    return http.request({
        url: '/infer/task/check',
        method: 'get',
        params: {
            "template_id": tpl_id,
            "name": task_name
        }
    })
}

export const trainTaskCheck = (tpl_id, task_name) => {
    return http.request({
        url: '/train/task/check',
        method: 'get',
        params: {
            "template_id": tpl_id,
            "name": task_name
        }
    })
}

export const modelCheck = (name) => {
    return http.request({
        url: '/model/check',
        method: 'get',
        params: {
            "name":name
        }
    })
}

export const datasetCheck = (name) => {
    return http.request({
        url: '/dataset/check',
        method: 'get',
        params: {
            "name":name
        }
    })
}