import {SwaggerObjectEditor} from './components/SwaggerObjectEditor'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import { State, store } from './store'



// Map Redux state to component props
function mapStateToProps(state: State) {
  return {
    spec: state.spec,
    search: state.search
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onSearch: (searchString: string) => dispatch({ type: 'SEARCH', searchString}),
    dispatchForPaths: {
      onAddPath: (path) => dispatch({ type: 'ADD_PATH', path})
    }
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(SwaggerObjectEditor)


$(function () {
  $.getJSON('/data/swagger.json', function (response) {
    console.log(response)
    ReactDOM.render(
      <Provider store={store}><App/></Provider>,
      document.getElementById('root')
    );
  })
})


