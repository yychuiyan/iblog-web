import{s as w,o as s,R as y,p as a,q as e,I as o,v as _,B as R}from"./index-f64ef14e.js";import{P as j}from"./PageDesc-1e24e418.js";import{b as c}from"./blur-43fbc045.js";const k=d=>{const[m,h]=s.useState([]),[u,p]=s.useState([]),[f,x]=s.useState([]),n=y.useRef();s.useEffect(()=>{n.current&&window.scroll({top:n.current.offsetTop-80||0,left:0,behavior:"smooth"})},[]),s.useEffect(()=>{d.BlogActions.asyncReaderListAction().then(l=>{let{data:g}=l.data,t=g.filter(r=>r.checked===!0),v=t.filter(r=>r.status===0),N=t.filter(r=>r.status===1),b=t.filter(r=>r.status===2);h(v),p(N),x(b)})},[d.BlogActions]);const i=l=>{window.open(l)};return a("div",{className:"w-1200  mx-auto lg:w-full lg:mx-5",ref:n,style:{userSelect:"none"},children:[e(j,{title:"阅读管理",desc:"人生路漫漫，读书不能倦。"}),a("div",{className:"flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-[90%] lg:pb-6 lg:w-full sm:w-full",children:[a("div",{className:"mt-2",children:[a("div",{className:"mx-5",children:[a("p",{className:"flex text-2xl",children:[e(o,{iconName:"icon-yuedu1",className:"text-[28px]"}),e("span",{className:"ml-2",children:"阅读中"})]}),e("p",{className:"w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mt-2 lg:w-full"})]}),u.map(l=>a("div",{className:"home_reader_page float-left w-48 h-76 px-2 pb-2 pt-2 ml-8 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:ml-4",onClick:()=>i(l.link),children:[e("div",{className:"relative flex justify-center overflow-hidden rounded-lg",children:e(c.LazyLoadImage,{src:l.avatar,alt:"Image",loading:"lazy",effect:"blur",className:"image_reader_page rounded-lg w-44 h-52"})}),a("div",{className:"flex justify-center flex-wrap",children:[e("p",{className:"flex justify-center text-xl line-clamp-1 overflow-hidden",children:l.name}),e("div",{className:"flex items-center h-12",children:e("p",{className:"line-clamp-2 overflow-hidden",children:l.desc})})]})]},l._id))]}),m.length>0?a("div",{className:"mt-5",children:[a("div",{className:"mx-5",children:[a("div",{className:"text-2xl flex",children:[e(o,{iconName:"icon-yuedu",className:"text-[28px]"}),e("span",{className:"ml-2",children:"待阅读"})]}),e("p",{className:"w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mb-2 lg:w-full"})]}),m.map(l=>a("div",{className:"home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:ml-4",onClick:()=>i(l.link),children:[e("div",{className:"relative overflow-hidden rounded-xl",children:e(c.LazyLoadImage,{src:l.avatar,alt:"Image",loading:"lazy",effect:"blur",className:"image_friendly_page w-20 h-20 rounded-xl"})}),a("div",{className:"ml-2 w-48",children:[e("p",{className:"flex justify-start text-xl line-clamp-1 overflow-hidden",children:l.name}),e("div",{className:"flex items-center h-12",children:e("p",{className:"line-clamp-2 overflow-hidden",children:l.desc})})]})]},l._id))]}):e("div",{}),f.length>0?a("div",{className:"mt-5",children:[a("div",{className:"mx-5",children:[a("div",{className:"text-2xl flex",children:[e(o,{iconName:"icon-Ejudge_julei",className:"text-[28px]"}),e("span",{className:"ml-2",children:"已读完"})]}),e("p",{className:"w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mb-2 lg:w-full"})]}),f.map(l=>a("div",{className:"home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:ml-4",onClick:()=>i(l.link),children:[e("div",{className:"relative overflow-hidden rounded-xl",children:e(c.LazyLoadImage,{src:l.avatar,alt:"Image",loading:"lazy",effect:"blur",className:"image_friendly_page w-20 h-20 rounded-xl"})}),a("div",{className:"ml-2 w-48",children:[e("p",{className:"flex justify-start text-xl line-clamp-1 overflow-hidden",children:l.name}),e("div",{className:"flex items-center h-12",children:e("p",{className:"line-clamp-2 overflow-hidden",children:l.desc})})]})]},l._id))]}):e("div",{})]})]})},I=d=>({BlogActions:_(R,d)}),B=w(null,I)(k);export{B as default};
