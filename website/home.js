import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Frame from './layout/mainFrame';

import './static/main.scss';
import './static/home.scss';


import {Provider as CurtLinkProvider } from './components/linkContext';

export default function Home(props){
  let {navLink} = props;
  return (
    <CurtLinkProvider value={{navLink}}>
      <Frame>
        <div className="home-page" dangerouslySetInnerHTML={{__html: props.content}}>
        </div>
      </Frame>
    </CurtLinkProvider>
  )
}
