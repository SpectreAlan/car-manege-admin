import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { title: '首页', icon: 'dashboard' },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: { title: '首页', icon: 'dashboard' }
      }]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/report',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'Dashboard', icon: 'chart', key: 'report' },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'chart', affix: true, key: 'dashboard' }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/users',
    name: 'Admin',
    meta: {
      title: '管理员',
      icon: 'administrator',
      key: 'admin'
    },
    children: [
      {
        path: 'users',
        component: () => import('@/views/admin/users'),
        name: 'Users',
        meta: {
          title: 'Users',
          key: 'users'
        }
      },
      {
        path: 'menu',
        component: () => import('@/views/admin/menu/index'),
        name: 'Menu',
        meta: {
          title: 'Menus',
          key: 'menu'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/admin/role'),
        name: 'Role',
        meta: {
          title: 'Roles',
          key: 'role'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/cars',
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'system',
      key: 'system'
    },
    children: [
      {
        path: 'cars',
        component: () => import('@/views/system/cars'),
        name: 'Cars',
        meta: {
          title: '车辆管理',
          key: 'cars'
        }
      },
      {
        path: 'drivers',
        component: () => import('@/views/system/drivers'),
        name: 'Drivers',
        meta: {
          title: '驾驶员管理',
          key: 'drivers'
        }
      },
      {
        path: 'delivery',
        component: () => import('@/views/system/delivery'),
        name: 'Delivery',
        meta: {
          title: '发货单位管理',
          key: 'delivery'
        }
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    redirect: '/settings/dictionary',
    name: 'Settings',
    meta: {
      title: '系统设置',
      icon: 'setting',
      key: 'settings'
    },
    children: [
      {
        path: 'dictionary',
        component: () => import('@/views/settings/dictionary'),
        name: 'Dictionary',
        meta: {
          title: '字典',
          key: 'dictionary'
        }
      }
    ]
  },
  {
    path: '/ordersSystem',
    component: Layout,
    redirect: '/ordersSystem/orders',
    name: 'OrdersSystem',
    meta: {
      title: '订单系统',
      icon: 'documentation',
      key: 'ordersSystem'
    },
    children: [
      {
        path: 'orders',
        component: () => import('@/views/orders'),
        name: 'Orders',
        meta: {
          title: '订单管理',
          key: 'orders'
        }
      }
    ]
  },
  {
    path: '/maintenanceSystem',
    component: Layout,
    redirect: '/maintenanceSystem/maintenance',
    name: 'MaintenanceSystem',
    meta: {
      title: '维保系统',
      icon: 'tree',
      key: 'maintenanceSys'
    },
    children: [
      {
        path: 'maintenance',
        component: () => import('@/views/maintenance'),
        name: 'Maintenance',
        meta: {
          title: '车辆维保',
          key: 'maintenance'
        }
      }
    ]
  },
  {
    path: '/salarySystem',
    component: Layout,
    redirect: '/salarySystem/salary',
    name: 'SalarySystem',
    meta: {
      title: '工资系统',
      icon: 'salary1',
      key: 'salarySys'
    },
    children: [
      {
        path: 'salary',
        component: () => import('@/views/salary'),
        name: 'Salary',
        meta: {
          title: '员工工资',
          key: 'salary'
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
