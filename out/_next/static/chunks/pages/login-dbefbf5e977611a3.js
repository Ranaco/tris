(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{15193:function(e,n,t){"use strict";t.d(n,{hE:function(){return v},zx:function(){return E}});var r=t(97375),i=t(42846),a=t(15031),s=t(38554),o=t.n(s),c=t(67294),l=t(26450),u=t(89238);function d(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}function p(){return p=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},p.apply(this,arguments)}var f=["size","colorScheme","variant","className","spacing","isAttached","isDisabled"],h=(0,l.kr)({strict:!1,name:"ButtonGroupContext"}),m=h[0],g=h[1],v=(0,i.Gp)((function(e,n){var t=e.size,r=e.colorScheme,s=e.variant,o=e.className,l=e.spacing,u=void 0===l?"0.5rem":l,h=e.isAttached,g=e.isDisabled,v=d(e,f),x=(0,a.cx)("chakra-button__group",o),w=c.useMemo((function(){return{size:t,colorScheme:r,variant:s,isDisabled:g}}),[t,r,s,g]),b={display:"inline-flex"};return b=p({},b,h?{"> *:first-of-type:not(:last-of-type)":{borderEndRadius:0},"> *:not(:first-of-type):not(:last-of-type)":{borderRadius:0},"> *:not(:first-of-type):last-of-type":{borderStartRadius:0}}:{"& > *:not(style) ~ *:not(style)":{marginStart:u}}),c.createElement(m,{value:w},c.createElement(i.m$.div,p({ref:n,role:"group",__css:b,className:x,"data-attached":h?"":void 0},v)))}));a.Ts&&(v.displayName="ButtonGroup");var x=["label","placement","spacing","children","className","__css"],w=function(e){var n=e.label,t=e.placement,r=e.spacing,s=void 0===r?"0.5rem":r,o=e.children,l=void 0===o?c.createElement(u.$,{color:"currentColor",width:"1em",height:"1em"}):o,f=e.className,h=e.__css,m=d(e,x),g=(0,a.cx)("chakra-button__spinner",f),v="start"===t?"marginEnd":"marginStart",w=c.useMemo((function(){var e;return p(((e={display:"flex",alignItems:"center",position:n?"relative":"absolute"})[v]=n?s:0,e.fontSize="1em",e.lineHeight="normal",e),h)}),[h,n,v,s]);return c.createElement(i.m$.div,p({className:g},m,{__css:w}),l)};a.Ts&&(w.displayName="ButtonSpinner");var b=["children","className"],y=function(e){var n=e.children,t=e.className,r=d(e,b),s=c.isValidElement(n)?c.cloneElement(n,{"aria-hidden":!0,focusable:!1}):n,o=(0,a.cx)("chakra-button__icon",t);return c.createElement(i.m$.span,p({display:"inline-flex",alignSelf:"center",flexShrink:0},r,{className:o}),s)};a.Ts&&(y.displayName="ButtonIcon");var A=["isDisabled","isLoading","isActive","children","leftIcon","rightIcon","loadingText","iconSpacing","type","spinner","spinnerPlacement","className","as"],E=(0,i.Gp)((function(e,n){var t=g(),s=(0,i.mq)("Button",p({},t,e)),l=(0,i.Lr)(e),u=l.isDisabled,f=void 0===u?null==t?void 0:t.isDisabled:u,h=l.isLoading,m=l.isActive,v=l.children,x=l.leftIcon,b=l.rightIcon,y=l.loadingText,E=l.iconSpacing,j=void 0===E?"0.5rem":E,k=l.type,_=l.spinner,N=l.spinnerPlacement,C=void 0===N?"start":N,I=l.className,O=l.as,T=d(l,A),L=c.useMemo((function(){var e,n=o()({},null!=(e=null==s?void 0:s._focus)?e:{},{zIndex:1});return p({display:"inline-flex",appearance:"none",alignItems:"center",justifyContent:"center",userSelect:"none",position:"relative",whiteSpace:"nowrap",verticalAlign:"middle",outline:"none"},s,!!t&&{_focus:n})}),[s,t]),Z=function(e){var n=c.useState(!e),t=n[0],r=n[1];return{ref:c.useCallback((function(e){e&&r("BUTTON"===e.tagName)}),[]),type:t?"button":void 0}}(O),z=Z.ref,B=Z.type,D={rightIcon:b,leftIcon:x,iconSpacing:j,children:v};return c.createElement(i.m$.button,p({disabled:f||h,ref:(0,r.qq)(n,z),as:O,type:null!=k?k:B,"data-active":(0,a.PB)(m),"data-loading":(0,a.PB)(h),__css:L,className:(0,a.cx)("chakra-button",I)},T),h&&"start"===C&&c.createElement(w,{className:"chakra-button__spinner--start",label:y,placement:"start",spacing:j},_),h?y||c.createElement(i.m$.span,{opacity:0},c.createElement(S,D)):c.createElement(S,D),h&&"end"===C&&c.createElement(w,{className:"chakra-button__spinner--end",label:y,placement:"end",spacing:j},_))}));function S(e){var n=e.leftIcon,t=e.rightIcon,r=e.children,i=e.iconSpacing;return c.createElement(c.Fragment,null,n&&c.createElement(y,{marginEnd:i},n),r,t&&c.createElement(y,{marginStart:i},t))}a.Ts&&(E.displayName="Button");var j=["icon","children","isRound","aria-label"],k=(0,i.Gp)((function(e,n){var t=e.icon,r=e.children,i=e.isRound,a=e["aria-label"],s=d(e,j),o=t||r,l=c.isValidElement(o)?c.cloneElement(o,{"aria-hidden":!0,focusable:!1}):null;return c.createElement(E,p({padding:"0",borderRadius:i?"full":void 0,ref:n,"aria-label":a},s),l)}));a.Ts&&(k.displayName="IconButton")},92684:function(e,n,t){"use strict";t.d(n,{ac:function(){return c},c:function(){return u},di:function(){return d}});var r=t(42846),i=t(15031),a=t(67294),s=t(85393);function o(){return o=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},o.apply(this,arguments)}function c(e,n){void 0===n&&(n={});var t=n,r=t.ssr,c=void 0===r||r,l=t.fallback,u=(0,s.O)(),d=Array.isArray(e)?e:[e],p=Array.isArray(l)?l:[l];p=p.filter((function(e){return null!=e}));var f=(0,a.useState)((function(){return d.map((function(e,n){return{media:e,matches:c?!!p[n]:u.window.matchMedia(e).matches}}))})),h=f[0],m=f[1];return(0,a.useEffect)((function(){m(d.map((function(e){return{media:e,matches:u.window.matchMedia(e).matches}})));var e=d.map((function(e){return u.window.matchMedia(e)})),n=function(e){m((function(n){return n.slice().map((function(n){return n.media===e.media?o({},n,{matches:e.matches}):n}))}))};return e.forEach((function(e){(0,i.mf)(e.addListener)?e.addListener(n):e.addEventListener("change",n)})),function(){e.forEach((function(e){(0,i.mf)(e.removeListener)?e.removeListener(n):e.removeEventListener("change",n)}))}}),[u.window]),h.map((function(e){return e.matches}))}var l=function(e){var n=e.breakpoint,t=e.hide,r=e.children,i=c(n,{ssr:e.ssr})[0];return(t?!i:i)?r:null},u=function(e){var n=e.children,t=e.ssr,r=f(e);return a.createElement(l,{breakpoint:r,hide:!0,ssr:t},n)};i.Ts&&(u.displayName="Hide");var d=function(e){var n=e.children,t=e.ssr,r=f(e);return a.createElement(l,{breakpoint:r,ssr:t},n)};i.Ts&&(d.displayName="Show");var p=function(e,n){return(0,i.Wf)(e,"breakpoints."+n,n)};function f(e){var n=e.breakpoint,t=void 0===n?"":n,i=e.below,a=e.above,s=(0,r.Fg)(),o=p(s,i),c=p(s,a),l=t;return o?l="(max-width: "+o+")":c&&(l="(min-width: "+c+")"),l}},73700:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return t(99374)}])},62668:function(e,n,t){"use strict";var r=t(85893),i=t(9008),a=t.n(i),s=t(46807);n.Z=function(e){var n=e.children,t=e.title;return(0,r.jsxs)(s.lx,{children:[(0,r.jsxs)(a(),{children:[(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,r.jsx)("title",{children:t})]}),(0,r.jsx)(s.lx,{w:"100vw",maxW:"100%",h:"100vh",children:n})]})}},92659:function(e,n,t){"use strict";var r=t(26042),i=t(69396),a=t(85893),s=t(25675),o=t.n(s),c=t(46807);n.Z=function(e){return(0,a.jsx)(c.lx,(0,i.Z)((0,r.Z)({h:"200px",w:"200px"},e),{children:(0,a.jsx)(o(),{src:"/icons/tris_logo.png",alt:"Tris Logo",height:"200px",width:"200px"})}))}},99374:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return I}});var r,i,a,s=t(47568),o=t(26042),c=t(69396),l=t(34051),u=t.n(l),d=t(85893),p=t(68527),f=t(92684),h=t(15193),m=t(46807),g=t(62668),v=t(33434),x=t(92659),w=t(42484),b=t.n(w),y=t(85538),A=t(25675),E=t.n(A),S=t(11163),j=t(67294),k=t(241),_={src:"/_next/static/media/metamask.72fa9c91.png",height:52,width:49,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABCklEQVR42hXLP0sCYQAH4N/7787ruCs4NCHwLKUaEsOGXISIGgqqtTVoCVpr8pMEfoyQKArabKpzkiCHxEFMBDu48+593+jZH3Jdz54Vl0jzYkdcAvjoDCSOKgwomZnuc7RObhu5e6X18YZHw9MK6ywuYDwLidGfqOprX/qcEi2kAtqfyjYE9s9rHL2xQusthZPBkG3n7VrOIfWDMpPVZapdCwpAmqSazSV55M1D8W4ZgMlAvoaUfk8MeI6We6spVrKyx12L3OC/KK1sO0EcD7RQ0J5bgJyrMp/OdAmgiKKEa5GHV2zgR5roBi/wHeuBp5K0CaG+0KO76eYVwsLWyeg33g2itacAaP0Bn7JnU8zvh6YAAAAASUVORK5CYII="},N=t(63501);(null===window||void 0===window||null===(i=window.ethereum)||void 0===i?void 0:i.isSequence)||(r=(0,c.Z)((0,o.Z)({},r),{sequence:{package:y.v,options:{appName:"Tris",defaultNetwork:"polygon"}}})),a=new(b())({providerOptions:r,cacheProvider:!0});var C=function(){var e=(0,v.Z)(),n=(0,S.useRouter)(),t=(0,j.useContext)(N.AppState),r=t.state,i=t.setState;(0,j.useEffect)((function(){a.cachedProvider&&g(),console.log("This is the state",r),"true"==window.localStorage.getItem("isAuthenticated")&&n.push("/")}),[]);!function(){var e=(0,s.Z)(u().mark((function e(){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.UserContract.methods.getUserData().send({from:r.account}).then((function(e){}));case 2:e.sent;case 3:case"end":return e.stop()}}),e)})))}();var l=function(){var e=(0,s.Z)(u().mark((function e(){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.cachedProvider&&a.clearCachedProvider(),g();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=function(){var e=(0,s.Z)(u().mark((function e(){var t,s,l;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Connecting wallet"),e.next=4,a.connect();case 4:return s=e.sent,l=new k.Q(s),console.log("Wallet connection successful"),s.sequence&&(l.sequence=s.sequence),i((function(e){return(0,c.Z)((0,o.Z)({},e),{provider:l})})),t=l,console.log("This is the provider:: ",t),e.next=13,w(t).then((function(e){console.log("This is the localStorage value :: ",window.localStorage.getItem("isAuthenticated")),void 0!==e&&!1===r.isRegistered?n.replace("/signup"):void 0!==e&&"true"==window.localStorage.getItem("isAuthenticated")&&n.replace("/")}));case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=(0,s.Z)(u().mark((function e(n){var t,r;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null==n){e.next=9;break}return t=n.getSigner(),e.next=4,t.getAddress();case 4:return r=e.sent,i((function(e){return(0,c.Z)((0,o.Z)({},e),{account:r})})),e.abrupt("return",r);case 9:console.log("Provider was not connected");case 10:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,d.jsxs)(p.kC,{w:"100%",p:"30px",h:"100vh",gap:"30px",children:[(0,d.jsx)(f.di,{breakpoint:"(min-height: 750px)",children:(0,d.jsx)(f.c,{breakpoint:"(max-width: 1090px)",children:(0,d.jsxs)(m.lx,{flexBasis:"30%",p:"10px",display:"flex",alignItems:"center",justifyContent:"start",flexDirection:"column",h:"93.8vh",borderRadius:"20px",w:"100%",css:{backdropFilter:"blur(40px)"},fontFamily:"Megrim",children:[(0,d.jsx)(x.Z,{}),(0,d.jsx)(p.xv,{position:"fixed",top:"17%",color:"lightGrey",fontSize:"15em",children:"Tris"}),(0,d.jsx)(m.lx,{w:"80%",position:"relative",top:"28%",bg:"textGrey",h:"1px"}),(0,d.jsxs)(p.xv,{position:"relative",top:"35%",fontFamily:"'M PLUS Rounded 1c'",textAlign:"center",color:"lightGrey",fontSize:"4.4em",alignSelf:"center",children:["Welcome to \xa0",(0,d.jsx)("span",{style:{fontFamily:"Megrim",fontWeight:"bold"},children:"Tris."}),(0,d.jsx)("br",{})," ",(0,d.jsxs)(m.lx,{style:{fontFamily:"Shadows Into Light",fontSize:"0.4em",textAlign:"center",paddingTop:"10px"},children:[" ","The"," ",(0,d.jsx)("span",{style:{fontWeight:"bold",textAlign:"center"},children:"web3"})," ","social media platform!"," "]})]})]})})}),(0,d.jsxs)(m.lx,{flexBasis:e.width<"1091"?"100%":"70%",display:"flex",pt:"4%",pl:"30px",alignItems:"start",justifyContent:"start",h:"100%",borderRadius:"20px",flexDirection:"column",w:"100%",css:{backdropFilter:"blur(40px)"},children:[(0,d.jsxs)(p.xv,{fontSize:"4em",w:"100%",children:["Login with your ",(0,d.jsx)("br",{}),(0,d.jsx)("span",{style:{fontWeight:"bold",color:"lightgrey"},children:"web3"})," ","wallet!"]}),(0,d.jsx)(p.xv,{alignSelf:"center",textAlign:"center",w:"100%",pt:"10%",fontSize:"3em",children:"Continue with:"}),(0,d.jsxs)(h.zx,{onClick:l,alignSelf:"center",mt:"100px",w:"300px",h:"60px",display:"flex",children:[(0,d.jsx)(E(),{src:_,alt:"Tris logo",style:{alignSelf:"start"}}),(0,d.jsx)(p.xv,{pl:"30px",fontSize:"2em",fontWeight:"light",children:"Metamask"})]})]})]})};C.getLayout=function(e){return(0,d.jsx)(g.Z,{title:"Tris - Login",children:e})};var I=C}},function(e){e.O(0,[774,888,179],(function(){return n=73700,e(e.s=n);var n}));var n=e.O();_N_E=n}]);