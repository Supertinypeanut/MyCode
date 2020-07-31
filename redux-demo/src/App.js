import React from 'react';
import { connect } from 'react-redux'
import {addNum, subNum, toggleTodo} from './store/action/'

/**
 * redux
*/
// function App(props) {
//   const { store } = props
//   return (
//     <div className="App">
//       <h1>App</h1>
//       <div>
//         <span>{store.getState().num1}</span>
//         <button value="+" onClick={()=>store.dispatch(addNum('num1'))} >+</button>
//         <button onClick={()=>store.dispatch(subNum('num1'))} >-</button>
//         <button onClick={()=>store.dispatch(toggleTodo('num1'))} >async action +</button>
//       </div>
//       <div>
//         <span>{store.getState().num2}</span>
//         <button value="+" onClick={()=>store.dispatch(addNum('num2'))} >+</button>
//         <button onClick={()=>store.dispatch(subNum('num2'))} >-</button>
//         <button onClick={()=>store.dispatch(toggleTodo('num2'))} >async action +</button>
//       </div>
//       <div>
//         <span>{store.getState().num3}</span>
//         <button value="+" onClick={()=>store.dispatch(addNum('num3'))} >+</button>
//         <button onClick={()=>store.dispatch(subNum('num3'))} >-</button>
//         <button onClick={()=>store.dispatch(toggleTodo('num3'))} >async action +</button>
//       </div>
//     </div>
//   );
// }

/**
 * react-redux
*/
function App(props) {
  const { state, add, sub, toggle } = props
  const num = ['num1','num2', 'num3']
  return (
    <div className="App">
      <h1>App</h1>
      {num.map(item => (
        <div key={item}>
          <span>{state[item]}</span>
          <button value="+" onClick={()=>add(item)} >+</button>
          <button onClick={()=>sub(item)} >-</button>
          <button onClick={()=>toggle(item)} >async action +</button>
        </div>
      ))}
    </div>
  );
}
const mapStateToProps = (state, ownProps)=> {
  // console.log(state,ownProps)
  return {
    state
  }
}

const mapDispatchToProps = (dispatch, ownProps)=> {
  return {
    add(item){
      dispatch(addNum(item))
    },
    sub(item){
      dispatch(subNum(item))
    },
    toggle(item){
      dispatch(toggleTodo(item))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
