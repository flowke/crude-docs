import React,{Component} from 'react';
import names from '../util/classNames';
import './header.scss';
import {Consumer as CurtLinkConsumer} from './linkContext';

export default function Header(){
  return (
    <CurtLinkConsumer>
      {({curtLink,siteCfg: {navLink, sideBar}})=>(
        <header className="app-header">
          <div className="content-wrap">
            <a
              href={`/`}
              className={names('logo', {active : curtLink=== '/'})}
            >Crudoc</a>
            <nav>
              {navLink.slice(1).map((link,i)=>{
                let url = '';

                let active = false;

                if(link.page==='docs'){
                  // 取出第 0 个文档的 link
                  let {list, level} = sideBar[link.type][0];
                  url = `/${link.type}/${level}-${list[0][0]}.html`;
                  active = link.type === curtLink;
                }else if(link.href){
                  url = link.href
                }else{
                  url = `/${link.page}.html`;
                  active = link.page === curtLink;
                }

                return (
                  <a
                    key={i}
                    href={url}
                    className={names("nav-item", {active})}
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
