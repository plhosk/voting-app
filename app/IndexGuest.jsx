import React from 'react'
import {Link} from 'react-router'

class IndexGuest extends React.Component {
  render() {
    return(
      <div className="container">
        <p>
          This is the guest index page, sign up or login to see what's inside.
        </p>
        <Link to='/polls/42'>Poll 42</Link>        
        <Link to='/polls/54'>Poll 54</Link>
      </div>
    )
  }
}

export default IndexGuest
