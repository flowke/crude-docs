export default function(...args) {

  return args.reduce((accu, elt)=>{

    let type = Object.prototype.toString.call(elt);
    if(type==='[object String]'){
      return `${accu}${elt} `
    }else if(type==='[object Object]'){

      let ln = '';

      for(let name in elt){
        if(elt[name]===true) ln+= `${name} `;
      }

      return `${accu}${ln} `

    }else{
      return accu;
    }
  }, '')

}
