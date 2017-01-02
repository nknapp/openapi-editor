import * as React from 'react'
import {PathsObject} from '../interfaces/openapi'
import {PathItemObjectEditor} from './PathItemEditor'

interface Props {
  pathsObject: PathsObject
}

export class PathsObjectEditor extends React.Component<Props,string> {

  constructor(props?: Props) {
    super(props)
  }

  render() {
    return <h1>Hello, {Object.keys(this.props.pathsObject).map((key) =>
      <PathItemObjectEditor key={key} path={key} pathItemObject={this.props.pathsObject[key]}/>
    )}</h1>;
  }
}