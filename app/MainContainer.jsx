import React, {PropTypes} from 'react'
import NavigationBar from 'NavigationBar'

class MainContainer extends React.Component {
    render() {
        return(
            <div>
                <NavigationBar/>
                {this.props.children}
            </div>
        )
    }
}
MainContainer.propTypes = {
  children: PropTypes.any
}

export default MainContainer