const initState = {
   isLoggedIn: localStorage.getItem('isLoggedIn'),
   position: localStorage.getItem('position'),
   userName: localStorage.getItem('user name'),
}
const reducer = (state = initState, action) => {
   if (action.type === 'LOGIN')
   {
      localStorage.setItem('isLoggedIn',true);
      return { ...state, isLoggedIn: localStorage.getItem('isLoggedIn'),userName:localStorage.getItem('user name')}
   }
      
   else if (action.type === 'LOGOUT') {
      localStorage.setItem('user name','')
      localStorage.setItem('isLoggedIn',false)
      localStorage.setItem('position','client-out')
      return { userName:localStorage.getItem('user name'),isLoggedIn: localStorage.getItem('isLoggedIn'), position: localStorage.getItem('position') }
   }
   else if (action.type === 'client-in') {
      localStorage.setItem('position','client-in');
      return { ...state, position: localStorage.getItem('position')}
   } else if (action.type === 'SP') {
      localStorage.setItem('position','SP');
      return {...state, position:localStorage.getItem('position') }
   } else if (action.type === 'ADMIN') {
      localStorage.setItem('position','ADMIN');
      return { ...state, position: localStorage.getItem('position')}
   }
   return state
}
export default reducer;