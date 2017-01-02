import * as React from 'react'
import {PathsObject} from '../interfaces/openapi'
import {PathItemObjectEditor} from './PathItemEditor'

export interface Dispatcher {
  onAddPath: (path: string) => any
}

interface Props {
  pathsObject: PathsObject,
  dispatcher: Dispatcher
}

export function PathsObjectEditor(props: Props) {

  return <div>
    {Object.keys(props.pathsObject).map((key) => {
      return <PathItemObjectEditor key={key} path={key} pathItemObject={props.pathsObject[key]}/>
    }
    )}
  </div>
}