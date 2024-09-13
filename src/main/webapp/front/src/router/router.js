import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Storeup from '../pages/storeup/list'
import AddrList from '../pages/shop-address/list'
import AddrAdd from '../pages/shop-address/addOrUpdate'
import Order from '../pages/shop-order/list'
import OrderConfirm from '../pages/shop-order/confirm'
import Cart from '../pages/shop-cart/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import kefuList from '../pages/kefu/list'
import kefuDetail from '../pages/kefu/detail'
import kefuAdd from '../pages/kefu/add'
import caigouList from '../pages/caigou/list'
import caigouDetail from '../pages/caigou/detail'
import caigouAdd from '../pages/caigou/add'
import xianhuafenleiList from '../pages/xianhuafenlei/list'
import xianhuafenleiDetail from '../pages/xianhuafenlei/detail'
import xianhuafenleiAdd from '../pages/xianhuafenlei/add'
import xianhuaxinxiList from '../pages/xianhuaxinxi/list'
import xianhuaxinxiDetail from '../pages/xianhuaxinxi/detail'
import xianhuaxinxiAdd from '../pages/xianhuaxinxi/add'
import tejiacuxiaoList from '../pages/tejiacuxiao/list'
import tejiacuxiaoDetail from '../pages/tejiacuxiao/detail'
import tejiacuxiaoAdd from '../pages/tejiacuxiao/add'
import rukuxinxiList from '../pages/rukuxinxi/list'
import rukuxinxiDetail from '../pages/rukuxinxi/detail'
import rukuxinxiAdd from '../pages/rukuxinxi/add'
import aboutusList from '../pages/aboutus/list'
import aboutusDetail from '../pages/aboutus/detail'
import aboutusAdd from '../pages/aboutus/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'storeup',
					component: Storeup
				},
                {
                    path: 'shop-address/list',
                    component: AddrList
                },
                {
                    path: 'shop-address/addOrUpdate',
                    component: AddrAdd
                },
				{
					path: 'shop-order/order',
					component: Order
				},
				{
					path: 'cart',
					component: Cart
				},
				{
					path: 'shop-order/orderConfirm',
					component: OrderConfirm
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'kefu',
					component: kefuList
				},
				{
					path: 'kefuDetail',
					component: kefuDetail
				},
				{
					path: 'kefuAdd',
					component: kefuAdd
				},
				{
					path: 'caigou',
					component: caigouList
				},
				{
					path: 'caigouDetail',
					component: caigouDetail
				},
				{
					path: 'caigouAdd',
					component: caigouAdd
				},
				{
					path: 'xianhuafenlei',
					component: xianhuafenleiList
				},
				{
					path: 'xianhuafenleiDetail',
					component: xianhuafenleiDetail
				},
				{
					path: 'xianhuafenleiAdd',
					component: xianhuafenleiAdd
				},
				{
					path: 'xianhuaxinxi',
					component: xianhuaxinxiList
				},
				{
					path: 'xianhuaxinxiDetail',
					component: xianhuaxinxiDetail
				},
				{
					path: 'xianhuaxinxiAdd',
					component: xianhuaxinxiAdd
				},
				{
					path: 'tejiacuxiao',
					component: tejiacuxiaoList
				},
				{
					path: 'tejiacuxiaoDetail',
					component: tejiacuxiaoDetail
				},
				{
					path: 'tejiacuxiaoAdd',
					component: tejiacuxiaoAdd
				},
				{
					path: 'rukuxinxi',
					component: rukuxinxiList
				},
				{
					path: 'rukuxinxiDetail',
					component: rukuxinxiDetail
				},
				{
					path: 'rukuxinxiAdd',
					component: rukuxinxiAdd
				},
				{
					path: 'aboutus',
					component: aboutusList
				},
				{
					path: 'aboutusDetail',
					component: aboutusDetail
				},
				{
					path: 'aboutusAdd',
					component: aboutusAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
