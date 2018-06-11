export default function(...args) {

  return args.reduce((accu, elt)=>{

    let type = Object.prototype.toString.call(elt);
    if(type==='[object String]'){
      accu.push(elt);
    }else if(type==='[object Object]'){

      for(let name in elt){
        if(elt[name]===true) accu.push(name);
      }
    }

    return accu;

  }, []).join(' ')

}
