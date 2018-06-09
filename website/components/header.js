import React,{Component} from 'react';
import './header.scss';

export default function Header(){
  return (
    <header className="app-header">
      <div className="content-wrap">
        <a
          href="#" className="logo"
        >Crudoc</a>
        <nav>
          <a href="#" className="nav-item active">文档</a>
          <a href="#" className="nav-item">博客</a>
        </nav>
      </div>

    </header>
  )
}
