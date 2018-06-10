import React,{Fragment, createContext} from 'react';
import Frame from './layout/mainFrame';
import ReactDOM from 'react-dom';
import names from './util/classNames';
import {
  Row,
  Col,
  List
} from 'antd';
import './static/doc.scss';
import './static/main.scss';

let {Item} = List;


export default function Doc({initData}){

  let {
    article,
    docs
  } = initData;


  return (
    <Frame>
      <Row className="docpage-body">
        <Col span={5} className="outline-wrap">
          {docs.map((block, indx)=>{
            return (
              <div
                key={indx}
                className="category-block"
              >
                <h3>{block.title}</h3>
                <List
                  size="small"
                  split={false}
                  dataSource={block.list}
                  renderItem={(item,i)=>{
                    let lk = block.links[i];
                    return (
                      <a
                        href={lk.url}
                        className={names({active: lk.active})}
                      >{item[1]}</a>
                    )
                  }}
                />
              </div>
            )
          })}
        </Col>
        <Col
          className="article-wrap"
          span={19}
          dangerouslySetInnerHTML={{
            __html: article
          }}
        >
        </Col>
      </Row>
    </Frame>
  )
}

ReactDOM.render(
  <Doc initData={INITDATA}/>
  ,
  document.getElementById('root')
);
