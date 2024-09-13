import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
    import news from '@/views/modules/news/list'
    import aboutus from '@/views/modules/aboutus/list'
    import tejiacuxiao from '@/views/modules/tejiacuxiao/list'
    import discussxianhuaxinxi from '@/views/modules/discussxianhuaxinxi/list'
    import xianhuaxinxi from '@/views/modules/xianhuaxinxi/list'
    import rukuxinxi from '@/views/modules/rukuxinxi/list'
    import discusstejiacuxiao from '@/views/modules/discusstejiacuxiao/list'
    import caigou from '@/views/modules/caigou/list'
    import xianhuafenlei from '@/views/modules/xianhuafenlei/list'
    import yonghu from '@/views/modules/yonghu/list'
    import chat from '@/views/modules/chat/list'
    import orders from '@/views/modules/orders/list'
    import kefu from '@/views/modules/kefu/list'
    import config from '@/views/modules/config/list'


//2.配置路由   注意：名字
const routes = [{
    path: '/index',
    name: '系统首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '系统首页',
      component: Home,
      meta: {icon:'', title:'center'}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }
      ,{
	path: '/news',
        name: '公告信息',
        component: news
      }
      ,{
	path: '/aboutus',
        name: '关于我们',
        component: aboutus
      }
      ,{
	path: '/tejiacuxiao',
        name: '特价促销',
        component: tejiacuxiao
      }
      ,{
	path: '/discussxianhuaxinxi',
        name: '鲜花信息评论',
        component: discussxianhuaxinxi
      }
      ,{
	path: '/xianhuaxinxi',
        name: '鲜花信息',
        component: xianhuaxinxi
      }
      ,{
	path: '/rukuxinxi',
        name: '入库信息',
        component: rukuxinxi
      }
      ,{
	path: '/discusstejiacuxiao',
        name: '特价促销评论',
        component: discusstejiacuxiao
      }
      ,{
	path: '/caigou',
        name: '采购',
        component: caigou
      }
      ,{
	path: '/xianhuafenlei',
        name: '鲜花分类',
        component: xianhuafenlei
      }
      ,{
	path: '/yonghu',
        name: '用户',
        component: yonghu
      }
      ,{
	path: '/chat',
        name: '客服中心',
        component: chat
      }
      ,{
        path: '/orders/:status',
        name: '订单管理',
        component: orders
      }
      ,{
	path: '/kefu',
        name: '客服',
        component: kefu
      }
      ,{
	path: '/config',
        name: '轮播图管理',
        component: config
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '/',
    name: '系统首页',
    redirect: '/index'
  }, /*默认跳转路由*/
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router;
