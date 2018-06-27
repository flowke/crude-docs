import React,{Component, Fragment, createContext} from 'react';
import Frame from './layout/mainFrame';
import ReactDOM from 'react-dom';
import names from './util/classNames';
import {
  Row,
  Col,
  List,
  Icon
} from 'antd';
import './static/doc.scss';
import './static/main.scss';

import {Provider as CurtLinkProvider } from './components/linkContext';

let {Item} = List;

let CurtLinkContext = React.createContext();

export {
  CurtLinkContext
}

export default function Doc(props){

  let {
    article,
    docs,
    curtLink
  } = props;

  return (
    <CurtLinkProvider value={curtLink}>
      <Frame>
        <Row className="docpage-body">
          <Col span={5} className="outline-wrap">
            {docs.map((block, indx)=>(
              <OutlineBlock key={indx} block={block} />
            ))}
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
    </CurtLinkProvider>

  );
}


class OutlineBlock extends Component {
  constructor(props){
    super(props);

    this.state = {
      open: true
    }
  }

  toggle=()=>{
    this.setState({
      open: !this.state.open
    })
  }

  render(){

    let {block} = this.props;
    let {open} = this.state;
    return (
      <div
        className="category-block"
      >
        <div
          className="block-header"
          onClick={this.toggle}
        >
          <h3>{block.title}</h3>
          <Icon
            type={open? 'up': 'down'}
            style={{
              fontSize: 16,
              fontWeight: 700,
              marginLeft: 10
            }}
          />
        </div>
        <List
          style={{
            height: open? 'auto': 0,
            transition: 'height 0.2s',
            overflow: 'hidden',
          }}
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
  }
}
