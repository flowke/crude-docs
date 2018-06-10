import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Frame from './layout/mainFrame';
import './static/home.scss';
import './static/main.scss';

class Home extends Component{
  constructor(props){
      super(props);
  }

  render(){
    return (
      <Frame>
        首页内容
      </Frame>
    )
  }
}

ReactDOM.render(
  <Home></Home>,
  document.getElementById('root')
);
