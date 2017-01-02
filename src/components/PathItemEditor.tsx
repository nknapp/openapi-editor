import * as React from 'react'
import {PathItemObject} from '../interfaces/openapi'

interface Props {
  path: string
  pathItemObject: PathItemObject
}

export class PathItemObjectEditor extends React.Component<Props,string> {

  constructor(props?: Props) {
    super(props)
  }

  render() {
    return <div>
      <h2>{this.props.path}</h2>
      <ul>{Object.keys(this.props.pathItemObject).map((key) => <li key={key}>{key}</li>)}</ul>
    </div>;
  }
}