import{s as x,o as i,R as b,p as r,q as e,H as v,v as w,B as N}from"./index-2d9379ef.js";import{P as y}from"./PageDesc-4706c239.js";import{b as E}from"./blur-444b42af.js";const _=a=>{const[c,f]=i.useState();i.useState(null);const d=b.useRef();i.useEffect(()=>{d.current&&window.scroll({top:d.current.offsetTop-80||0,left:0,behavior:"smooth"})},[]),i.useEffect(()=>{a.BlogActions.asyncNavigationListAction().then(s=>{let{data:m}=s.data,g=m.filter(l=>l.status===!0).filter(l=>l.classify==="常用网站").map(l=>({category:l.category,site:{...l}}));const o={};g.forEach(l=>{const n=l.category,p=l.site;o[n]||(o[n]={category:n,site:[]}),o[n].site.push(p)});const h=[...Object.values(o)];f(h)})},[a.BlogActions]);const u=s=>{window.open(s)};return r("div",{className:"w-1200  mx-auto lg:w-full lg:mx-5",ref:d,style:{userSelect:"none"},children:[e(v,{children:e("title",{children:"常用网站 | 夜雨炊烟"})}),e(y,{title:"常用网站",desc:""}),e("div",{className:"flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-screen lg:pb-6 lg:w-full sm:w-full",children:c==null?void 0:c.map((s,m)=>r("div",{className:"mt-2",children:[r("div",{className:"mx-5",children:[e("p",{className:"flex text-2xl",children:e("span",{className:"ml-2",children:s.category})}),e("p",{className:"w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mt-2 lg:w-full"})]}),e("div",{children:s==null?void 0:s.site.map(t=>e("div",{children:e("div",{className:"lg:w-full lg:mx-auto lg:flex lg:justify-center",children:r("div",{className:"home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:float-none lg:flex-wrap lg:ml-0",onClick:()=>u(t.link),children:[e("div",{className:"relative overflow-hidden rounded-xl",children:e(E.LazyLoadImage,{src:t.avatar,alt:"Image",loading:"lazy",effect:"blur",className:"image_friendly_page w-20 h-20 rounded-xl"})}),r("div",{className:"ml-2 w-48",children:[e("p",{className:"flex justify-start text-xl line-clamp-1 overflow-hidden",children:t.title}),e("div",{className:"flex items-center h-12",children:e("p",{className:"line-clamp-2 overflow-hidden",children:t.desc})})]})]},t._id)})},t._id))})]},m))})]})},A=a=>({BlogActions:w(N,a)}),L=x(null,A)(_);export{L as default};