webpackJsonp([3],{"6f/g":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("SJI6"),s={name:"header",components:{},data:function(){return{name:"",isLogin:!0}},props:{},mounted:function(){this.name=this.$store.getters.username,console.log(this.name)},methods:{userCommand:function(t){switch(console.log(t),t){case"usercenter":break;case"logout":this.$store.dispatch("LogOut").then(function(){return location.reload()}),this.$router.push({path:"/login"})}}},watch:{},created:function(){}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"layout-header"},[a("el-row",[a("el-col",{attrs:{xs:10,sm:12,md:14,lg:16,xl:18}},[a("div",{staticClass:"system-info"},[a("img",{staticClass:"logo",attrs:{src:n("7Otq")}}),t._v(" "),a("span",{staticClass:"title"},[t._v("Database Manager")])])]),t._v(" "),t.isLogin?a("el-col",{attrs:{xs:14,sm:12,md:10,lg:8,xl:6}},[a("div",{staticClass:"system-user"},[a("div",{staticClass:"tools"}),t._v(" "),a("el-dropdown",{on:{command:t.userCommand}},[a("span",{staticClass:"userinfo-inner"},[a("img",{attrs:{src:n("7Otq")}}),t._v(" "+t._s(t.name)+"\n          ")]),t._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{divided:"",command:"logout"}},[t._v("注销登录")])],1)],1)],1)]):t._e()],1)],1)},staticRenderFns:[]};var i=n("VU/8")(s,r,!1,function(t){n("aFVe")},"data-v-310e5f8f",null).exports,o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"layout-content"},[n("div",{staticClass:"container"},[n("div",{staticClass:"container-left"},[t._t("left")],2),t._v(" "),n("div",{staticClass:"container-right"},[n("div",{staticClass:"top"},[n("i",{staticClass:"icon dbm d-icon-liebiao"}),t._v(" "),n("el-breadcrumb",{staticClass:"breadcrumb",attrs:{separator:"/"}},t._l(t.breadcrumbItems,function(e,a){return n("el-breadcrumb-item",{key:a,attrs:{to:{path:e.path}}},[t._v(t._s(e.title))])}),1)],1),t._v(" "),n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.routerLoading,expression:"routerLoading"}],staticClass:"content"},[t._t("content")],2)])])])},staticRenderFns:[]};var c=n("VU/8")({name:"content",components:{},data:function(){return{breadcrumbItems:[]}},props:{},computed:{routerLoading:function(){return this.$store.getters.routerLoading}},methods:{initBreadcrumbItems:function(t){var e=[{path:"/",title:"数据管理系统"}];for(var n in t.matched)t.matched[n].meta&&t.matched[n].meta.title&&e.push({path:t.matched[n].path?t.matched[n].path:"/",title:t.matched[n].meta.title});e.length>0&&(e[e.length-1].path=""),this.breadcrumbItems=e}},watch:{$route:function(t){this.initBreadcrumbItems(t)}},created:function(){this.initBreadcrumbItems(this.$route)}},o,!1,function(t){n("bhej")},"data-v-1d4c1c82",null).exports,l={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"layout-footer"},[this._t("default")],2)},staticRenderFns:[]};var d=n("VU/8")({name:"footer",components:{},data:function(){return{}},props:{},computed:{},methods:{},watch:{},created:function(){}},l,!1,function(t){n("s7B7")},"data-v-7842c5de",null).exports,u=n("Dd8w"),m=n.n(u),h={name:"sidebarItem",props:{routes:{type:Array}},methods:{hasOneShowingChildren:function(t){return 1===t.filter(function(t){return!t.hidden}).length}}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sidebar"},[t._l(t.routes,function(e){return!e.hidden&&e.children?[!t.hasOneShowingChildren(e.children)||e.children[0].children||e.alwaysShow?n("el-submenu",{key:e.name,attrs:{index:e.name||e.path}},[n("template",{slot:"title"},[e.meta&&e.meta.icon?n("i",{class:e.meta.icon}):t._e(),t._v(" "),e.meta&&e.meta.title?n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.meta.title))]):t._e()]),t._v(" "),t._l(e.children,function(a){return a.hidden?t._e():[a.children&&a.children.length>0?n("sidebar-item",{key:a.path,attrs:{"is-nest":!0,routes:[a]}}):t._e(),t._v(" "),n("el-menu-item",{attrs:{index:e.path+"/"+a.path}},[a.meta&&a.meta.icon?n("i",{class:a.meta.icon}):t._e(),t._v(" "),a.meta&&a.meta.title?n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(a.meta.title))]):t._e()])]})],2):n("el-menu-item",{attrs:{index:e.path+"/"+e.children[0].path}},[e.children[0].meta&&e.children[0].meta.icon?n("i",{class:e.children[0].meta.icon}):t._e(),t._v(" "),e.children[0].meta&&e.children[0].meta.title?n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.children[0].meta.title))]):t._e()])]:t._e()})],2)},staticRenderFns:[]};var p={name:"sidebar",components:{sidebarItem:n("VU/8")(h,f,!1,function(t){n("GfTa")},null,null).exports},data:function(){return{top:0,width:"200px"}},computed:m()({},Object(a.mapGetters)(["permissionRouters"])),methods:{}},v={render:function(){var t=this.$createElement,e=this._self._c||t;return e("el-scrollbar",{staticClass:"el-scrollbar"},[e("el-menu",{attrs:{mode:"vertical","show-timeout":200,router:"","default-active":this.$route.path,"background-color":"#fff","text-color":"#304156","active-text-color":"#409EFF"},on:{open:this.resizeWidth,close:this.resizeWidth}},[e("sidebar-item",{attrs:{routes:this.permissionRouters}})],1)],1)},staticRenderFns:[]};var _={name:"layout",components:{layoutHeader:i,layoutContent:c,layuotFooter:d,sidebar:n("VU/8")(p,v,!1,function(t){n("F7Sy")},"data-v-47503f4c",null).exports},data:function(){return{}},props:{},computed:{routerLoading:function(){return this.$store.getters.routerLoading}},methods:{},watch:{},created:function(){}},g={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"layout"},[e("layout-header"),this._v(" "),e("layout-content",[e("sidebar",{attrs:{slot:"left"},slot:"left"}),this._v(" "),e("router-view",{directives:[{name:"loading",rawName:"v-loading",value:this.routerLoading,expression:"routerLoading"}],attrs:{slot:"content"},slot:"content"})],1),this._v(" "),e("layuot-footer",[e("span",[this._v("\n      黄思喆 向奎先 王肇汉\n    ")])])],1)},staticRenderFns:[]};var b=n("VU/8")(_,g,!1,function(t){n("O+UH")},null,null);e.default=b.exports},F7Sy:function(t,e){},GfTa:function(t,e){},"O+UH":function(t,e){},aFVe:function(t,e){},bhej:function(t,e){},s7B7:function(t,e){}});
//# sourceMappingURL=3.ff9a93741d4cd3133637.js.map