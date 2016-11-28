import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Tabs, Tab} from 'material-ui/Tabs'
import {navigate} from './routerDuck'
import ActionHome from 'material-ui/svg-icons/action/home'
import SocialPoll from 'material-ui/svg-icons/social/poll'
import SocialPerson from 'material-ui/svg-icons/social/person'

// const styles = {
//   tabs: {

//   },
//   tab: {

//   }
// }

// class NavigationTabs extends React.Component {
  
const NavigationTabs = ({ pathname, dispatch }) => {

  const styles = {
    tabLabel: {
      // fontSize:'0.9em'
    }
  }

  return (

    <Tabs
      value={pathname}
      onChange={(newValue) => {
        dispatch(navigate({pathname: newValue}, 'PUSH'))}
      }
    >
      <Tab
        style={styles.tabLabel}
        label='Home'
        value='/'
        icon={<ActionHome />}
      />
      <Tab
        style={styles.tabLabel}
        label='All Polls'
        value='/polls'
        icon={<SocialPoll />}
      />
      <Tab
        style={styles.tabLabel}
        label='My Polls'
        value='/mypolls'
        icon={<SocialPerson />}
      />
    </Tabs>
  )
}

NavigationTabs.propTypes = {
  pathname: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  pathname: state.router.location.pathname
})

export default connect(mapStateToProps)(NavigationTabs)
