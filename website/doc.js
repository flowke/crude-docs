import React,{Fragment} from 'react';
import Frame from './layout/mainFrame';
import ReactDOM from 'react-dom';
import {
  Row,
  Col,
  List
} from 'antd';
import './static/doc.scss';
import './static/main.scss';

let {Item} = List;

let listData = [
  {
    title: "Getting Started",
    list: [
      'installion',
      'fdsa'
    ]
  },
  {
    title: "Getting Started",
    list: [
      'fds',
      'fdsa'
    ]
  },
  {
    title: "hel",
    list: [
      'fds',
      'fdsa'
    ]
  },
  {
    title: "hdfsfdsel",
    list: [
      'fds',
      'fdsa'
    ]
  },
]

function Doc({initData}){

  let {
    article
  } = initData;


  return (
    <Frame>
      <Row className="docpage-body">
        <Col span={5}>
          {listData.map(elt=>{
            return (
              <div
                className="category-block"
              >
                <h3>{elt.title}</h3>
                <List
                  size="small"
                  split={false}
                  dataSource={elt.list}
                  renderItem={title=>{
                    return (
                      <a>{title}</a>
                    )
                  }}
                />
              </div>
            )
          })}
        </Col>
        <Col span={19} dangerouslySetInnerHTML={{
          __html: article
        }}>
        </Col>
      </Row>
    </Frame>
  )
}

ReactDOM.render(
  <Doc initData={INITDATA}/>,
  document.getElementById('root')
);
