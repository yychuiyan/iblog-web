import{s as ge,w as he,o,aF as i,R as ue,t as fe,p as n,q as e,aG as ye,aH as xe,aI as Z,aJ as T,aK as b,aL as J,I as K,aM as $,aN as w,aO as Q,T as be,v as we,u as z,B as Se}from"./index-02970649.js";import{a as X,M as Ne}from"./index-991b961a.js";import{d as g}from"./dayjs.min-e7b81f48.js";import{r as Ce,C as ve,e as ee,a as ke,b as Ae,L as P,M as te,c as Te}from"./emoji-7105c65c.js";import{P as ze}from"./PageDesc-1d625918.js";import{S as Re}from"./SoundOutlined-e3c0bb80.js";const Me=r=>{const[E,R]=o.useState([]),[s,S]=o.useState({_id:"",pid:"-1"}),[ae,M]=o.useState(0),[N,_]=o.useState(1),[C,j]=o.useState(10),[I,ne]=o.useState(1),[se,je]=o.useState("cm"),[v]=i.useForm(),[Y]=i.useForm(),k=o.useRef(null);let[u,q]=o.useState();const[f,B]=o.useState(!1);g.extend(Ce);const F=ue.useRef(),[L,O]=o.useState(""),[H,V]=o.useState("");o.useEffect(()=>{F.current&&window.scroll({top:F.current.offsetTop-80||0,left:0,behavior:"smooth"})},[]),o.useEffect(()=>{if(localStorage.getItem("zhj")==="success"&&localStorage.getItem("yychuiyan")!==null){const l=fe(localStorage.getItem("yychuiyan"));q(l)}else q(null)},[localStorage]),o.useEffect(()=>{r.BlogActions.asyncMessageListAction(N,C,1).then(t=>{let{data:l,totalCount:d,page:p,pageSize:a}=t.data;l.map(m=>{m.messageTime=g(m.messageTime*1e3).format("YYYY-MM-DD HH:mm:ss"),m.children.map(c=>{c.messageTime=g(c.messageTime*1e3).format("YYYY-MM-DD HH:mm:ss")})}),R(l),M(d),_(p),j(a)})},[N,C,r.BlogActions]);const le=t=>{if(t.content===void 0||t.content==="")return z.warning("留言内容不能为空😯");r.BlogActions.asyncMessageInsertAction({pid:s.pid,targetReplayId:s._id||"-1",targetReplayContent:"",currentReplayContent:t.content,auditTime:0,auditStatus:"1",avatar:Boolean(u)?u.avatar:u,email:t.email,nickName:t.nickname}).then(()=>{setTimeout(()=>{z.success("留言成功~"),I===1&&Y.resetFields(),I===2&&(S({_id:"",pid:"-1"}),v.resetFields()),r.BlogActions.asyncMessageListAction(N,C,1).then(m=>{let{data:c,totalCount:y,page:x,pageSize:D}=m.data;c.map(h=>{h.messageTime=g(h.messageTime*1e3).format("YYYY-MM-DD HH:mm:ss"),h.children.map(A=>{A.messageTime=g(A.messageTime*1e3).format("YYYY-MM-DD HH:mm:ss")})}),R(c),M(y),_(x),j(D)});let l="haoju.zhang@outlook.com",d=`您的博客收到来自${t.nickname}<${t.email}>的留言`,a=`<div><br /><p>您在<span style="color: cadetblue; padding: 3px">夜雨炊烟</span>博客上收到新的留言</p><hr /><span style="color: cadetblue;">${t.nickname}:</span><p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${t.content}</span></p><p><a href="https://yychuiyan.com/rblog/message"target="_blank"style="text-decoration: none; color: #5c8fef">点击查看详情</a></p></div>`.split(`
`).join(`
<br/>
`);r.BlogActions.asyncSendMailAction({email:l,subject:d,html:a})},500)})},U=()=>{},W=t=>{S(t),v.resetFields(),k&&setTimeout(()=>{var l;(l=k==null?void 0:k.current)==null||l.scrollIntoView({behavior:"smooth",block:"center",inline:"center"})},100)},oe=t=>{if(t.content===void 0||t.content==="")return z.warning("回复内容不能为空😯");ne(2),r.BlogActions.asyncMessageInsertAction({pid:s.pid==="-1"?s._id:s.pid,targetReplayId:s._id||"-1",targetReplayContent:`${t==null?void 0:t.nickname}@${s==null?void 0:s.nickName} ${s==null?void 0:s.currentReplayContent}`,currentReplayContent:t.content,auditTime:0,auditStatus:"1",avatar:Boolean(u)?u.avatar:u,email:t.email,nickName:t.nickname}).then(()=>{setTimeout(()=>{z.success("回复成功~"),I===1&&Y.resetFields(),I===2&&(S({_id:"",pid:"-1"}),v.resetFields()),r.BlogActions.asyncMessageListAction(N,C,1).then(m=>{let{data:c,totalCount:y,page:x,pageSize:D}=m.data;c.map(h=>{h.messageTime=g(h.messageTime*1e3).format("YYYY-MM-DD HH:mm:ss"),h.children.map(A=>{A.messageTime=g(A.messageTime*1e3).format("YYYY-MM-DD HH:mm:ss")})}),R(c),S(c),M(y),_(x),j(D)});let l=s.email,d="您在夜雨炊烟小站中的留言收到了回复",a=`<div><br /><p>您在<span style="color: cadetblue; padding: 3px">夜雨炊烟</span>博客中的留言：</p><hr /><p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${s.currentReplayContent}</span></p>收到<span style="color: cadetblue; padding-right:2px;">${t.nickname}</span>的回复:<p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${t.content}</span></p><p><a href="https://yychuiyan.com/rblog/message"target="_blank"style="text-decoration: none; color: #5c8fef">点击查看详情</a></p></div>`.split(`
`).join(`
<br/>
`);r.BlogActions.asyncSendMailAction({email:l,subject:d,html:a})},500)}),G()},G=()=>{S({_id:"",pid:"-1"})},ce=(t,l)=>{r.BlogActions.asyncArticleCommentsAction(t,l,1).then(d=>{let{data:p,totalCount:a,page:m,pageSize:c}=d.data;R(p),M(a),_(m),j(c)})},ie=t=>{Y.setFieldsValue({content:L.concat(t)}),O(L.concat(t)),B(!f)},re=t=>{O(t.target.value)},me=t=>{v.setFieldsValue({content:H.concat(t)}),V(H.concat(t)),B(!f)},de=t=>{V(t.target.value)},pe=`name: 夜雨炊烟
link: https://yychuiyan.com
avatar: https://op.yychuiyan.com/avatar.webp
desc: 三餐烟火暖，四季皆安然。`;return n("div",{className:"w-1200 mx-auto pb-5 lg:w-full lg:mx-5 sm:w-full",ref:F,children:[e(ze,{title:"留言板"}),e("div",{className:"w-1000 mx-auto mt-10 lg:w-full sm:w-full",children:n(ve,{className:" rounded-2xl bg-base-100",children:[e("div",{style:{textAlign:"center",fontSize:"16px",fontWeight:"bolder",marginBottom:"24px",position:"relative"},className:"lg:w-full sm:w-full",children:e("div",{className:"h-36 px-20 mt-5 font-normal lg:px-0",children:n("div",{className:"flex flex-col items-start w-[100%]  absolute",children:[e("p",{className:"flex absolute text-xl",style:{userSelect:"none"},children:"本站信息:"}),n("div",{className:"flex items-start relative justify-center flex-col w-800 mt-8 bg-base-200  rounded-xl hover:transition hover:duration-500 hover:shadow cursor-pointer lg:w-full",style:{userSelect:"none"},children:[e("p",{className:"absolute right-2 top-2",onClick:()=>{navigator.clipboard.writeText(pe),z.info({content:"复制成功!",icon:e(Re,{style:{color:"var(--bgcolor-social-default)"}}),className:"text-[var(--bgcolor-social-default)]"})},children:e(ye,{icon:xe,size:"xl"})}),n("p",{className:"pl-2 py-1",children:[e("span",{children:"name: "}),e("span",{children:"夜雨炊烟"})]}),n("p",{className:"pl-2 pb-1",children:[e("span",{children:"link: "}),e("span",{children:"https://yychuiyan.com"})]}),n("p",{className:"pl-2 pb-1 lg:flex lg:flex-col lg:items-start",children:[e("span",{children:"avatar: "}),e("span",{children:"https://op.yychuiyan.com/avatar.webp"})]}),n("p",{className:"pl-2 pb-1",children:[e("span",{children:"desc: "}),e("span",{children:"三餐烟火暖，四季皆安然。"})]})]})]})})}),n(i,{name:"basic",form:Y,onFinish:le,onFinishFailed:U,className:"w-800 mx-auto  lg:w-full sm:w-full",children:[n(Z,{children:[e(T,{span:12,className:"pr-2 mt-5 lg:mt-8",children:e(i.Item,{label:"",name:"nickname",rules:[{required:!0,message:"请输入你的昵称"},{whitespace:!0,message:"输入不能为空"},{min:2,message:"昵称不能小于2个字符"},{max:30,message:"主题不能大于30个字符"}],children:e(b,{maxLength:30,placeholder:"请输入你的昵称"})})}),e(T,{span:12,className:"pl-2 mt-5 lg:mt-8",children:e(i.Item,{label:"",name:"email",rules:[{required:!0,message:"请输入邮箱"},{pattern:/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,message:"邮箱格式不正确"}],children:e(b,{maxLength:30,placeholder:"请输入你的邮箱"})})})]}),e(i.Item,{label:"",name:"content",children:e(b.TextArea,{placeholder:"请输入留言内容",onChange:re,value:L,autoSize:{minRows:6,maxRows:12}})}),e(J,{overlayStyle:{width:"260px"},placement:"top",open:f,onOpenChange:()=>B(!f),content:ee.map(t=>e("span",{className:" inline-block cursor-pointer px-2 text-[20px] hover:bg-blue-400 w-5 h-8 rounded-md",onClick:()=>ie(t.emoji),children:t.emoji},t.id)),children:n("div",{className:"-mt-5 mb-1 flex items-center justify-center w-16 h-8 text-center rounded cursor-pointer border-1 border-solid border-base-200",style:{userSelect:"none"},children:[e("span",{children:e(K,{iconName:"icon-biaoqing",className:"text-[20px] text-[var(--color-icon-default)] pr-1"})}),e("span",{className:"text-[var(--color-icon-default)]",style:{userSelect:"none"},children:"表情"})]})}),e(i.Item,{className:"",children:n($,{type:"primary",htmlType:"submit",className:"w-800 mx-auto lg:w-full sm:w-full",children:[e(ke,{})," 提交留言"]})})]}),e(Z,{className:"mt:h-4 w-full mx-auto lg:w-full sm:w-full",children:n(T,{span:24,className:"sm:w-full lg:w-full",children:[n("b",{style:{marginBottom:"24px",color:"var(--color-icon-default)",userSelect:"none"},children:["留言展示 ",e(Ae,{})]}),E.length>0?e(P,{itemLayout:"horizontal",className:"sm:w-full lg:w-full",dataSource:E,renderItem:(t,l)=>{var d,p;return e(P.Item,{actions:[],children:e(P.Item.Meta,{avatar:t.nickName.trim()==="夜雨炊烟"?e(w,{style:{userSelect:"none"},src:X}):Boolean(t.avatar)?e(w,{style:{userSelect:"none"},src:t.avatar}):e(w,{style:{backgroundColor:"#1890ff",userSelect:"none"},children:(p=(d=t.nickName)==null?void 0:d.slice(0,1))==null?void 0:p.toUpperCase()}),title:e("b",{style:{color:"var(--color-icon-default)",userSelect:"none"},children:t.nickName}),description:n(Q,{children:[e("div",{className:"user_content font-normal lg:w-full",children:e("pre",{className:"lg:overflow-auto",dangerouslySetInnerHTML:{__html:t.currentReplayContent.replace(/((http|https):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/g,a=>"<a href='"+a+"' target='_blank'>"+a+"</a>")}})}),n("div",{className:"sm:w-full lg:w-full",style:{fontSize:"12px",marginTop:"8px",marginBottom:"16px",alignItems:"center",display:"flex",flexWrap:"wrap",justifyContent:"space-between"},children:[n("span",{className:"user_desc",style:{userSelect:"none"},children:["用户 ",t.nickName,"  发表于 ",t.messageTime]}),e("span",{style:{userSelect:"none"},children:n("a",{style:{fontSize:"12px",marginRight:"12px"},onClick:()=>W(t),children:[e(te,{}),"  回复"]})})]}),t.children&&t.children.length?e(Q,{children:t.children.map((a,m)=>{var c,y;return e(Te,{className:"bg-base-100",author:e("span",{className:"replay_title",style:{userSelect:"none"},children:a.targetReplayContent.substring(0,40)+"···"}),avatar:a.nickName.trim()==="夜雨炊烟"?e(w,{style:{userSelect:"none"},src:X}):Boolean(a.avatar)?e(w,{style:{userSelect:"none"},src:a.avatar}):e(w,{style:{backgroundColor:"#1890ff",userSelect:"none"},children:(y=(c=a.nickName)==null?void 0:c.slice(0,1))==null?void 0:y.toUpperCase()}),content:e("span",{className:"user_content font-normal",children:e("pre",{className:"lg:overflow-auto",dangerouslySetInnerHTML:{__html:a.currentReplayContent.replace(/((http|https):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/g,x=>"<a href='"+x+"' target='_blank'>"+x+"</a>")}})}),datetime:e(be,{title:a.messageTime,children:e("span",{style:{userSelect:"none"},children:g(a.messageTime).fromNow()})}),actions:[n("a",{style:{fontSize:"12px",marginRight:"12px",userSelect:"none"},onClick:()=>W(a),children:[e(te,{}),"  回复"]})]},m)})}):null,s._id===t._id||s.pid===t._id?e("div",{style:{marginTop:"12px"},ref:k,children:n(i,{form:v,name:"reply",onFinish:oe,onFinishFailed:U,children:[n(Z,{children:[e(T,{span:12,className:"pr-2",children:e(i.Item,{label:"",name:"nickname",rules:[{required:!0,message:"请输入你的昵称"},{whitespace:!0,message:"输入不能为空"},{min:2,message:"昵称不能小于2个字符"},{max:30,message:"主题不能大于30个字符"}],children:e(b,{maxLength:30,placeholder:"请输入你的昵称"})})}),e(T,{span:12,className:"pl-2",children:e(i.Item,{label:"",name:"email",rules:[{required:!0,message:"请输入邮箱"},{pattern:/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,message:"邮箱格式不正确"}],children:e(b,{maxLength:30,placeholder:"请输入你的邮箱"})})})]}),e(i.Item,{label:"",name:"content",children:e(b.TextArea,{placeholder:"请输入回复内容",onChange:de,value:H,autoSize:{minRows:6,maxRows:12}})}),e(J,{overlayStyle:{width:"260px"},placement:"top",open:f,onOpenChange:()=>B(!f),content:ee.map(a=>e("span",{className:" inline-block cursor-pointer px-2 text-[20px] hover:bg-blue-400 w-5 h-8 rounded-md",onClick:()=>me(a.emoji),children:a.emoji},a.id)),children:n("div",{className:"-mt-5 mb-1 flex items-center justify-center w-16 h-8 text-center rounded cursor-pointer border-1 border-solid border-base-200",style:{userSelect:"none"},children:[e("span",{children:e(K,{iconName:"icon-biaoqing",className:"text-[20px] text-[var(--color-icon-default)] pr-1"})}),e("span",{className:"text-[var(--color-icon-default)]",children:"表情"})]})}),e(i.Item,{children:n("div",{style:{display:"flex",justifyContent:"flex-end"},children:[e($,{style:{marginRight:"12px"},onClick:()=>G(),children:"取消"}),e($,{type:"primary",htmlType:"submit",children:" 回复"})]})}),e(i.Item,{})]})}):null]})})},l)}}):e("div",{className:"flex justify-center",children:"暂无留言~"}),e(Ne,{text:se,pageSize:C,currentPage:N,total:ae,onChange:ce})]})})]})})]})},_e=r=>({BlogActions:we(Se,r)}),Ze=ge(null,_e)(he(Me));export{Ze as default};
