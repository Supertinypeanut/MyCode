import React from 'react';
import {addNum, subNum, toggleTodo} from './store/action/'

function App(props) {
  const { store } = props
  return (
    <div className="App">
      <h1>App</h1>
      <div>
        <span>{store.getState().num1}</span>
        <button value="+" onClick={()=>store.dispatch(addNum('num1'))} >+</button>
        <button onClick={()=>store.dispatch(subNum('num1'))} >-</button>
        <button onClick={()=>store.dispatch(toggleTodo('num1'))} >async action +</button>
      </div>
      <div>
        <span>{store.getState().num2}</span>
        <button value="+" onClick={()=>store.dispatch(addNum('num2'))} >+</button>
        <button onClick={()=>store.dispatch(subNum('num2'))} >-</button>
        <button onClick={()=>store.dispatch(toggleTodo('num2'))} >async action +</button>
      </div>
      <div>
        <span>{store.getState().num3}</span>
        <button value="+" onClick={()=>store.dispatch(addNum('num3'))} >+</button>
        <button onClick={()=>store.dispatch(subNum('num3'))} >-</button>
        <button onClick={()=>store.dispatch(toggleTodo('num3'))} >async action +</button>
      </div>
    </div>
  );
}

export default App;
