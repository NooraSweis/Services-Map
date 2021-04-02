const initState={
    isLoggedIn:false,
    position:'client-out'
}
const reducer =(state=initState,action)=>{
    if(action.type==='LOGIN')
       return{...state,isLoggedIn:true}
    if(action.type==='LOGOUT')
       return{isLoggedIn:false}
    if(action.type==='client-in')
       return{...state,position:'client-in'}
    return state
}
export default reducer;