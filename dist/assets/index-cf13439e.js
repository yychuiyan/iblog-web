import{c as u,r as l,R as h,j as c,a as e,b as x,B as b}from"./index-3ebf7abc.js";import{M as r}from"./MarkDown-e8c48793.js";import{P as f}from"./PageDesc-3e82253f.js";import"./prism-ee79cf62.js";const p=a=>{const[t,i]=l.useState(!1),[o,d]=l.useState([]),n=h.useRef();return l.useEffect(()=>{n.current&&window.scroll({top:n.current.offsetTop-80||0,left:0,behavior:"smooth"})},[]),l.useEffect(()=>{a.BlogActions.asyncAboutListAction(t).then(s=>{let{data:m}=s.data;d(m)})},[a.BlogActions,t]),c("div",{className:"w-1200 mx-auto pb-5 lg:w-[calc(100%-38px)] lg:mx-auto ",ref:n,children:[e(f,{title:"关于"}),c("div",{className:"w-1000 min-h-screen mx-auto my-10  bg-base-100 rounded-2xl lg:w-full",children:[c("div",{className:"flex items-center w-full h-20",children:[e("p",{className:`text-2xl mx-3 ${t?"text-gray-500":" bg-base-100"}`,style:{userSelect:"none"},children:"关于本站"}),e("div",{className:"h-10 w-20 rounded-3xl bg-base-200 relative cursor-pointer ",onClick:()=>{i(!t)},children:e("p",{className:`rounded-3xl h-10 w-10 absolute left-5  ${t?"translate-x-1/2 transition-all ":"-translate-x-1/2 transition-all"}`,style:{backgroundColor:"var(--color-icon-default)"}})}),e("p",{className:`text-2xl mx-3  ${t?"bg-base-100":"text-gray-500"}`,style:{userSelect:"none"},children:"关于我"})]}),t?o.map(s=>e("div",{className:`block ${t?"block":"hidden"}`,children:e("div",{className:"rounded-lg",children:e("div",{className:"markdown-body content",children:e(r,{content:s.content})})})},s._id)):o.map(s=>e("div",{className:`block ${t?"hidden":"block"}`,children:e("div",{children:e("div",{className:"markdown-body content",children:e(r,{content:s.content})})})},s._id))]})]})},g=a=>({BlogActions:x(b,a)}),C=u(null,g)(p);export{C as default};
