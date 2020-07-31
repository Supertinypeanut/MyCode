import actionType from './actionType'

export const addNum = params => {
    return {
        type: actionType.ADD_NUM,
        params
    }
}
export const subNum = params => {
    return {
        type: actionType.SUB_NUM,
        params
    }
}

// 异步action
export const toggleTodo = params => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(addNum(params))
        }, 2000)
    }
}

