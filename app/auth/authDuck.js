import {navigate} from '../routerDuck'

const UPDATE_USER_OBJECT = 'voting-app/user/UPDATE_USER_OBJECT'
const REMOVE_USER_OBJECT = 'voting-app/user/REMOVE_USER_OBJECT'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_USER_OBJECT:
      return {
        user: action.userObject
      }

    case REMOVE_USER_OBJECT:
      return {}

    default:
      return state
  }
}

export function logOut() {
  return function (dispatch) {
    return fetch('/api/logout', {
      credentials: 'same-origin',
      method: 'DELETE'
    }).then((response) => {
      if (response.status == 200) {
        dispatch(removeUserObject())
        dispatch(navigate( { pathname: '/' }, 'PUSH'))
      }
    })
  }
}

export function getUserObject() {
  return function (dispatch) {
    return fetch('/api/login', {
      credentials: 'same-origin',
      method: 'GET'
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((user) => {
          dispatch(updateUserObject(user))
        })
      }
    })
  }
}

export function updateUserObject(userObject) {
  return { type: UPDATE_USER_OBJECT, userObject }
}

export function removeUserObject() {
  return { type: REMOVE_USER_OBJECT }
}
