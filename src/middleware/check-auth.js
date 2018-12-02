import store from '@/store'

export default async (to, from, next) => {
  if (!store.state.auth.authenticated && store.state.auth.token) {
    try {
      await store.dispatch('auth/fetchUser')
    } catch (e) {
      next(e)
    }
  }

  next()
}
