import React from 'react'

class IndexUser extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Hello {this.props.userName}</h1>
            </div>
        )
    }
}

export default IndexUser
