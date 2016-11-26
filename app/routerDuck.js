export const NAVIGATE = 'NAVIGATE'

export default function routerReducer(state = {}, action) {
  if (action.type === NAVIGATE) {
    return {
      ...state,
      location: action.location,
      action: action.action
    }
  } else {
    return state
  }
}

export function navigate(location, action) {
  return { type: NAVIGATE, location, action }
}
