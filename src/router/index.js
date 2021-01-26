import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'
import store from '../store/index'
import firebaseApp from '../firebase_config'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: () => import('../views/Lobby.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: () => import('../views/Leaderboard.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

const GetAdmin = new Promise((resolve, reject) => {
  firebaseApp.db
    .collection('admin')
    .doc('actual')
    .get()
    .then(val => {
      store.commit('CHANGE_ADMIN', val.data())
      resolve()
    })
    .catch(err => {
      console.error(err)
      reject(err)
    })
})

const GetUser = (payload) => {
  return new Promise((resolve, reject) => {
    firebaseApp.db
      .collection('users')
      .doc(payload)
      .get()
      .then(val => {
        store.commit('EDIT_USER', val.data())
        resolve()
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })
  })
}

router.beforeEach(async (to, from, next) => {
  store.commit('CHANGE_LOADING', true)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  var user = await firebase.getCurrentUser()
  if (requiresAuth) {
    if (!user) {
      store.commit('CHANGE_LOADING', false)
      next('login')
    } else if (user) {
      // store.dispatch('FETCH_USER', user.uid)
      await Promise.all([GetAdmin, GetUser(user.uid)])
      if (store.state.admin.started === true) {
        if (store.state.user.completed === true) {
          if (to.name === 'Leaderboard') {
            store.commit('CHANGE_LOADING', false)
            next()
          } else {
            store.commit('CHANGE_LOADING', false)
            next({ name: 'Leaderboard' })
          }
        } else if (store.state.user.completed === false) {
          if (to.name === 'Home') {
            store.commit('CHANGE_LOADING', false)
            next()
          } else {
            store.commit('CHANGE_LOADING', false)
            next({ name: 'Home' })
          }
        }
        // store.commit('CHANGE_LOADING', false)
        // next()
      } else if (to.name === 'Lobby') {
        store.commit('CHANGE_LOADING', false)
        next()
      } else {
        store.commit('CHANGE_LOADING', false)
        next({ name: 'Lobby' })
      }
    }
  } else {
    store.commit('CHANGE_LOADING', false)
    next()
  }
})

export default router
