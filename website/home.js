import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Frame from './layout/mainFrame';
import './static/home.scss';
import './static/main.scss';

import {Provider as CurtLinkProvider } from './components/linkContext';

export default function(props){
  return (
    <CurtLinkProvider value={props.curtLink}>
      <Frame>
        <div className="home-page" dangerouslySetInnerHTML={{__html: props.content}}>
        </div>
      </Frame>
    </CurtLinkProvider>

  )
}
