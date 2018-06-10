import React,{Component} from 'react';
import names from '../util/classNames';
import './header.scss';

const {navLink, sideBar} = require('../../SiteCfg');

let home = navLink[0];

let {curtLink} = INITDATA;

export default function Header(){
  return (
    <header className="app-header">
      <div className="content-wrap">
        <a
          href={`/`} className="logo"
        >Crudoc</a>
        <nav>
          {navLink.slice(1).map((link,i)=>{
            let url = '';


            let active = false;

            if(link.page==='docs'){
              let {list, level} = sideBar[link.type][0];
              url = `/${link.type}/${level}/${list[0][0]}`;
              active = link.type ===curtLink;
            }else if(link.href){
              url = link.href
            }else{
              url = `/${link.page}`;
              active = link.page === curtLink;
            }

            return (
              <a
                key={i}
                href={url}
                className={names("nav-item",{active})}
                target={link.href? '_blank': '_self'}
              >{link.label}</a>
            );

          })}
        </nav>
      </div>

    </header>
  )
}
