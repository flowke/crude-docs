const Iso = require('webpack-isomorphic-tools');

let config = {
  assets: {
    images: {
      extensions: ['png']
    }
  }
}


new Iso(config)
  .development()
  .server(__dirname, ()=>{
    console.log(require('../entry'));
  })
