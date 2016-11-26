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


export function updateUserObject(userObject) {
  return { type: UPDATE_USER_OBJECT, userObject }
}

export function removeUserObject() {
  return { type: REMOVE_USER_OBJECT }
}
