import{s as m,o as a,R as u,p as o,q as e,H as h,v as g,B as p}from"./index-2d9379ef.js";import{P as v}from"./PageDesc-4706c239.js";import{b as x}from"./blur-444b42af.js";const w=t=>{const[i,r]=a.useState([]);a.useState(null);const s=u.useRef();a.useEffect(()=>{s.current&&window.scroll({top:s.current.offsetTop-80||0,left:0,behavior:"smooth"})},[]),a.useEffect(()=>{t.BlogActions.asyncNavigationListAction().then(l=>{let{data:d}=l.data,f=d.filter(n=>n.status===!0).filter(n=>n.classify==="工具管理");r(f)})},[t.BlogActions]);const c=l=>{window.open(l)};return o("div",{className:"w-1200  mx-auto lg:w-full lg:mx-5",ref:s,style:{userSelect:"none"},children:[e(h,{children:e("title",{children:"工具集 | 夜雨炊烟"})}),e(v,{title:"工具集",desc:""}),e("div",{className:"flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-screen lg:pb-6 lg:w-full sm:w-full",children:e("div",{className:"mt-2",children:e("div",{children:i.length>0?e("div",{className:"mt-0",children:i.map(l=>e("div",{className:"lg:w-full lg:mx-auto lg:flex lg:justify-center",children:o("div",{className:"home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:float-none lg:flex-wrap lg:ml-0",onClick:()=>c(l.link),children:[e("div",{className:"relative overflow-hidden rounded-xl",children:e(x.LazyLoadImage,{src:l.avatar,alt:"Image",loading:"lazy",effect:"blur",className:"image_friendly_page w-20 h-20 rounded-xl"})}),o("div",{className:"ml-2 w-48",children:[e("p",{className:"flex justify-start text-xl line-clamp-1 overflow-hidden",children:l.title}),e("div",{className:"flex items-center h-12",children:e("p",{className:"line-clamp-2 overflow-hidden",children:l.desc})})]})]},l._id)},l._id))}):e("div",{})})})})]})},N=t=>({BlogActions:g(p,t)}),E=m(null,N)(w);export{E as default};