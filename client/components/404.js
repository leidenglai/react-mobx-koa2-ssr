import { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class NotFound extends PureComponent {
  static contextTypes = { router: PropTypes.object.isRequired }

  componentDidMount() {
    alert('404 NOT FOUND')
    this.context.router.replace('/')
  }

  render() {
    // 非实体组件需显式返回 null
    return null
  }
}
