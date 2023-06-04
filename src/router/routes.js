

import login from '@/views/login';
import page404 from '@/views/error-page/404';
import page401 from '@/views/error-page/401';
import register from '@/views/register';
import user from '@/views/admin/user';
export const constantRouterMap = [
  { path: '/login', name: 'login', meta: { title: "系统登录", hidden: true }, component: login },
  { path: '/register', name: 'register', meta: { title: "系统注册", hidden: true }, component: register},
  { path: "/404", name: "page404", meta: { title: "页面走丢了", hidden: true }, component: page404 },
  { path: "/401", name: "page401", meta: { title: "权限不足", hidden: true }, component: page401 }
]


const layout = () => import(/* webpackChunkName: "group-index" */ '@/views/layout');
export const asyncRouterMap = [
  {
    path: '/admin/user',
    name: 'user',
    meta: { title: "用户管理", icon: "dbm d-icon-zujian" ,roles:["admin"]},
    component: layout,
    children: [
      { path: "userlist", name: "user", meta: { title: "用户列表", icon: "dbm d-icon-qiapian" }, component: user }
    ]

  },
  {
    path:'/admin/dbconfig',
    name:'dbconfig',
    meta:{title:"数据库配置",icon:"dbm d-icon-zujian",roles:["admin"]},
    component:layout,
    children:[
      {path:"query",name:"query",meta:{title:"配置查询",icon:"dbm d-icon-qiapian"},component:()=>import('@/views/admin/dbconfig/query')},
      {path:"modify",name:"modify",meta:{title:"配置修改",icon:"dbm d-icon-qiapian"},component:()=>import('@/views/admin/dbconfig/modify')},
    ]
  },
  {
    path: '/admin/database',
    name: 'database',
    meta: { title: "数据管理", icon: "dbm d-icon-zujian" ,roles:["admin"]},
    component: layout,
    children: [
      {path:"upload",name:"upload",meta:{title:"导入数据",icon:"dbm d-icon-qiapian"},component:()=>import('@/views/admin/database/upload')},
      {path:"download",name:"download",meta:{title:"导出数据",icon:"dbm d-icon-qiapian"},component:()=>import('@/views/admin/database/download')}
    ]
  },
  {
    path: '/user/query',
    name: 'userquery',
    meta: { title: "业务查询", icon: "dbm d-icon-zujian" },
    component: layout,
    children: [
      { path:"config",name:"config",meta:{title:"配置信息查询",icon:"dbm d-icon-qiapian"},component:()=>import('@/views/user/query/config')},
      { path:"enodeb",name:"enodeb",meta:{title:"基站信息查询",icon:"dbm d-icon-qiapian"},component:()=>import('@/views/user/query/enodeb')},
      { path:"kpis",name:"kpis",meta:{title:"指标信息查询",icon:"dbm d-icon-qiapian"},component:()=>import('@/views/user/query/kpis')},
      { path:"prb",name:"prb",meta:{title:"PRB信息查询",icon:"dbm d-icon-qiapian"},component:()=>import('@/views/user/query/prb')},
      
    ]
  },
  {
    path: '/user/analysis',
    name: 'user',
    meta: {icon: "dbm d-icon-zujian",title:"业务分析" },
    component: layout,
    children:[
      {path:"c2i",name:"c2i",meta:{title:"主邻小区C2I干扰分析",icon:"dbm d-icon-qiapian"},component:()=>import('@/views/user/c2i')},
      {path:"c2i3",name:"c2i3",meta:{title:"重叠覆盖干扰小区三元组分析",icon:"dbm d-icon-qiapian"},component:()=>import('@/views/user/c2i3')},
      {path:"graph",name:"graph",meta:{title:"网络干扰结构分析",icon:"dbm d-icon-qiapian"},component:()=>import('@/views/user/graph')},
    ]

  },

  {
    path: '/',
    name: 'index',
    meta: { title: "首页", icon: "dbm d-icon-zujian" },
    component: layout
  },
  //default
  { path: '*', redirect: '/404', hidden: true }
  // {
  //   path: '/example',
  //   name: 'example',
  //   meta: { title: "组件", icon: "dbm d-icon-zujian" },
  //   redirect: '/example/datatabledemo',
  //   component: layout,
  //   children: [
  //     { path: "menucarddemo", name: "menuCardDemo", meta: { title: "菜单卡片", icon: "dbm d-icon-qiapian" }, component: () => import('@/views/demo/menu-card-demo') },
  //     { path: "treeviewdemo", name: "treeViewDemo", meta: { title: "树形结构", icon: "dbm d-icon-shu" }, component: () => import('@/views/demo/tree-view-demo') },
  //     { path: "datatabledemo", name: "dataTableDemo", meta: { title: "数据表格", icon: "dbm d-icon-biaoge" }, component: () => import('@/views/demo/datatable/data-table') },
  //     { path: "chartsdemo", name: "chartsDemo", meta: { title: "echarts图表", icon: "dbm d-icon-tubiao" }, component: () => import('@/views/demo/charts-demo') },
  //     { path: "test", name: "test", meta: { title: "布局测试", icon: "icon dbm d-icon-test" }, component: () => import('@/views/demo/layout-test') }
  //   ]
  // }
]