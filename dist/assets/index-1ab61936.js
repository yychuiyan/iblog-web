import{s as m,o as t,R as f,p as o,q as l,v as u,B as h}from"./index-afd46840.js";import{P as p}from"./PageDesc-eb28a440.js";import{b as g}from"./blur-2b70bfc3.js";const x=s=>{const[n,r]=t.useState([]),a=f.useRef();t.useEffect(()=>{a.current&&window.scroll({top:a.current.offsetTop-80||0,left:0,behavior:"smooth"})},[]),t.useEffect(()=>{s.BlogActions.asyncFriendlyListAction().then(e=>{let{data:c}=e.data,d=c.sort(()=>Math.random()-.5);r(d)})},[s.BlogActions]);const i=e=>{window.open(e)};return o("div",{className:"w-1200  mx-auto lg:w-full lg:mx-5",ref:a,style:{userSelect:"none"},children:[l(p,{title:"友链"}),l("div",{className:"w-1000 min-h-screen  bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-[90%] lg:pb-6 lg:w-full sm:w-full",children:n.map(e=>o("div",{className:"home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:ml-4",onClick:()=>i(e.link),children:[l("div",{className:"relative overflow-hidden rounded-xl",children:l(g.LazyLoadImage,{src:e.avatar,alt:"Image",loading:"lazy",effect:"blur",className:"image_friendly_page w-20 h-20 rounded-xl"})}),o("div",{className:"ml-2 w-48",children:[l("p",{className:"flex justify-start text-xl",children:e.name}),l("div",{className:"flex items-center h-12",children:l("p",{className:"line-clamp-2 overflow-hidden",children:e.desc})})]})]},e._id))})]})},v=s=>({BlogActions:u(h,s)}),N=m(null,v)(x);export{N as default};
