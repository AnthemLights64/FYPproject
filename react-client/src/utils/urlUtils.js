export default function getQuery(name) {
    
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);//substr() 的参数指定的
    if(r != null) {
        return unescape(r[2]); 
    }
        return null;
  }
  