import{s as v,o as r,R as N,p as a,q as e,I as d,v as b,B as w}from"./index-02970649.js";import{P as y}from"./PageDesc-1d625918.js";import{b as c}from"./blur-67b5b8ea.js";const _=s=>{const[m,f]=r.useState([]),[h,u]=r.useState([]),t=N.useRef();r.useEffect(()=>{t.current&&window.scroll({top:t.current.offsetTop-80||0,left:0,behavior:"smooth"})},[]),r.useEffect(()=>{s.BlogActions.asyncFriendlyListAction().then(l=>{let{data:x}=l.data,o=x.sort(()=>Math.random()-.5),p=o.filter(n=>n.status===!0),g=o.filter(n=>n.status===!1);f(p),u(g)})},[s.BlogActions]);const i=l=>{window.open(l)};return a("div",{className:"w-1200  mx-auto lg:w-full lg:mx-5",ref:t,style:{userSelect:"none"},children:[e(y,{title:"友链",desc:""}),a("div",{className:"flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-[90%] lg:pb-6 lg:w-full sm:w-full",children:[a("div",{className:"mt-2",children:[a("div",{className:"mx-5",children:[a("p",{className:"flex text-2xl",children:[e(d,{iconName:"icon-chengchangdaoshi",className:" text-[28px]"}),e("span",{className:"ml-2",children:"优秀博主"})]}),e("p",{className:"w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mt-2 lg:w-full"})]}),m.map(l=>a("div",{className:"home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:ml-4",onClick:()=>i(l.link),children:[e("div",{className:"relative overflow-hidden rounded-xl",children:e(c.LazyLoadImage,{src:l.avatar,alt:"Image",loading:"lazy",effect:"blur",className:"image_friendly_page w-20 h-20 rounded-xl"})}),a("div",{className:"ml-2 w-48",children:[e("p",{className:"flex justify-start text-xl",children:l.name}),e("div",{className:"flex items-center h-12",children:e("p",{className:"line-clamp-2 overflow-hidden",children:l.desc})})]})]},l._id))]}),a("div",{className:"mt-5",children:[a("div",{className:"mx-5",children:[a("div",{className:"text-2xl flex",children:[e(d,{iconName:"icon-jiankongbaojing",className:"text-[28px]"}),e("span",{className:"ml-2",children:"失联博主"}),e("span",{className:"text-[13px] pt-1 text-[var(--article-content-default)]",children:"(网站正常后可联系博主恢复友链信息，长时间未更新将取消贵站链接。)"})]}),e("p",{className:"w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mb-2 lg:w-full"})]}),h.map(l=>a("div",{className:"home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:ml-4",onClick:()=>i(l.link),children:[e("div",{className:"relative overflow-hidden rounded-xl",children:e(c.LazyLoadImage,{src:l.avatar,alt:"Image",loading:"lazy",effect:"blur",className:"image_friendly_page w-20 h-20 rounded-xl"})}),a("div",{className:"ml-2 w-48",children:[e("p",{className:"flex justify-start text-xl",children:l.name}),e("div",{className:"flex items-center h-12",children:e("p",{className:"line-clamp-2 overflow-hidden",children:l.desc})})]})]},l._id))]})]})]})},L=s=>({BlogActions:b(w,s)}),A=v(null,L)(_);export{A as default};
