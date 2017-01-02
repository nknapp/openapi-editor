import * as React from 'react'
import {SwaggerObject} from '../interfaces/openapi'
import { PathsObjectEditor } from './PathsObjectEditor'
import { Rating } from 'semantic-ui-react'

interface Props {
  spec: SwaggerObject
}

interface State {
  spec?: SwaggerObject
  rating?: number;
}

export class SwaggerObjectEditor extends React.Component<Props, State> {

  constructor(props?: Props) {
    super(props)
    this.updateRating = this.updateRating.bind(this)
    this.state = {
      spec: props.spec,
      rating: 3
    }
  }

  updateRating(event,data?:any) {
    console.log(data)
    this.setState({
      rating: data.rating
    })
  }

  render() {
    return ( <div>
        <h1>Hello, {this.props.spec.swagger} 3</h1>
        <h2>Paths</h2>
        <Rating rating={this.state.rating} maxRating={5} onRate={this.updateRating} />
        {this.state.rating}
        <PathsObjectEditor pathsObject={this.props.spec.paths} />
    </div>
    );
  }
}