import state from '../state'
import actionType from '../action/actionType.js'

const reducer = (oldState = state, action) => {
    switch (action.type) {
        case actionType.ADD_NUM:
            const newState1 = Object.assign({}, oldState)
            newState1[action.params]++
            return newState1
        case actionType.SUB_NUM:
            const newState2 = Object.assign({}, oldState)
            newState2[action.params]--
            return newState2
        // case actionType.TOGGLE_TODO:
        //     const newState3 =  Object.assign({}, oldState)

        //     return
        default:
            return oldState
    }
}

export default reducer