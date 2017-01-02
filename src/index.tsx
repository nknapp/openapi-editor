import { SwaggerObjectEditor } from './components/SwaggerObjectEditor'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

$(function() {
  $.getJSON('/data/swagger.json', function(response) {
    console.log(response)
    const rootInstance = ReactDOM.render(
      <SwaggerObjectEditor spec={response} />,
      document.getElementById('root')
    );
  })
})


