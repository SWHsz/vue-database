webpackJsonp([7],{xq4g:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("l6IN");var l=a("OMN4"),n=a.n(l),o=a("TIfe"),r={components:{exportExcel:a("LzDy").a},data:function(){return{min:0,tableColumn:[{prop:"CELL_A",label:"A小区ID"},{prop:"CELL_B",label:"B小区ID"},{prop:"CELL_C",label:"C小区ID"},{prop:"x",label:"相互之间最小的干扰率"}],tableData:[],currentPage:1,pagesize:20,total:0,loading:!1}},methods:{submit:function(){this.loading=!0,this.tableData=[],this.total=0,this.currentPage=1;var e=this;n()({url:"/api/c2i3",method:"get",params:{x:this.min},headers:{Authorization:"Bearer "+Object(o.a)()}}).then(function(t){console.log(t.data.data);for(var a=0;a<t.data.count;a++)e.tableData.push({CELL_A:t.data.data[a].CEll_A,CELL_B:t.data.data[a].CEll_B,CELL_C:t.data.data[a].CEll_C,x:t.data.data[a].x});console.log(e.tableData),e.total=t.data.count,e.loading=!1}).catch(function(t){console.log(t),e.loading=!1})},current_change:function(e){this.currentPage=e}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._v("\n    相互之间最小干扰率的最小值：\n    "),a("el-input-number",{attrs:{min:0,label:"最小值"},on:{change:function(t){return e.$forceUpdate()}},model:{value:e.min,callback:function(t){e.min=t},expression:"min"}}),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("提交")]),e._v(" "),a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.tableData.slice((e.currentPage-1)*e.pagesize,e.currentPage*e.pagesize),border:"",size:"mini"}},[a("el-table-column",{attrs:{align:"center",label:"序号",type:"index",width:"70px","show-overflow-tooltip":""}}),e._v(" "),e._l(e.tableColumn,function(e){return a("el-table-column",{key:e.index,attrs:{prop:e.prop,label:e.label,"show-overflow-tooltip":""}})})],2),e._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("el-pagination",{attrs:{"hide-on-single-page":"",background:"",layout:"prev, pager, next,total",total:e.total,"page-size":e.pagesize},on:{"current-change":e.current_change}}),e._v(" "),a("exportExcel",{attrs:{id:"exportTab",name:"导出表格"}}),e._v(" "),a("el-table",{directives:[{name:"show",rawName:"v-show",value:e.f,expression:"f"}],attrs:{data:e.tableData,border:"",id:"exportTab"}},[a("el-table-column",{attrs:{align:"center",label:"序号",type:"index",width:"70px","show-overflow-tooltip":""}}),e._v(" "),e._l(e.tableColumn,function(e){return a("el-table-column",{key:e.index,attrs:{prop:e.prop,label:e.label,"show-overflow-tooltip":""}})})],2)],1)],1)],1)},staticRenderFns:[]},s=a("VU/8")(r,i,!1,null,null,null);t.default=s.exports}});
//# sourceMappingURL=7.2c0cf5e340e1287817b9.js.map