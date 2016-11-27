import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'

import IndexUser from './IndexUser'
import IndexGuest from './IndexGuest'

const style = {
  logo: {
    width: 120,
    height: 120,
    color: '#4DD0E1'
  }
}

class Index extends React.Component {
  render() {
    const {user} = this.props

    return (
      <div style={style}>
        <ActionCheckCircle style={style.logo} />
        {user && <IndexUser userName={this.props.user.username}/>}
        {!user && <IndexGuest/>}
      </div>
    )
  }
}
Index.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Index)
