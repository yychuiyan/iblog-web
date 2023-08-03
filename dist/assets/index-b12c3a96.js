import{m as K,n as Q,x as X,a as Y,b as Z,c as ee,o as l,f as te,h as U,y as ne,R as T,z as L,C as D,s as se,w as oe,A as re,p as b,q as C,v as ae,B as ie}from"./index-a3587e31.js";import{t as F}from"./index-7e34487b.js";const ce=t=>{const{componentCls:o}=t;return{[o]:{position:"fixed",zIndex:t.zIndexPopup}}},le=K("Affix",t=>{const o=Q(t,{zIndexPopup:t.zIndexBase+10});return[ce(o)]});function O(t){return t!==window?t.getBoundingClientRect():{top:0,bottom:window.innerHeight}}function I(t,o,n){if(n!==void 0&&o.top>t.top-n)return n+o.top}function z(t,o,n){if(n!==void 0&&o.bottom<t.bottom+n){const e=window.innerHeight-o.bottom;return n+e}}const _=["resize","scroll","touchstart","touchmove","touchend","pageshow","load"];let E=[];function k(t,o){if(!t)return;let n=E.find(e=>e.target===t);n?n.affixList.push(o):(n={target:t,affixList:[o],eventHandlers:{}},E.push(n),_.forEach(e=>{n.eventHandlers[e]=X(t,e,()=>{n.affixList.forEach(s=>{s.lazyUpdatePosition()})})}))}function M(t){const o=E.find(n=>{const e=n.affixList.some(s=>s===t);return e&&(n.affixList=n.affixList.filter(s=>s!==t)),e});o&&o.affixList.length===0&&(E=E.filter(n=>n!==o),_.forEach(n=>{const e=o.eventHandlers[n];e&&e.remove&&e.remove()}))}function fe(){return typeof window<"u"?window:null}var S;(function(t){t[t.None=0]="None",t[t.Prepare=1]="Prepare"})(S||(S={}));let H=function(t){Y(n,t);var o=Z(n);function n(){var e;return ee(this,n),e=o.apply(this,arguments),e.state={status:S.None,lastAffix:!1,prevTarget:null},e.placeholderNodeRef=l.createRef(),e.fixedNodeRef=l.createRef(),e.getOffsetTop=()=>{const{offsetBottom:s,offsetTop:r}=e.props;return s===void 0&&r===void 0?0:r},e.getOffsetBottom=()=>e.props.offsetBottom,e.measure=()=>{const{status:s,lastAffix:r}=e.state,{onChange:f}=e.props,i=e.getTargetFunc();if(s!==S.Prepare||!e.fixedNodeRef.current||!e.placeholderNodeRef.current||!i)return;const g=e.getOffsetTop(),m=e.getOffsetBottom(),p=i();if(!p)return;const u={status:S.None},x=O(p),c=O(e.placeholderNodeRef.current),B=I(c,x,g),A=z(c,x,m);c.top===0&&c.left===0&&c.width===0&&c.height===0||(B!==void 0?(u.affixStyle={position:"fixed",top:B,width:c.width,height:c.height},u.placeholderStyle={width:c.width,height:c.height}):A!==void 0&&(u.affixStyle={position:"fixed",bottom:A,width:c.width,height:c.height},u.placeholderStyle={width:c.width,height:c.height}),u.lastAffix=!!u.affixStyle,f&&r!==u.lastAffix&&f(u.lastAffix),e.setState(u))},e.prepareMeasure=()=>{e.setState({status:S.Prepare,affixStyle:void 0,placeholderStyle:void 0})},e.updatePosition=F(()=>{e.prepareMeasure()}),e.lazyUpdatePosition=F(()=>{const s=e.getTargetFunc(),{affixStyle:r}=e.state;if(s&&r){const f=e.getOffsetTop(),i=e.getOffsetBottom(),g=s();if(g&&e.placeholderNodeRef.current){const m=O(g),p=O(e.placeholderNodeRef.current),u=I(p,m,f),x=z(p,m,i);if(u!==void 0&&r.top===u||x!==void 0&&r.bottom===x)return}}e.prepareMeasure()}),e}return te(n,[{key:"getTargetFunc",value:function(){const{getTargetContainer:s}=this.context,{target:r}=this.props;return r!==void 0?r:s??fe}},{key:"componentDidMount",value:function(){const s=this.getTargetFunc();s&&(this.timer=setTimeout(()=>{k(s(),this),this.updatePosition()}))}},{key:"componentDidUpdate",value:function(s){const{prevTarget:r}=this.state,f=this.getTargetFunc(),i=(f==null?void 0:f())||null;r!==i&&(M(this),i&&(k(i,this),this.updatePosition()),this.setState({prevTarget:i})),(s.offsetTop!==this.props.offsetTop||s.offsetBottom!==this.props.offsetBottom)&&this.updatePosition(),this.measure()}},{key:"componentWillUnmount",value:function(){this.timer&&(clearTimeout(this.timer),this.timer=null),M(this),this.updatePosition.cancel(),this.lazyUpdatePosition.cancel()}},{key:"render",value:function(){const{affixStyle:s,placeholderStyle:r}=this.state,{affixPrefixCls:f,rootClassName:i,children:g}=this.props,m=U(s&&i,{[f]:!!s});let p=ne(this.props,["prefixCls","offsetTop","offsetBottom","target","onChange","affixPrefixCls","rootClassName"]);return T.createElement(L,{onResize:this.updatePosition},T.createElement("div",Object.assign({},p,{ref:this.placeholderNodeRef}),s&&T.createElement("div",{style:r,"aria-hidden":"true"}),T.createElement("div",{className:m,ref:this.fixedNodeRef,style:s},T.createElement(L,{onResize:this.updatePosition},g))))}}]),n}(T.Component);H.contextType=D;const ue=l.forwardRef((t,o)=>{const{prefixCls:n,rootClassName:e}=t,{getPrefixCls:s}=l.useContext(D),r=s("affix",n),[f,i]=le(r),g=Object.assign(Object.assign({},t),{affixPrefixCls:r,rootClassName:U(e,i)});return f(T.createElement(H,Object.assign({},g,{ref:o})))}),ve=ue,de="/assets/osun-fb993d36.webp",he="/assets/avatar-8540a345.webp",pe=t=>{const[o,n]=l.useState(),[e,s]=l.useState(),[r,f]=l.useState(),[i,g]=l.useState(!1),m=re();l.useState("");const[p,u]=l.useState([]),[x,c]=l.useState(0),[B,A]=l.useState("");l.useEffect(()=>{let N=t.data.length;n(N)},[t]),l.useEffect(()=>{let v=t.data.map(w=>({categories:w.categories,_id:w._id})),a={};for(let w=0;w<v.length;w++){let j=v[w].categories;a[j]=a[j]+1||1}let d=[],y=Object.keys(a),R=Object.values(a),P=1;d=y.map((w,j)=>({count:R[j],name:w,id:P++}));let V=d.length;s(V)},[t.data]),l.useEffect(()=>{let v=t.data.map(h=>h.tags),a=[];for(let h=0;h<v.length;h++)a.push(...v[h]);let d=[];for(let h=0;h<a.length;h++)d.indexOf(a[h])===-1&&d.push(a[h]);let y=0,P=d.map(h=>({name:h,id:y++})).length;f(P)},[t.data]),l.useEffect(()=>{t.BlogActions.asyncApothegmListAction().then(N=>{let{data:v}=N.data,a=v.filter(d=>d.checked===!0);a.sort(()=>Math.random()-.5),u(a)})},[t.BlogActions]),l.useEffect(()=>{if(p.length>0){const v=p[x].content;let a="",d=0,y=!1;const R=setInterval(()=>{y||(a+=v[d],A(a),d++,d>=v.length&&(clearInterval(R),setTimeout(()=>{y=!0;const P=setInterval(()=>{a=a.slice(0,-1),A(a),a.length===0&&(clearInterval(P),y=!1,x+1<p.length?c(x+1):c(0))},150)},5e3)))},150);return()=>clearInterval(R)}},[p,x]);const $=()=>{m.replace("/rblog/timeline")},J=()=>{m.replace("/rblog/category")},W=()=>{m.replace("/rblog/tags")},G=()=>{g(!i)},q=()=>{g(i)};return b("div",{className:"flex flex-col bg-base-100 rounded-2xl items-center mb-5 rounded-3xltransition duration-500 ease-in-out  transform  hover:scale-105 lg:hidden",style:{userSelect:"none"},children:[b("div",{className:"flex flex-col items-center justify-center",children:[C("img",{src:`${i?de:he}`,alt:"",className:`image-container w-24 h-24 mt-3 rounded-full ${i?"rotate":""}`,onMouseEnter:G,onMouseLeave:q}),C("p",{className:"flex items-center justify-center w-64 h-5   pl-2 mt-3 overflow-clip",children:C("span",{className:"",children:B})})]}),b("div",{className:"flex justify-around w-64 h-20 pl-1 pt-2  rounded-xl overflow-clip",children:[b("p",{className:"flex flex-col items-center justify-center w-14 h-14 rounded-2xl cursor-pointer hover:bg-[var(--user-content-color)] hover:text-[var(--user-content-font)] transform duration-300 ease-in",onClick:$,children:[C("span",{children:"文章"}),C("span",{className:"text-sm",children:o})]}),b("p",{className:"flex flex-col items-center justify-center w-14 h-14 rounded-2xl cursor-pointer hover:bg-[var(--user-content-color)] hover:text-[var(--user-content-font)] transform duration-300 ease-in",onClick:J,children:[C("span",{children:"分类"}),C("span",{className:"text-sm",children:e})]}),b("p",{className:"flex flex-col items-center justify-center w-14 h-14 rounded-2xl cursor-pointer hover:bg-[var(--user-content-color)] hover:text-[var(--user-content-font)] transform duration-300 ease-in",onClick:W,children:[C("span",{children:"标签"}),C("span",{className:"text-sm",children:r})]})]})]})},ge=t=>({BlogActions:ae(ie,t)}),Ce=se(null,ge)(oe(pe));export{ve as A,Ce as U};
