import Vue from 'vue'
import Vuex from 'vuex'
import firebaseApp from '../firebase_config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      displayName: null,
      email: null,
      completed: null,
      completedTime: null,
      progress: null
    },
    routerLoading: false,
    logged: false,
    admin: {
      started: null,
      questionCount: null
    }
  },
  mutations: {
    EDIT_USER: (state, payload) => {
      if (typeof payload.displayName !== 'undefined') {
        state.user.displayName = payload.displayName
      }
      if (typeof payload.email !== 'undefined') {
        state.user.email = payload.email
      }
      if (typeof payload.id !== 'undefined') {
        state.user.id = payload.id
      }
      if (typeof payload.completed !== 'undefined') {
        state.user.completed = payload.completed
      }
      if (typeof payload.completedTime !== 'undefined') {
        state.user.completedTime = payload.completedTime
      }
      if (typeof payload.progress !== 'undefined') {
        state.user.progress = payload.progress
      }
      state.logged = true
    },
    CHANGE_LOADING: (state, payload) => {
      state.routerLoading = payload
    },
    USER_LOGOUT: (state) => {
      state.user = {
        id: null,
        displayName: null,
        email: null,
        completed: null,
        completedTime: null,
        progress: null
      }
      state.logged = false
      state.admin = {
        started: null,
        questionCount: null
      }
    },
    CHANGE_ADMIN: (state, payload) => {
      if (typeof payload.started !== 'undefined') {
        state.admin.started = payload.started
      }
      if (typeof payload.questionCount !== 'undefined') {
        state.admin.questionCount = payload.questionCount
      }
    },
    INCREMENT_PROGRESS: (state) => {
      state.user.progress = state.user.progress + 1
    },
    QUIZ_COMPLETED: (state) => {
      state.user.completed = true
    }
  },
  actions: {
    FETCH_USER: ({ commit }, payload) => {
      firebaseApp.db.collection('users').doc(payload).get().then(val => {
        commit('EDIT_USER', val.data())
      }).catch(err => {
        console.error(err)
      })
    }
  },
  modules: {
  },
  getters: {
    GET_LOADING: state => state.routerLoading,
    GET_USER: state => state.user,
    GET_ADMIN: state => state.admin
  }
})
