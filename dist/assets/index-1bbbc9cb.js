import{s as w,o as s,R as y,p as a,q as e,I as n,v as _,B as j}from"./index-e7f584e3.js";import{P as k}from"./PageDesc-13e93e76.js";import{b as t}from"./blur-cc689e56.js";import{H as R}from"./Helmet-fbe544bf.js";const I=d=>{const[m,g]=s.useState([]),[f,u]=s.useState([]),[h,x]=s.useState([]),c=y.useRef();s.useEffect(()=>{c.current&&window.scroll({top:c.current.offsetTop-80||0,left:0,behavior:"smooth"})},[]),s.useEffect(()=>{d.BlogActions.asyncReaderListAction().then(l=>{let{data:p}=l.data,o=p.filter(r=>r.checked===!0),v=o.filter(r=>r.status===0),N=o.filter(r=>r.status===1),b=o.filter(r=>r.status===2);g(v),u(N),x(b)})},[d.BlogActions]);const i=l=>{window.open(l)};return a("div",{className:"w-1200  mx-auto lg:w-full lg:mx-5",ref:c,style:{userSelect:"none"},children:[e(R,{children:e("title",{children:"书友会 | 夜雨炊烟"})}),e(k,{title:"书友会",desc:"以书为友，人生路漫漫，读书不能倦。"}),a("div",{className:"flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-screen lg:pb-6 lg:w-full sm:w-full",children:[a("div",{className:"mt-2 lg:hidden",children:[a("div",{className:"mx-5",children:[a("p",{className:"flex text-2xl",children:[e(n,{iconName:"icon-yuedu1",className:"text-[28px]"}),e("span",{className:"ml-2",children:"正在阅读"})]}),e("p",{className:"w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mt-2 lg:w-full"})]}),f.map(l=>a("div",{className:"home_reader_page float-left w-48 h-72 px-2 pb-2 pt-2 ml-8 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:ml-4",onClick:()=>i(l.link),children:[e("div",{className:"relative flex justify-center overflow-hidden rounded-lg",children:e(t.LazyLoadImage,{src:l.avatar,alt:"Image",loading:"lazy",effect:"blur",className:"image_reader_page rounded-lg w-44 h-52"})}),a("div",{className:"flex justify-center flex-wrap",children:[e("div",{className:"flex justify-center text-xl line-clamp-1 overflow-hidden",children:l.name}),e("div",{className:"flex items-center h-12 w-full",children:e("p",{className:"line-clamp-2 overflow-hidden",children:l.desc})})]})]},l._id))]}),a("div",{className:"mt-5 hidden lg:block lg:mt-2",children:[a("div",{className:"mx-5",children:[a("div",{className:"text-2xl flex",children:[e(n,{iconName:"icon-yuedu",className:"text-[28px]"}),e("span",{className:"ml-2",children:"正在阅读"})]}),e("p",{className:"w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mb-2 lg:mb-0 lg:w-full"})]}),f.map(l=>e("div",{className:"lg:w-full lg:mx-auto lg:flex lg:justify-center",children:a("div",{className:"home_friendly_page flex items-center justify-center float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:float-none lg:flex-wrap lg:ml-0",onClick:()=>i(l.link),children:[e("div",{className:"relative overflow-hidden rounded-xl",children:e(t.LazyLoadImage,{src:l.avatar,alt:"Image",loading:"lazy",effect:"blur",className:"image_friendly_page w-20 h-20 rounded-xl"})}),a("div",{className:"ml-2 w-48",children:[e("p",{className:"flex justify-start text-xl line-clamp-1 overflow-hidden",children:l.name}),e("div",{className:"flex items-center h-12",children:e("p",{className:"line-clamp-2 overflow-hidden",children:l.desc})})]})]},l._id)}))]}),m.length>0?a("div",{className:"mt-5",children:[a("div",{className:"mx-5",children:[a("div",{className:"text-2xl flex",children:[e(n,{iconName:"icon-yuedu",className:"text-[28px]"}),e("span",{className:"ml-2",children:"待读清单"})]}),e("p",{className:"w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mb-2 lg:w-full lg:mb-0"})]}),m.map(l=>e("div",{className:"lg:w-full lg:mx-auto lg:flex lg:justify-center",children:a("div",{className:"home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:float-none lg:flex-wrap lg:ml-0",onClick:()=>i(l.link),children:[e("div",{className:"relative overflow-hidden rounded-xl",children:e(t.LazyLoadImage,{src:l.avatar,alt:"Image",loading:"lazy",effect:"blur",className:"image_friendly_page w-20 h-20 rounded-xl"})}),a("div",{className:"ml-2 w-48",children:[e("p",{className:"flex justify-start text-xl line-clamp-1 overflow-hidden",children:l.name}),e("div",{className:"flex items-center h-12",children:e("p",{className:"line-clamp-2 overflow-hidden",children:l.desc})})]})]},l._id)}))]}):e("div",{}),h.length>0?a("div",{className:"mt-5",children:[a("div",{className:"mx-5",children:[a("div",{className:"text-2xl flex",children:[e(n,{iconName:"icon-Ejudge_julei",className:"text-[28px]"}),e("span",{className:"ml-2",children:"已读完"})]}),e("p",{className:"w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mb-2 lg:w-full lg:mb-0"})]}),h.map(l=>e("div",{className:"lg:w-full lg:mx-auto lg:flex lg:justify-center",children:a("div",{className:"home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:float-none lg:flex-wrap lg:ml-0",onClick:()=>i(l.link),children:[e("div",{className:"relative overflow-hidden rounded-xl",children:e(t.LazyLoadImage,{src:l.avatar,alt:"Image",loading:"lazy",effect:"blur",className:"image_friendly_page w-20 h-20 rounded-xl"})}),a("div",{className:"ml-2 w-48",children:[e("p",{className:"flex justify-start text-xl line-clamp-1 overflow-hidden",children:l.name}),e("div",{className:"flex items-center h-12",children:e("p",{className:"line-clamp-2 overflow-hidden",children:l.desc})})]})]},l._id)}))]}):e("div",{})]})]})},L=d=>({BlogActions:_(j,d)}),C=w(null,L)(I);export{C as default};
