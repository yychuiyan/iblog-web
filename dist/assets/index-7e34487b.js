import{E as N,G as tt,m as et,n as ot,H as nt,K as G,I as rt,r as A,o as a,J as _,_ as R,R as l,h as $,C as M,T as it,L as at,M as V,N as lt}from"./index-a3587e31.js";function st(t){let e;const r=n=>()=>{e=null,t.apply(void 0,tt(n))},o=function(){if(e==null){for(var n=arguments.length,i=new Array(n),u=0;u<n;u++)i[u]=arguments[u];e=N(r(i))}};return o.cancel=()=>{N.cancel(e),e=null},o}function H(t){return t!=null&&t===t.window}function q(t,e){var r,o;if(typeof window>"u")return 0;const n=e?"scrollTop":"scrollLeft";let i=0;return H(t)?i=t[e?"pageYOffset":"pageXOffset"]:t instanceof Document?i=t.documentElement[n]:(t instanceof HTMLElement||t)&&(i=t[n]),t&&!H(t)&&typeof i!="number"&&(i=(o=((r=t.ownerDocument)!==null&&r!==void 0?r:t).documentElement)===null||o===void 0?void 0:o[n]),i}function ct(t,e,r,o){const n=r-e;return t/=o/2,t<1?n/2*t*t*t+e:n/2*((t-=2)*t*t+2)+e}function ut(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{getContainer:r=()=>window,callback:o,duration:n=450}=e,i=r(),u=q(i,!0),d=Date.now(),f=()=>{const g=Date.now()-d,s=ct(g>n?n:g,u,t,n);H(i)?i.scrollTo(window.pageXOffset,s):i instanceof Document||i.constructor.name==="HTMLDocument"?i.documentElement.scrollTop=s:i.scrollTop=s,g<n?N(f):typeof o=="function"&&o()};N(f)}const dt=t=>{const{componentCls:e,floatButtonSize:r,motionDurationSlow:o,motionEaseInOutCirc:n}=t,i=`${e}-group`,u=new G("antFloatButtonMoveDownIn",{"0%":{transform:`translate3d(0, ${r}px, 0)`,transformOrigin:"0 0",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1}}),d=new G("antFloatButtonMoveDownOut",{"0%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1},"100%":{transform:`translate3d(0, ${r}px, 0)`,transformOrigin:"0 0",opacity:0}});return[{[`${i}-wrap`]:Object.assign({},rt(`${i}-wrap`,u,d,o,!0))},{[`${i}-wrap`]:{[`
          &${i}-wrap-enter,
          &${i}-wrap-appear
        `]:{opacity:0,animationTimingFunction:n},[`&${i}-wrap-leave`]:{animationTimingFunction:n}}}]},ft=t=>{const{componentCls:e,floatButtonSize:r,margin:o,borderRadiusLG:n}=t,i=`${e}-group`;return{[i]:Object.assign(Object.assign({},A(t)),{zIndex:99,display:"block",border:"none",position:"fixed",width:r,height:"auto",boxShadow:"none",minHeight:r,insetInlineEnd:t.floatButtonInsetInlineEnd,insetBlockEnd:t.floatButtonInsetBlockEnd,borderRadius:n,[`${i}-wrap`]:{zIndex:-1,display:"block",position:"relative",marginBottom:o},[`&${i}-rtl`]:{direction:"rtl"},[e]:{position:"static"}}),[`${i}-circle`]:{[`${e}-circle:not(:last-child)`]:{marginBottom:t.margin,[`${e}-body`]:{width:r,height:r}}},[`${i}-square`]:{[`${e}-square`]:{borderRadius:0,padding:0,"&:first-child":{borderStartStartRadius:n,borderStartEndRadius:n},"&:last-child":{borderEndStartRadius:n,borderEndEndRadius:n},"&:not(:last-child)":{borderBottom:`${t.lineWidth}px ${t.lineType} ${t.colorSplit}`}},[`${i}-wrap`]:{display:"block",borderRadius:n,boxShadow:t.boxShadowSecondary,overflow:"hidden",[`${e}-square`]:{boxShadow:"none",marginTop:0,borderRadius:0,padding:t.paddingXXS,"&:first-child":{borderStartStartRadius:n,borderStartEndRadius:n},"&:last-child":{borderEndStartRadius:n,borderEndEndRadius:n},"&:not(:last-child)":{borderBottom:`${t.lineWidth}px ${t.lineType} ${t.colorSplit}`},[`${e}-body`]:{width:r-t.paddingXXS*2,height:r-t.paddingXXS*2}}}},[`${i}-circle-shadow`]:{boxShadow:"none"},[`${i}-square-shadow`]:{boxShadow:t.boxShadowSecondary,[`${e}-square`]:{boxShadow:"none",padding:t.paddingXXS,[`${e}-body`]:{width:r-t.paddingXXS*2,height:r-t.paddingXXS*2}}}}},pt=t=>{const{componentCls:e,floatButtonIconSize:r,floatButtonSize:o,borderRadiusLG:n}=t;return{[e]:Object.assign(Object.assign({},A(t)),{border:"none",position:"fixed",cursor:"pointer",overflow:"hidden",zIndex:99,display:"block",justifyContent:"center",alignItems:"center",width:o,height:o,insetInlineEnd:t.floatButtonInsetInlineEnd,insetBlockEnd:t.floatButtonInsetBlockEnd,boxShadow:t.boxShadowSecondary,"&-pure":{position:"relative",inset:"auto"},"&:empty":{display:"none"},[`${e}-body`]:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",transition:`all ${t.motionDurationMid}`,[`${e}-content`]:{overflow:"hidden",textAlign:"center",minHeight:o,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"2px 4px",[`${e}-icon`]:{textAlign:"center",margin:"auto",width:r,fontSize:r,lineHeight:1}}}}),[`${e}-circle`]:{height:o,borderRadius:"50%",[`${e}-body`]:{borderRadius:"50%"}},[`${e}-square`]:{height:"auto",minHeight:o,borderRadius:n,[`${e}-body`]:{height:"auto",borderRadius:t.borderRadiusSM}},[`${e}-default`]:{backgroundColor:t.floatButtonBackgroundColor,transition:`background-color ${t.motionDurationMid}`,[`${e}-body`]:{backgroundColor:t.floatButtonBackgroundColor,transition:`background-color ${t.motionDurationMid}`,"&:hover":{backgroundColor:t.colorFillContent},[`${e}-content`]:{[`${e}-icon`]:{color:t.colorText},[`${e}-description`]:{display:"flex",alignItems:"center",lineHeight:`${t.fontSizeLG}px`,color:t.colorText,fontSize:t.fontSizeSM}}}},[`${e}-primary`]:{backgroundColor:t.colorPrimary,[`${e}-body`]:{backgroundColor:t.colorPrimary,transition:`background-color ${t.motionDurationMid}`,"&:hover":{backgroundColor:t.colorPrimaryHover},[`${e}-content`]:{[`${e}-icon`]:{color:t.colorTextLightSolid},[`${e}-description`]:{display:"flex",alignItems:"center",lineHeight:`${t.fontSizeLG}px`,color:t.colorTextLightSolid,fontSize:t.fontSizeSM}}}}}},L=et("FloatButton",t=>{const{colorTextLightSolid:e,colorBgElevated:r,controlHeightLG:o,marginXXL:n,marginLG:i,fontSize:u,fontSizeIcon:d,controlItemBgHover:f}=t,c=ot(t,{floatButtonBackgroundColor:r,floatButtonColor:e,floatButtonHoverBackgroundColor:f,floatButtonFontSize:u,floatButtonIconSize:d*1.5,floatButtonSize:o,floatButtonInsetBlockEnd:n,floatButtonInsetInlineEnd:i});return[ft(c),pt(c),nt(t),dt(c)]});var mt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z"}}]},name:"file-text",theme:"outlined"};const gt=mt;var W=function(e,r){return a.createElement(_,R(R({},e),{},{ref:r,icon:gt}))};W.displayName="FileTextOutlined";const K=a.forwardRef(W),ht=t=>{const{icon:e,description:r,prefixCls:o,className:n}=t,i=l.createElement("div",{className:`${o}-icon`},l.createElement(K,null));return l.createElement("div",{onClick:t.onClick,onFocus:t.onFocus,onMouseEnter:t.onMouseEnter,onMouseLeave:t.onMouseLeave,className:$(n,`${o}-content`)},e||r?l.createElement(l.Fragment,null,e&&l.createElement("div",{className:`${o}-icon`},e),r&&l.createElement("div",{className:`${o}-description`},r)):i)},bt=a.memo(ht),Y=l.createContext(void 0),{Provider:vt}=Y,J=Y;var yt=globalThis&&globalThis.__rest||function(t,e){var r={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(r[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(t);n<o.length;n++)e.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(t,o[n])&&(r[o[n]]=t[o[n]]);return r};const z="float-btn",xt=(t,e)=>{const{prefixCls:r,className:o,rootClassName:n,type:i="default",shape:u="circle",icon:d,description:f,tooltip:c}=t,g=yt(t,["prefixCls","className","rootClassName","type","shape","icon","description","tooltip"]),{getPrefixCls:s,direction:E}=a.useContext(M),b=a.useContext(J),p=s(z,r),[v,w]=L(p),h=b||u,S=$(w,p,o,n,`${p}-${i}`,`${p}-${h}`,{[`${p}-rtl`]:E==="rtl"}),B=a.useMemo(()=>({prefixCls:p,description:f,icon:d,type:i}),[p,f,d,i]),C=l.createElement(it,{title:c,placement:"left"},l.createElement("div",{className:`${p}-body`},l.createElement(bt,Object.assign({},B))));return v(t.href?l.createElement("a",Object.assign({ref:e},g,{className:S}),C):l.createElement("button",Object.assign({ref:e},g,{className:S,type:"button"}),C))},$t=l.forwardRef(xt),O=$t,St=t=>{const{prefixCls:e,className:r,style:o,shape:n="circle",type:i="default",icon:u=l.createElement(K,null),closeIcon:d=l.createElement(lt,null),description:f,trigger:c,children:g,onOpenChange:s}=t,{direction:E,getPrefixCls:b}=a.useContext(M),p=b(z,e),[v,w]=L(p),h=`${p}-group`,S=$(h,w,r,{[`${h}-rtl`]:E==="rtl",[`${h}-${n}`]:n,[`${h}-${n}-shadow`]:!c}),B=$(w,`${h}-wrap`),[C,T]=at(!1,{value:t.open}),P=a.useRef(null),F=a.useRef(null),y=a.useMemo(()=>c==="hover"?{onMouseEnter(){T(!0),s==null||s(!0)},onMouseLeave(){T(!1),s==null||s(!1)}}:{},[c]),m=()=>{T(x=>(s==null||s(!x),!x))},D=a.useCallback(x=>{var I,j;if(!((I=P.current)===null||I===void 0)&&I.contains(x.target)){!((j=F.current)===null||j===void 0)&&j.contains(x.target)&&m();return}T(!1),s==null||s(!1)},[c]);return a.useEffect(()=>{if(c==="click")return document.addEventListener("click",D),()=>{document.removeEventListener("click",D)}},[c]),v(l.createElement(vt,{value:n},l.createElement("div",Object.assign({ref:P,className:S,style:o},y),c&&["click","hover"].includes(c)?l.createElement(l.Fragment,null,l.createElement(V,{visible:C,motionName:`${h}-wrap`},x=>{let{className:I}=x;return l.createElement("div",{className:$(I,B)},g)}),l.createElement(O,{ref:F,type:i,shape:n,icon:C?d:u,description:f})):g)))},U=a.memo(St);var Ct={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"}}]},name:"vertical-align-top",theme:"outlined"};const wt=Ct;var Q=function(e,r){return a.createElement(_,R(R({},e),{},{ref:r,icon:wt}))};Q.displayName="VerticalAlignTopOutlined";const Ot=a.forwardRef(Q);var Et=globalThis&&globalThis.__rest||function(t,e){var r={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(r[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(t);n<o.length;n++)e.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(t,o[n])&&(r[o[n]]=t[o[n]]);return r};const Bt=t=>{const{prefixCls:e,className:r,type:o="default",shape:n="circle",visibilityHeight:i=400,icon:u=l.createElement(Ot,null),target:d,onClick:f,duration:c=450}=t,g=Et(t,["prefixCls","className","type","shape","visibilityHeight","icon","target","onClick","duration"]),[s,E]=a.useState(i===0),b=a.useRef(null),p=()=>b.current&&b.current.ownerDocument?b.current.ownerDocument:window,v=st(y=>{const m=q(y.target,!0);E(m>=i)});a.useEffect(()=>{const m=(d||p)();return v({target:m}),m==null||m.addEventListener("scroll",v),()=>{v.cancel(),m==null||m.removeEventListener("scroll",v)}},[d]);const w=y=>{ut(0,{getContainer:d||p,duration:c}),f==null||f(y)},{getPrefixCls:h}=a.useContext(M),S=h(z,e),B=h(),[C]=L(S),P=a.useContext(J)||n,F=Object.assign({prefixCls:S,icon:u,type:o,shape:P},g);return C(l.createElement(V,{visible:s,motionName:`${B}-fade`},y=>{let{className:m}=y;return l.createElement(O,Object.assign({ref:b},F,{onClick:w,className:$(r,m)}))}))},Z=a.memo(Bt);var k=globalThis&&globalThis.__rest||function(t,e){var r={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(r[o]=t[o]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(t);n<o.length;n++)e.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(t,o[n])&&(r[o[n]]=t[o[n]]);return r};const X=t=>{var{backTop:e}=t,r=k(t,["backTop"]);return e?a.createElement(Z,Object.assign({},r,{visibilityHeight:0})):a.createElement(O,Object.assign({},r))};function Tt(t){var{className:e,items:r}=t,o=k(t,["className","items"]);const{prefixCls:n}=o,{getPrefixCls:i}=a.useContext(M),d=`${i(z,n)}-pure`;return r?a.createElement(U,Object.assign({className:$(e,d)},o),r.map((f,c)=>a.createElement(X,Object.assign({key:c},f)))):a.createElement(X,Object.assign({className:$(e,d)},o))}const It=a.memo(Tt);O.BackTop=Z;O.Group=U;O._InternalPanelDoNotUseOrYouWillBeFired=It;export{O as F,Ot as V,st as t};
