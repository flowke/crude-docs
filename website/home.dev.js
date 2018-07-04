import ReactDOM from 'react-dom';
import React from 'react';
import Home from './home';

ReactDOM.render(
  <Home {...INITDATA}></Home>,
  document.getElementById('root')
);

if(module.hot){
  module.hot.accept()
}
