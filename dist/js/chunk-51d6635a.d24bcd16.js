(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51d6635a"],{1902:function(t,s,e){"use strict";var a=e("23a7"),r=e.n(a);r.a},"23a7":function(t,s,e){},7338:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"w-100"},[e("loading",{attrs:{active:t.isLoading},on:{"update:active":function(s){t.isLoading=s}}},[e("Circle4")],1),e("div",{staticClass:"container"},[t._m(0),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6 offset-md-3"},[e("form",{on:{submit:function(s){return s.preventDefault(),t.payOrder(s)}}},[e("table",{staticClass:"table mb-5"},[t._m(1),e("tbody",[t._l(t.order.products,(function(s){return e("tr",{key:s.id},[e("td",{staticClass:"text-left"},[t._v(" "+t._s(s.product.title)+" ")]),e("td",{staticClass:"text-center"},[t._v(" "+t._s(s.qty)+"/"+t._s(s.product.unit)+" ")]),e("td",{staticClass:"text-right"},[t._v(" "+t._s(t._f("currency")(s.final_total))+" ")])])})),e("tr",[e("td",{staticClass:"text-right checkoutFinalTotal",attrs:{colspan:"2"}},[t._v(" 總計 ")]),e("td",{staticClass:"text-right checkoutFinalTotal"},[t._v(" "+t._s(t._f("currency")(t.order.total))+" ")])])],2)]),e("table",{staticClass:"table mb-5"},[t._m(2),e("tr",[e("td",{attrs:{width:"25%"}},[t._v(" Email ")]),e("td",[t._v(t._s(t.order.user.email))])]),e("tr",[e("td",{attrs:{width:"25%"}},[t._v(" 姓名 ")]),e("td",[t._v(t._s(t.order.user.name))])]),e("tr",[e("td",{attrs:{width:"25%"}},[t._v(" 電話 ")]),e("td",[t._v(t._s(t.order.user.tel))])]),e("tr",[e("td",{attrs:{width:"25%"}},[t._v(" 地址 ")]),e("td",[t._v(t._s(t.order.user.address))])]),e("tr",[e("td",{attrs:{width:"25%"}},[t._v(" 付款狀態 ")]),e("td",[t.order.is_paid?e("span",{staticClass:"text-success"},[t._v("付款完成")]):e("span",[t._v("尚未付款")])])])]),e("div",{staticClass:"text-right"},[!1===t.order.is_paid?e("button",{staticClass:"btn btn-danger mb-4",attrs:{type:"submit"}},[t._v(" 確認付款去 ")]):t._e()])])])])])],1)},r=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"row mb-5"},[e("div",{staticClass:"col-md-6 offset-md-3"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-4 mb-2 mb-md-4"},[e("div",{staticClass:"step rounded"},[t._v(" 資料填寫 ")])]),e("div",{staticClass:"col-md-4 mb-2 mb-md-4"},[e("div",{staticClass:"step active rounded"},[t._v(" 確認訂單 ")])]),e("div",{staticClass:"col-md-4 mb-2 mb-md-4"},[e("div",{staticClass:"step rounded"},[t._v(" 完成 ")])])])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("thead",[e("tr",[e("td",{staticClass:"text-left"},[t._v(" 品名 ")]),e("td",{staticClass:"text-center",attrs:{width:"20%"}},[t._v(" 數量 ")]),e("td",{staticClass:"text-center",attrs:{width:"30%"}},[t._v(" 單價 ")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("tr",[e("td",{staticClass:"text-center border-0 memberTitle",attrs:{colspan:"2"}},[t._v(" 會員資料核對 ")])])}],i=(e("99af"),e("d58b")),c={name:"CustomerCheckuot",components:{Circle4:i["a"]},data:function(){return{isLoading:!1,order:{user:{}},orderId:""}},created:function(){this.orderId=this.$route.params.orderId,this.getOrder()},methods:{getOrder:function(){var t=this,s="".concat("https://vue-course-api.hexschool.io","/api/").concat("iian0910","/order/").concat(t.orderId);t.isLoading=!0,t.$http.get(s).then((function(s){t.order=s.data.order,t.isLoading=!1}))},payOrder:function(){var t=this,s="".concat("https://vue-course-api.hexschool.io","/api/").concat("iian0910","/pay/").concat(t.orderId);t.isLoading=!0,t.$http.post(s).then((function(s){s.data.success?t.$router.push("/payment_success/".concat(t.orderId)):t.$bus.$emit("message:push",s.data.message,"danger"),t.isLoading=!1}))}}},d=c,n=(e("1902"),e("2877")),o=Object(n["a"])(d,a,r,!1,null,"1a821528",null);s["default"]=o.exports},8418:function(t,s,e){"use strict";var a=e("c04e"),r=e("9bf2"),i=e("5c6c");t.exports=function(t,s,e){var c=a(s);c in t?r.f(t,c,i(0,e)):t[c]=e}},"99af":function(t,s,e){"use strict";var a=e("23e7"),r=e("d039"),i=e("e8b5"),c=e("861d"),d=e("7b0b"),n=e("50c4"),o=e("8418"),l=e("65f0"),u=e("1dde"),v=e("b622"),_=e("2d00"),f=v("isConcatSpreadable"),m=9007199254740991,h="Maximum allowed index exceeded",p=_>=51||!r((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),b=u("concat"),C=function(t){if(!c(t))return!1;var s=t[f];return void 0!==s?!!s:i(t)},g=!p||!b;a({target:"Array",proto:!0,forced:g},{concat:function(t){var s,e,a,r,i,c=d(this),u=l(c,0),v=0;for(s=-1,a=arguments.length;s<a;s++)if(i=-1===s?c:arguments[s],C(i)){if(r=n(i.length),v+r>m)throw TypeError(h);for(e=0;e<r;e++,v++)e in i&&o(u,v,i[e])}else{if(v>=m)throw TypeError(h);o(u,v++,i)}return u.length=v,u}})}}]);
//# sourceMappingURL=chunk-51d6635a.d24bcd16.js.map