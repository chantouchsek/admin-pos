(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d555cac"],{a143:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"animated fadeIn"},[r("transition",{attrs:{name:"fade"}},[r("b-card",{staticClass:"card-accent-success",attrs:{"header-tag":"header"}},[r("div",{attrs:{slot:"header"},slot:"header"},[r("i",{staticClass:"icon-list"}),t._v(" Categories\n        "),r("div",{staticClass:"card-header-actions"},[r("b-link",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"card-header-action btn-setting",attrs:{href:"#",title:"Reload"},on:{click:function(e){return e.preventDefault(),t.reloadCategory(e)}}},[r("i",{staticClass:"icon-refresh"})]),r("b-link",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"card-header-action btn-close",attrs:{href:"#",to:{name:"category.create"},title:"New Category"}},[r("i",{staticClass:"icon-plus"})])],1)]),r("b-row",[r("b-col",{staticClass:"mb-2",attrs:{md:"6"}},[r("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:"Filter"}},[r("b-input-group",[r("b-form-input",{attrs:{placeholder:"Type to search..."},model:{value:t.query,callback:function(e){t.query=e},expression:"query"}}),r("b-input-group-append",[r("b-btn",{attrs:{disabled:!t.query},on:{click:function(e){t.query=""}}},[t._v("Search")])],1)],1)],1)],1)],1),r("b-table",{attrs:{"show-empty":!0,responsive:!0,items:t.category.all,fields:t.fields,"current-page":t.currentPage,filter:t.query,"sort-by":t.sortBy,"sort-desc":t.sortDesc,busy:t.$errors.busy,"no-local-sorting":!0,"no-provider-sorting":!0,"no-provider-filtering":!0},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},"sort-changed":t.sortingChanged,"update:busy":function(e){return t.$set(t.$errors,"busy",e)}},scopedSlots:t._u([{key:"actions",fn:function(e){return[r("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip"}],staticClass:"mr-1",attrs:{size:"sm",to:t.getCategoryRoute(e.item.uuid),variant:"primary",title:"Edit"}},[r("i",{staticClass:"fa fa-edit"})])]}},{key:"active",fn:function(e){return[e.item.active?r("b-badge",{attrs:{variant:"success"}},[t._v("Active")]):r("b-badge",{attrs:{variant:"warning"}},[t._v("InActive")])]}}])}),r("b-row",[r("b-col",{staticClass:"my-1",attrs:{md:"6"}},[r("b-pagination",{staticClass:"my-0",attrs:{"total-rows":t.category.pagination.totalCount,"per-page":t.limit,disabled:t.$errors.busy},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1),r("b-col",{staticClass:"my-1",attrs:{md:"6"}},[r("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:"Per page"}},[r("b-form-select",{staticClass:"mb-3",attrs:{options:t.pageNumbers,disabled:t.$errors.busy},model:{value:t.limit,callback:function(e){t.limit=e},expression:"limit"}})],1)],1)],1)],1)],1)],1)},i=[],n=(r("96cf"),r("3b8d")),o=r("cebc"),s=r("2f62"),c=r("f7fe"),u=r.n(c),l={name:"categories-index",middleware:["auth"],metaInfo:function(){return{title:this.$t("settings")}},scrollToTop:!0,data:function(){return{fields:[{key:"name",label:"Name",sortable:!0},{key:"description",label:"Description",sortable:!0},{key:"active",label:"Active",sortable:!0},{key:"actions",label:"Action"}],sortable:{name:"name",description:"description",active:"active"},query:null,pageNumbers:[5,10,20,30,50,500],sortBy:"name",sortDesc:!1,show:!0}},computed:Object(o["a"])({},Object(s["c"])(["category"]),{limit:{get:function(){return this.category.pagination.limit},set:function(t){this.setLimit(t)}},currentPage:{get:function(){return this.category.pagination.currentPage},set:function(t){this.setPage(t)}},sortOptions:function(){return this.fields.filter(function(t){return t.sortable}).map(function(t){return{text:t.label,value:t.key}})}}),methods:{sortingChanged:function(t){this.sortBy=t.sortBy,this.sortDesc=t.sortDesc,this.setQuery(this.query)},getCategoryRoute:function(t){return{name:"category.edit",params:{uuid:t}}},setPage:function(t){this.$store.dispatch("category/all",function(e){e.setParameter("page",t)})},setLimit:function(t){this.$store.dispatch("category/all",function(e){e.setParameter("limit",t).removeParameter("page")})},setQuery:u()(function(t){var e=this;this.$store.dispatch("category/all",function(r){r.setParameters({q:t,direction:e.sortDesc?"desc":"asc",sort:e.sortable[e.sortBy]}).removeParameter("page")})},500),reloadCategory:u()(function(){this.$store.dispatch("category/all",function(t){t.removeParameters(["page","q","direction","sort"])})},500),destroyCategory:function(t){this.$store.dispatch("category/destroy",t)}},mounted:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$store.watch(function(t){t.auth.authenticated&&e.$store.dispatch("category/all")});case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),watch:{query:function(t){this.setQuery(t)}}},f=l,d=r("2877"),p=Object(d["a"])(f,a,i,!1,null,null,null);e["default"]=p.exports},f7fe:function(t,e,r){(function(e){var r="Expected a function",a=NaN,i="[object Symbol]",n=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,c=/^0o[0-7]+$/i,u=parseInt,l="object"==typeof e&&e&&e.Object===Object&&e,f="object"==typeof self&&self&&self.Object===Object&&self,d=l||f||Function("return this")(),p=Object.prototype,b=p.toString,m=Math.max,y=Math.min,g=function(){return d.Date.now()};function h(t,e,a){var i,n,o,s,c,u,l=0,f=!1,d=!1,p=!0;if("function"!=typeof t)throw new TypeError(r);function b(e){var r=i,a=n;return i=n=void 0,l=e,s=t.apply(a,r),s}function h(t){return l=t,c=setTimeout($,e),f?b(t):s}function C(t){var r=t-u,a=t-l,i=e-r;return d?y(i,o-a):i}function w(t){var r=t-u,a=t-l;return void 0===u||r>=e||r<0||d&&a>=o}function $(){var t=g();if(w(t))return P(t);c=setTimeout($,C(t))}function P(t){return c=void 0,p&&i?b(t):(i=n=void 0,s)}function j(){void 0!==c&&clearTimeout(c),l=0,i=u=n=c=void 0}function x(){return void 0===c?s:P(g())}function O(){var t=g(),r=w(t);if(i=arguments,n=this,u=t,r){if(void 0===c)return h(u);if(d)return c=setTimeout($,e),b(u)}return void 0===c&&(c=setTimeout($,e)),s}return e=k(e)||0,v(a)&&(f=!!a.leading,d="maxWait"in a,o=d?m(k(a.maxWait)||0,e):o,p="trailing"in a?!!a.trailing:p),O.cancel=j,O.flush=x,O}function v(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function C(t){return!!t&&"object"==typeof t}function w(t){return"symbol"==typeof t||C(t)&&b.call(t)==i}function k(t){if("number"==typeof t)return t;if(w(t))return a;if(v(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=v(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(n,"");var r=s.test(t);return r||c.test(t)?u(t.slice(2),r?2:8):o.test(t)?a:+t}t.exports=h}).call(this,r("c8ba"))}}]);
//# sourceMappingURL=chunk-6d555cac.dde72cf1.js.map