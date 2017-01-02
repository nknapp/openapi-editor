import * as React from 'react'
import {SwaggerObject} from '../interfaces/openapi'
import { SearchObject } from '../store'
import { PathsObjectEditor, Dispatcher as PathsDispatcher} from './PathsObjectEditor'
import {Input, Button, Icon} from 'semantic-ui-react'

interface Props {
  dispatchForPaths?: PathsDispatcher
  spec?: SwaggerObject
  search?: SearchObject
  onSearch: (searchString: string) => any
}

export function SwaggerObjectEditor(props: Props) {
  var searchString = props.search && props.search.searchString;
  return ( <div>
      <h1>Swagger-Version: {props.spec.swagger}</h1>
      <div>
      <Input placeholder='/newPath' value={searchString} onChange={(event,data) => props.onSearch(data.value)}/>
      <Button onClick={() => props.dispatchForPaths.onAddPath(searchString)}>
        <Icon name="plus"/> Add path
      </Button>
      </div>
      <div>
        Searching for '{searchString}'
      </div>
      <h2>Paths</h2>

      <PathsObjectEditor pathsObject={props.spec.paths} dispatcher={props.dispatchForPaths}/>
    </div>
  )
}

