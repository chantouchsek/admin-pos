(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d221fb4"],{cd52:function(t,o,e){"use strict";e.r(o);var s=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("table",{staticClass:"w-100"},[e("tbody",[e("tr",[e("td",{staticClass:"text-muted"},[t._v("HEX:")]),e("td",{staticClass:"font-weight-bold"},[t._v(t._s(this.hexColor))])]),e("tr",[e("td",{staticClass:"text-muted"},[t._v("RGB:")]),e("td",{staticClass:"font-weight-bold"},[t._v(t._s(this.bgColor))])])])])},r=[],l=e("36e4"),n={name:"ColorView",data:function(){return{bgColor:"rgb(255, 255, 255)"}},computed:{hexColor:function(){return Object(l["rgbToHex"])(this.bgColor)}},methods:{setColor:function(){var t=this.$parent.$el.children[0],o=window.getComputedStyle(t).getPropertyValue("background-color");this.bgColor=o||this.bgColor}},mounted:function(){this.setColor()}},i=n,a=e("2877"),c=Object(a["a"])(i,s,r,!1,null,null,null);o["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d221fb4.690fa3e4.js.map