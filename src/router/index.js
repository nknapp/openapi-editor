import Vue from 'vue'
import Router from 'vue-router'
import InfoObject from 'components/InfoObject'
import Path from 'components/Path'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InfoObject',
      component: InfoObject
    },
    {
      path: '/path/:path',
      name: 'Path',
      component: Path
    }
  ]
})
