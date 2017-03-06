import VueX from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import { resolveRef, storeRef } from '../lib/ref'

// Make sure to call Vue.use(Vuex) first if using a module system
Vue.use(VueX)


export const store = new VueX.Store({
  plugins: [createPersistedState()],
  state: {
    spec: require('../minimal.json')
  },
  mutations: {
    addPath (state, name) {
      var pathParameters = name.split('/')
      // Find path variables
        .filter((c) => c.match(/^\{(.*)}$/))
        // Slice the variable name
        .map((c) => c.slice(1, -1))
        // Create parameter template
        .map((name) => ({
          name: name,
          in: 'path',
          required: true
        }));

      Vue.set(state.spec.paths, name, {
        parameters: pathParameters
      })
    },
    deletePath (state, name) {
      Vue.delete(state.spec.paths, name)
    },
    renamePath (state, from, to) {
      Vue.set(state.spec.paths, to, state.spec.paths[from])
      Vue.delete(state.spec.paths, from)
    },
    addOperation(state, { path, method}) {
      Vue.set(state.spec.paths[path], method, {})
    },
    removeOperation(state, { path, method}) {
      Vue.delete(state.spec.paths[path], method)
    },
    saveOperationField(state, { path, method, field, value }) {
      Vue.set(state.spec.paths[path][method], field, value)
    },
    saveParameter(state, { pointer, value }) {
      storeRef(state.spec, pointer, value )
    },
    /**
     * @param state
     * @param pointer pointer to the "parameters"-property
     * @param value
     */
    addParameter(state, { pointer }) {
      resolveRef(state.spec, pointer).push({})
    },
    removeParameter(state, { pointer, index }) {
      Vue.delete(resolveRef(state.spec, pointer), value )
    }

  }
})
