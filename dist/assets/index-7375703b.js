import{s as u,o as n,R as h,p as c,q as e,v as b,B as x}from"./index-0b722db9.js";import{M as r}from"./MarkDown-233248fc.js";import{P as f}from"./PageDesc-a471070b.js";import"./prism-34302824.js";const p=l=>{const[t,i]=n.useState(!1),[o,d]=n.useState([]),a=h.useRef();return n.useEffect(()=>{a.current&&window.scroll({top:a.current.offsetTop-80||0,left:0,behavior:"smooth"})},[]),n.useEffect(()=>{l.BlogActions.asyncAboutListAction(t).then(s=>{let{data:m}=s.data;d(m)})},[l.BlogActions,t]),c("div",{className:"w-1200 mx-auto pb-5 lg:w-[calc(100%-38px)] lg:mx-auto ",ref:a,children:[e(f,{title:"关于"}),c("div",{className:"w-1000 min-h-screen mx-auto mt-10 pb-0 pt-0  bg-base-100 rounded-2xl lg:min-h-screen lg:pb-6 lg:w-full sm:w-full",children:[c("div",{className:"flex items-center w-full h-24 -mb-8 lg:-mb-8",children:[e("p",{className:`text-2xl mx-3 ${t?"text-gray-500":" bg-base-100"}`,style:{userSelect:"none"},children:"关于本站"}),e("div",{className:"h-10 w-20 rounded-3xl bg-base-200 relative cursor-pointer ",onClick:()=>{i(!t)},children:e("p",{className:`rounded-3xl h-10 w-10 absolute left-5  ${t?"translate-x-1/2 transition-all ":"-translate-x-1/2 transition-all"}`,style:{backgroundColor:"var(--color-icon-default)"}})}),e("p",{className:`text-2xl mx-3  ${t?"bg-base-100":"text-gray-500"}`,style:{userSelect:"none"},children:"关于我"})]}),t?o.map(s=>e("div",{className:`block ${t?"block":"hidden"}`,children:e("div",{className:"rounded-lg",children:e("div",{className:"markdown-body content",children:e(r,{content:s.content})})})},s._id)):o.map(s=>e("div",{className:`block ${t?"hidden":"block"}`,children:e("div",{children:e("div",{className:"markdown-body content",children:e(r,{content:s.content})})})},s._id))]})]})},g=l=>({BlogActions:b(x,l)}),C=u(null,g)(p);export{C as default};
