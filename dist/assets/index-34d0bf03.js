import{c as ce,w as re,r as o,ax as c,R as me,j as a,a as e,ay as D,az as v,aA as y,aB as U,aC as L,aD as W,aE as G,T as de,b as pe,aF as Y,B as he}from"./index-fdb9a393.js";import{M as ge}from"./index-0923d03e.js";import{d as h}from"./dayjs.min-56791884.js";import{r as ue,C as fe,e as J,a as xe,b as ye,L as E,M as K,c as be}from"./emoji-80425ea3.js";import{P as we}from"./PageDesc-d0e5eb97.js";import"./RightOutlined-34300b39.js";const Ce=r=>{const[Z,A]=o.useState([]),[s,b]=o.useState({_id:"",pid:"-1"}),[Q,M]=o.useState(0),[w,k]=o.useState(1),[C,T]=o.useState(10),[R,X]=o.useState(1),[ee,Ne]=o.useState("cm"),[z]=c.useForm(),[_]=c.useForm(),N=o.useRef(null),[u,j]=o.useState(!1);h.extend(ue);const B=me.useRef(),[F,$]=o.useState(""),[H,P]=o.useState("");o.useEffect(()=>{B.current&&window.scroll({top:B.current.offsetTop-80||0,left:0,behavior:"smooth"})},[]),o.useEffect(()=>{r.BlogActions.asyncMessageListAction(w,C,1).then(t=>{let{data:i,totalCount:d,page:p,pageSize:n}=t.data;i.map(m=>{m.messageTime=h(m.messageTime*1e3).format("YYYY-MM-DD HH:mm:ss"),m.children.map(l=>{l.messageTime=h(l.messageTime*1e3).format("YYYY-MM-DD HH:mm:ss")})}),A(i),M(d),k(p),T(n)})},[w,C,r.BlogActions]);const te=t=>{if(t.content===void 0||t.content==="")return Y.warning("留言内容不能为空😯");r.BlogActions.asyncMessageInsertAction({pid:s.pid,targetReplayId:s._id||"-1",targetReplayContent:"",currentReplayContent:t.content,auditTime:0,auditStatus:"1",avatar:"http://dummyimage.com/100x100",email:t.email,nickName:t.nickname}).then(()=>{setTimeout(()=>{Y.success("留言成功~"),R===1&&_.resetFields(),R===2&&(b({_id:"",pid:"-1"}),z.resetFields()),r.BlogActions.asyncMessageListAction(w,C,1).then(m=>{let{data:l,totalCount:f,page:x,pageSize:I}=m.data;l.map(g=>{g.messageTime=h(g.messageTime*1e3).format("YYYY-MM-DD HH:mm:ss"),g.children.map(S=>{S.messageTime=h(S.messageTime*1e3).format("YYYY-MM-DD HH:mm:ss")})}),A(l),M(f),k(x),T(I)});let i="haoju.zhang@outlook.com",d=`您的博客收到来自${t.nickname}<${t.email}>的留言`,n=`<div><br /><p>您在<span style="color: cadetblue; padding: 3px">夜雨炊烟</span>博客上收到新的留言</p><hr /><span style="color: cadetblue;">${t.nickname}:</span><p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${t.content}</span></p><p><a href="https://yychuiyan.com/rblog/message"target="_blank"style="text-decoration: none; color: #5c8fef">点击查看详情</a></p></div>`.split(`
`).join(`
<br/>
`);r.BlogActions.asyncSendMailAction({email:i,subject:d,html:n})},500)})},V=()=>{},q=t=>{b(t),z.resetFields(),N&&setTimeout(()=>{var i;(i=N==null?void 0:N.current)==null||i.scrollIntoView({behavior:"smooth",block:"center",inline:"center"})},100)},ae=t=>{if(t.content===void 0||t.content==="")return Y.warning("回复内容不能为空😯");X(2),r.BlogActions.asyncMessageInsertAction({pid:s.pid==="-1"?s._id:s.pid,targetReplayId:s._id||"-1",targetReplayContent:`${t==null?void 0:t.nickname}@${s==null?void 0:s.nickName} ${s==null?void 0:s.currentReplayContent}`,currentReplayContent:t.content,auditTime:0,auditStatus:"1",avatar:"http://dummyimage.com/100x100",email:t.email,nickName:t.nickname}).then(()=>{setTimeout(()=>{Y.success("回复成功~"),R===1&&_.resetFields(),R===2&&(b({_id:"",pid:"-1"}),z.resetFields()),r.BlogActions.asyncMessageListAction(w,C,1).then(m=>{let{data:l,totalCount:f,page:x,pageSize:I}=m.data;l.map(g=>{g.messageTime=h(g.messageTime*1e3).format("YYYY-MM-DD HH:mm:ss"),g.children.map(S=>{S.messageTime=h(S.messageTime*1e3).format("YYYY-MM-DD HH:mm:ss")})}),A(l),b(l),M(f),k(x),T(I)});let i=s.email,d="您在夜雨炊烟小站中的留言收到了回复",n=`<div><br /><p>您在<span style="color: cadetblue; padding: 3px">夜雨炊烟</span>博客中的留言：</p><hr /><p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${s.currentReplayContent}</span></p>收到<span style="color: cadetblue; padding-right:2px;">${t.nickname}</span>的回复:<p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${t.content}</span></p><p><a href="https://yychuiyan.com/rblog/message"target="_blank"style="text-decoration: none; color: #5c8fef">点击查看详情</a></p></div>`.split(`
`).join(`
<br/>
`);r.BlogActions.asyncSendMailAction({email:i,subject:d,html:n})},500)}),O()},O=()=>{b({_id:"",pid:"-1"})},ne=(t,i)=>{r.BlogActions.asyncArticleCommentsAction(t,i,1).then(d=>{let{data:p,totalCount:n,page:m,pageSize:l}=d.data;A(p),M(n),k(m),T(l)})},se=t=>{_.setFieldsValue({content:F.concat(t)}),$(F.concat(t)),j(!u)},le=t=>{$(t.target.value)},ie=t=>{z.setFieldsValue({content:H.concat(t)}),P(H.concat(t)),j(!u)},oe=t=>{P(t.target.value)};return a("div",{className:"w-1200 mx-auto pb-5 lg:w-full lg:mx-5 sm:w-full",ref:B,children:[e(we,{title:"留言板"}),e("div",{className:"w-1000 mx-auto mt-10 lg:w-full sm:w-full",children:a(fe,{className:" rounded-2xl bg-base-100",children:[e("div",{style:{textAlign:"center",fontSize:"16px",fontWeight:"bolder",marginBottom:"24px",position:"relative"},className:"lg:w-full sm:w-full",children:e("div",{className:"h-36 px-20 mt-5 font-normal lg:px-0",children:a("div",{className:"flex flex-col items-start w-[100%]  absolute",children:[e("p",{className:"flex absolute text-xl",children:"本站信息:"}),a("div",{className:"flex items-start justify-center flex-col w-800 mt-8 bg-base-200  rounded-xl hover:transition hover:duration-500 hover:shadow cursor-pointer lg:w-full",children:[a("p",{className:"pl-2 py-1",children:[e("span",{children:"name: "}),e("span",{children:"夜雨炊烟"})]}),a("p",{className:"pl-2 pb-1",children:[e("span",{children:"link: "}),e("span",{children:"https://yychuiyan.com/"})]}),a("p",{className:"pl-2 pb-1 lg:flex lg:flex-col lg:items-start",children:[e("span",{children:"avatar: "}),e("span",{children:"https://op.yychuiyan.com/avatar.webp"})]}),a("p",{className:"pl-2 pb-1",children:[e("span",{children:"desc: "}),e("span",{children:"三餐烟火暖，四季皆安然。"})]})]})]})})}),a(c,{name:"basic",form:_,onFinish:te,onFinishFailed:V,className:"w-800 mx-auto  lg:w-full sm:w-full",children:[a(D,{children:[e(v,{span:12,className:"pr-2 mt-5 lg:mt-8",children:e(c.Item,{label:"",name:"nickname",rules:[{required:!0,message:"请输入你的昵称"},{whitespace:!0,message:"输入不能为空"},{min:2,message:"昵称不能小于2个字符"},{max:30,message:"主题不能大于30个字符"}],children:e(y,{maxLength:30,placeholder:"请输入你的昵称"})})}),e(v,{span:12,className:"pl-2 mt-5 lg:mt-8",children:e(c.Item,{label:"",name:"email",rules:[{required:!0,message:"请输入邮箱"},{pattern:/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,message:"邮箱格式不正确"}],children:e(y,{maxLength:30,placeholder:"请输入你的邮箱"})})})]}),e(c.Item,{label:"",name:"content",children:e(y.TextArea,{placeholder:"请输入留言内容",onChange:le,value:F,autoSize:{minRows:6,maxRows:12}})}),e(U,{overlayStyle:{width:"260px"},placement:"top",open:u,onOpenChange:()=>j(!u),content:J.map(t=>e("span",{className:" inline-block cursor-pointer px-2 text-[20px] hover:bg-blue-400 w-5 h-8 rounded-md",onClick:()=>se(t.emoji),children:t.emoji},t.id)),children:a("div",{className:"-mt-5 mb-1 flex items-center justify-center w-16 h-8 text-center rounded cursor-pointer border-1 border-solid border-base-200",children:[e("span",{children:a("svg",{className:"icon w-6 h-6 pt-1",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2554",children:[e("path",{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z",fill:"#333333","p-id":"2555"}),e("path",{d:"M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zM288 421a48.01 48.01 0 0 1 96 0 48.01 48.01 0 0 1-96 0z m224 272c-85.5 0-155.6-67.3-160-151.6a8 8 0 0 1 8-8.4h48.1c4.2 0 7.8 3.2 8.1 7.4C420 589.9 461.5 629 512 629s92.1-39.1 95.8-88.6c0.3-4.2 3.9-7.4 8.1-7.4H664a8 8 0 0 1 8 8.4C667.6 625.7 597.5 693 512 693z m176-224a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z",fill:"#E6E6E6","p-id":"2556"}),e("path",{d:"M288 421a48 48 0 1 0 96 0 48 48 0 1 0-96 0z m376 112h-48.1c-4.2 0-7.8 3.2-8.1 7.4-3.7 49.5-45.3 88.6-95.8 88.6s-92-39.1-95.8-88.6c-0.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 0 0-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 0 0-8-8.4z m-24-112a48 48 0 1 0 96 0 48 48 0 1 0-96 0z",fill:"#333333","p-id":"2557"})]})}),e("span",{className:"text-base text-[var(--bgcolor-navbar-click)]",children:"表情"})]})}),e(c.Item,{className:"",children:a(L,{type:"primary",htmlType:"submit",className:"w-800 mx-auto lg:w-full sm:w-full",children:[e(xe,{})," 提交留言"]})})]}),e(D,{className:"mt:h-4 w-full mx-auto lg:w-full sm:w-full",children:a(v,{span:24,className:"sm:w-full lg:w-full",children:[a("b",{style:{marginBottom:"24px",color:"var(--color-icon-default)",userSelect:"none"},children:["留言展示 ",e(ye,{})]}),Z.length>0?e(E,{itemLayout:"horizontal",className:"sm:w-full lg:w-full",dataSource:Z,renderItem:(t,i)=>{var d,p;return e(E.Item,{actions:[],children:e(E.Item.Meta,{avatar:e(W,{style:{backgroundColor:"#1890ff",userSelect:"none"},children:(p=(d=t.nickName)==null?void 0:d.slice(0,1))==null?void 0:p.toUpperCase()}),title:e("b",{style:{color:"var(--color-icon-default)",userSelect:"none"},children:t.nickName}),description:a(G,{children:[e("div",{className:"user_content font-normal lg:w-full",children:e("pre",{className:"lg:overflow-auto",dangerouslySetInnerHTML:{__html:t.currentReplayContent.replace(/((http|https):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/g,n=>"<a href='"+n+"' target='_blank'>"+n+"</a>")}})}),a("div",{className:"sm:w-full lg:w-full",style:{fontSize:"12px",marginTop:"8px",marginBottom:"16px",alignItems:"center",display:"flex",flexWrap:"wrap",justifyContent:"space-between"},children:[a("span",{className:"user_desc",style:{userSelect:"none"},children:["用户 ",t.nickName,"  发表于 ",t.messageTime]}),e("span",{children:a("a",{style:{fontSize:"12px",marginRight:"12px"},onClick:()=>q(t),children:[e(K,{}),"  回复"]})})]}),t.children&&t.children.length?e(G,{children:t.children.map((n,m)=>{var l,f;return e(be,{className:"bg-base-100",author:e("span",{className:"replay_title",style:{userSelect:"none"},children:n.targetReplayContent.substring(0,40)+"···"}),avatar:e(W,{style:{backgroundColor:"#1890ff",userSelect:"none"},children:(f=(l=n.nickName)==null?void 0:l.slice(0,1))==null?void 0:f.toUpperCase()}),content:e("span",{className:"user_content font-normal",children:e("pre",{className:"lg:overflow-auto",dangerouslySetInnerHTML:{__html:n.currentReplayContent.replace(/((http|https):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/g,x=>"<a href='"+x+"' target='_blank'>"+x+"</a>")}})}),datetime:e(de,{title:n.messageTime,children:e("span",{style:{userSelect:"none"},children:h(n.messageTime).fromNow()})}),actions:[a("a",{style:{fontSize:"12px",marginRight:"12px"},onClick:()=>q(n),children:[e(K,{}),"  回复"]})]},m)})}):null,s._id===t._id||s.pid===t._id?e("div",{style:{marginTop:"12px"},ref:N,children:a(c,{form:z,name:"reply",onFinish:ae,onFinishFailed:V,children:[a(D,{children:[e(v,{span:12,className:"pr-2",children:e(c.Item,{label:"",name:"nickname",rules:[{required:!0,message:"请输入你的昵称"},{whitespace:!0,message:"输入不能为空"},{min:2,message:"昵称不能小于2个字符"},{max:30,message:"主题不能大于30个字符"}],children:e(y,{maxLength:30,placeholder:"请输入你的昵称"})})}),e(v,{span:12,className:"pl-2",children:e(c.Item,{label:"",name:"email",rules:[{required:!0,message:"请输入邮箱"},{pattern:/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,message:"邮箱格式不正确"}],children:e(y,{maxLength:30,placeholder:"请输入你的邮箱"})})})]}),e(c.Item,{label:"",name:"content",children:e(y.TextArea,{placeholder:"请输入回复内容",onChange:oe,value:H,autoSize:{minRows:6,maxRows:12}})}),e(U,{overlayStyle:{width:"260px"},placement:"top",open:u,onOpenChange:()=>j(!u),content:J.map(n=>e("span",{className:" inline-block cursor-pointer px-2 text-[20px] hover:bg-blue-400 w-5 h-8 rounded-md",onClick:()=>ie(n.emoji),children:n.emoji},n.id)),children:a("div",{className:"-mt-5 mb-1 flex items-center justify-center w-16 h-8 text-center rounded cursor-pointer border-1 border-solid border-base-200",children:[e("span",{children:a("svg",{className:"icon w-6 h-6 pt-1",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2554",children:[e("path",{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z",fill:"#333333","p-id":"2555"}),e("path",{d:"M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zM288 421a48.01 48.01 0 0 1 96 0 48.01 48.01 0 0 1-96 0z m224 272c-85.5 0-155.6-67.3-160-151.6a8 8 0 0 1 8-8.4h48.1c4.2 0 7.8 3.2 8.1 7.4C420 589.9 461.5 629 512 629s92.1-39.1 95.8-88.6c0.3-4.2 3.9-7.4 8.1-7.4H664a8 8 0 0 1 8 8.4C667.6 625.7 597.5 693 512 693z m176-224a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z",fill:"#E6E6E6","p-id":"2556"}),e("path",{d:"M288 421a48 48 0 1 0 96 0 48 48 0 1 0-96 0z m376 112h-48.1c-4.2 0-7.8 3.2-8.1 7.4-3.7 49.5-45.3 88.6-95.8 88.6s-92-39.1-95.8-88.6c-0.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 0 0-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 0 0-8-8.4z m-24-112a48 48 0 1 0 96 0 48 48 0 1 0-96 0z",fill:"#333333","p-id":"2557"})]})}),e("span",{className:"text-base text-[var(--bgcolor-navbar-click)]",children:"表情"})]})}),e(c.Item,{children:a("div",{style:{display:"flex",justifyContent:"flex-end"},children:[e(L,{style:{marginRight:"12px"},onClick:()=>O(),children:"取消"}),e(L,{type:"primary",htmlType:"submit",children:" 回复"})]})}),e(c.Item,{})]})}):null]})})},i)}}):e("div",{className:"flex justify-center",children:"暂无留言~"}),e(ge,{text:ee,pageSize:C,currentPage:w,total:Q,onChange:ne})]})})]})})]})},ze=r=>({BlogActions:pe(he,r)}),Re=ce(null,ze)(re(Ce));export{Re as default};