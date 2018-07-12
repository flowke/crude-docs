import React,{Component} from 'react';
import names from '../util/classNames';
import './header.scss';
import {Consumer as CurtLinkConsumer} from './linkContext';

export default function Header(){
  return (
    <CurtLinkConsumer>
      {({navLink})=>(
        <header className="app-header">
          <div className="content-wrap">
            <a
              href={navLink[0].pageUrl}
              className={names('logo', {active : navLink[0].active})}
            >Crudoc</a>
            <nav>
              {navLink.slice(1).map((link,i)=>{

                return (
                  <a
                    key={i}
                    href={link.pageUrl}
                    className={names("nav-item", {active: link.active})}
                    target={link.href? '_blank': '_self'}
                  >{link.label}</a>
                );

              })}
            </nav>
          </div>

        </header>
      )}
    </CurtLinkConsumer>

  )
}
