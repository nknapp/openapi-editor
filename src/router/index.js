import Vue from 'vue'
import Router from 'vue-router'
import InfoObject from 'components/InfoObject'
import PathItem from 'components/PathItem'

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
      name: 'PathItem',
      component: PathItem,
      props: (route) => ({ path: route.params.path })
    }
  ]
})
