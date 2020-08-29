import VueRouter from "vue-router";
// eslint-disable-next-line no-unused-vars
import store from "@/store";

const routes = [

    { path: '/login', component:()=>import('@/components/login'),name:'login',meta: {
            title: '登陆'
        } },{ path: '/index', component:()=>import('@/components/index'),name:'index',meta: {
            title: '首页'
        } },{ path: '/course/:id', component:()=>import('@/components/course'),name:'course',meta: {
            title: '课程详情'
        },children: [
            {
                path:'',
                component:()=>import('@/components/chart'),name:'chart'

            },{
                path:'notify',
                component:()=>import('@/components/notify'),name:'notify'

            },{
                path:'homework',
                component:()=>import('@/components/homework'),name:'homework'

            },{
                path:'check',
                component:()=>import('@/components/checkin'),name:'check'

            },{
                path:'files',
                component:()=>import('@/components/netdisk'),name:'files'

            }
        ] },
    {
        path: '/*',
        redirect: '/index',
        hidden: true
    },
]
const router=new VueRouter({routes})
export default router
// router.beforeEach((to, from, next) => {
//     if (to.meta.title) document.title=to.meta.title
//     else document.title='管理系统'
//     // if (store.getters.islogin){
//     //     if (to.path==='/login'||(to.path==='/pdetails'&&store.state.info.current.name==='')){
//     //         next({ path: '/index' });
//     //     }else next()
//     // }else {
//     //     if (to.path==='/login') next();
//     //     else next('/login')
//     // }
//
//
// })
