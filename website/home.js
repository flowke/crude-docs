import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Frame from './layout/mainFrame';
import './static/home.scss';
import './static/main.scss';

export default class Home extends Component{
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
