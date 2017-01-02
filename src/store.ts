import {SwaggerObject, PathsObject, InfoObject} from  './interfaces/openapi'
import {createStore, combineReducers, applyMiddleware, Action} from 'redux'

export interface State {
  spec: SwaggerObject
  search: SearchObject
}

export interface SearchObject {
  searchString?: string
}

interface AddPathAction extends Action {
  type: 'ADD_PATH'
  path: string
}

interface SearchAction extends Action {
  type: 'SEARCH'
  searchString: string
}


function handleAddPath(pathsObject: PathsObject, action: AddPathAction) {
  var result = Object.assign({}, pathsObject)
  result[action.path] = {}
  return result
}

function handleSearch(search: SearchObject, action: SearchAction) {
  return Object.assign({}, search, {
    searchString: action.searchString
  })
}

function infoObjectReducer<A extends Action>(state?: InfoObject, action?: A): InfoObject {
  return {}
}

function pathsObjectReducer<A extends Action>(state: PathsObject = {}, action?: A): PathsObject {
  switch (action.type) {
    case 'ADD_PATH':
      return handleAddPath(state, action as any)
    default:
      return state
  }
}
function searchObjectReducer<A extends Action>(state: SearchObject = { searchString: ''}, action?: A): SearchObject {
  switch (action.type) {
    case 'SEARCH':
      return handleSearch(state, action as any)
    default:
      return state
  }

}
const swaggerObjectReducer = combineReducers({
  swagger: () => '2.0',
  info: infoObjectReducer,
  paths: pathsObjectReducer,

})


var reducer = combineReducers({
  spec: swaggerObjectReducer,
  search: searchObjectReducer
})

var savedStore = undefined
try {
  savedStore = JSON.parse(window.localStorage.getItem('redux-store'));
} catch(e) {
  console.log("Could not load save store from localstorage",e)
}
export const store = createStore(reducer, savedStore)
store.subscribe(() => {
  window.localStorage.setItem('redux-store',JSON.stringify(store.getState()))
})


