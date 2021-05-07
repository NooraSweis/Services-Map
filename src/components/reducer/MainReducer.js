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
      localStorage.setItem('isLoggedIn',null);
      localStorage.setItem('position','client-out');
      localStorage.setItem('user name',''); 
      return {  initState}
   }
   else if (action.type === 'client-in') {
      localStorage.setItem('position','client-in');
      return { isLoggedIn: localStorage.getItem('isLoggedIn'),
      userName:localStorage.getItem('user name'),
       position: localStorage.getItem('position')}
   } else if (action.type === 'SP') {
      localStorage.setItem('position','SP');
      return {isLoggedIn: localStorage.getItem('isLoggedIn'),
      userName:localStorage.getItem('user name')
      , position:localStorage.getItem('position') }
   } else if (action.type === 'ADMIN') {
      localStorage.setItem('position','ADMIN');
      return { isLoggedIn: localStorage.getItem('isLoggedIn'),
      userName:localStorage.getItem('user name'), position: localStorage.getItem('position')}
   }else if(action.type==='editName'){
      return {...state,userName:localStorage.getItem('user name')}
   }
   return state
}
export default reducer;