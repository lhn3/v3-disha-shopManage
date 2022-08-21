import {createStore} from 'vuex'
import managerStore from './managerStore'

export const store = createStore({
  state(){
    return {}
  },
  mutations: {},
  getters:{},
  actions:{},
  modules:{
    manager:managerStore
  }
})

//数据持久化
export const keepStore = () => {
  store.dispatch('manager/keepStoreAction')
}

