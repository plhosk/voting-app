import React, {PropTypes} from 'react'
import IndexUser from 'IndexUser'
import IndexGuest from 'IndexGuest'
import {connect} from 'react-redux'

class Index extends React.Component {
   render() {
       if(this.props.user) {
           return <IndexUser userName={this.props.user.username}/>
       }
       else {
           return <IndexGuest/>
       }
   }
}
Index.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Index)
