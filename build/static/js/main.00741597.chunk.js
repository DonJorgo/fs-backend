(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(15),r=t.n(c),o=t(6),a=t(3),u=t(2),i=t(4),s=t.n(i),d="/api/persons",l=function(e){return e.then((function(e){return e.data}))},b={getAll:function(){return l(s.a.get(d))},create:function(e){return l(s.a.post(d,e))},remove:function(e){return s.a.delete("".concat(d,"/").concat(e.id))},update:function(e,n){return l(s.a.put("".concat(d,"/").concat(e),n))}},m=t(0),j=function(e){var n=e.value,t=e.onChange;return Object(m.jsxs)("div",{children:["filter shown with",Object(m.jsx)("input",{value:n,onChange:t})]})},f=function(e){return Object(m.jsxs)("form",{onSubmit:e.onSubmit,children:[Object(m.jsxs)("div",{children:["name:",Object(m.jsx)("input",{value:e.name,onChange:e.onNameChange})]}),Object(m.jsxs)("div",{children:["number:",Object(m.jsx)("input",{value:e.number,onChange:e.onNumberChange})]}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",children:"add"})})]})},h=function(e){var n=e.persons,t=e.onRemove;return Object(m.jsx)("div",{children:n.map((function(e){var n=e.name,c=e.number,r=e.id;return Object(m.jsxs)("div",{children:[n," ",c,Object(m.jsx)("button",{onClick:function(){return t({name:n,id:r})},children:"delete"})]},n)}))})},v=(t(39),function(e){var n=e.message,t=e.isError;return null==n?null:Object(m.jsx)("div",{className:"notification ".concat(t?"error":"success"),children:n})}),O=function(){var e=Object(u.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],r=Object(u.useState)(""),i=Object(a.a)(r,2),s=i[0],d=i[1],l=Object(u.useState)(""),O=Object(a.a)(l,2),g=O[0],p=O[1],x=Object(u.useState)(""),w=Object(a.a)(x,2),C=w[0],S=w[1],E=Object(u.useState)({message:null}),N=Object(a.a)(E,2),k=N[0],y=N[1];Object(u.useEffect)((function(){b.getAll().then((function(e){c(e)}))}),[]);var A=t.filter((function(e){return e.name.toLowerCase().includes(C.toLowerCase())})),D=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];y({message:e,isError:n}),setTimeout((function(){y({message:null})}),5e3)};return Object(m.jsxs)("div",{children:[Object(m.jsx)("h2",{children:"Phonebook"}),Object(m.jsx)(v,{message:k.message,isError:k.isError}),Object(m.jsx)(j,{value:C,onChange:function(e){S(e.target.value)}}),Object(m.jsx)("h3",{children:"Add a new"}),Object(m.jsx)(f,{name:s,number:g,onSubmit:function(e){if(e.preventDefault(),t.some((function(e){return e.name===s}))){var n="".concat(s," is already added to phonebook, replace the old number with a new one?");window.confirm(n)&&function(){var e=t.find((function(e){return e.name===s})),n=Object(o.a)(Object(o.a)({},e),{},{number:g});b.update(e.id,n).then((function(n){D("".concat(n.name," number changed from ").concat(e.number," to ").concat(n.number)),c(t.map((function(t){return t.id!==e.id?t:n})))})).catch((function(n){var r;r="Information of ".concat(e.name," has already been removed from server"),D(r,!0),c(t.filter((function(n){return n.id!==e.id})))}))}()}else b.create({name:s,number:g}).then((function(e){D("Added ".concat(e.name)),c(t.concat(e))}))},onNameChange:function(e){d(e.target.value)},onNumberChange:function(e){p(e.target.value)}}),Object(m.jsx)("h3",{children:"Numbers"}),Object(m.jsx)(h,{persons:A,onRemove:function(e){window.confirm("Delete ".concat(e.name," ?"))&&b.remove(e).then((function(){D("".concat(e.name," removed succesfully")),c(t.filter((function(n){return n.id!==e.id})))}))}})]})};r.a.render(Object(m.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.00741597.chunk.js.map