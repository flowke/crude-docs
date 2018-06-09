import React, {Component} from 'react';
import Frame from './layout/mainFrame';
import './static/home.scss';


export default class Name extends Component{
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
