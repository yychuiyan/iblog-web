import{w,r as s,j as c,a as e,c as y,R as A,b as T,B as N}from"./index-3f2c21f1.js";import{l as B,C as k}from"./index-0630f890.js";import{s as E,c as h}from"./enum-2aef1615.js";import{U as m,F as p,A as C}from"./User-fb59bb49.js";import{P as R}from"./PageDesc-52f2dcae.js";import"./index-49b27c97.js";import"./RightOutlined-91267f24.js";import"./dayjs.min-0930f8b6.js";const j=r=>{const[a,g]=s.useState([]);s.useState("");const{t:f}=B.parse(r.location.search.slice(1));s.useEffect(()=>{let o=r.data.map(l=>l.tags),n=[];for(let l=0;l<o.length;l++)n.push(...o[l]);let d=[];for(let l=0;l<n.length;l++)d.indexOf(n[l])===-1&&d.push(n[l]);let b=0,v=d.map(l=>({name:l,id:b++}));console.log("list",a),g(v)},[r.data]);const u=t=>{r.history.push(`/rblog/tags?t=${t}`)},i=E.span`
    display:inline-block;
    line-height: 30px;
    border-radius: 8px;
    padding-left:5px;
    padding-right:5px;
    color:#fff;
    font-size:15px;
    background-color: ${t=>t.color};`;return c("div",{className:`overflow-y-auto overflow-x-hidden z-200 pb-3 mb-5 bg-base-100 rounded-2xl mx-auto text-lg  transition duration-500 ease-in-out  transform hover:translate-y-1 hover:scale-105
      lg:transition-none lg:hover:-translate-y-0 lg:hover:scale-100 lg:hover:ring-1 lg:mx-5
    `,children:[e("p",{className:"py-2 pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1",style:{userSelect:"none"},children:"全部标签"}),e("div",{className:"max-h-[24.5rem] w-[calc(100%+10px)] overflow-auto",children:a.map((t,o)=>e("p",{className:`inline-block my-2 mx-1 text-lg rounded-lg  cursor-pointer
            ${t.name===f?"my-1  text-lg rounded-lg ring-1 ring-current cursor-pointer":"my-1  text-lg rounded-lg bg-base-100 hover:ring-1 hover:ring-current cursor-pointer"}`,onClick:()=>u(t.name),children:e(i,{color:h[o%h.length],children:e("span",{children:t.name})},t.id)},t.id))})]})},x=w(j),L=r=>{const[a,g]=s.useState([]),[f,u]=s.useState(970),i=A.useRef();s.useEffect(()=>{i.current&&window.scroll({top:i.current.offsetTop-80||0,left:0,behavior:"smooth"})},[]),s.useEffect(()=>{r.BlogActions.asyncArticleAllListAction(1,1).then(o=>{let{data:n}=o.data;g(n)})},[r.BlogActions]),s.useEffect(()=>{window.addEventListener("resize",t)},[window.addEventListener]);let t=()=>{u(document.body.clientWidth)};return c("div",{className:"w-1200 mx-auto lg:w-full",ref:i,children:[e("div",{className:"mb-10",children:e(R,{title:"标签"})}),c("div",{className:"flex flex-row justify-between w-full lg:mx-auto lg:justify-start lg:flex-col lg:w-full sm:w-full",children:[e("article",{className:"w-[calc(100%-320px)] lg:w-full lg:order-2 sm:w-full",children:e(k,{})}),c("aside",{className:"w-300 lg:order-1 lg:w-full hidden lg:block sm:w-full",children:[e(m,{data:a}),e(x,{data:a}),e(p.BackTop,{shape:"square"})]}),c("aside",{className:"w-300 lg:hidden",children:[e(m,{data:a}),e(C,{offsetTop:70,children:e(x,{data:a})}),e(p.BackTop,{shape:"square"})]})]})]})},S=r=>({BlogActions:T(N,r)}),H=y(null,S)(w(L));export{H as default};
