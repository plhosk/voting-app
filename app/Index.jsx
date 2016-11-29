import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import Divider from 'material-ui/Divider'

import IndexUser from './IndexUser'
import IndexGuest from './IndexGuest'

const styles = {
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
      <div>
        <ActionCheckCircle style={styles.logo} />
        {user && <IndexUser userName={this.props.user.username}/>}
        {!user && <IndexGuest/>}
        <br />
        <Divider />
        <p>Created in 2016 by <strong>Paul Hoskinson</strong> (plhosk@gmail.com)</p>
        <p>View or download the code for this project at <a href='https://github.com/plhosk/voting-app'>Github</a>.</p>
        <Divider />
        <h4>Main Technologies</h4>
        <p><strong>Server:</strong> Node/Express, Mongoose, Passport</p>
        <p><strong>Client:</strong> React, Redux, React-Router v4, Material UI</p>
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
