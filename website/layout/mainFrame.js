import React,{Fragment} from 'react';
import Header from '../components/header';

export default function MainFrame(props){
  return (
    <Fragment>
      <Header/>
      {props.children}
    </Fragment>
  )
}
