/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer').then(m => m.basic || m)

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
const StandardButtons = () => import('@/views/buttons/StandardButtons').then(m => m.default || m)
const ButtonGroups = () => import('@/views/buttons/ButtonGroups').then(m => m.default || m)
const Dropdowns = () => import('@/views/buttons/Dropdowns').then(m => m.default || m)
const BrandButtons = () => import('@/views/buttons/BrandButtons').then(m => m.default || m)
const Loading = () => import('@/views/Loading').then(m => m.default || m)

// Views - Icons
const Flags = () => import('@/views/icons/Flags').then(m => m.default || m)
const FontAwesome = () => import('@/views/icons/FontAwesome').then(m => m.default || m)
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons').then(m => m.default || m)
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons').then(m => m.default || m)

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts').then(m => m.default || m)
const Badges = () => import('@/views/notifications/Badges').then(m => m.default || m)
const Modals = () => import('@/views/notifications/Modals').then(m => m.default || m)

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Register = () => import('@/views/pages/Register').then(m => m.default || m)

/**
 * Load dynamically the components
 * @param component
 * @returns {function(): Promise<any>}
 */
function load (component) {
  return () => import(`@/views/${component}`).then(m => m.default || m)
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
        component: load('Dashboard')
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
        meta: { label: 'Categories' },
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/',
            name: 'category.index',
            meta: { label: 'Category List' },
            component: load('admin/categories/Index'),
          },
          {
            path: 'create',
            meta: { label: 'Category Create' },
            name: 'category.create',
            component: load('admin/categories/Create'),
          },
          {
            path: ':uuid/edit',
            meta: { label: 'Category Edit' },
            name: 'category.edit',
            component: load('admin/categories/Edit'),
            props: true
          },
        ]
      },
      {
        path: 'products',
        meta: { label: 'Products' },
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/',
            name: 'product.index',
            meta: { label: 'Table' },
            component: load('admin/products/Index'),
          },
          {
            path: 'in-stocks',
            name: 'product.in-stock',
            meta: { label: 'Table' },
            component: load('admin/stocks/Index'),
          },
          {
            path: 'create',
            meta: { label: 'Create' },
            name: 'product.create',
            component: load('admin/products/Create'),
          },
          {
            path: ':uuid/show',
            meta: { label: 'Detail' },
            name: 'product.show',
            component: load('admin/products/Show'),
            props: true
          },
          {
            path: 'imports',
            meta: { label: 'Imports' },
            name: 'product.import',
            component: load('admin/products/Import'),
            props: true
          },
          {
            path: ':uuid/edit',
            meta: { label: 'Edit' },
            name: 'product.edit',
            component: load('admin/products/Edit'),
            props: true
          },
        ]
      },
      {
        path: 'roles',
        meta: { label: 'Roles' },
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/',
            name: 'role.index',
            meta: { label: 'Role List' },
            component: load('admin/roles/Index'),
          },
          {
            path: 'create',
            meta: { label: 'Role Create' },
            name: 'role.create',
            component: load('admin/roles/Create'),
          },
          {
            path: ':id/show',
            meta: { label: 'Role Edit' },
            name: 'role.detail',
            component: load('admin/roles/Show'),
            props: true
          },
          {
            path: ':id/edit',
            meta: { label: 'Role Edit' },
            name: 'role.edit',
            component: load('admin/roles/Edit'),
            props: true
          }
        ]
      },
      {
        path: 'permissions',
        meta: { label: 'Permissions' },
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/',
            name: 'permission.index',
            meta: { label: 'Permission List' },
            component: load('admin/permissions/Index'),
          },
          {
            path: 'create',
            meta: { label: 'Permission Create' },
            name: 'permission.create',
            component: load('admin/permissions/Create'),
          },
          {
            path: ':id/show',
            meta: { label: 'Permission Detail' },
            name: 'permission.show',
            component: load('admin/permissions/Show'),
            props: true
          },
          {
            path: ':id/edit',
            meta: { label: 'Permission Edit' },
            name: 'permission.edit',
            component: load('admin/permissions/Edit'),
            props: true
          }
        ]
      },
      {
        path: 'gift-cards',
        meta: { label: 'GiftCards' },
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/',
            name: 'giftCard.index',
            meta: { label: 'GiftCard List' },
            component: load('admin/giftCards/Index'),
          },
          {
            path: 'create',
            meta: { label: 'GiftCard Create' },
            name: 'giftCard.create',
            component: load('admin/giftCards/Create'),
          },
          {
            path: ':uuid/edit',
            meta: { label: 'GiftCard Edit' },
            name: 'giftCard.edit',
            component: load('admin/giftCards/Edit'),
            props: true
          }
        ]
      },
      {
        path: 'expenses',
        meta: { label: 'Expenses' },
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/',
            name: 'expense.index',
            meta: { label: 'Expense List' },
            component: load('admin/expenses/Index'),
          },
          {
            path: 'create',
            meta: { label: 'Expense Create' },
            name: 'expense.create',
            component: load('admin/expenses/Create'),
          },
          {
            path: ':uuid/edit',
            meta: { label: 'Expense Edit' },
            name: 'expense.edit',
            component: load('admin/expenses/Edit'),
            props: true
          }
        ]
      },
      {
        path: 'suppliers',
        meta: { label: 'Suppliers' },
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/',
            name: 'supplier.index',
            meta: { label: 'Supplier List' },
            component: load('admin/suppliers/Index'),
          },
          {
            path: 'create',
            meta: { label: 'Supplier Create' },
            name: 'supplier.create',
            component: load('admin/suppliers/Create'),
          },
          {
            path: ':uuid/edit',
            meta: { label: 'Supplier Edit' },
            name: 'supplier.edit',
            component: load('admin/suppliers/Edit'),
            props: true
          }
        ]
      },
      {
        path: 'customers',
        meta: { label: 'Customers' },
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/',
            name: 'customer.index',
            meta: { label: 'Customer List' },
            component: load('admin/customers/Index'),
          },
          {
            path: 'create',
            meta: { label: 'Customer Create' },
            name: 'customer.create',
            component: load('admin/customers/Create'),
          },
          {
            path: ':uuid/edit',
            meta: { label: 'Customer Edit' },
            name: 'customer.edit',
            component: load('admin/customers/Edit'),
            props: true
          }
        ]
      },
      {
        path: 'purchases',
        meta: { label: 'Customers' },
        component: {
          render (c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/',
            name: 'purchase.index',
            meta: { label: 'Purchase List' },
            component: load('admin/purchases/Index'),
          },
          {
            path: 'create',
            meta: { label: 'Purchase Create' },
            name: 'purchase.create',
            component: load('admin/purchases/Create'),
          },
          {
            path: ':uuid/edit',
            meta: { label: 'Purchase Edit' },
            name: 'purchase.edit',
            component: load('admin/purchases/Edit'),
            props: true
          }
        ]
      },
      {
        path: 'loading',
        name: 'Loading',
        component: Loading
      },
      {
        path: 'pos',
        name: 'POS',
        component: load('pos/Index')
      },
      {
        path: 'product-carts',
        name: 'Products',
        component: load('pos/Cart')
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
            meta: { label: 'User List' },
            component: load('admin/users/Index'),
            name: 'user.index'
          },
          {
            path: 'create',
            meta: { label: 'User Create' },
            name: 'user.create',
            component: load('admin/users/Create'),
          },
          {
            path: ':uuid/detail',
            meta: { label: 'User Detail' },
            name: 'user.detail',
            component: load('admin/users/Show'),
            props: true
          },
          {
            path: ':uuid/edit',
            meta: { label: 'User Edit' },
            name: 'user.edit',
            component: load('admin/users/Edit'),
            props: true
          }
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
        component: load('pages/Login')
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
    component: Page404
  },
  // Redirects
  {
    path: '/',
    redirect: '/Dashboard'
  },
  {
    path: '/*',
    redirect: '/404'
  }
]
