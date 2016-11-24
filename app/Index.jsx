import React, {PropTypes} from 'react'
import UserIndexComponent from 'IndexUser'
import GuestIndexComponent from 'IndexGuest'
import {connect} from 'react-redux'

class Index extends React.Component {
   render() {
       if(this.props.user) {
           return <UserIndexComponent userName={this.props.user.username}/>
       }
       else {
           return <GuestIndexComponent/>
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