import ReactDOM from 'react-dom';
import Doc from './docs';
import React from 'react';

ReactDOM.render(
  <Doc {...INITDATA}></Doc>,
  document.getElementById('root')
);


if(module.hot){
  module.hot.accept()
}
