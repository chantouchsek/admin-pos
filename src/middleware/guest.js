import store from '@/store'

export default (to, from, next) => {
  if (store.state.auth.authenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
}
