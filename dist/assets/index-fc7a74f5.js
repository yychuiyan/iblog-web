import{c as g,r as n,R as x,j as i,a as l,b,B as w}from"./index-fdb9a393.js";import{d}from"./dayjs.min-56791884.js";import{P as y}from"./PageDesc-d0e5eb97.js";const v=a=>{const[f,u]=n.useState([]),o=x.useRef();n.useEffect(()=>{o.current&&window.scroll({top:o.current.offsetTop-80||0,left:0,behavior:"smooth"})},[]),n.useEffect(()=>{a.BlogActions.asyncArticleAllListAction(1,1).then(r=>{let{data:t}=r.data;t.sort((e,c)=>c.createTime-e.createTime).map(e=>{e.createYear=d(e.createTime*1e3).format("YYYY"),e.createTime=d(e.createTime*1e3).format("MM-DD")});let s=[];for(const e of t)s[e.createYear]?s[e.createYear].push(e):s[e.createYear]=[e];let m=[];for(let e in s)m.push({year:e,yearData:s[e]});let p=m.sort((e,c)=>c.year-e.year);u(p)})},[a.BlogActions]);const h=r=>{a.history.push(`/rblog/article/detail/${r}`)};return i("div",{className:"flex items-end flex-col w-1200 mx-auto pb-5  lg:w-full sm:w-full lg:mx-5",ref:o,children:[l(y,{title:"时间线"}),l("div",{className:"flex justify-center w-1000 min-h-screen mx-auto my-8  bg-base-100 rounded-2xl lg:w-full sm:w-full",children:f.map(r=>i("div",{className:"lg:w-full lg:px-5",children:[l("p",{className:"p-3 text-2xl",children:r.year},r),l("p",{className:"w-900 border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mb-2 lg:w-full"}),r.yearData.map(t=>i("div",{className:"flex items-center text-xl h-10 font-medium rounded-xl my-1 cursor-pointer hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500 lg:w-full sm:w-full",onClick:()=>h(t._id),children:[l("p",{className:"text-sm pl-2 lg:w-12 lg:h-5 lg:pl-1 lg:pr-0",children:t.createTime}),l("p",{className:"text-sm pl-2",children:t.title})]},t._id))]},r))})]})},T=a=>({BlogActions:b(w,a)}),B=g(null,T)(v);export{B as default};
