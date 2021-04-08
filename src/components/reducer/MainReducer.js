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
   } else if (action.type === 'SP') {
      return { isLoggedIn: true, position: 'SP' }
   } else if (action.type === 'ADMIN') {
      return { isLoggedIn: true, position: 'ADMIN' }
   }
   return state
}
export default reducer;