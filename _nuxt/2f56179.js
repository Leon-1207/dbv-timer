(window.webpackJsonp=window.webpackJsonp||[]).push([[8,9],{236:function(t,e,n){"use strict";n.r(e);n(45);var r={props:{data:{type:Object,required:!0}},computed:{seconds:function(){var t;return(null===(t=this.data)||void 0===t?void 0:t.seconds)||0},minutes:function(){var t,e=(null===(t=this.data)||void 0===t?void 0:t.minutes)||0;return Math.floor(e%60)},hours:function(){var t,e=(null===(t=this.data)||void 0===t?void 0:t.minutes)||0;return Math.floor(e/60)},text:function(){var t=[this.hours,this.minutes,this.seconds].map((function(t){for(var e=String(t);e.length<2;)e="0"+e;return e}));return(this.hours>0?t[0]+":":"")+t[1]+":"+t[2]}}},o=n(44),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",[t._v("\n  "+t._s(t.text)+"\n")])}),[],!1,null,null,null);e.default=component.exports},237:function(t,e,n){"use strict";var r=n(11),o=n(0),c=n(3),f=n(102),l=n(17),m=n(13),d=n(181),v=n(38),N=n(101),h=n(180),T=n(4),E=n(70).f,I=n(32).f,_=n(16).f,w=n(238),x=n(239).trim,O="Number",M=o.Number,S=M.prototype,k=o.TypeError,y=c("".slice),A=c("".charCodeAt),j=function(t){var e=h(t,"number");return"bigint"==typeof e?e:C(e)},C=function(t){var e,n,r,o,c,f,l,code,m=h(t,"number");if(N(m))throw k("Cannot convert a Symbol value to a number");if("string"==typeof m&&m.length>2)if(m=x(m),43===(e=A(m,0))||45===e){if(88===(n=A(m,2))||120===n)return NaN}else if(48===e){switch(A(m,1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+m}for(f=(c=y(m,2)).length,l=0;l<f;l++)if((code=A(c,l))<48||code>o)return NaN;return parseInt(c,r)}return+m};if(f(O,!M(" 0o1")||!M("0b1")||M("+0x1"))){for(var F,G=function(t){var e=arguments.length<1?0:M(j(t)),n=this;return v(S,n)&&T((function(){w(n)}))?d(Object(e),n,G):e},R=r?E(M):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),V=0;R.length>V;V++)m(M,F=R[V])&&!m(G,F)&&_(G,F,I(M,F));G.prototype=S,S.constructor=G,l(o,O,G)}},238:function(t,e,n){var r=n(3);t.exports=r(1..valueOf)},239:function(t,e,n){var r=n(3),o=n(21),c=n(12),f=n(240),l=r("".replace),m="["+f+"]",d=RegExp("^"+m+m+"*"),v=RegExp(m+m+"*$"),N=function(t){return function(e){var n=c(o(e));return 1&t&&(n=l(n,d,"")),2&t&&(n=l(n,v,"")),n}};t.exports={start:N(1),end:N(2),trim:N(3)}},240:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},241:function(t,e,n){"use strict";n.d(e,"d",(function(){return r})),n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return f})),n.d(e,"e",(function(){return l}));n(237),n(45);function r(t){var e=Number((null==t?void 0:t.repetitions)||0);return isNaN(e)&&(e=0),e*(o(null==t?void 0:t.workTime)+o(null==t?void 0:t.restTime))}function o(t){var data=[t.minutes,t.seconds].map((function(t){return Number(t||"0")})).map((function(t){return isNaN(t)?0:t}));return 60*data[0]+data[1]}function c(t){var e=isNaN(Number(t))?0:Number(t);return{minutes:Math.floor(e/60),seconds:Math.floor(e%60)}}function f(t){var e=function(t){return isNaN(Number(t))?0:Number(t)};return t.repetitions=e(t.repetitions),t.workTime.minutes=e(t.workTime.minutes),t.workTime.seconds=e(t.workTime.seconds),t.restTime.minutes=e(t.restTime.minutes),t.restTime.seconds=e(t.restTime.seconds),t}function l(t){for(var e=t.length;e>0;){var n=Math.floor(Math.random()*e),r=t[--e];t[e]=t[n],t[n]=r}return t}},243:function(t,e,n){"use strict";n.r(e);n(14),n(39);var r=n(241),o={components:{timeText:n(236).default},props:{intervals:{type:Array,required:!0}},computed:{totalSeconds:function(){var t=0;return this.intervals.forEach((function(e){var n=Object(r.d)(e);t+=n})),t},timeObject:function(){return Object(r.c)(this.totalSeconds)}}},c=n(44),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"grid"},[n("span",{staticClass:"mr-2"},[t._v("Gesamtdauer")]),t._v(" "),n("time-text",{staticClass:"font-semibold",attrs:{data:t.timeObject}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{TimeText:n(236).default})}}]);