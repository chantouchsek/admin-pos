(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d20847e"],{a3b8:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"animated fadeIn"},[r("b-card",{attrs:{"border-variant":"secondary",header:"Role Detail","header-bg-variant":"secondary","header-text-variant":"black",align:"left",title:t.detail.name}},[r("hr"),r("h4",[t._v("Users: ")]),r("b-list-group",t._l(t.detail.users,function(e,a){return r("b-list-group-item",{key:"user-"+a},[r("b-badge",{attrs:{variant:"success",pill:""}},[t._v(t._s(a+1))]),t._v("\n        . "+t._s(e.name)+"\n      ")],1)}),1),r("hr"),r("h4",[t._v("Permissions: ")]),r("b-list-group",{staticClass:"mb-2"},t._l(t.detail.permissions,function(e,a){return r("b-list-group-item",{key:"permission-"+a},[r("b-badge",{attrs:{variant:"primary",pill:""}},[t._v(t._s(a+1))]),t._v("\n        . "+t._s(t._f("removeHyphen")(e))+"\n      ")],1)}),1),r("b-card-footer",{attrs:{"footer-border-variant":"primary"}},[r("b-button",{staticClass:"mr-1",attrs:{type:"button",variant:"primary",disabled:t.$errors.busy,to:t.getEditRoute(t.detail.id)}},[r("i",{staticClass:"fa fa-pencil-square-o"}),t._v(" Edit\n      ")]),r("b-button",{attrs:{type:"button",variant:"warning",disabled:t.$errors.busy},on:{click:t.goBack}},[r("i",{staticClass:"fa fa-arrow-circle-left"}),t._v(" Back\n      ")])],1)],1)],1)},n=[],i=(r("96cf"),r("3b8d")),s=r("cebc"),o=(r("c5f6"),r("2f62")),u={props:{id:{type:[String,Number],required:!0}},name:"UserDetail",middleware:"auth",metaInfo:function(){return{title:this.$t("settings")}},scrollToTop:!0,computed:Object(s["a"])({},Object(o["b"])({detail:"role/detail"})),data:function(){return{}},methods:{goBack:function(){this.$router.push({name:"role.index"})},getEditRoute:function(t){return{name:"role.edit",params:{id:t}}}},mounted:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this,t.next=3,e.$store.watch(function(t){t.auth.authenticated&&e.$store.dispatch("role/detail",e.id)});case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},c=u,l=r("2877"),d=Object(l["a"])(c,a,n,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d20847e.9aecf22b.js.map