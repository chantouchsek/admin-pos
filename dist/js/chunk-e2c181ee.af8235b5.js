(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e2c181ee","chunk-2d0dd7b7"],{"2dc9":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"animated fadeIn"},[a("b-row",[a("b-col",{attrs:{lg:"6"}},[a("c-table",{attrs:{"table-data":e.items,fields:e.fields,caption:"<i class='fa fa-align-justify'></i> Simple Table"}})],1),a("b-col",{attrs:{lg:"6"}},[a("c-table",{attrs:{"table-data":e.items,striped:"",caption:"<i class='fa fa-align-justify'></i> Striped Table"}})],1)],1),a("b-row",[a("b-col",{attrs:{lg:"6"}},[a("c-table",{attrs:{"table-data":e.items,small:"",caption:"<i class='fa fa-align-justify'></i> Condensed Table"}})],1),a("b-col",{attrs:{lg:"6"}},[a("c-table",{attrs:{"table-data":e.items,fixed:"",bordered:"",caption:"<i class='fa fa-align-justify'></i> Bordered Table"}})],1)],1),a("b-row",[a("b-col",{attrs:{sm:"12"}},[a("c-table",{attrs:{"table-data":e.itemsArray,"per-page":10,hover:"",striped:"",bordered:"",small:"",fixed:"",caption:"<i class='fa fa-align-justify'></i> Combined All Table"}})],1)],1),a("b-row",[a("b-col",{attrs:{sm:"12"}},[a("c-table",{attrs:{dark:"","table-data":e.itemsArray,"per-page":10,hover:"",striped:"",bordered:"",small:"",fixed:"",caption:"<i class='fa fa-align-justify'></i> Dark Table"}})],1)],1)],1)},s=[],n=a("8992"),i=a("8229"),o=function(){return Object(n["b"])([{username:"Samppa Nori",registered:"2012/01/01",role:"Member",status:"Active",_rowVariant:"success"},{username:"Estavan Lykos",registered:"2012/02/01",role:"Staff",status:"Banned",_rowVariant:"danger"},{username:"Chetan Mohamed",registered:"2012/02/01",role:"Admin",status:"Inactive",_rowVariant:"info"},{username:"Derick Maximinus",registered:"2012/03/01",role:"Member",status:"Pending"},{username:"Friderik Dávid",registered:"2012/01/21",role:"Staff",status:"Active"},{username:"Yiorgos Avraamu",registered:"2012/01/01",role:"Member",status:"Active"},{username:"Avram Tarasios",registered:"2012/02/01",role:"Staff",status:"Banned"},{username:"Quintin Ed",registered:"2012/02/01",role:"Admin",status:"Inactive"},{username:"Enéas Kwadwo",registered:"2012/03/01",role:"Member",status:"Pending"},{username:"Agapetus Tadeáš",registered:"2012/01/21",role:"Staff",status:"Active"},{username:"Carwyn Fachtna",registered:"2012/01/01",role:"Member",status:"Active"},{username:"Nehemiah Tatius",registered:"2012/02/01",role:"Staff",status:"Banned"},{username:"Ebbe Gemariah",registered:"2012/02/01",role:"Admin",status:"Inactive"},{username:"Eustorgios Amulius",registered:"2012/03/01",role:"Member",status:"Pending"},{username:"Leopold Gáspár",registered:"2012/01/21",role:"Staff",status:"Active"},{username:"Pompeius René",registered:"2012/01/01",role:"Member",status:"Active"},{username:"Paĉjo Jadon",registered:"2012/02/01",role:"Staff",status:"Banned"},{username:"Micheal Mercurius",registered:"2012/02/01",role:"Admin",status:"Inactive"},{username:"Ganesha Dubhghall",registered:"2012/03/01",role:"Member",status:"Pending"},{username:"Hiroto Šimun",registered:"2012/01/21",role:"Staff",status:"Active"},{username:"Vishnu Serghei",registered:"2012/01/01",role:"Member",status:"Active"},{username:"Zbyněk Phoibos",registered:"2012/02/01",role:"Staff",status:"Banned"},{username:"Einar Randall",registered:"2012/02/01",role:"Admin",status:"Inactive"},{username:"Félix Troels",registered:"2012/03/21",role:"Staff",status:"Active"},{username:"Aulus Agmundr",registered:"2012/01/01",role:"Member",status:"Pending"}])},l={name:"tables",components:{cTable:i["default"]},data:function(){return{items:o,itemsArray:o(),fields:[{key:"username",label:"User",sortable:!0},{key:"registered"},{key:"role"},{key:"status",sortable:!0}]}}},u=l,d=a("2877"),c=Object(d["a"])(u,r,s,!1,null,null,null);c.options.__file="Tables.vue";t["default"]=c.exports},8229:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",{attrs:{header:e.caption}},[a("b-table",{attrs:{dark:e.dark,hover:e.hover,striped:e.striped,bordered:e.bordered,small:e.small,fixed:e.fixed,responsive:"sm",items:e.items,fields:e.captions,"current-page":e.currentPage,"per-page":e.perPage},scopedSlots:e._u([{key:"status",fn:function(t){return[a("b-badge",{attrs:{variant:e.getBadge(t.item.status)}},[e._v(e._s(t.item.status))])]}}])}),a("nav",[a("b-pagination",{attrs:{"total-rows":e.totalRows,"per-page":e.perPage,"prev-text":"Prev","next-text":"Next","hide-goto-end-buttons":""},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)],1)},s=[],n=a("a745"),i=a.n(n),o=(a("c5f6"),{name:"c-table",inheritAttrs:!1,props:{caption:{type:String,default:"Table"},hover:{type:Boolean,default:!1},striped:{type:Boolean,default:!1},bordered:{type:Boolean,default:!1},small:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1},tableData:{type:[Array,Function],default:function(){return[]}},fields:{type:[Array,Object],default:function(){return[]}},perPage:{type:Number,default:5},dark:{type:Boolean,default:!1}},data:function(){return{currentPage:1}},computed:{items:function(){var e=this.tableData;return i()(e)?e:e()},totalRows:function(){return this.getRowCount()},captions:function(){return this.fields}},methods:{getBadge:function(e){return"Active"===e?"success":"Inactive"===e?"secondary":"Pending"===e?"warning":"Banned"===e?"danger":"primary"},getRowCount:function(){return this.items.length}}}),l=o,u=a("2877"),d=Object(u["a"])(l,r,s,!1,null,null,null);d.options.__file="Table.vue";t["default"]=d.exports},8992:function(e,t,a){"use strict";function r(e,t){return Math.floor(Math.random()*(t-e+1)+e)}a.d(t,"a",function(){return r}),a.d(t,"b",function(){return s});var s=function(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),r=e[t];e[t]=e[a],e[a]=r}return e}}}]);
//# sourceMappingURL=chunk-e2c181ee.af8235b5.js.map