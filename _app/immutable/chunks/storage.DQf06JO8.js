var a=Object.defineProperty;var g=(e,s,n)=>s in e?a(e,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[s]=n;var t=(e,s,n)=>(g(e,typeof s!="symbol"?s+"":s,n),n);import{w as c}from"./index.TU1MwH2M.js";import{g as u}from"./scheduler.BZLieZa-.js";function S(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}class l{constructor(){t(this,"hours",[0,24]);t(this,"greeting","Hey there,");t(this,"emoji","👋")}}class r{constructor(){t(this,"title","My card");t(this,"icon","🚀");t(this,"links",[{text:"Google",href:"https://google.com"}])}}class i{constructor(){t(this,"name","Person");t(this,"greetingHours",[new l]);t(this,"cards",[new r]);t(this,"calendarLink")}}const o=c();function w(){if(localStorage&&!u(o)){const e=localStorage.getItem("userData"),s=JSON.parse(e??"null")??new i;return o.set(s),!0}return!1}o.subscribe(e=>{typeof window<"u"&&e&&localStorage.setItem("userData",JSON.stringify(e))});export{S as e,w as i,o as s};
