/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer').then(m => m.basic || m)

// Views
const Dashboard = () => import('@/views/Dashboard').then(m => m.default || m)

const Colors = () => import('@/views/theme/Colors').then(m => m.default || m)
const Typography = () => import('@/views/theme/Typography').then(m => m.default || m)

const Charts = () => import('@/views/Charts').then(m => m.default || m)
const Widgets = () => import('@/views/Widgets').then(m => m.default || m)

// Views - Components
const Cards = () => import('@/views/base/Cards').then(m => m.default || m)
const Forms = () => import('@/views/base/Forms').then(m => m.default || m)
const Switches = () => import('@/views/base/Switches').then(m => m.default || m)
const Tables = () => import('@/views/base/Tables').then(m => m.default || m)
const Tabs = () => import('@/views/base/Tabs').then(m => m.default || m)
const Breadcrumbs = () => import('@/views/base/Breadcrumbs').then(m => m.default || m)
const Carousels = () => import('@/views/base/Carousels').then(m => m.default || m)
const Collapses = () => import('@/views/base/Collapses').then(m => m.default || m)
const Jumbotrons = () => import('@/views/base/Jumbotrons').then(m => m.default || m)
const ListGroups = () => import('@/views/base/ListGroups').then(m => m.default || m)
const Navs = () => import('@/views/base/Navs').then(m => m.default || m)
const Navbars = () => import('@/views/base/Navbars').then(m => m.default || m)
const Paginations = () => import('@/views/base/Paginations').then(m => m.default || m)
const Popovers = () => import('@/views/base/Popovers').then(m => m.default || m)
const ProgressBars = () => import('@/views/base/ProgressBars').then(m => m.default || m)
const Tooltips = () => import('@/views/base/Tooltips').then(m => m.default || m)

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

function load (component) {
  // '@' is aliased to src
  return () => import(`@/views/${component}`)
}

/**
 * The routes
 *
 * @type {object} The routes
 */
export default [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    meta: { auth: true },
    component: DefaultContainer,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'theme',
        redirect: '/theme/colors',
        name: 'Theme',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'colors',
            name: 'Colors',
            component: Colors
          },
          {
            path: 'typography',
            name: 'Typography',
            component: Typography
          }
        ]
      },
      {
        path: 'charts',
        name: 'Charts',
        component: Charts
      },
      {
        path: 'widgets',
        name: 'Widgets',
        component: Widgets
      },
      {
        path: 'categories',
        name: 'Categories',
        component: load('admin/categories/Index')
      },
      {
        path: 'users',
        meta: { label: 'Users' },
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: Users,
          },
          {
            path: ':id',
            meta: { label: 'User Details' },
            name: 'User',
            component: User,
          },
        ]
      },
      {
        path: 'base',
        redirect: '/base/cards',
        name: 'Base',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'cards',
            name: 'Cards',
            component: Cards
          },
          {
            path: 'forms',
            name: 'Forms',
            component: Forms
          },
          {
            path: 'switches',
            name: 'Switches',
            component: Switches
          },
          {
            path: 'tables',
            name: 'Tables',
            component: Tables
          },
          {
            path: 'tabs',
            name: 'Tabs',
            component: Tabs
          },
          {
            path: 'breadcrumbs',
            name: 'Breadcrumbs',
            component: Breadcrumbs
          },
          {
            path: 'carousels',
            name: 'Carousels',
            component: Carousels
          },
          {
            path: 'collapses',
            name: 'Collapses',
            component: Collapses
          },
          {
            path: 'jumbotrons',
            name: 'Jumbotrons',
            component: Jumbotrons
          },
          {
            path: 'list-groups',
            name: 'List Groups',
            component: ListGroups
          },
          {
            path: 'navs',
            name: 'Navs',
            component: Navs
          },
          {
            path: 'navbars',
            name: 'Navbars',
            component: Navbars
          },
          {
            path: 'paginations',
            name: 'Paginations',
            component: Paginations
          },
          {
            path: 'popovers',
            name: 'Popovers',
            component: Popovers
          },
          {
            path: 'progress-bars',
            name: 'Progress Bars',
            component: ProgressBars
          },
          {
            path: 'tooltips',
            name: 'Tooltips',
            component: Tooltips
          }
        ]
      },
      {
        path: 'buttons',
        redirect: '/buttons/standard-buttons',
        name: 'Buttons',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'standard-buttons',
            name: 'Standard Buttons',
            component: StandardButtons
          },
          {
            path: 'button-groups',
            name: 'Button Groups',
            component: ButtonGroups
          },
          {
            path: 'dropdowns',
            name: 'Dropdowns',
            component: Dropdowns
          },
          {
            path: 'brand-buttons',
            name: 'Brand Buttons',
            component: BrandButtons
          }
        ]
      },
      {
        path: 'icons',
        redirect: '/icons/font-awesome',
        name: 'Icons',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'coreui-icons',
            name: 'CoreUI Icons',
            component: CoreUIIcons
          },
          {
            path: 'flags',
            name: 'Flags',
            component: Flags
          },
          {
            path: 'font-awesome',
            name: 'Font Awesome',
            component: FontAwesome
          },
          {
            path: 'simple-line-icons',
            name: 'Simple Line Icons',
            component: SimpleLineIcons
          }
        ]
      },
      {
        path: 'notifications',
        redirect: '/notifications/alerts',
        name: 'Notifications',
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'alerts',
            name: 'Alerts',
            component: Alerts
          },
          {
            path: 'badges',
            name: 'Badges',
            component: Badges
          },
          {
            path: 'modals',
            name: 'Modals',
            component: Modals
          }
        ]
      }
    ]
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render (c) {
        return c('router-view')
      }
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: Page404
      },
      {
        path: '500',
        name: 'Page500',
        component: Page500
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  },
  // 404
  {
    path: '/404',
    name: 'not-found.index',
    component: Page404,
  },
  // Redirects
  {
    path: '/',
    redirect: '/artists',
  },
  {
    path: '/*',
    redirect: '/404',
  },
];
