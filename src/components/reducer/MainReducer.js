import { auth } from '../config';

const initState = {
   isLoggedIn: false,
   position: 'client-out'
}
const reducer = (state = initState, action) => {
   if (action.type === 'LOGIN')
      return { ...state, isLoggedIn: true }
   else if (action.type === 'LOGOUT') {
      auth.signOut();
      console.log('logged out')
      return { isLoggedIn: false, position: 'client-out' }
   }
   else if (action.type === 'client-in') {
      return { ...state, position: 'client-in' }
   } else if (action.type === 'SERVICE-PROVIDER') {
      return { isLoggedIn: true, position: 'service-provider' }
   }
   return state
}
export default reducer;