import store from '@/store'

export default async (to, from, next) => {
  if (!store.state.auth.authenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
}
