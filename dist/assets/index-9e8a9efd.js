import{s as v,o as s,R as g,p as a,q as e,v as b,B as N}from"./index-389392ad.js";import{P as w}from"./PageDesc-d2707742.js";import{b as o}from"./blur-36707dc8.js";const y=r=>{const[c,m]=s.useState([]),[f,h]=s.useState([]),t=g.useRef();s.useEffect(()=>{t.current&&window.scroll({top:t.current.offsetTop-80||0,left:0,behavior:"smooth"})},[]),s.useEffect(()=>{r.BlogActions.asyncFriendlyListAction().then(l=>{let{data:u}=l.data,i=u.sort(()=>Math.random()-.5),p=i.filter(n=>n.status===!0),x=i.filter(n=>n.status===!1);m(p),h(x)})},[r.BlogActions]);const d=l=>{window.open(l)};return a("div",{className:"w-1200  mx-auto lg:w-full lg:mx-5",ref:t,style:{userSelect:"none"},children:[e(w,{title:"友链",desc:""}),a("div",{className:"flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-[90%] lg:pb-6 lg:w-full sm:w-full",children:[a("div",{className:"mt-2",children:[a("div",{className:"mx-5",children:[e("p",{className:"text-2xl",children:"优秀博主"}),e("p",{className:"w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mt-2 lg:w-full"})]}),c.map(l=>a("div",{className:"home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:ml-4",onClick:()=>d(l.link),children:[e("div",{className:"relative overflow-hidden rounded-xl",children:e(o.LazyLoadImage,{src:l.avatar,alt:"Image",loading:"lazy",effect:"blur",className:"image_friendly_page w-20 h-20 rounded-xl"})}),a("div",{className:"ml-2 w-48",children:[e("p",{className:"flex justify-start text-xl",children:l.name}),e("div",{className:"flex items-center h-12",children:e("p",{className:"line-clamp-2 overflow-hidden",children:l.desc})})]})]},l._id))]}),a("div",{className:"mt-5",children:[a("div",{className:"mx-5",children:[a("p",{className:"",children:[e("span",{className:"text-2xl",children:"失联博主"}),e("span",{className:"text-[13px] text-[var(--article-content-default)]",children:"(网站正常后可联系博主恢复友链信息，长时间未更新将取消贵站链接。)"})]}),e("p",{className:"w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mt-2 lg:w-full"})]}),f.map(l=>a("div",{className:"home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:ml-4",onClick:()=>d(l.link),children:[e("div",{className:"relative overflow-hidden rounded-xl",children:e(o.LazyLoadImage,{src:l.avatar,alt:"Image",loading:"lazy",effect:"blur",className:"image_friendly_page w-20 h-20 rounded-xl"})}),a("div",{className:"ml-2 w-48",children:[e("p",{className:"flex justify-start text-xl",children:l.name}),e("div",{className:"flex items-center h-12",children:e("p",{className:"line-clamp-2 overflow-hidden",children:l.desc})})]})]},l._id))]})]})]})},_=r=>({BlogActions:b(N,r)}),B=v(null,_)(y);export{B as default};