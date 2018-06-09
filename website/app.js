import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import Doc from './doc';
import './static/main.scss';

ReactDOM.render(
    <Fragment>
      {/* <Home></Home> */}
      <Doc></Doc>
    </Fragment>
  ,
  document.getElementById('root')
);
