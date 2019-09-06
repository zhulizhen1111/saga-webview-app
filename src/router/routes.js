const routes = [
    {
        path: '/advance',
        name: 'advance',
        component: () => import('views/advance')
    },
    //应急措施
    {
        path: '/plan',
        name: 'plan',
        component: () => import('views/emergePlan')
    },
    //我的成就
    {
        path: '/grade',
        name: 'grade',
        component: () => import('views/grade')
    },
    //我的金币
    {
        path: '/gold',
        name: 'gold',
        component: () => import('views/gold')
    },
    //所有成就
    {
        path: '/allGrade',
        name: 'allGrade',
        component: () => import('views/allGrade/index.vue')
    },
]


export default routes
