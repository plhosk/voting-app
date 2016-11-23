import React, {PropTypes} from 'react'

class IndexUser extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Hello {this.props.userName}</h1>
            </div>
        )
    }
}
IndexUser.propTypes = {
  userName: PropTypes.string
}

export default IndexUser
